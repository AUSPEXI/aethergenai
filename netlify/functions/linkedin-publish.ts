import type { Handler } from '@netlify/functions'

type PublishBody = { text: string; url?: string }

const handler: Handler = async (event) => {
	try {
		if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
		if (!process.env.LINKEDIN_ACCESS_TOKEN) return { statusCode: 400, body: 'Not connected' }
		const body = event.body ? JSON.parse(event.body) as PublishBody : { text: '' }
		const text = (body.text || '').slice(0, 2900)
		const post = {
			author: process.env.LINKEDIN_ACCOUNT_URN || 'urn:li:person:me',
			lifecycleState: 'PUBLISHED',
			specificContent: {
				'com.linkedin.ugc.ShareContent': {
					shareCommentary: { text },
					shareMediaCategory: body.url ? 'ARTICLE' : 'NONE',
					media: body.url ? [ { status: 'READY', originalUrl: body.url } ] : undefined
				}
			},
			visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
		}
		const resp = await fetch('https://api.linkedin.com/v2/ugcPosts', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
				'Content-Type': 'application/json',
				'X-Restli-Protocol-Version': '2.0.0'
			},
			body: JSON.stringify(post)
		})
		const data = await resp.text()
		return { statusCode: resp.ok ? 200 : resp.status, body: data }
	} catch (e: any) {
		return { statusCode: 500, body: e?.message || 'error' }
	}
}

export { handler }


