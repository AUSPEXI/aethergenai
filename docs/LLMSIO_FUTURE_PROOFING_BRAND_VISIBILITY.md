LLMSIO: Future‑Proofing Brand Visibility (Internal)

Status: living internal playbook. Do not publish externally.

Goals
- Make AethergenPlatform easy for LLMs/RAG systems to identify, disambiguate, and cite.
- Provide canonical, versioned, machine‑readable facts; reduce hallucinations.
- Establish repeatable processes to reinforce brand authority over time.

Implemented (Aug 2025)
1) Canonical AI page (/ai)
- Facts Pack (v1): concise, unambiguous facts; stable anchors (#facts, #disambiguation, #corrections)
- Disambiguation and Corrections sections
- JSON‑LD: AboutPage + Organization
- Internal links from footer and sitemap priority

2) Machine‑readable brand files
- /brand.json (brand card)
- /.well-known/brand.json (pointer)
- /.well-known/ai.json (non‑standard helper)
- /llms.txt (non‑standard hints)

3) SEO/Discovery alignment
- robots.txt: Allow: /
- sitemap.xml: added /ai
- Footer link to /ai

4) Evidence posture everywhere
- Tone sweep to evidence‑led copy; avoid unverifiable claims
- Press/Pricing/Technology/About adjusted to verifiable facts

Next Wins (Planned)
- Add Product/Dataset JSON‑LD on key pages (Pricing/Technology/Press) to describe datasets/models with evidence links
- ClaimReview JSON‑LD blocks on /ai to fact‑check common misconceptions (1–3 concise items)
- GitHub “brand” repo mirroring /brand.json and linking to auspexi.com
- Whitepaper (SSRN/arXiv) with a Facts section identical to /ai; cite DOI on /ai
- Structured FAQ JSON on /ai for Answer Engine Optimization

Operational Cadence
- Update /brand.json and /ai facts on material changes; bump version and lastUpdated
- Keep statements short, dated, and link evidence (Resources → Evidence Bundles)
- Monitor mentions (Google Alerts, social); add clarifications to /ai Corrections

Guardrails
- No proprietary code/parameters; no forward‑looking promises; evidence over hype
- Keep anchors and endpoints stable; prefer additive edits

Appendix: Endpoint Summary
- https://auspexi.com/ai
- https://auspexi.com/brand.json
- https://auspexi.com/.well-known/brand.json
- https://auspexi.com/.well-known/ai.json
- https://auspexi.com/llms.txt


