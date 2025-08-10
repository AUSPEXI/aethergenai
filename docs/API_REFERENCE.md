### AethergenAI API Reference (Public Endpoints)

Base: browser app via Netlify. All endpoints proxied under `/api/*`.

Notes
- Offline mode disables remote calls in the app.
- Some endpoints require Netlify env vars (Supabase, Stripe).

Auth
- Current MVP: public endpoints with demo‑open read policies for selected tables. Production should add auth tokens and project scoping.

Endpoints
- GET `/refresh-stats`
  - Purpose: fetch aggregate counts via Supabase RPC.
  - Returns: `{ schemas: number, datasets: number, ablations: number, evidence: number }`

- POST `/api/store-schema`
  - Purpose: insert/update schema in `ae_schemas`.
  - Body: `{ id?: string, name: string, fields: Field[], privacy: {...}, version?: string }`
  - Returns: `{ id: string }`

- POST `/api/record-dataset`
  - Purpose: record dataset metadata in `ae_datasets`.
  - Body: `{ schema_id?: string, rows: number, cleaning_report?: {...}, storage_uri?: string }`
  - Returns: `{ id: string }`

- POST `/api/record-ablation`
  - Purpose: record ablation run details in `ae_ablation_runs`.
  - Body: `{ recipe: {...}, summary: {...}, metrics: {...} }`
  - Returns: `{ id: string }`

- POST `/api/publish-evidence`
  - Purpose: store evidence bundles in `ae_evidence_bundles`.
  - Body: see `docs/EVIDENCE_BUNDLE_SPEC.md`
  - Returns: `{ id: string, hash: string }`

- POST `/api/log-mlflow`
  - Purpose: log ablation/benchmark results to Databricks MLflow (when configured).
  - Body: `{ experiment: string, run: {...}, artifacts?: {...} }`
  - Returns: `{ ok: boolean, run_url?: string }`

- POST `/api/stripe/create-checkout`
  - Purpose: create Stripe Checkout session.
  - Body: `{ priceId: string, mode?: 'payment'|'subscription', quantity?: number, customer_email?: string, success_url?: string, cancel_url?: string, metadata?: {...} }`
  - Returns: `{ url: string }`

- POST `/api/stripe/webhook`
  - Purpose: Stripe event receiver; writes entitlements into Supabase.
  - Headers: `stripe-signature`
  - Body: Stripe event payload (raw JSON)
  - Returns: `{ received: true }`

- GET `/api/entitlements?email=...` or `?stripe_customer=...`
  - Purpose: fetch active entitlements.
  - Returns: `{ entitlements: [{ stripe_price, quantity, subscription_id, active, updated_at }] }`

Status codes
- 200 success, 4xx client input errors, 5xx server/config issues.

Security
- Move to authenticated endpoints and project‑scoped RBAC before production.
- Never pass secrets from browser; use Netlify functions with env vars.


