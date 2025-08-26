import React from 'react';
import SEO from '../components/SEO';

const Whitepaper: React.FC = () => {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      name: 'AethergenPlatform Whitepaper (v1)',
      headline: 'Evidence-led synthetic data generation and delivery to Databricks',
      url: 'https://auspexi.com/whitepaper',
      datePublished: new Date().toISOString().slice(0, 10),
      author: {
        '@type': 'Organization',
        name: 'Auspexi',
        url: 'https://auspexi.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Auspexi',
        url: 'https://auspexi.com'
      },
      citation: 'https://auspexi.com/brand.json',
      isPartOf: {
        '@type': 'WebSite',
        name: 'AethergenPlatform',
        url: 'https://auspexi.com'
      },
      about: {
        '@type': 'Thing',
        name: 'Synthetic data generation and Databricks workflows'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Whitepaper – AethergenPlatform"
        description="A concise, public whitepaper outlining AethergenPlatform's evidence-led synthetic data approach and Databricks workflows."
        canonical="https://auspexi.com/whitepaper"
        jsonLd={jsonLd}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">AethergenPlatform Whitepaper (v1)</h1>
        <p className="text-slate-700 mb-6">
          This short whitepaper summarizes the platform's approach to synthetic data generation, evidence bundles, and
          delivery to Databricks. It is intentionally concise and links to canonical, machine-readable facts.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">Abstract</h2>
        <p className="text-slate-800 mb-6">
          AethergenPlatform enables privacy-preserving, evidence-led generation of synthetic datasets at scale. Core design
          goals are quality, traceability, and safe deployment to production environments. The system supports self-hosted
          customer compute or fully managed deployments on AWS, and integrates with Databricks for delivery of Delta tables
          with bundled evidence.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">Key Claims</h2>
        <ul className="list-disc ml-6 text-slate-800 mb-6">
          <li>Streaming synthetic data generation architecture tested at high scale (e.g., 1B rows demonstration).</li>
          <li>Evidence bundles: schema hash, generator versioning, ablation tests, and provenance summaries.</li>
          <li>Two deployment modes: Self-Hosted (customer runs compute) and Full-Service AWS (managed by Auspexi).</li>
          <li>Databricks integration: DBFS uploads, Unity Catalog table creation, and Marketplace listing support.</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">Facts and Canonical Sources</h2>
        <p className="text-slate-800">
          See <a href="/ai" className="underline text-blue-600">/ai</a> for the canonical Facts Pack and
          <span> </span>
          <a href="/brand.json" className="underline text-blue-600">/brand.json</a> for a machine-readable brand card.
        </p>
      </div>
    </div>
  );
};

export default Whitepaper;


