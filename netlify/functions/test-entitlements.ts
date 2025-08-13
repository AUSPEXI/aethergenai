import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  console.log("[test-entitlements] Function called");
  
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Test entitlements endpoint working",
      timestamp: new Date().toISOString(),
      method: event.httpMethod,
      queryParams: event.queryStringParameters
    }),
    headers: { 'Content-Type': 'application/json' }
  };
};
