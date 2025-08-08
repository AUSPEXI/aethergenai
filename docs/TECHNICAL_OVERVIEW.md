# AethergenAI Technical Overview (Living Document)

Audience: founders, engineers, contributors. This evolves with the codebase.

## 1. System Goals
- Synthetic‑first, evidence‑driven model development for regulated domains.
- Replace brute‑force scaling with ablation‑guided data and lean training.
- Compliance by design: privacy metrics, proofs, and lineage.

## 2. Architecture (MVP)
- Frontend (React + Vite) modules:
  - `SchemaDesigner` → define fields, privacy settings.
  - `SeedDataUploader` → load CSV/JSON; validate; generate ZK proofs (dev fallback available).
  - `SyntheticDataGenerator` → local mock generator with ε‑aware noise; telemetry.
  - `AdvancedBenchmarking` → interactive benchmarks + Ablation Recipes (JSON).
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
- UI: `AdvancedBenchmarking`
  - Paste/load → Validate → Run; Download JSON/CSV; Download Ablation Card (schema hash, recipe hash, app version, privacy).

## 4. Privacy & Proofs
- Differential privacy (ε) influences generator noise scale.
- ZK proof workflow: `productionZKProofService` with dev fallback; UI in uploader/generator.
- Live privacy context badges in Reporting, Benchmarks, and Header.

## 5. Experimental Modules (behind toggles)
- Frequency Harmonics Layer: resonance features for periodic data.
- Consensus Audit Ensemble: outlier/bias detection via ensemble.
- Selective Prediction (Abstention): calibrated abstain on low confidence.
- Injected as `experimental_modules` in recipes for traceability.

## 6. Cross‑Domain Data Fusion (experimental)
- Schema Designer includes a mapping UI (source→target).
- Copy mappings as JSON to use in future fusion recipes/pipelines.

## 7. Roadmap → Cloud Beta
- Databricks runner: map recipes to Jobs API; log to MLflow; write datasets to Delta; Unity Catalog for governance.
- Evidence bundles: signed lineage (schema hash, ε, proofs, recipe hash) surfaced in UI.

## 8. KPIs & Validation
- Utility (task accuracy), privacy (<5% attack success), cost (≥5–10× savings), time‑to‑experiment.
- Use ablations to quantify trade‑offs, include confidence intervals where applicable.

## 9. Glossary (plain English)
- Ablation: A structured experiment where you add/remove/change one factor to see effect on metrics.
- ε (epsilon): Differential privacy budget. Smaller ε = stronger privacy (more noise).
- MoE: Mixture of Experts. A router activates a small subset of model “experts” per input for efficiency.
- Conformal prediction: Method that can abstain or give intervals with a target coverage probability.
- Unity Catalog/Delta/MLflow: Databricks components for governance, tables, and experiment tracking.

## 10. Contributing
- Start with `docs/DEV_NOTES_README.md` for quick orientation.
- Keep changes small and typed; add notes to this file when you introduce a new module, flag, or metric.