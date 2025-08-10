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
      {/* Top row of three aligned cards (Datasets/Seats/Credits) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <Card
          title="Standard Dataset"
          price="£399 / $499 mo"
          features={["Full Delta table", "Preview table free", "Evidence bundle", "Monthly refresh"]}
          cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
          theme="dark"
        />
        <Card
          title="Model Seat"
          price="£149 / $199 seat/mo"
          features={["Access to one niche model", "Per-seat rate", "Evidence-backed" ]}
          cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_MODEL_SEAT as any} />}
          theme="dark"
        />
        <Card
          title="Predictions 100k"
          price="£49 / $59 one-time"
          features={["100k prediction credits", "Usage-based"]}
          cta={<BuyButtons prediction100kPriceId={import.meta.env.VITE_PRICE_PRED_100K as any} />}
          theme="dark"
        />
      </div>
      {/* Row of two centered under the three (Elevated tiers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch md:max-w-4xl mx-auto mt-6">
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
      <div className="soft-divider my-10" />
      <div className="grid md:grid-cols-3 gap-6 text-sm">
        <div className="rounded p-4 bg-slate-900/60 border border-slate-700 neon-card">
          <div className="font-semibold mb-2 text-slate-100">What’s in a dataset?</div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Versioned Delta table + preview</li>
            <li>Evidence bundle (AUM/AGO/432/TriCoT/VRME, ACI)</li>
            <li>Datasheet + getting‑started notebook</li>
          </ul>
        </div>
        <div className="rounded p-4 bg-slate-900/60 border border-slate-700 neon-card">
          <div className="font-semibold mb-2 text-slate-100">What’s in Developer Hub?</div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Autopilot & Benchmarks</li>
            <li>Synthetic generator with ε control</li>
            <li>Ablation Recipes + evidence export</li>
          </ul>
        </div>
        <div className="rounded p-4 bg-slate-900/60 border border-slate-700 neon-card">
          <div className="font-semibold mb-2 text-slate-100">FAQ</div>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Cancel anytime; access ends at period close</li>
            <li>Enterprise quotes available for Delta Sharing</li>
            <li>Stripe handles payments; VAT added where applicable</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;


