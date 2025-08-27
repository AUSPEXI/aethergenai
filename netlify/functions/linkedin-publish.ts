import type { Handler } from '@netlify/functions'
import { getServiceClient } from './_lib/supabase'
import { rateLimit, tooMany } from './_shared/supabase'

type PublishBody = { text: string; url?: string }

const handler: Handler = async (event) => {
	try {
		const rl = rateLimit(event, 'linkedin-publish', 10, 60); // 10/min per IP
		if (!rl.allowed) return tooMany(rl.retryAfter)
		if (event.httpMethod === 'GET') {
			return {
				statusCode: 200,
				headers: { 'content-type': 'text/html' },
				body: `<html><body><h1>LinkedIn Publish</h1><p>POST JSON { text, url? } to this endpoint to publish to LinkedIn (requires prior connection via /.netlify/functions/linkedin-start).</p></body></html>`
			}
		}
		if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
		const supabase = getServiceClient()
		const { data: acct, error } = await supabase
			.from('social_accounts')
			.select('access_token, account_ref')
			.eq('provider','linkedin')
			.order('updated_at', { ascending: false })
			.limit(1)
			.single()
		if (error || !acct) return { statusCode: 400, body: 'Not connected' }
		const body = event.body ? JSON.parse(event.body) as PublishBody : { text: '' }
		const text = (body.text || '').slice(0, 2900)
		const authorUrn = process.env.LINKEDIN_ORG_URN || acct.account_ref || 'urn:li:organization:me'
		const post = {
			author: authorUrn,
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
				'Authorization': `Bearer ${acct.access_token}`,
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


