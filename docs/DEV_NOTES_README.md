# AethergenAI Development Notes (Local MVP)
- Local-only; no Netlify/DB required; port 5174.
- Top tabs: Upload, Schema Design, Generate, Benchmarks, Privacy Metrics, Reporting.
- Reporting contains Model Collapse Risk Dial.

Implemented
- Seed cleaning (default-on): schema/type enforcement, dedupe, IQR capping, PII redact, ISO dates. Toggle “Use cleaned seed data by default” in Upload. Inline cleaning summary.
- Synthetic post-generation cleaning (optional): toggle “Clean synthetic before download” in Generate. Cleans artifacts and persists `cleaning_report` via `/api/record-dataset`.
- Triad toggles in Benchmarks: “Enable Triad Validator (experimental)” and “Triad-guided cleaning (experimental)”. When triad-guided is on, recipes apply adaptive cleaning based on analysis.
- Data-driven analysis metrics (no hard-coded numbers) across benchmarking/analysis.
- Navigation order updated: Upload first, then Schema.
- Adaptation modes added to recipe types: black-box (tools, RAG), grey-box (prompts), white-box (PEFT adapters). UI wiring starting in Benchmarks.
 - Recursive prompt policy scaffold added: bounded depth/attempts, base/trigger/revert/unravel/renest rules. Runner skeleton implemented for future LLM wiring.
- Cost/latency estimator added (local): chips in Generate and Benchmarks; $0 default.
- Drift/Collapse watchdog: uniqueness/entropy guard with auto-tighten of outlier cap.

Capabilities checklist (current)
- Synthetic generation
  - Off‑main‑thread worker; progress streaming; sample preview; 1,000,000 volume cap
  - zk‑SNARK proof scaffold for generation and seed upload; proof download/upload
  - Download JSON/CSV (full records) with optional post‑gen cleaning
- Privacy & cleaning
  - DP ε integrated into noise scale; ε budget indicator in Privacy panel
  - Seed cleaning (schema/type enforce, dedupe, IQR/z‑score, text/dates, PII redact)
  - Synthetic post‑gen cleaning toggle; cleaning reports persisted; auto‑tighten on drift/collapse
  - Privacy Metrics panel with gauges and quick risk badge (placeholder harness)
- Benchmarks & ablations
  - Basic module benchmarks via Netlify function; auto‑scroll to results; estimators
  - Ablation Recipes: modules/training/privacy/repeats; experimental flags; summaries; CSV/JSON; ablation card
  - Evidence bundle export + redacted share (public sample, hashes, ε)
  - Data‑driven analysis metrics (no constants) with explainability tooltips; deterministic per‑model jitter
- Adaptation modes
  - Types for black‑box (tools/RAG), grey‑box (prompts + recursion), white‑box (PEFT adapters)
  - Recursive Prompt Sandbox (zero‑cost heuristic rewrite/unravel/renest) with step viewer
  - RAG confidence gates (BM25‑like heuristic) with recursive retries and caps
- UI/UX
  - Top tabs reordered: Upload → Schema → Generate → Benchmarks → Privacy → Reporting
  - Anchors: stay at top on nav; scroll to results on completion; “Why these numbers?” tooltips
  - Estimator chips (local $0) in Generate/Benchmarks
- Security & IP
  - SOPS + age policy; .gitignore hardened; pre‑push IP check (husky) blocks plaintext/secrets
  - IP protection docs and verification checklist
- Integrations (scaffold)
  - Provider switch (heuristic/local/remote) for prompts (LM Studio/Ollama later)
  - Supabase schema migration scripts (Aethergen‑native); Netlify functions stubs (record‑dataset, ablations, MLflow, etc.)

Commerce & Access
- Stripe endpoints: `create-checkout-session`, `stripe-webhook`; entitlements read via `get-entitlements`.
- Supabase tables: `ae_customers`, `ae_entitlements` for entitlement storage.
- UI components: `BuyButtons`, `PlatformAccess` for checkout and gating.
- Docs: `docs/BILLING_AND_ACCESS.md` for pricing and integration details.

Databricks Marketplace
- Publishing notebooks: `notebooks/publish_csv_to_delta.py`, `notebooks/optimize_and_publish.py`.
- Guide: `docs/DATABRICKS_MARKETPLACE_PUBLISHER.md`.


