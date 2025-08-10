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
  try {
    if (!supabase) {
      return { statusCode: 500, body: JSON.stringify({ error: "Supabase not configured" }) };
    }

    if (event.httpMethod !== "GET") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const params = new URLSearchParams(event.queryStringParameters as any);
    const email = params.get("email");
    const stripeCustomer = params.get("stripe_customer");
    if (!email && !stripeCustomer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "email or stripe_customer required" }),
      };
    }

    // Find customer
    const { data: customers, error: custErr } = await supabase
      .from("ae_customers")
      .select("id, email, stripe_customer")
      .or(`email.eq.${email || ""},stripe_customer.eq.${stripeCustomer || ""}`)
      .limit(1);
    if (custErr) throw custErr;
    if (!customers || customers.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ entitlements: [] }) };
    }
    const customer_id = customers[0].id;

    const { data: ents, error: entErr } = await supabase
      .from("ae_entitlements")
      .select("stripe_price, quantity, subscription_id, active, updated_at")
      .eq("customer_id", customer_id)
      .eq("active", true);
    if (entErr) throw entErr;

    return {
      statusCode: 200,
      body: JSON.stringify({ entitlements: ents || [] }),
    };
  } catch (err: any) {
    console.error("[get-entitlements] error", err);
    return { statusCode: 500, body: JSON.stringify({ error: err?.message || "Error" }) };
  }
};


