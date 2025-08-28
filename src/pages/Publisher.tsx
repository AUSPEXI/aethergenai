import React, { useEffect, useMemo, useState } from 'react'
import SEO from '../components/SEO'
import { generateLinkedInDraft, generateReplyDraft } from '../services/socialPublisherService'

const Publisher: React.FC = () => {
	const [title, setTitle] = useState('From Starlings to Swarms: 8D Safety for Thousands of Drones')
	const [url, setUrl] = useState('https://auspexi.com/blog/from-starlings-to-swarms-8d-safety')
	const [keyPoints, setKeyPoints] = useState('8D state; Safety (CBF/RTA); Evidence bundles; Offline edge deployment')
	const [cta, setCta] = useState('Military and safety‑critical pilots welcome. Evidence on request.')
	const [keywords, setKeywords] = useState('synthetic data, evidence-led, safety, drones, edge AI, MoD')
	const [scheduledAt, setScheduledAt] = useState<string>('')
  const [library, setLibrary] = useState<any[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string>('')
  const [replyUrl, setReplyUrl] = useState('')
  const [replyAngle, setReplyAngle] = useState<'appreciation'|'insight'|'question'>('insight')
  const [replyPoints, setReplyPoints] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/blog-library/manifest.json')
        if (res.ok) {
          const js = await res.json()
          setLibrary(Array.isArray(js) ? js : (js.posts || []))
        }
      } catch {}
    })()
  }, [])

	const draft = useMemo(() => generateLinkedInDraft({
		title,
		url,
		keyPoints: keyPoints.split(';').map(s=>s.trim()).filter(Boolean),
		cta,
		seoKeywords: keywords.split(',').map(s=>s.trim()).filter(Boolean),
	}), [title, url, keyPoints, cta, keywords])

	return (
		<div className="min-h-screen bg-white">
			<SEO
				title="Publisher – Social Drafts"
				description="Generate safe, evidence-led social posts directly from site content."
				canonical="https://auspexi.com/publisher"
				jsonLd={{ '@context':'https://schema.org', '@type':'CreativeWork', name:'Publisher' }}
			/>
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-slate-900 mb-6">Publisher</h1>
				<p className="text-slate-800 mb-6">Create LinkedIn drafts from your pages while protecting IP and tone.</p>
				<div className="space-y-4">
					<div className="flex gap-2 items-center">
						<select className="border rounded px-3 py-2 text-slate-900 bg-white" value={selectedSlug} onChange={e=>{
							const slug = e.target.value; setSelectedSlug(slug)
							const found = library.find(x=>x.slug===slug)
							if (found) {
								setTitle(found.title)
								setUrl(`https://auspexi.com/blog/${found.slug}`)
							}
						}}>
							<option value="">Pick draft from library…</option>
							{library.map(item=> (
								<option key={item.slug} value={item.slug}>{item.title}</option>
							))}
						</select>
						<button className="px-3 py-2 border rounded text-slate-900" onClick={async ()=>{
							if (!selectedSlug) return
							const res = await fetch(`/blog-library/${selectedSlug}.json`)
							if (!res.ok) return
							const j = await res.json()
							// schedule blog publish
							if (!scheduledAt) { alert('Pick a schedule time'); return }
							const r2 = await fetch('/.netlify/functions/blog-queue', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ slug: j.slug, title: j.title, excerpt: j.summary || j.excerpt, contentHtml: j.contentHtml || j.bodyMd || j.body, scheduledAt }) })
							alert(r2.ok ? 'Blog queued' : `Failed: ${await r2.text()}`)
						}}>Queue Blog</button>
					</div>
					<input className="w-full border rounded px-3 py-2 text-slate-900 placeholder-slate-500" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
					<input className="w-full border rounded px-3 py-2 text-slate-900 placeholder-slate-500" value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL" />
					<input className="w-full border rounded px-3 py-2 text-slate-900 placeholder-slate-500" value={keyPoints} onChange={e=>setKeyPoints(e.target.value)} placeholder="Key points (semicolon‑separated)" />
					<input className="w-full border rounded px-3 py-2 text-slate-900 placeholder-slate-500" value={cta} onChange={e=>setCta(e.target.value)} placeholder="Call to action" />
					<input className="w-full border rounded px-3 py-2 text-slate-900 placeholder-slate-500" value={keywords} onChange={e=>setKeywords(e.target.value)} placeholder="Keywords (comma‑separated)" />
					<div className="flex gap-2 text-sm">
						<button className="px-3 py-2 border rounded text-slate-900" onClick={()=>{
							// UK next Tue 09:00 local
							const d = new Date(); const day = d.getDay(); const add = (2 - day + 7) % 7 || 7; d.setDate(d.getDate()+add); d.setHours(9,0,0,0);
							setScheduledAt(d.toISOString().slice(0,16))
						}}>UK Tue 09:00</button>
						<button className="px-3 py-2 border rounded text-slate-900" onClick={()=>{
							// US ET next Tue 09:00 (~UTC-5 winter). Adjust roughly by -5h.
							const d = new Date(); const day = d.getDay(); const add = (2 - day + 7) % 7 || 7; d.setDate(d.getDate()+add); d.setHours(14,0,0,0); // 09:00 ET ≈ 14:00 UTC
							setScheduledAt(d.toISOString().slice(0,16))
						}}>US ET Tue 09:00</button>
					</div>
				</div>
				<div className="mt-8 bg-white border border-slate-200 rounded p-4">
					<h2 className="text-lg font-semibold text-slate-900 mb-3">LinkedIn Draft</h2>
					<p className="font-semibold mb-2 text-slate-900">{draft.headline}</p>
					<pre className="whitespace-pre-wrap text-sm text-slate-900">{draft.body}</pre>
					<p className="mt-3 text-sm text-slate-800">{draft.hashtags}</p>
					<div className="mt-4 flex gap-3 flex-wrap items-center">
						<a href={draft.shareUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-blue-600 text-white">Open LinkedIn Share</a>
						<button
							onClick={() => navigator.clipboard.writeText(`${draft.headline}\n\n${draft.body}\n\n${draft.hashtags}`)}
							className="px-4 py-2 rounded bg-slate-800 text-white"
						>
							Copy Draft
						</button>
						<a href="/.netlify/functions/linkedin-start" className="px-4 py-2 rounded bg-emerald-600 text-white">Connect LinkedIn</a>
						<button
							onClick={async ()=>{
								const res = await fetch('/.netlify/functions/linkedin-publish', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text: `${draft.headline}\n\n${draft.body}\n\n${draft.hashtags}`, url }) })
								alert(res.ok ? 'Published (if connected)' : `Failed: ${await res.text()}`)
							}}
							className="px-4 py-2 rounded bg-emerald-700 text-white"
						>
							Publish (LinkedIn)
						</button>
						<input type="datetime-local" value={scheduledAt} onChange={e=>setScheduledAt(e.target.value)} className="px-3 py-2 border rounded text-slate-900" />
						<button
							onClick={async ()=>{
								if (!scheduledAt) { alert('Pick a schedule time'); return }
								const res = await fetch('/.netlify/functions/social-queue', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text: `${draft.headline}\n\n${draft.body}\n\n${draft.hashtags}`, url, scheduledAt }) })
								alert(res.ok ? 'Queued' : `Failed: ${await res.text()}`)
							}}
							className="px-4 py-2 rounded bg-slate-700 text-white"
						>
							Queue (Scheduled)
						</button>
					</div>
					<p className="mt-4 text-xs text-slate-800">Safety: sanitized for hype and IP terms. Edit as needed before posting.</p>
				</div>
				<div className="mt-8 bg-white border border-slate-200 rounded p-4">
					<h2 className="text-lg font-semibold text-slate-900 mb-3">Reply Assistant</h2>
					<div className="grid gap-3 sm:grid-cols-2">
						<input className="w-full border rounded px-3 py-2 sm:col-span-2 text-slate-900 placeholder-slate-500" placeholder="Target LinkedIn post URL" value={replyUrl} onChange={e=>setReplyUrl(e.target.value)} />
						<select className="border rounded px-3 py-2 text-slate-900 bg-white" value={replyAngle} onChange={e=>setReplyAngle(e.target.value as any)}>
							<option value="appreciation">Appreciation</option>
							<option value="insight">Insight</option>
							<option value="question">Question</option>
						</select>
						<input className="w-full border rounded px-3 py-2 text-slate-900 placeholder-slate-500" placeholder="Talking points (semicolon‑separated)" value={replyPoints} onChange={e=>setReplyPoints(e.target.value)} />
					</div>
					<div className="mt-4 flex gap-3 flex-wrap items-center">
						<button className="px-4 py-2 rounded bg-slate-800 text-white" onClick={()=>{
							if (!replyUrl) { alert('Add a LinkedIn post URL'); return }
							const draft = generateReplyDraft({ targetUrl: replyUrl, angle: replyAngle, points: replyPoints.split(';').map(s=>s.trim()).filter(Boolean) })
							navigator.clipboard.writeText(draft.comment)
							window.open(draft.openUrl, '_blank')
						}}>Copy Reply & Open Post</button>
					</div>
					<p className="mt-4 text-xs text-slate-800">Manual posting preserves account integrity and follows platform policies. Keep it concise, non‑promotional, and relevant.</p>
				</div>
			</div>
		</div>
	)
}

export default Publisher


