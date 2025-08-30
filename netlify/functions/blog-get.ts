import type { Handler } from '@netlify/functions'
import { getServiceClient } from './_lib/supabase'
import path from 'path'
import fs from 'fs'

function convertMarkdownToHtml(input: string): string {
	const s = input || ''
	if (/[<][a-zA-Z]/.test(s)) return s
	// Basic markdown conversion with headings, links, and lists
	let raw = s.replace(/\r\n/g, '\n')
	// Remove inline CTA markdown lines; we render real buttons below the article
	raw = raw.split('\n').filter(l => !/\[\s*View\s+Pricing/i.test(l) && !/\[\s*Contact\s+Sales/i.test(l)).join('\n')
	const lines = raw.split(/\n/)
	const outParts: string[] = []
	let inList = false
	let inOList = false
	const flushPara = (buf: string[]) => {
		if (!buf.length) return
		let p = buf.join(' ').trim()
		if (!p) { buf.length = 0; return }
		p = p
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
		outParts.push(`<p>${p}</p>`) ; buf.length = 0
	}
	const paraBuf: string[] = []
	for (let i=0;i<lines.length;i++) {
		const line = lines[i]
		if (/^\s*$/.test(line)) { flushPara(paraBuf); if (inList) { outParts.push('</ul>'); inList=false } if (inOList) { outParts.push('</ol>'); inOList=false } continue }
		const h3 = line.match(/^###\s+(.*)$/); if (h3) { flushPara(paraBuf); if (inList){outParts.push('</ul>'); inList=false} if (inOList){outParts.push('</ol>'); inOList=false} outParts.push(`<h3>${h3[1]}</h3>`); continue }
		const h2 = line.match(/^##\s+(.*)$/); if (h2) { flushPara(paraBuf); if (inList){outParts.push('</ul>'); inList=false} if (inOList){outParts.push('</ol>'); inOList=false} outParts.push(`<h2>${h2[1]}</h2>`); continue }
		const h1 = line.match(/^#\s+(.*)$/); if (h1) { flushPara(paraBuf); if (inList){outParts.push('</ul>'); inList=false} if (inOList){outParts.push('</ol>'); inOList=false} outParts.push(`<h1>${h1[1]}</h1>`); continue }
		const li = line.match(/^\s*-\s+(.*)$/)
		if (li) {
			flushPara(paraBuf)
			if (!inList) { outParts.push('<ul>'); inList = true }
			const text = li[1]
			const item = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
			outParts.push(`<li>${item}</li>`)
			continue
		}
		// Pipe table detection: header |---| row(s)
		const tableHeader = line.match(/^\s*\|(.+)\|\s*$/)
		if (tableHeader && i+1 < lines.length && /^\s*\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|\s*$/.test(lines[i+1])) {
			flushPara(paraBuf); if (inList){outParts.push('</ul>'); inList=false} if (inOList){outParts.push('</ol>'); inOList=false}
			const headers = tableHeader[1].split('|').map(h=>h.trim())
			i += 2
			const rows: string[][] = []
			while (i < lines.length && /^\s*\|(.+)\|\s*$/.test(lines[i])) {
				const m = lines[i].match(/^\s*\|(.+)\|\s*$/)!
				rows.push(m[1].split('|').map(c=>c.trim()))
				i++
			}
			i--
			outParts.push('<table>')
			outParts.push('<thead><tr>' + headers.map(h=>`<th>${h}</th>`).join('') + '</tr></thead>')
			if (rows.length) outParts.push('<tbody>' + rows.map(r=>'<tr>'+r.map(c=>`<td>${c}</td>`).join('')+'</tr>').join('') + '</tbody>')
			outParts.push('</table>')
			continue
		}
		const oli = line.match(/^\s*\d+\.\s+(.*)$/)
		if (oli) {
			flushPara(paraBuf)
			if (!inOList) { outParts.push('<ol>'); inOList = true }
			const text = oli[1]
			const item = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
			outParts.push(`<li>${item}</li>`)
			continue
		}
		paraBuf.push(line)
	}
	flushPara(paraBuf); if (inList) outParts.push('</ul>'); if (inOList) outParts.push('</ol>')
	return outParts.join('\n')
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