Ablation Recipes
- Types: `src/types/ablation.ts`
- Runner: `src/services/ablationService.ts`
- Example: `docs/ABLATION_RECIPES_EXAMPLE.json`
- UI: Benchmarks → paste/load JSON → Run Recipe → summary → Download JSON/CSV.

Planned
- Preset loader improvements and optional YAML parser once deps are added.

---

Roadmap (Cutting-edge readiness)

Now (ship in days)
- Databricks bridge (MVP)
  - Netlify function: POST recipe → Databricks Jobs API; stream logs; return MLflow run URL.
  - Log metrics/artifacts to MLflow; write datasets to Delta; register lineage in Unity Catalog.
- Reproducibility & Evidence
  - Persist dataset versions (hash + count + storage_uri).
  - Sign ablation cards; include schema_hash, recipe_hash, app version, DP settings; store in `ae_evidence_bundles`.
- Privacy & Compliance
  - Privacy attack runner (MIA, NN, attribute disclosure) as a function; compact risk dashboard.
  - DP budget manager: track ε across runs per project; warn/limit by policy.
- Benchmarks at scale
  - Ablation grid (concurrency, queue, resumable runs).
  - “Ablation Cards” gallery page: browse, filter, export.
- Developer ergonomics
  - Templates Gallery wired (MoE, FP8/INT8, multi-token, time-series, vision).
  - SDK/CLI (tiny): run recipe, fetch summary, publish evidence.
- Governance basics
  - Project/org scoping; API tokens; audit log of run submissions.

Next (2–4 weeks)
- Model efficiency
  - MoE template with routing toggles; precision sweeps (FP8/INT8) with QAT evaluation.
  - Selective prediction via conformal (coverage targets, abstention rate) and report.
- Cross-domain fusion
  - Schema matcher with constraints; fusion validation and preview of fused datasets.
- Collapse prevention
  - Diversity/novelty/redundancy metrics; threshold alerts; mitigation recipes.
- ZK assertions (dev)
  - Function to verify pipeline assertions (data integrity, lineage hash) with dev proof; external prover later.

Beta hardening
- Unity Catalog lineage: attach schema/dataset/recipe hashes as table/run tags.
- RBAC: viewer/runner/admin; project isolation; secret scopes per project.
- Cost controls: per-run estimate, budget guardrails, queue/schedule windows.
- Observability: jobs/events/metrics; failure notifications (email/webhooks).
- Docs and samples: domain adapters (DICOM, geospatial/time-series, finance), seed datasets, end-to-end examples.

---

Left To Do (Next up)

- Databricks managed delivery
  - Add CI envs and secrets: SITE_URL, DATABRICKS_HOST, DATABRICKS_TOKEN, UC_TABLE.
  - Post-gate CI step: upload full evidence bundle (ZIP) to UC Volume path and write object comments for tables/models (bundle/manifest IDs, OP text).
  - Job wiring: create/schedule Databricks Job for monthly refresh + on-demand “Regenerate Evidence”; emit webhook to PR and incident channel.
  - Incident hooks: on gate breach, create incident record and optional Slack/Teams webhook; link last good bundle.
  - Unity Catalog lineage/tags: attach manifest IDs, OP thresholds, and refresh cadence as object tags.

- Insurance Fraud Playbooks
  - Add Parquet export (and sample Delta conversion notebook) for claims dataset.
  - Flesh out cost curves with measured analyst throughput from scenario runs.
  - Include `playbooks/playbook.yaml` and `metrics/*` in UI-exported ZIP (not just CI script).
  - Demo polish: segment selector (plan/region), typology co-occurrence controls, full CSV/Parquet download.

- Swarm Safety (8D)
  - Visualization: canvas WebGL preview (positions, geofence, violations overlay).
  - Metrics: add geofence violations/time-to-recover and partition stress tests; export `swarm/metrics/*` from UI as well.
  - Isaac Sim harness (placeholder notebooks) for future large-scale sims.

- Evidence & Docs
  - Acceptance template generation in UI exports; keep parity with CI `acceptance.txt`.
  - Resources page: add tiles for Swarm Safety, Insurance Playbooks, and Managed Delivery docs.
  - Blog: ensure cards exist for recent articles and link demos/docs consistently.

8D track (signposted)
- Phase 1: 4–6D geospatial/time-series synthetic backends; ablation of dimensional relevance.
- Phase 2: agent-based sim + octonion/8D embeddings; release gated by ablation evidence.