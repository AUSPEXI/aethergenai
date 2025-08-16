import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

interface CheckoutRequest {
  category: string;
  type: 'static' | 'premium' | 'enterprise';
  price: number;
  addons: string[];
  premiumUpgrade: boolean;
  customerEmail: string;
  customerName: string;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const requestData: CheckoutRequest = JSON.parse(event.body || '{}');
    const { category, type, price, addons, premiumUpgrade, customerEmail, customerName } = requestData;

    // Calculate total price
    let totalPrice = price;
    const premiumAddonPrice = type === 'static' ? 2400 : 200; // One-time vs monthly

    // Create line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${category} ${type.charAt(0).toUpperCase() + type.slice(1)} Suite`,
            description: `Includes ${addons.length} core add-ons: ${addons.join(', ')}`,
            metadata: {
              category,
              type,
              addons: addons.join(','),
            },
          },
          unit_amount: price * 100, // Convert to cents
          ...(type !== 'static' && {
            recurring: {
              interval: 'month',
            },
          }),
        },
        quantity: 1,
      },
    ];

    // Add premium upgrade if selected and not enterprise
    if (type !== 'enterprise' && premiumUpgrade) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${category} Premium Network Add-on`,
            description: 'Advanced network analysis and relationship mapping',
          },
          unit_amount: premiumAddonPrice * 100,
          ...(type !== 'static' && {
            recurring: {
              interval: 'month',
            },
          }),
        },
        quantity: 1,
      });
      totalPrice += premiumAddonPrice;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: type === 'static' ? 'payment' : 'subscription',
      success_url: `${event.headers.origin}/subscriptions/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin}/subscriptions/cancel`,
      customer_email: customerEmail,
      metadata: {
        category,
        type,
        addons: addons.join(','),
        premiumUpgrade: premiumUpgrade.toString(),
        customerName,
        totalPrice: totalPrice.toString(),
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      ...(type !== 'static' && {
        subscription_data: {
          metadata: {
            category,
            type,
            addons: addons.join(','),
            premiumUpgrade: premiumUpgrade.toString(),
          },
        },
      }),
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };