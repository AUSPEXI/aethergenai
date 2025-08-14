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
  "cost_analysis": {
    "platform_costs": {
      "compute_time_seconds": 7200,
      "gpu_hours": 2.0,
      "memory_usage_gb": 16.5,
      "total_cost_usd": 24.50,
      "cost_per_record": 0.0000245
    },
    "efficiency_gains": {
      "vs_traditional_training": 0.75,
      "vs_standard_synthetic": 0.60,
      "convergence_speedup": 4.2,
      "cost_savings_percentage": 75,
      "time_savings_percentage": 76
    },
    "roi_analysis": {
      "traditional_training_cost": 98.00,
      "platform_training_cost": 24.50,
      "cost_savings_usd": 73.50,
      "roi_percentage": 300
    }
  },
  "performance_metrics": {
    "training": {
      "epochs": 45,
      "convergence_time_seconds": 7200,
      "final_accuracy": 0.94,
      "model_size_mb": 12.5
    },
    "data_quality": {
      "statistical_fidelity": 0.96,
      "privacy_score": 0.98,
      "utility_score": 0.94
    }
  },
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

### Cost Analysis Fields

#### Platform Costs
- **compute_time_seconds**: Actual training time in seconds
- **gpu_hours**: GPU compute hours used
- **memory_usage_gb**: Peak memory consumption
- **total_cost_usd**: Estimated total cost
- **cost_per_record**: Cost per record processed

#### Efficiency Gains
- **vs_traditional_training**: Cost reduction vs. traditional methods (0.75 = 75% reduction)
- **vs_standard_synthetic**: Cost reduction vs. standard synthetic data (0.60 = 60% reduction)
- **convergence_speedup**: Training speed improvement factor (4.2 = 4.2x faster)
- **cost_savings_percentage**: Overall cost savings percentage
- **time_savings_percentage**: Overall time savings percentage

#### ROI Analysis
- **traditional_training_cost**: Estimated cost using traditional methods
- **platform_training_cost**: Actual cost using AethergenAI platform
- **cost_savings_usd**: Absolute cost savings in USD
- **roi_percentage**: Return on investment percentage

### Performance Metrics

#### Training Performance
- **epochs**: Number of training epochs
- **convergence_time_seconds**: Time to convergence
- **final_accuracy**: Final model accuracy
- **model_size_mb**: Size of trained model

#### Data Quality Metrics
- **statistical_fidelity**: Statistical similarity to original data
- **privacy_score**: Privacy preservation score
- **utility_score**: Data utility score

Signing
- Compute deterministic `sha256` over canonical JSON.
- Optional PGP signature or external KMS signature; attach key ID.

Redaction
- Public sharing removes seeds, PII, and any customer identifiers; retains metrics/hashes only.

Storage
- Store as JSON in your evidence bucket and reference via table property `aethergen.evidence_uri`.


