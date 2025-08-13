exports.handler = async function(event, context) {
  try {
    console.log("Entitlements function called");
    
    // Always return success with DEV_FREE access
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
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Function failed",
        message: error.message 
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};
