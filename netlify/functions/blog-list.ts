import type { Handler } from '@netlify/functions'
import { getServiceClient } from './_lib/supabase'
import fs from 'fs'
import path from 'path'

const handler: Handler = async () => {
	try {
		const supabase = getServiceClient()
		const { data, error } = await supabase
			.from('blog_posts')
			.select('slug,title,excerpt,published_at')
			.eq('status','published')
			.order('published_at', { ascending: false })
			.limit(50)
		if (!error && data && data.length > 0) {
			return { statusCode: 200, body: JSON.stringify(data) }
		}
		// Fallback to library manifest so /blog never empties
		try {
			const manifestPath = path.join(process.cwd(), 'public', 'blog-library', 'manifest.json')
			const raw = await fs.promises.readFile(manifestPath, 'utf8')
			const js = JSON.parse(raw)
			const posts = Array.isArray(js) ? js : (js.posts || [])
			const mapped = posts.map((p: any) => ({ slug: p.slug, title: p.title, excerpt: p.summary || '', published_at: null }))
			return { statusCode: 200, body: JSON.stringify(mapped) }
		} catch (_) {
			return { statusCode: 200, body: JSON.stringify([]) }
		}
	} catch (e: any) {
		return { statusCode: 500, body: `blog-list catch: ${e?.message || 'error'}` }
	}
}

export { handler }


