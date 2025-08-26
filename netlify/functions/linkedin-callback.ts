import type { Handler } from '@netlify/functions'

async function exchangeCodeForToken(code: string, redirectUri: string) {
	const clientId = process.env.LINKEDIN_CLIENT_ID || ''
	const clientSecret = process.env.LINKEDIN_CLIENT_SECRET || ''
	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code,
		redirect_uri: redirectUri,
		client_id: clientId,
		client_secret: clientSecret,
	})
	const resp = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: body.toString(),
	})
	if (!resp.ok) throw new Error(`Token exchange failed: ${resp.status}`)
	return resp.json() as Promise<{ access_token: string; expires_in: number }>
}

const handler: Handler = async (event) => {
	try {
		const code = event.queryStringParameters?.code
		if (!code) return { statusCode: 400, body: 'Missing code' }
		const redirectUri = `${process.env.URL || ''}/.netlify/functions/linkedin-callback`
		const token = await exchangeCodeForToken(code, redirectUri)
		// Minimal verification: fetch me endpoint to get reference
		const meResp = await fetch('https://api.linkedin.com/v2/me', {
			headers: { Authorization: `Bearer ${token.access_token}` },
		})
		if (!meResp.ok) throw new Error('Failed to fetch profile')
		const me = await meResp.json()
		const accountRef = me?.id ? `urn:li:person:${me.id}` : 'unknown'
		// Store tokens: here we keep it simple in Netlify env-less log; replace with Supabase insert in production
		// Placeholder success page
		return {
			statusCode: 200,
			headers: { 'content-type': 'text/html' },
			body: `<html><body><h1>LinkedIn connected</h1><p>Account: ${accountRef}</p><p>You can close this window.</p></body></html>`
		}
	} catch (e: any) {
		return { statusCode: 500, body: e?.message || 'error' }
	}
}

export { handler }


