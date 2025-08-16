import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface StripeEvent {
  id: string
  type: string
  data: {
    object: any
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify the webhook signature
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    
    if (!signature) {
      throw new Error('No Stripe signature found')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse the Stripe event
    const event: StripeEvent = JSON.parse(body)
    
    console.log(`Processing Stripe event: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event, supabaseClient)
        break
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event, supabaseClient)
        break
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event, supabaseClient)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event, supabaseClient)
        break
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event, supabaseClient)
        break
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event, supabaseClient)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

async function handleCheckoutSessionCompleted(event: StripeEvent, supabase: any) {
  const session = event.data.object
  
  console.log('Checkout session completed:', session.id)
  
  // Extract customer information
  const customerEmail = session.customer_email || session.customer_details?.email
  const customerName = session.metadata?.customerName || session.customer_details?.name
  const planType = session.metadata?.plan || 'basic'
  
  // Create or update customer record
  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .upsert({
      email: customerEmail,
      name: customerName,
      stripe_customer_id: session.customer,
      plan_type: planType,
      subscription_status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'email'
    })
  
  if (customerError) {
    console.error('Error creating/updating customer:', customerError)
    throw customerError
  }
  
  // Log the successful checkout
  const { error: logError } = await supabase
    .from('subscription_events')
    .insert({
      customer_email: customerEmail,
      event_type: 'checkout_completed',
      stripe_event_id: event.id,
      stripe_session_id: session.id,
      plan_type: planType,
      amount: session.amount_total,
      currency: session.currency,
      created_at: new Date().toISOString()
    })
  
  if (logError) {
    console.error('Error logging checkout event:', logError)
  }
  
  console.log(`Customer ${customerEmail} successfully subscribed to ${planType} plan`)
}

async function handleSubscriptionCreated(event: StripeEvent, supabase: any) {
  const subscription = event.data.object
  
  console.log('Subscription created:', subscription.id)
  
  // Update customer subscription status
  const { error } = await supabase
    .from('customers')
    .update({
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', subscription.customer)
  
  if (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}

async function handleSubscriptionUpdated(event: StripeEvent, supabase: any) {
  const subscription = event.data.object
  
  console.log('Subscription updated:', subscription.id)
  
  // Update customer subscription details
  const { error } = await supabase
    .from('customers')
    .update({
      subscription_status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscription.id)
  
  if (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}

async function handleSubscriptionDeleted(event: StripeEvent, supabase: any) {
  const subscription = event.data.object
  
  console.log('Subscription deleted:', subscription.id)
  
  // Update customer subscription status to cancelled
  const { error } = await supabase
    .from('customers')
    .update({
      subscription_status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscription.id)
  
  if (error) {
    console.error('Error cancelling subscription:', error)
    throw error
  }
}

async function handlePaymentSucceeded(event: StripeEvent, supabase: any) {
  const invoice = event.data.object
  
  console.log('Payment succeeded:', invoice.id)
  
  // Log successful payment
  const { error } = await supabase
    .from('subscription_events')
    .insert({
      stripe_event_id: event.id,
      event_type: 'payment_succeeded',
      stripe_invoice_id: invoice.id,
      stripe_subscription_id: invoice.subscription,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      created_at: new Date().toISOString()
    })
  
  if (error) {
    console.error('Error logging payment success:', error)
  }
}

async function handlePaymentFailed(event: StripeEvent, supabase: any) {
  const invoice = event.data.object
  
  console.log('Payment failed:', invoice.id)
  
  // Log failed payment and potentially update subscription status
  const { error: logError } = await supabase
    .from('subscription_events')
    .insert({
      stripe_event_id: event.id,
      event_type: 'payment_failed',
      stripe_invoice_id: invoice.id,
      stripe_subscription_id: invoice.subscription,
      amount: invoice.amount_due,
      currency: invoice.currency,
      created_at: new Date().toISOString()
    })
  
  if (logError) {
    console.error('Error logging payment failure:', logError)
  }
  
  // Update customer status if payment failed
  const { error: updateError } = await supabase
    .from('customers')
    .update({
      subscription_status: 'past_due',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', invoice.subscription)
  
  if (updateError) {
    console.error('Error updating customer status:', updateError)
  }
}