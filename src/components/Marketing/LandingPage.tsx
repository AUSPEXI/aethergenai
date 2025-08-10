import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">AethergenAI — Evidence‑Led Synthetic Data & Model Platform</h1>
        <p className="text-slate-700 mb-6">Build, validate, and publish with AUM/AGO/432/TriCoT/VRME evidence. Faster than brute force, safer than real data.</p>
        <div className="flex gap-3 justify-center">
          <a href="#pricing" className="px-5 py-3 rounded bg-blue-600 text-white">View Pricing</a>
          <a href="#resources" className="px-5 py-3 rounded bg-slate-700 text-white">Explore Resources</a>
        </div>
      </section>
      <section className="max-w-7xl mx-auto p-8 grid md:grid-cols-3 gap-6">
        {["Synthetic First", "Evidence Bundles", "Databricks Ready"].map((t) => (
          <div key={t} className="border rounded p-6">
            <div className="text-lg font-semibold mb-2">{t}</div>
            <p className="text-sm text-slate-700">High‑fidelity synthetic data, auditable metrics, and Marketplace‑ready Delta tables.</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;


