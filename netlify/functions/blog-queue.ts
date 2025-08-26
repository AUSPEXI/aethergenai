import type { Handler } from '@netlify/functions'
import { getServiceClient } from './_lib/supabase'

type EnqueueBody = {
	slug: string
	title: string
	excerpt: string
	contentHtml: string
	scheduledAt: string
	tags?: string[]
}

const handler: Handler = async (event) => {
	try {
		if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
		const body = event.body ? JSON.parse(event.body) as EnqueueBody : null
		if (!body?.slug || !body?.title || !body?.excerpt || !body?.contentHtml || !body?.scheduledAt) {
			return { statusCode: 400, body: 'Missing fields' }
		}
		const supabase = getServiceClient()
		const { error } = await supabase.from('blog_posts').insert({
			slug: body.slug,
			title: body.title,
			excerpt: body.excerpt,
			content_html: body.contentHtml,
			tags: body.tags || [],
			status: 'scheduled',
			scheduled_at: new Date(body.scheduledAt).toISOString(),
		})
		if (error) return { statusCode: 500, body: error.message }
		return { statusCode: 200, body: JSON.stringify({ ok: true }) }
	} catch (e: any) {
		return { statusCode: 500, body: e?.message || 'error' }
	}
}

export { handler }


