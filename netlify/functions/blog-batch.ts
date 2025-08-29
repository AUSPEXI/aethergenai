import type { Handler } from '@netlify/functions'
import { getServiceClient } from './_lib/supabase'

function convertMarkdownToHtml(input: string): string {
  const s = input || ''
  if (/[<][a-zA-Z]/.test(s)) return s
  const lines = s.replace(/\r\n/g, '\n').split(/\n/)
  const out: string[] = []
  let inList = false
  const para: string[] = []
  const flushPara = () => {
    if (!para.length) return
    let p = para.join(' ').trim()
    if (!p) { para.length = 0; return }
    p = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    out.push(`<p>${p}</p>`)
    para.length = 0
  }
  for (const line of lines) {
    if (/^\s*$/.test(line)) { flushPara(); if (inList) { out.push('</ul>'); inList = false } continue }
    const h3 = line.match(/^###\s+(.*)$/); if (h3) { flushPara(); if (inList){out.push('</ul>'); inList=false} out.push(`<h3>${h3[1]}</h3>`); continue }
    const h2 = line.match(/^##\s+(.*)$/); if (h2) { flushPara(); if (inList){out.push('</ul>'); inList=false} out.push(`<h2>${h2[1]}</h2>`); continue }
    const h1 = line.match(/^#\s+(.*)$/); if (h1) { flushPara(); if (inList){out.push('</ul>'); inList=false} out.push(`<h1>${h1[1]}</h1>`); continue }
    const li = line.match(/^\s*-\s+(.*)$/)
    if (li) {
      flushPara()
      if (!inList) { out.push('<ul>'); inList = true }
      const text = li[1]
      const item = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      out.push(`<li>${item}</li>`)
      continue
    }
    para.push(line)
  }
  flushPara(); if (inList) out.push('</ul>')
  return out.join('\n')
}

async function loadLibrary(): Promise<any[]> {
  const base = process.env.URL || process.env.DEPLOY_PRIME_URL || ''
  const urls = [
    base ? `${base}/blog-library/manifest.json` : '',
    `${base || ''}/public/blog-library/manifest.json`
  ].filter(Boolean)
  for (const u of urls) {
    try {
      const r = await fetch(u)
      if (r.ok) {
        const js = await r.json()
        const posts = Array.isArray(js) ? js : (js.posts || [])
        return posts
      }
    } catch {}
  }
  return []
}

async function loadPost(slug: string): Promise<any | null> {
  const base = process.env.URL || process.env.DEPLOY_PRIME_URL || ''
  const r = await fetch(`${base}/blog-library/${slug}.json`).catch(()=>null as any)
  if (r && r.ok) return r.json()
  return null
}

const handler: Handler = async (event) => {
  try {
    const supabase = getServiceClient()
    const action = event.queryStringParameters?.action || 'publishNow'
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
    const body = event.body ? JSON.parse(event.body) as { slugs?: string[], plan?: { startDate?: string } } : {}

    if (action === 'publishNow') {
      const slugs = body.slugs || []
      if (!slugs.length) return { statusCode: 400, body: 'slugs required' }
      for (const slug of slugs) {
        const js = await loadPost(slug)
        if (!js) continue
        const content_html = convertMarkdownToHtml(js.contentHtml || js.bodyMd || js.body || '')
        await supabase.from('blog_posts').insert({
          slug: js.slug,
          title: js.title,
          excerpt: js.summary || js.excerpt || '',
          content_html,
          tags: js.tags || [],
          status: 'published',
          published_at: new Date().toISOString(),
        })
      }
      return { statusCode: 200, body: JSON.stringify({ ok: true, count: (body.slugs||[]).length }) }
    }

    if (action === 'planTwoWeeks') {
      const manifest = await loadLibrary()
      if (!manifest.length) return { statusCode: 400, body: 'library empty' }
      const start = body.plan?.startDate ? new Date(body.plan.startDate) : new Date()
      const targets = manifest.slice(0, 15)
      for (let i = 0; i < targets.length; i++) {
        const slug = targets[i].slug
        const js = await loadPost(slug)
        if (!js) continue
        const content_html = convertMarkdownToHtml(js.contentHtml || js.bodyMd || js.body || '')
        const d = new Date(start)
        d.setDate(start.getDate() + i + 1)
        d.setHours(i % 2 === 0 ? 9 : 14, 0, 0, 0)
        await supabase.from('blog_posts').insert({
          slug: js.slug,
          title: js.title,
          excerpt: js.summary || js.excerpt || '',
          content_html,
          tags: js.tags || [],
          status: 'scheduled',
          scheduled_at: d.toISOString(),
        })
      }
      return { statusCode: 200, body: JSON.stringify({ ok: true, scheduled: 15 }) }
    }

    return { statusCode: 400, body: 'unknown action' }
  } catch (e: any) {
    return { statusCode: 500, body: e?.message || 'error' }
  }
}

export { handler }


