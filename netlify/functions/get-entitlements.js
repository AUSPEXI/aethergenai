exports.handler = async function(event, context) {
  console.log("Function called");
  
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
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
