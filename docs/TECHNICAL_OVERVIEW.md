# AethergenAI Technical Overview (Living Document)

Audience: founders, engineers, contributors. This evolves with the codebase.

## 1. System Goals
- Synthetic‑first, evidence‑driven model development for regulated domains.
- Replace brute‑force scaling with ablation‑guided data and lean training.
- Compliance by design: privacy metrics, proofs, and lineage.

## 2. Architecture (MVP)
- Frontend (React + Vite) modules:
  - `SchemaDesigner` → define fields, privacy settings.
  - `SeedDataUploader` → load CSV/JSON; clean (default‑on), validate; generate ZK proofs (dev fallback available).
  - `SyntheticDataGenerator` → local mock generator with ε‑aware noise; optional post‑gen cleaning; telemetry.
  - `AdvancedBenchmarking` → interactive benchmarks + Ablation Recipes (JSON) + adaptation modes (black‑box/grey‑box/white‑box toggles).
  - `ReportingDashboard` → quality/cost/risk + Model Collapse Risk Dial.
- Services:
  - `hreTechnologyService` → hypercube/refractor/harmonic/triad utilities (scaffold).
  - `ablationService` → run recipes locally, aggregate results (+ experimental flags).
- Docs: `docs/` holds whitepaper, dev notes, ablation examples.

## 3. Ablation Recipes
- Type: `src/types/ablation.ts`
  - `ablations[]` support: modules enable/disable, training (modelFilter, precision), privacy (epsilon, synthetic_ratio), repeats.
- Runner: `src/services/ablationService.ts`
  - Executes per‑model benchmarks via `hreTechnologyService`.
  - Aggregates mean metrics; carries `experimentalFlags` into summaries and Ablation Card.
  - Cleaning alignment: `recipe.cleaning.synthetic` and `recipe.cleaning.triadGuided` enable pre‑ablation cleaning and triad‑guided adaptive cleaning.
  - Adaptation alignment: `recipe.adaptation` and per‑ablation `adaptation` choose mode and config:
    - black‑box: `tools[]`, `rag{ sources, embedModel, top_k }`
    - grey‑box: `prompts{ system, task, few_shots, variables }`
    - white‑box: `peft{ method, r, alpha, target_modules, epochs, lr, batch }`
- UI: `AdvancedBenchmarking`
  - Paste/load → Validate → Run; Download JSON/CSV; Download Ablation Card (schema hash, recipe hash, app version, privacy).

## 4. Recursive Adaptation (Prompt/RAG/Tools)
- Prompts: `adaptation.prompts.recursion` supports bounded recursive chains with base/trigger/revert rules; every step is logged for audit.
- Prompt Sandbox: zero-cost heuristic rewrite/unravel/renest for development; local/remote providers can be enabled later.
- RAG/Tools: recursive retrieval when confidence < τ, with depth/time caps.
- White‑box: recursive curriculum for PEFT (future), gated by validation gains and auto‑revert on regressions.

## 5. Data Cleaning
- Service: `src/services/dataCleaningService.ts` with `cleanSeedData`, `cleanSyntheticData`, and `triadGuidedConfig`.
- Seed defaults: schema enforcement, dedupe, IQR outlier capping, ISO dates, PII redact.
- Synthetic: optional post‑gen cleaning before downloads (toggle in UI) and persisted cleaning reports.
- Triad‑guided cleaning (experimental): adapt thresholds using analysis metrics.

## 6. Privacy & Proofs
- Differential privacy (ε) influences generator noise scale.
- Privacy budget manager (ε): per‑project budget + consumed indicator.
- ZK proof workflow: `productionZKProofService` with dev fallback; UI in uploader/generator.
- Live privacy context badges in Reporting, Benchmarks, and Header.

