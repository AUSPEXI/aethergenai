import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  console.log("[get-entitlements] Function called with:", {
    method: event.httpMethod,
    queryParams: event.queryStringParameters
  });

  // Simple test response
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      entitlements: [
        {
          stripe_price: "DEV_FREE",
          quantity: 1,
          subscription_id: "sub_dev",
          active: true,
          updated_at: new Date().toISOString()
        }
      ]
    }),
    headers: { 'Content-Type': 'application/json' }
  };
};


