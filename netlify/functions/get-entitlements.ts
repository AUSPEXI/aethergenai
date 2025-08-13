import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_DATABASE_URL ||
  process.env.VITE_SUPABASE_DATABASE_URL ||
  "";
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

export const handler: Handler = async (event) => {
  console.log("[get-entitlements] Function called with:", {
    method: event.httpMethod,
    queryParams: event.queryStringParameters,
    env: {
      hasUrl: !!SUPABASE_URL,
      hasKey: !!SUPABASE_SERVICE_ROLE_KEY,
      url: SUPABASE_URL ? SUPABASE_URL.substring(0, 20) + "..." : "NOT SET"
    }
  });

  try {
    if (!supabase) {
      console.error("[get-entitlements] Supabase not configured");
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "Supabase not configured" }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    if (event.httpMethod !== "GET") {
      return { 
        statusCode: 405, 
        body: JSON.stringify({ error: "Method Not Allowed" }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    const params = new URLSearchParams(event.queryStringParameters as any);
    const email = params.get("email");
    const stripeCustomer = params.get("stripe_customer");
    
    console.log("[get-entitlements] Processing request for:", { email, stripeCustomer });
    
    if (!email && !stripeCustomer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "email or stripe_customer required" }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Find customer with better error handling
    let customerQuery = supabase
      .from("ae_customers")
      .select("id, email, stripe_customer");
    
    if (email) {
      customerQuery = customerQuery.eq("email", email);
    } else if (stripeCustomer) {
      customerQuery = customerQuery.eq("stripe_customer", stripeCustomer);
    }
    
    const { data: customers, error: custErr } = await customerQuery.limit(1);
    
    if (custErr) {
      console.error("[get-entitlements] Customer lookup error:", custErr);
      throw custErr;
    }
    
    console.log("[get-entitlements] Found customers:", customers?.length || 0);
    
    if (!customers || customers.length === 0) {
      console.log("[get-entitlements] No customer found, returning empty entitlements");
      return { 
        statusCode: 200, 
        body: JSON.stringify({ entitlements: [] }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    
    const customer_id = customers[0].id;
    console.log("[get-entitlements] Looking up entitlements for customer:", customer_id);

    // Get entitlements
    const { data: ents, error: entErr } = await supabase
      .from("ae_entitlements")
      .select("stripe_price, quantity, subscription_id, active, updated_at")
      .eq("customer_id", customer_id)
      .eq("active", true);
      
    if (entErr) {
      console.error("[get-entitlements] Entitlements lookup error:", entErr);
      throw entErr;
    }

    console.log("[get-entitlements] Found entitlements:", ents?.length || 0);

    return {
      statusCode: 200,
      body: JSON.stringify({ entitlements: ents || [] }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err: any) {
    console.error("[get-entitlements] Function error:", err);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: err?.message || "Internal server error",
        details: process.env.NODE_ENV === 'development' ? err?.stack : undefined
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};


