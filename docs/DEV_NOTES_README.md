# AethergenAI Development Notes (Local MVP)
- Local-only; no Netlify/DB required; port 5174.
- Top tabs: Schema Design, Upload, Generate, Benchmarks, Privacy Metrics, Reporting.
- Reporting contains Model Collapse Risk Dial.

Ablation Recipes
- Types: `src/types/ablation.ts`
- Runner: `src/services/ablationService.ts`
- Example: `docs/ABLATION_RECIPES_EXAMPLE.json`
- UI: Benchmarks → paste/load JSON → Run Recipe → summary → Download JSON/CSV.

Planned
- Thread recipe `privacy.*` fully into generation (partially wired via event).
- Preset loader from `docs/ABLATION_RECIPES_EXAMPLE.json`.
- Optional YAML parser once deps are added.

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

8D track (signposted)
- Phase 1: 4–6D geospatial/time-series synthetic backends; ablation of dimensional relevance.
- Phase 2: agent-based sim + octonion/8D embeddings; release gated by ablation evidence.