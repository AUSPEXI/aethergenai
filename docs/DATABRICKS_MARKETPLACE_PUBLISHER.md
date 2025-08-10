### AethergenAI → Databricks Marketplace Publisher (Quick Guide)

This guide ships a synthetic dataset from AethergenAI into Delta tables, registers them in Unity Catalog, and creates Marketplace‑ready assets (preview table, profile). Use alongside the notebook in `notebooks/publish_csv_to_delta.py`.

### Prerequisites
- Unity Catalog–enabled workspace and metastore admin (or equivalent permissions)
- Storage Credential + External Location with access to your bucket (e.g., `s3://aethergen-datasets/`)
- Your exported CSV/JSON files uploaded to a “landing” bucket (e.g., `s3://aethergen-landing/healthcare_v1/`)

### Recommended layout
- Catalog: `aethergen`
- Schemas by domain: `public`, `healthcare`, `logistics`, `retail`
- Tables: `{domain}_synth_v{N}` or date‑versioned `vYYYYMMDD`
- Evidence: `s3://aethergen-datasets/evidence/{dataset}.json`

### One‑time UC setup (example for AWS)
```sql
CREATE STORAGE CREDENTIAL aethergen_cred
  WITH CLOUD_ROLE 'arn:aws:iam::123456789012:role/aethergen-s3-role';

CREATE EXTERNAL LOCATION aethergen_loc
  URL 's3://aethergen-datasets/'
  WITH STORAGE CREDENTIAL aethergen_cred;
```

### Use the Publisher notebook
1) In Databricks, import `notebooks/publish_csv_to_delta.py` as a notebook.
2) Set widgets:
   - `dataset_name`: e.g., `healthcare_synth_v1`
   - `landing_uri`: where CSVs are (e.g., `s3://aethergen-landing/healthcare_v1/*.csv`)
   - `delta_base_uri`: e.g., `s3://aethergen-datasets`
   - `catalog_name` / `schema_name`: e.g., `aethergen` / `public`
   - `epsilon` / `synthetic_ratio` (for properties)
   - `evidence_uri`: e.g., `s3://aethergen-datasets/evidence/healthcare_v1.json`
   - `preview_percent`: 1–5 is typical
3) Run all cells. It will:
   - Load CSV → write Delta under `{delta_base_uri}/{dataset_name}/`
   - Register `catalog.schema.dataset_name` table
   - Add UC comment + properties (ε, synthetic_ratio, evidence_uri)
   - Create `{dataset_name}_preview` via TABLESAMPLE
   - Generate a summary profile JSON and write to `evidence_uri`

### Marketplace listing checklist
- Tables: full + preview
- Evidence bundle: AUM/AGO/432/TriCoT/VRME metrics, ε, cleaning report
- “Getting Started” notebook: EDA + baseline training
- Data sheet: field dictionary, version, refresh cadence, KPIs
- License/terms: synthetic data permitted uses; no re‑ID
- Support: email/contact, SLA, changelog

### Optional: Delta Sharing for pilots
```sql
CREATE SHARE aethergen_healthcare_v1;
ALTER SHARE aethergen_healthcare_v1 ADD TABLE aethergen.public.healthcare_synth_v1;
CREATE RECIPIENT acme_inc;
GRANT SELECT ON SHARE aethergen_healthcare_v1 TO RECIPIENT acme_inc;
```

### Notes
- If `dbutils.fs.put(evidence_uri, ...)` fails (permissions), the notebook writes a DBFS fallback and prints the path. Copy that JSON to your evidence bucket.
- For JSON/Parquet inputs, swap the reader in the notebook accordingly.


