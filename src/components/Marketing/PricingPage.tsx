import React from 'react';
import BuyButtons from '../Billing/BuyButtons';

const Card: React.FC<{ title: string; price: string; features: string[]; cta?: React.ReactNode }>=({title, price, features, cta})=>{
  return (
    <div className="border rounded p-6 bg-white flex flex-col">
      <div className="text-lg font-semibold mb-1">{title}</div>
      <div className="text-3xl font-bold mb-4">{price}</div>
      <ul className="mb-4 list-disc pl-5 text-sm text-slate-700 space-y-1">
        {features.map((f)=> <li key={f}>{f}</li>)}
      </ul>
      {cta}
    </div>
  );
};

const PricingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6" id="pricing">
      <h2 className="text-3xl font-bold mb-6 text-center">Pricing</h2>
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
          features={["10M rows/mo", "100 ablations/mo", "2 RPS API", "Autopilot & Benchmarks"]}
          cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_DEVHUB as any} />}
        />
        <Card
          title="Developer Hub Pro"
          price="£499 / $629 seat/mo"
          features={["50M rows/mo", "500 ablations/mo", "5 RPS API", "VRME/FRO extended"]}
          cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_DEVHUB_PRO as any} />}
        />
        <Card
          title="Model Seat"
          price="£149 / $199 seat/mo"
          features={["Access to a niche model", "Per-seat rate", "Evidence-backed"]}
          cta={<BuyButtons modelSeatPriceId={import.meta.env.VITE_PRICE_MODEL_SEAT as any} />}
        />
        <Card
          title="Predictions 100k"
          price="£49 / $59 one-time"
          features={["100k prediction credits", "Usage-based"]}
          cta={<BuyButtons prediction100kPriceId={import.meta.env.VITE_PRICE_PRED_100K as any} />}
        />
      </div>
    </div>
  );
};

export default PricingPage;


