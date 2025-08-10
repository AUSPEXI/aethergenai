### Billing, Pricing, and Access Control (Stripe + Netlify + Supabase)

This document outlines how to charge for datasets (Marketplace + direct), platform access (build‑your‑own tiers), models, and prediction credits using Stripe. It also sketches entitlements storage for gating access.

### Pricing (GBP / USD)
- Datasets (Marketplace):
  - Preview: free (1% / 50k rows)
  - Standard: £399 / $499 per workspace monthly (typical 5–50M rows)
  - Enterprise: £25,000 / $30,000 annual via Delta Sharing (50M–1B+ rows, SLA)
- Platform (Build‑Your‑Own):
  - Developer Hub (seat): £299 / $379 monthly
    - Quotas: 10M synthetic rows/month, 100 ablation runs/month, 2 RPS API cap
  - Developer Hub Pro (seat): £499 / $629 monthly
    - Quotas: 50M rows/month, 500 ablation runs/month, 5 RPS, VRME/FRO extended variants
  - Enterprise Platform (team): £2,999 / $3,799 monthly (includes 5 seats; extra seats £199 / $249)
    - Quotas negotiated (e.g., 200M rows/month), SSO, SLA, audit exports
  - Add‑ons:
    - +10M synthetic rows: £49 / $59
    - +100 ablation runs: £39 / $49
- Models for rent (MLflow):
  - Seat: £149 / $199 monthly
- Prediction credits (API):
  - 100k: £49 / $59 (one‑time)
  - 1M: £399 / $499 (one‑time)

Bundles
- Pro Bundle (Dev Hub + 1 Standard Dataset): £599 / $749 monthly

### Stripe products & prices
Create in Stripe Dashboard:
- Products: `Platform: Developer Hub`, `Platform: Developer Hub Pro`, `Platform: Enterprise`, `Dataset: Healthcare v1`, `Model: Claims Fraud v1`, `Prediction Credits`
- Prices (examples; create GBP and USD each):
  - `platform_devhub_monthly_gbp/usd`, `platform_devhubpro_monthly_gbp/usd`, `platform_enterprise_monthly_gbp/usd`
  - `dataset_standard_monthly_gbp/usd`
  - `model_seat_monthly_gbp/usd`
  - `pred_100k_onetime_gbp/usd`, `pred_1m_onetime_gbp/usd`

### Endpoints
- `POST /api/stripe/create-checkout` → creates a Checkout Session
  - body: `{ priceId, quantity?, mode?, customer_email?, success_url?, cancel_url?, metadata? }`
  - returns: `{ url }` (redirect user to Stripe)
- `POST /api/stripe/webhook` → receives Stripe events, updates entitlements (Supabase)
- `GET /api/entitlements?email=...` → returns active entitlements for gating UI/features

### Environment
Set in Netlify (Site → Settings → Environment):
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL` or `SUPABASE_DATABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (for webhook to write entitlements)

### Supabase tables (entitlements)
Add via a migration:
```sql
create table if not exists public.ae_customers (
  id uuid primary key default gen_random_uuid(),
  email text,
  stripe_customer text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ae_entitlements (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.ae_customers(id) on delete cascade,
  stripe_price text,
  quantity int not null default 1,
  subscription_id text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (customer_id, stripe_price)
);
```

### Minimal UI integration
- Button “Buy Standard Dataset” → POST `/api/stripe/create-checkout` with the Price ID
- On success redirect, show “Account” page that reads entitlements (if you add a read endpoint)
- Gate downloads/links based on entitlements
 - For platform access, use `PlatformAccess` and `BuyButtons` components (see `src/components/Billing/`)

### Webhook testing
- In Stripe CLI: `stripe listen --forward-to localhost:8888/api/stripe/webhook`
- Create a test Checkout Session and complete it; verify entitlements written

### Databricks + sales alignment
- Marketplace for discoverability
- Delta Sharing for enterprise deals
- Stripe for direct online sales (models/predictions/credit packs)
 - Platform tiers for builders; keep datasets as separate SKUs to protect value


