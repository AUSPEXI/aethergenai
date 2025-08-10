### Evidence Bundle Specification

Purpose: provide an auditable, signed snapshot of data generation, cleaning, ablation, and innovation metrics without exposing proprietary code.

Top-level fields (example)
```json
{
  "version": "1.0",
  "generated_at": "2025-08-10T12:00:00Z",
  "app_version": "2.0.0",
  "schema_hash": "...",
  "recipe_hash": "...",
  "run_seed": 12345,
  "privacy": { "epsilon": 0.1, "synthetic_ratio": 0.98 },
  "cleaning": { "rows_removed": 0, "deduped": 10, "outliers_capped": 55, "pii_redacted": 5, "missing_imputed": 12 },
  "metrics": {
    "ago": { "coherence": 0.91, "symmetry_loss": 0.07, "resonance": 0.74, "stability": 0.83 },
    "harmonic432": { "resonance_entropy": 0.62, "cycle_closure": 0.88, "off_grid_var": 0.11, "chord_purity": 0.81 },
    "aum": { "score": 0.86, "smoothness": 0.79, "symmetry": 0.84, "pass": true, "certificateId": "aum-..." },
    "causal8d": { "invariant_drift": 0.09, "ode_smoothness": 0.91, "causal_plausibility": 0.78 },
    "octonion": { "invariance": 0.73, "energy_retention": 0.85 },
    "tricotscore": 0.82,
    "aci": 0.77,
    "zk_upb": { "present": true, "epsilon_bound": 0.2, "uniqueness_min": 0.95 },
    "hca": { "abstain_rate": 0.06, "calibrated_gain": 0.11 },
    "fro": { "frs": 0.69 },
    "vrme": { "vacuumScore": 0.71 }
  },
  "training": { "backend": "sklearn", "target": "label", "task": "classification", "params": { "max_depth": 6 } },
  "notes": { "use_ago": true, "use_432": true, "ago_weight": 0.4, "harm432_weight": 0.3 },
  "signatures": { "sha256": "...", "pgp": null }
}
```

Signing
- Compute deterministic `sha256` over canonical JSON.
- Optional PGP signature or external KMS signature; attach key ID.

Redaction
- Public sharing removes seeds, PII, and any customer identifiers; retains metrics/hashes only.

Storage
- Store as JSON in your evidence bucket and reference via table property `aethergen.evidence_uri`.


