type DraftInput = {
	title: string
	url: string
	keyPoints?: string[]
	cta?: string
	seoKeywords?: string[]
	techLens?: string
	contextSnippets?: Array<{ title: string; summary?: string; url?: string; tags?: string[] }>
}

type DraftOutput = {
	headline: string
	body: string
	hashtags: string
	shareUrl: string
}

// Simple sanitizer to avoid disclosing IP: strips sensitive terms and hype
function sanitize(text: string): string {
	const banned = [
		'proprietary algorithm', 'source code', 'trade secret', 'miracle', 'consciousness', 'AGI',
	]
	let out = text
	for (const b of banned) {
		const re = new RegExp(b, 'ig')
		out = out.replace(re, '')
	}
	return out.replace(/\s{2,}/g, ' ').trim()
}

export function generateLinkedInDraft(input: DraftInput): DraftOutput {
	const title = sanitize(input.title)
	const url = input.url
	const cta = sanitize(input.cta || 'Read the case study and get in touch.')
	const lens = sanitize(input.techLens || '')
	// Deduplicate context by title and trim summaries
	const seen = new Set<string>()
	const context = (input.contextSnippets || []).filter(c => {
		const t = (c.title || '').trim()
		if (!t || seen.has(t)) return false
		seen.add(t)
		return true
	}).slice(0, 2)
	const ctxLines = context.map(c => {
		const t = sanitize(c.title || '')
		let s = sanitize(c.summary || '')
		if (s.startsWith(t)) s = s.slice(t.length).trim()
		if (s.length > 140) s = s.slice(0, 139) + '…'
		return `• ${t}${s ? ` — ${s}` : ''}`
	})
	const points = (input.keyPoints || []).slice(0, 3).map(p => `• ${sanitize(p)}`)
	const kw = (input.seoKeywords || ['synthetic data','evidence-led','edge AI','privacy']).slice(0, 6)
	const hashtags = '#AethergenPlatform ' + kw.map(k => '#' + k.replace(/\s+/g,'')).join(' ')
	const headline = `${title} — Evidence‑Led and Built for Regulated Environments`
	const body = [
		lens ? `Perspective: ${lens}` : 'Quick take:',
		...points,
		...(ctxLines.length ? ['Context:', ...ctxLines] : []),
		'',
		cta,
		url,
	].join('\n')
	const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
	return { headline, body, hashtags, shareUrl }
}

export function generateReplyDraft(opts: { targetTitle?: string, targetUrl: string, angle?: 'appreciation'|'insight'|'question', points?: string[] }) {
  const angle = opts.angle || 'insight'
  const pts = (opts.points || []).slice(0, 2).map(p=> sanitize(p))
  const blocks: Record<string, string> = {
    appreciation: `Appreciate this share — practical and relevant. ${pts.join(' · ')}`,
    insight: `Useful perspective. Adding a small observation: ${pts.join(' · ')}`,
    question: `Interesting take — curious how you see this in regulated settings? ${pts.join(' · ')}`,
  }
  const text = blocks[angle]
  return {
    comment: text,
    openUrl: opts.targetUrl,
  }
}


