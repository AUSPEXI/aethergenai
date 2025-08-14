import React from 'react';
import BuyButtons from '../Billing/BuyButtons';

type CardTheme = 'dark' | 'light';

const Card: React.FC<{ title: string; price: string; features: string[]; cta?: React.ReactNode; highlight?: boolean; tagline?: string; theme?: CardTheme }>=({title, price, features, cta, highlight, tagline, theme='dark'})=>{
  const isDark = theme === 'dark';
  return (
    <div className={`rounded-xl p-6 flex flex-col h-full ${isDark ? 'bg-slate-900/60 text-white neon-card border border-slate-700' : 'bg-white border'}`}>
      <div className="text-lg font-semibold mb-1">{title}</div>
      {tagline && <div className={`text-xs mb-1 uppercase tracking-wide ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{tagline}</div>}
      <div className={`text-3xl font-bold mb-4 ${isDark ? 'text-emerald-300' : ''}`}>{price}</div>
      <ul className={`mb-4 list-disc pl-5 text-sm space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        {features.map((f)=> <li key={f}>{f}</li>)}
      </ul>
      <div className="mt-auto">{cta}</div>
    </div>
  );
};

const PricingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 text-slate-100" id="pricing">
      <h2 className="text-4xl font-extrabold tracking-tight mb-8 text-center text-slate-100">Pricing</h2>
      
      {/* SMB/Startup Tier */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">SMB & Startup Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card
            title="Small Dataset"
            price="£399 / $499 mo"
            features={["Up to 100K records", "Full Delta table", "Evidence bundle", "Monthly refresh", "Basic support"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
          <Card
            title="Medium Dataset"
            price="£799 / $999 mo"
            features={["Up to 1M records", "Full Delta table", "Evidence bundle", "Monthly refresh", "Priority support"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
          <Card
            title="Large Dataset"
            price="£1,499 / $1,899 mo"
            features={["Up to 10M records", "Full Delta table", "Evidence bundle", "Monthly refresh", "Priority support"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
        </div>
      </div>

      {/* Enterprise Tier */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">Enterprise Plans (Databricks)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card
            title="Enterprise Basic"
            price="£9,999 / $12,999 mo"
            features={["Up to 100M records", "Databricks integration", "Full evidence bundles", "Dedicated support", "Custom compliance"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
            highlight
          />
          <Card
            title="Enterprise Pro"
            price="£24,999 / $31,999 mo"
            features={["Up to 500M records", "Databricks integration", "Full evidence bundles", "Dedicated support", "Custom compliance"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
            highlight
          />
          <Card
            title="Enterprise Ultimate"
            price="£49,999 / $62,999 mo"
            features={["Up to 1B records", "Databricks integration", "Full evidence bundles", "Dedicated support", "Custom compliance"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
            highlight
          />
        </div>
      </div>

      {/* Time Series Data Streams - ALIGNED WITH STATIC PRICING */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">Continuous Data Streams</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card
            title="Basic Stream"
            price="£2,999 / $3,749 mo"
            features={["1M rows/day (30M/month)", "Real-time generation", "Evidence bundles", "Basic storage included", "API access"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
          <Card
            title="Professional Stream"
            price="£7,999 / $9,999 mo"
            features={["10M rows/day (300M/month)", "Real-time generation", "Evidence bundles", "Extended storage", "Priority API access"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
          <Card
            title="Enterprise Stream"
            price="£19,999 / $24,999 mo"
            features={["100M rows/day (3B/month)", "Real-time generation", "Evidence bundles", "Unlimited storage", "Dedicated support"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
        </div>
      </div>

      {/* Storage Add-ons - COST-OPTIMIZED */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">Storage Add-ons</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card
            title="Hot Storage"
            price="£99 / $129 per TB/mo"
            features={["Frequently accessed data", "Fast retrieval", "Real-time analytics", "High availability", "SLA guarantee"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
          <Card
            title="Warm Storage"
            price="£49 / $69 per TB/mo"
            features={["Occasionally accessed data", "Balanced performance", "Cost optimization", "Medium availability", "Standard SLA"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
          <Card
            title="Cold Storage"
            price="£19 / $29 per TB/mo"
            features={["Rarely accessed data", "Maximum cost savings", "Long-term retention", "Basic availability", "Extended SLA"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
        </div>
      </div>

      {/* Model & Development Tiers */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">AI Model & Development</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card
            title="Model Seat"
            price="£149 / $199 seat/mo"
            features={["Access to one niche model", "Per-seat rate", "Evidence-backed", "Basic support"]}
            cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_MODEL_SEAT as any} />}
            theme="dark"
          />
          <Card
            title="Developer Hub"
            price="£299 / $379 seat/mo"
            tagline="Build-your-own access"
            features={["10M rows/mo", "100 ablations/mo", "2 RPS API", "Autopilot & Benchmarks", "Evidence bundles"]}
            cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_DEVHUB as any} />}
            highlight
            theme="dark"
          />
          <Card
            title="Developer Hub Pro"
            price="£499 / $629 seat/mo"
            tagline="Advanced access"
            features={["50M rows/mo", "500 ablations/mo", "5 RPS API", "VRME/FRO extended", "Priority queue"]}
            cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_DEVHUB_PRO as any} />}
            highlight
            theme="dark"
          />
        </div>
      </div>

      {/* Predictions */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">Prediction Credits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card
            title="Predictions 100k"
            price="£49 / $59 one-time"
            features={["100k prediction credits", "Usage-based", "No expiration", "Basic support"]}
            cta={<BuyButtons prediction100kPriceId={import.meta.env.VITE_PRICE_PRED_100K as any} />}
            theme="dark"
          />
          <Card
            title="Predictions 1M"
            price="£399 / $499 one-time"
            features={["1M prediction credits", "Usage-based", "No expiration", "Priority support"]}
            cta={<BuyButtons prediction100kPriceId={import.meta.env.VITE_PRICE_PRED_100K as any} />}
            theme="dark"
          />
          <Card
            title="Predictions 10M"
            price="£2,999 / $3,749 one-time"
            features={["10M prediction credits", "Usage-based", "No expiration", "Dedicated support"]}
            cta={<BuyButtons prediction100kPriceId={import.meta.env.VITE_PRICE_PRED_100K as any} />}
            theme="dark"
          />
        </div>
      </div>

      {/* White Label & Enterprise Solutions */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">White Label & Enterprise Solutions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card
            title="White Label Basic"
            price="£4,999 / $6,249 mo"
            features={["Custom branding", "Up to 50M records/mo", "Basic API access", "Standard support", "Custom compliance"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
          <Card
            title="White Label Pro"
            price="£12,999 / $16,249 mo"
            features={["Custom branding", "Up to 500M records/mo", "Advanced API access", "Priority support", "Custom compliance"]}
            cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
            theme="dark"
          />
          <Card
            title="Enterprise Platform"
            price="Contact Sales"
            features={["Full platform licensing", "Unlimited records", "Custom integrations", "Dedicated team", "SLA guarantees"]}
            cta={<div className="text-center"><button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Contact Sales</button></div>}
            theme="dark"
            highlight
          />
        </div>
      </div>

      <div className="soft-divider my-10" />
      
      {/* Information Cards */}
      <div className="grid md:grid-cols-3 gap-6 text-sm">
        <div className="rounded p-4 bg-slate-900/60 border border-slate-700 neon-card">
          <div className="font-semibold mb-2 text-slate-100">What's in a dataset?</div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Versioned Delta table + preview</li>
            <li>Evidence bundle (AUM/AGO/432/TriCoT/VRME, ACI)</li>
            <li>Cost analysis & ROI metrics</li>
            <li>Datasheet + getting‑started notebook</li>
          </ul>
        </div>
        <div className="rounded p-4 bg-slate-900/60 border border-slate-700 neon-card">
          <div className="font-semibold mb-2 text-slate-100">What's in Developer Hub?</div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Autopilot & Benchmarks</li>
            <li>Synthetic generator with ε control</li>
            <li>Ablation Recipes + evidence export</li>
            <li>Cost tracking & optimization</li>
          </ul>
        </div>
        <div className="rounded p-4 bg-slate-900/60 border border-slate-700 neon-card">
          <div className="font-semibold mb-2 text-slate-100">Enterprise Features</div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Databricks integration ready</li>
            <li>Custom compliance frameworks</li>
            <li>Dedicated support & SLA</li>
            <li>Volume discounts available</li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded p-4 bg-slate-900/60 border border-slate-700 neon-card">
            <div className="font-semibold mb-2 text-slate-100">Pricing & Billing</div>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Cancel anytime; access ends at period close</li>
              <li>Enterprise quotes available for Delta Sharing</li>
              <li>Stripe handles payments; VAT added where applicable</li>
              <li>Volume discounts for enterprise customers</li>
            </ul>
          </div>
          <div className="rounded p-4 bg-slate-900/60 border border-slate-700 neon-card">
            <div className="font-semibold mb-2 text-slate-100">Storage & Data</div>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Storage tiers: Hot, Warm, Cold for cost optimization</li>
              <li>Time series data: Real-time continuous generation</li>
              <li>Evidence bundles: Complete audit trails & compliance</li>
              <li>Cost analysis: ROI metrics & efficiency gains</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;


