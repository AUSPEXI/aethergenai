import type { Handler } from '@netlify/functions'

const handler: Handler = async () => {
	const clientId = process.env.LINKEDIN_CLIENT_ID || ''
	const redirectUri = `${process.env.URL || ''}/.netlify/functions/linkedin-callback`
	const scope = encodeURIComponent('w_member_social r_liteprofile')
	const state = Math.random().toString(36).slice(2)
	const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`
	return {
		statusCode: 302,
		headers: { Location: authUrl },
		body: ''
	}
}

export { handler }