## 7. Innovation Modules (art‑driven, offline‑first)
- AGO Resonant Hypercube (AGO): Tri‑phasic A/G/O controller over the 8D manifold; metrics: AGO coherence, 72° symmetry loss, 432 resonance, 137 stability. UI: Benchmarks → Innovation Metrics.
- 432‑Harmonic Regularizer: Cycle‑of‑fifths prior over field relations; metrics: resonance entropy, cycle closure, off‑grid variance, chord purity. Adaptive amplitude stored as `aeg_432_weight`.
- AUM Certificate: Begin–Sustain–Dissolve quality certificate; metrics: AUM score, sustain smoothness, fade symmetry; pass/fail and `certificateId`.
- 8D Causal Manifold Simulator: ODE‑style smoothness/drift checks; metrics: invariant drift, ODE smoothness, causal plausibility.
- Octonion Hypercomplex Features: Safe split‑octonion mixing; metrics: norm retention, rotation invariance.
- TriCoT Certificates: Triad‑consistent topology certificate with triplet sampling; metrics: `tricotscore`, pass/fail.
- Anticipatory Consistency Index (ACI): Shift‑robustness proxy from subspace heads; outputs `aci` and field sensitivities; used by Autopilot.
- ZK Utility‑Privacy Balance (ZK‑UPB): Evidence‑level constraint proof over ε and uniqueness ratio; `zk_upb_proof`.
- Harmonic Consensus Abstention (HCA): Composite confidence for abstention; metrics: abstain rate, calibrated gain; sparkline over threshold sweep.
  - Fractal Resonance Oracle (FRO): Multiscale variant generation on an 8D harmonic lattice; selects winners via AGO/432/AUM/TriCoT; outputs FRS and mirror evidence.
  - Vacuum Resonance Multiverse Engine (VRME): Vacuum-energy–driven patch evolution over the 8D lattice; recursively generates “galaxies” (synthetic datasets) and collapses via AUM/TriCoT; outputs vacuumScore and multiverse patch history.

Notes
- Toggles for AGO/432 live in Generator. Adaptive weights: `aeg_ago_weight`, `aeg_432_weight`, and toggles `aeg_use_ago`, `aeg_use_432` are persisted.
- Evidence bundles now include training metadata, AGO/432/AUM objects, UPB proof, and adaptive notes.

## 8. Cross‑Domain Data Fusion (experimental)
- Schema Designer includes a mapping UI (source→target).
- Copy mappings as JSON to use in future fusion recipes/pipelines.

## 9. Autopilot
- Search space over ε, synthetic ratio, IQR k; now innovation‑aware.
- Score includes ACI and TriCoT; constraints: min ACI, require TriCoT pass. Outputs Pareto frontier.

## 10. Roadmap → Cloud Beta
- Databricks runner: map recipes to Jobs API; log to MLflow; write datasets to Delta; Unity Catalog for governance.
- Evidence bundles: signed lineage (schema hash, ε, proofs, recipe hash) surfaced in UI. Redacted share bundles for external review.

## 10.5. Marketplace, Billing & Access
- Databricks Marketplace: see `docs/DATABRICKS_MARKETPLACE_PUBLISHER.md` and notebooks `notebooks/publish_csv_to_delta.py`, `notebooks/optimize_and_publish.py` for Delta registration, preview tables, OPTIMIZE/Z‑ORDER, and listing guidance.
- Billing & Platform Access: Stripe Checkout + webhooks with Supabase entitlements (`ae_customers`, `ae_entitlements`), UI gating via `PlatformAccess` and `BuyButtons`. Pricing tiers (datasets, models, predictions, platform) in `docs/BILLING_AND_ACCESS.md`.

## 11. KPIs & Validation
- Utility (task accuracy), privacy (<5% attack success), cost (≥5–10× savings), time‑to‑experiment.
- Use ablations to quantify trade‑offs, include confidence intervals where applicable.

## 12. Glossary (plain English)
- Ablation: A structured experiment where you add/remove/change one factor to see effect on metrics.
- ε (epsilon): Differential privacy budget. Smaller ε = stronger privacy (more noise).
- MoE: Mixture of Experts. A router activates a small subset of model “experts” per input for efficiency.
- Conformal prediction: Method that can abstain or give intervals with a target coverage probability.
- Unity Catalog/Delta/MLflow: Databricks components for governance, tables, and experiment tracking.

## 10. Contributing
- Start with `docs/DEV_NOTES_README.md` for quick orientation.
- Keep changes small and typed; add notes to this file when you introduce a new module, flag, or metric.