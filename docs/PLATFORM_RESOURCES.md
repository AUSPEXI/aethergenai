### AethergenAI Platform Resources (User Manual)

Audience: data scientists, ML engineers, security/compliance leads.
Goal: operate AethergenAI confidently while protecting AUSPEXI IP.

### 1) Core concepts
- Synthetic first: <3% real data reliance, privacy‑preserving generation
- Evidence‑led: AUM certificate, AGO resonance, 432 harmony, TriCoT topology, ACI, VRME vacuum score
- Modularity: cleaning, generation, ablation, adaptation, training are composable
- Offline‑first: web workers, heuristic modules, optional local LLM via LM Studio

### 2) Key modules (high level)
- AGO Resonant Hypercube: tri‑phasic 8D controller
- 432‑Harmonic Regularizer: harmonic dependency regularization
- AUM Certificate: begin–sustain–dissolve quality check
- 8D Causal Manifold Simulator: neural ODE + symplectic regularization
- Octonion Features: split‑octonion transforms for rotational/periodic signals
- TriCoT: triad‑consistent topology certificates
- ACI: anticipatory consistency under shift
- ZK‑UPB: zk proof of epsilon/uniqueness budget adherence
- HCA v2: harmonic‑consensus abstention
- FRO & VRME: fractal/vacuum resonance variant generation

### 3) Typical workflows
- Design schema → Upload seed → Clean → Generate synthetic → Benchmark/Ablate → Train locally → Package evidence
- Autopilot: set constraints (ε, ACI min, TriCoT pass), budget and trials → get Pareto frontier → Apply to schema
- Reporting: track privacy/utility, collapse risk dial, versioning

### 4) Privacy and compliance
- Privacy budget: manage ε; UI shows consumed/remaining
- Cleaning: type coercion, deduplication, IQR capping, PII scrubbing, outlier detection
- Proofs: zk‑SNARK plausibility; ZK‑UPB scaffold for budget adherence
- Evidence bundles: signed metadata, metrics, proofs, notes

### 5) Databricks publishing
- Use `notebooks/publish_csv_to_delta.py` to load CSV → Delta, register UC table, create preview, attach properties
- Use `notebooks/optimize_and_publish.py` to OPTIMIZE, Z‑ORDER, rebuild preview
- Create Marketplace listing: full + preview tables, evidence, getting‑started notebook

### 6) Billing & access (see `docs/BILLING_AND_ACCESS.md`)
- Products: datasets, models, prediction credits, platform tiers
- Entitlements: Supabase tables (`ae_customers`, `ae_entitlements`), Stripe webhook
- UI: `PlatformAccess` gates features; `BuyButtons` triggers Stripe Checkout

### 7) LM Studio (local LLM)
- Run LM Studio server (OpenAI‑compatible)
- In app, set provider to local; context managed by `llmContextManager.ts`

### 8) Audit trails and versioning
- Version tables by semantic version or date
- Evidence bundles include app version, recipe hash, schema hash, run seed, metrics, proofs
- Maintain CHANGELOG in `docs/` and update `docs/TECHNICAL_OVERVIEW.md`

### 9) Security & IP protection
- SOPS + age for secrets; hardened `.gitignore`; pre‑push IP checks
- No plaintext keys in repo; Netlify envs for runtime
- Marketplace evidence excludes internal algorithm details

### 10) Support & SLAs
- Contact channel listed on Marketplace and docs
- Enterprise SLAs: response times, dataset refresh cadence, audit export support


