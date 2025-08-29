import type { Handler } from '@netlify/functions'
import { getServiceClient } from './_lib/supabase'
import path from 'path'
import fs from 'fs'

function convertMarkdownToHtml(input: string): string {
	const s = input || ''
	if (/[<][a-zA-Z]/.test(s)) return s
	let out = s
		.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
		.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
		.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\n\n+/g, '</p><p>')
	out = `<p>${out}</p>`
	return out
}

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
	if (!error && data) {
		const html = (data as any).content_html || ''
		const wordCount = String(html).replace(/<[^>]+>/g,' ').trim().split(/\s+/).filter(Boolean).length
		const readTime = `${Math.max(2, Math.round(wordCount/200))} min read`
		const payload = { ...data, author: (data as any).author || 'Auspexi Team', category: (data as any).category || 'Technology', readTime: (data as any).readTime || readTime, published_at: (data as any).published_at || new Date().toISOString() }
		return { statusCode: 200, body: JSON.stringify(payload) }
	}
	// Fallback to library JSON file in public/blog-library
	try {
		const base = process.env.URL || process.env.DEPLOY_PRIME_URL || ''
		if (base) {
			const r = await fetch(`${base}/blog-library/${slug}.json`)
			if (r.ok) {
				const js = await r.json() as any
				const content_html = convertMarkdownToHtml(js.contentHtml || js.bodyMd || js.body || '')
				const wordCount = String(content_html).replace(/<[^>]+>/g,' ').trim().split(/\s+/).filter(Boolean).length
				const readTime = `${Math.max(2, Math.round(wordCount/200))} min read`
				const payload = { ...js, content_html, excerpt: js.summary || js.excerpt || '', author: js.author || 'Auspexi Team', category: js.category || 'Technology', readTime, published_at: js.published_at || new Date().toISOString() }
				return { statusCode: 200, body: JSON.stringify(payload) }
			}
		}
		// local fs fallback during local dev
		const p = path.join(process.cwd(), 'public', 'blog-library', `${slug}.json`)
		const raw = await fs.promises.readFile(p, 'utf8')
		const js = JSON.parse(raw)
		const content_html = convertMarkdownToHtml(js.contentHtml || js.bodyMd || js.body || '')
		const wordCount = String(content_html).replace(/<[^>]+>/g,' ').trim().split(/\s+/).filter(Boolean).length
		const readTime = `${Math.max(2, Math.round(wordCount/200))} min read`
		const payload = { ...js, content_html, excerpt: js.summary || js.excerpt || '', author: js.author || 'Auspexi Team', category: js.category || 'Technology', readTime, published_at: js.published_at || new Date().toISOString() }
		return { statusCode: 200, body: JSON.stringify(payload) }
	} catch {}
	return { statusCode: 404, body: 'not found' }
}

export { handler }


