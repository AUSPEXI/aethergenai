import type { Handler } from '@netlify/functions'

const handler: Handler = async () => {
	// Placeholder: in production, check Supabase for stored token by owner
	const configured = Boolean(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET)
	return {
		statusCode: 200,
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ configured })
	}
}

export { handler }


