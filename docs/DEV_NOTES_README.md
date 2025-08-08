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