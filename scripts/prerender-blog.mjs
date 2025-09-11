import fs from 'fs'
import path from 'path'

const SITE = process.env.SITE_URL || 'https://auspexi.com'
const publicDir = path.join(process.cwd(), 'public')
const blogHtmlDir = path.join(publicDir, 'blog-html')
const blogOutDir = path.join(publicDir, 'blog')

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

function readIndex() {
  try {
    const raw = fs.readFileSync(path.join(blogHtmlDir, 'index.json'), 'utf-8')
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch (_) {
    return []
  }
}

function extractContent(html) {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  const title = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || 'Article').trim()
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)
  const description = pMatch ? pMatch[1].replace(/<[^>]*>/g, '').trim().slice(0, 300) : ''
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
  const style = styleMatch ? styleMatch[1] : ''
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const body = bodyMatch ? bodyMatch[1] : html
  return { title, description, style, body }
}

function buildDoc({ slug, title, description, style, body }) {
  const canonical = `${SITE}/blog/${slug}`
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    author: { '@type': 'Person', name: 'Gwylym Owen' },
    mainEntityOfPage: canonical,
    datePublished: new Date().toISOString(),
    image: `${SITE}/og-image.svg`,
    publisher: { '@type': 'Organization', name: 'Auspexi' },
    description
  }
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8"/>\n<meta name="viewport" content="width=device-width, initial-scale=1"/>\n<title>${escapeHtml(title)}</title>\n<link rel="canonical" href="${canonical}"/>\n<meta name="description" content="${escapeHtml(description)}"/>\n<script type="application/ld+json">${JSON.stringify(ld)}</script>\n<style>${style}</style>\n</head>\n<body>\n${body}\n</body>\n</html>\n`
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function run() {
  const index = readIndex()
  if (index.length === 0) {
    console.log('No blog index found, skipping prerender')
    return
  }
  ensureDir(blogOutDir)
  for (const entry of index) {
    const slug = entry.slug
    const src = path.join(blogHtmlDir, `${slug}.html`)
    if (!fs.existsSync(src)) continue
    const raw = fs.readFileSync(src, 'utf-8')
    const { title, description, style, body } = extractContent(raw)
    const outDir = path.join(blogOutDir, slug)
    ensureDir(outDir)
    const outFile = path.join(outDir, 'index.html')
    const doc = buildDoc({ slug, title, description, style, body })
    fs.writeFileSync(outFile, doc, 'utf-8')
    console.log(`Prerendered /blog/${slug}`)
  }
}

run()


