import React from 'react';
import BuyButtons from '../Billing/BuyButtons';

const Card: React.FC<{ title: string; price: string; features: string[]; cta?: React.ReactNode; highlight?: boolean; tagline?: string }>=({title, price, features, cta, highlight, tagline})=>{
  return (
    <div className={`rounded-xl p-6 flex flex-col ${highlight ? 'bg-slate-900 text-white neon-card border border-slate-700' : 'bg-white border'}`}>
      <div className="text-lg font-semibold mb-1">{title}</div>
      {tagline && <div className="text-xs mb-1 text-emerald-500 uppercase tracking-wide">{tagline}</div>}
      <div className={`text-3xl font-bold mb-4 ${highlight ? 'text-emerald-300' : ''}`}>{price}</div>
      <ul className={`mb-4 list-disc pl-5 text-sm space-y-1 ${highlight ? 'text-slate-300' : 'text-slate-700'}`}>
        {features.map((f)=> <li key={f}>{f}</li>)}
      </ul>
      {cta}
    </div>
  );
};

const PricingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6" id="pricing">
      <h2 className="text-4xl font-extrabold tracking-tight mb-8 text-center">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Standard Dataset"
          price="£399 / $499 mo"
          features={["Full Delta table", "Preview table free", "Evidence bundle", "Monthly refresh"]}
          cta={<BuyButtons datasetStandardPriceId={import.meta.env.VITE_PRICE_DATASET_STANDARD as any} />}
        />
        <Card
          title="Developer Hub"
          price="£299 / $379 seat/mo"
          tagline="Build-your-own access"
          features={["10M rows/mo", "100 ablations/mo", "2 RPS API", "Autopilot & Benchmarks", "Evidence bundles"]}
          cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_DEVHUB as any} />}
          highlight
        />
        <Card
          title="Developer Hub Pro"
          price="£499 / $629 seat/mo"
          tagline="Advanced access"
          features={["50M rows/mo", "500 ablations/mo", "5 RPS API", "VRME/FRO extended", "Priority queue"]}
          cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_DEVHUB_PRO as any} />}
        />
        <Card
          title="Model Seat"
          price="£149 / $199 seat/mo"
          features={["Access to one niche model", "Per-seat rate", "Evidence-backed" ]}
          cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_MODEL_SEAT as any} />}
        />
        <Card
          title="Predictions 100k"
          price="£49 / $59 one-time"
          features={["100k prediction credits", "Usage-based"]}
          cta={<BuyButtons prediction100kPriceId={import.meta.env.VITE_PRICE_PRED_100K as any} />}
        />
      </div>
      <div className="soft-divider my-10" />
      <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
        <div className="bg-white border rounded p-4">
          <div className="font-semibold mb-2">What’s in a dataset?</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Versioned Delta table + preview</li>
            <li>Evidence bundle (AUM/AGO/432/TriCoT/VRME, ACI)</li>
            <li>Datasheet + getting‑started notebook</li>
          </ul>
        </div>
        <div className="bg-white border rounded p-4">
          <div className="font-semibold mb-2">What’s in Developer Hub?</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Autopilot & Benchmarks</li>
            <li>Synthetic generator with ε control</li>
            <li>Ablation Recipes + evidence export</li>
          </ul>
        </div>
        <div className="bg-white border rounded p-4">
          <div className="font-semibold mb-2">FAQ</div>
          <ul className="list-disc pl-5 space-y-1">
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


