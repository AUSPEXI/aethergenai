import React from 'react'
import { Link } from 'react-router-dom'

const QA: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: 'Platform vs Enterprise? What am I buying?',
    a: (
      <>
        <p className="mb-2"><b>Platform (Tools)</b>: generator, schema designer, benchmarks, evidence export. Great for prototyping, demos, and internal R&D.</p>
        <p><b>Enterprise (Managed on Databricks)</b>: we operate compute on your Databricks and deliver datasets/models in Unity Catalog with SLAs and signed evidence.</p>
      </>
    )
  },
  {
    q: 'Illustrative vs Production‑calibrated outputs?',
    a: (
      <>
        <p className="mb-2"><b>Illustrative</b> (pre‑calibration): simulation with guardrails for exploration and demos.</p>
        <p><b>Production‑calibrated</b>: calibrated with anchors or ZKP seeds and must pass acceptance gates (utility, privacy, drift). Delivered with evidence.</p>
      </>
    )
  },
  {
    q: 'Do we need real data to calibrate?',
    a: (
      <>
        <p>No raw rows. Provide <b>anchor bundles</b> (DP aggregates, histograms/quantiles, correlations, tails, segment mixes) or upload <b>ZKP‑protected seeds</b>. Both paths avoid exposing raw data to us.</p>
      </>
    )
  },
  {
    q: 'Why use the Schema Designer if we already have anchors?',
    a: (
      <>
        <p>The schema is the <b>contract</b>: ontology, units, constraints, lineage, policy gates. It unifies multiple systems, enables counterfactuals, and governs new scenarios safely.</p>
      </>
    )
  },
  {
    q: 'What is in the evidence bundle?',
    a: (
      <>
        <p>Signed JSON with provenance, privacy probes (ε/δ, re‑id, attribute, MI), utility (KS/TV/task), ablations, and checksums. See <Link to="/resources">Resources</Link>.</p>
      </>
    )
  },
  {
    q: 'How are Unity Catalog deliveries set up?',
    a: (
      <>
        <p>We create/verify Catalog/Schema/Volumes in your UC, stage assets, set grants/tags, and attach evidence. You retain ownership; we operate under change control.</p>
      </>
    )
  },
  {
    q: 'Safety and kill switch?',
    a: (
      <>
        <p>Policy Guard enforces entitlements, geo/sector deny, and thresholds. Breaches trigger the <b>kill switch</b> to revoke access and quarantine assets.</p>
      </>
    )
  },
]

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">FAQ</h1>
          <p className="text-blue-100 text-lg max-w-3xl">Clear answers about Platform vs Enterprise, calibration, anchors and ZKP seeds, UC delivery, and evidence.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {QA.map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-6 bg-white">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">{item.q}</h2>
                <div className="text-slate-700 leading-relaxed">{item.a}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-sm text-slate-600">
            See also: <Link to="/pricing" className="text-blue-600 hover:underline">Pricing</Link> · <Link to="/technology" className="text-blue-600 hover:underline">Technology</Link> · <Link to="/resources" className="text-blue-600 hover:underline">Resources</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ


