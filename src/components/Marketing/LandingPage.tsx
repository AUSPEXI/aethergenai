import React from 'react';

const CTAButton: React.FC<{ label: string; tab: 'pricing' | 'resources' }>=({ label, tab })=> {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('aeg:navigate', { detail: { tab } }))}
      className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-colors ${tab==='pricing' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
    >{label}</button>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="inline-block rounded-2xl px-4 py-1 text-sm bg-emerald-900/30 text-emerald-300 mb-4 neon-ring">Evidence‑led. Privacy‑preserving. Databricks‑ready.</div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          AethergenAI — Evidence‑Led Synthetic Data & Model Platform
        </h1>
        <p className="text-slate-300 max-w-3xl mx-auto mb-10">
          Generate high‑fidelity synthetic datasets, validate with AUM/AGO/432/TriCoT/VRME, and publish to Databricks Marketplace. Build specialised models with Autopilot and ablation—faster than brute force, safer than real data.
        </p>
        <div className="flex gap-4 justify-center">
          <CTAButton label="View Pricing" tab="pricing" />
          <CTAButton label="Explore Resources" tab="resources" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-6">
        {[{
          t: 'Synthetic First', d: 'Scale to tens of millions of rows locally; DP ε control and cleaning built‑in.'
        },{
          t: 'Auditable Evidence', d: 'AUM certificate, AGO resonance, 432 harmony, TriCoT, ACI, VRME—bundled per release.'
        },{
          t: 'Databricks Ready', d: 'Delta tables + preview, OPTIMIZE/Z‑ORDER, Unity Catalog properties, Marketplace listings.'
        }].map(({t,d}) => (
          <div key={t} className="rounded-xl p-6 bg-slate-900/60 border border-slate-700 neon-card">
            <div className="text-lg font-semibold mb-2 text-emerald-300">{t}</div>
            <p className="text-sm text-slate-300">{d}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;


