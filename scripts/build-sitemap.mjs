import fs from 'fs'
import path from 'path'

const SITE = process.env.SITE_URL || 'https://auspexi.com'
const publicDir = path.join(process.cwd(), 'public')
const blogIndexPath = path.join(publicDir, 'blog-html', 'index.json')
const sitemapPath = path.join(publicDir, 'sitemap.xml')

function loadBlogSlugs() {
  try {
    const raw = fs.readFileSync(blogIndexPath, 'utf-8')
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    return arr.map(x => x.slug).filter(Boolean)
  } catch (_) {
    return []
  }
}

function buildUrls() {
  const core = [
    '', 'about', 'technology', 'pricing', 'press', 'resources', 'ai', 'whitepaper', 'blog', 'build', 'context-engineering', 'choose-model'
  ]
  const slugs = loadBlogSlugs()
  const blog = slugs.map(s => `blog/${s}`)
  const all = [...core, ...blog]
  return all.map(p => `${SITE}/${p}`)
}

function writeSitemap(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
  urls.map(u => `<url><loc>${u}</loc></url>`).join('') +
  `</urlset>\n`
  fs.writeFileSync(sitemapPath, xml, 'utf-8')
  console.log(`Wrote sitemap with ${urls.length} URLs to ${path.relative(process.cwd(), sitemapPath)}`)
}

const urls = buildUrls()
writeSitemap(urls)


