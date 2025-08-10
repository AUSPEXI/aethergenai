### Compliance & Audit Guide

Scope: privacy, lineage, and operational auditability for regulated sectors.

Controls
- Differential privacy: ε governance with budget tracking (Privacy panel); evidence records ε.
- Cleaning pipeline: deterministic config and report; evidence includes counts and transforms.
- Lineage hashes: schema_hash, recipe_hash, run_seed included in evidence bundles.
- Proofs: zk‑SNARK plausibility (dev); ZK‑UPB scaffold for budget adherence.
- Model risk: Model Collapse Risk Dial; abstention via HCA; ACI thresholds in Autopilot.

Audit trail procedures
- For each dataset release: attach evidence bundle URI in UC table properties; include README/datasheet.
- For ablations: store ablation card JSON with hashes and metrics; link in reporting.
- For platform use: capture run metadata (time, user/project, parameters) in Supabase (future table `ae_audit_log`).

Sampling & reproducibility
- Always store `run_seed` and date/version; include sample preview table for Marketplace.
- Use `notebooks/optimize_and_publish.py` before each listing refresh; retain previous versions as `vN` tables.

Data subject risk
- No real data shipped; seed handling remains local/offline in MVP. Future: encrypted upload with DP policies.

Incident response
- Revoke shares (Delta Sharing) or delist in Marketplace.
- Rotate Stripe keys and disable webhooks if compromise suspected.
- Issue dataset hotfix with `vN+1` and changelog note.


