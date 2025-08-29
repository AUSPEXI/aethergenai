import type { Handler } from '@netlify/functions'
import { getServiceClient } from './_lib/supabase'
import path from 'path'
import fs from 'fs'

const handler: Handler = async (event) => {
	const slug = event.queryStringParameters?.slug
	if (!slug) return { statusCode: 400, body: 'slug required' }
	const supabase = getServiceClient()
	const { data, error } = await supabase
		.from('blog_posts')
		.select('*')
		.eq('slug', slug)
		.eq('status','published')
		.limit(1)
		.single()
	if (!error && data) return { statusCode: 200, body: JSON.stringify(data) }
	// Fallback to library JSON file in public/blog-library
	try {
		const base = process.env.URL || process.env.DEPLOY_PRIME_URL || ''
		if (base) {
			const r = await fetch(`${base}/blog-library/${slug}.json`)
			if (r.ok) {
				const js = await r.json()
				return { statusCode: 200, body: JSON.stringify(js) }
			}
		}
		// local fs fallback during local dev
		const p = path.join(process.cwd(), 'public', 'blog-library', `${slug}.json`)
		const raw = await fs.promises.readFile(p, 'utf8')
		return { statusCode: 200, body: raw }
	} catch {}
	return { statusCode: 404, body: 'not found' }
}

export { handler }


