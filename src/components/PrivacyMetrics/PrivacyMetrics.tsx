import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

type PrivacyScores = {
  nearest_neighbor: number;
  membership_inference: number;
  attribute_disclosure: number;
  diversity_loss: number;
  model_collapse: number;
};

const defaultScores: PrivacyScores = {
  nearest_neighbor: 0,
  membership_inference: 0,
  attribute_disclosure: 0,
  diversity_loss: 0,
  model_collapse: 0,
};

interface PrivacyMetricsProps {
  seedData: any[];
  syntheticData: any[];
  privacySettings: { syntheticRatio: number; epsilon: number };
  onPrivacySettingsChange: (settings: { syntheticRatio: number; epsilon: number }) => void;
}

const PrivacyMetrics: React.FC<PrivacyMetricsProps> = ({ seedData, syntheticData, privacySettings, onPrivacySettingsChange }) => {
  const [scores, setScores] = useState<PrivacyScores>(defaultScores);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [riskBadge, setRiskBadge] = useState<'green'|'amber'|'red'>('green');
  // Local state for settings UI
  const [localSettings, setLocalSettings] = useState(privacySettings);
  const [epsilonBudget, setEpsilonBudget] = useState<number>(()=>{
    try { const v = localStorage.getItem('aeg_epsilon_budget'); return v? Number(v) : 1.0; } catch { return 1.0; }
  });
  const [consumed, setConsumed] = useState<number>(()=>{
    try { const v = localStorage.getItem('aeg_epsilon_consumed'); return v? Number(v) : 0; } catch { return 0; }
  });

  useEffect(() => {
    setLocalSettings(privacySettings);
  }, [privacySettings]);

  const computeLocalScores = (seed: any[], synth: any[]): PrivacyScores => {
    const seedSample = seed.length > 500 ? seed.slice(0, 500) : seed;
    const synthSample = synth.length > 2000 ? synth.slice(0, 2000) : synth;

    // Nearest neighbor: % of synthetic records with no exact match in seed (higher = safer)
    const seedSet = new Set(seedSample.map((d: any) => JSON.stringify(d)));
    const exactMatches = synthSample.filter((d: any) => seedSet.has(JSON.stringify(d))).length;
    const nearest_neighbor = Math.round((1 - exactMatches / Math.max(synthSample.length, 1)) * 100);

    // Membership inference proxy: synthetic uniqueness (higher = harder to infer membership)
    const uniqueSynth = new Set(synthSample.map((d: any) => JSON.stringify(d))).size;
    const membership_inference = Math.round(Math.min(100, (uniqueSynth / Math.max(synthSample.length, 1)) * 100));

    // Attribute disclosure: fields in synthetic that expand beyond seed value space
    const fields = Object.keys(synthSample[0] || {});
    let attribute_disclosure = 80;
    if (fields.length > 0) {
      const attrScores = fields.map(f => {
        const synthVals = new Set(synthSample.map((d: any) => String(d[f])));
        const seedVals = new Set(seedSample.map((d: any) => String(d[f])));
        const sharedVals = [...synthVals].filter(v => seedVals.has(v)).length;
        return sharedVals / Math.max(seedVals.size, 1);
      });
      const avgCoverage = attrScores.reduce((a, b) => a + b, 0) / attrScores.length;
      attribute_disclosure = Math.round(Math.min(100, avgCoverage * 100));
    }

    // Diversity loss: how repetitive is the synthetic output (lower = better, so we invert for display)
    const diversityRatio = uniqueSynth / Math.max(synthSample.length, 1);
    const diversity_loss = Math.round((1 - diversityRatio) * 100);

    // Model collapse: compare seed uniqueness vs synthetic uniqueness
    const uniqueSeed = new Set(seedSample.map((d: any) => JSON.stringify(d))).size;
    const seedDivRatio = uniqueSeed / Math.max(seedSample.length, 1);
    const model_collapse = Math.round(Math.max(0, Math.min(100, (seedDivRatio - diversityRatio) / Math.max(seedDivRatio, 0.01) * 100)));

    return { nearest_neighbor, membership_inference, attribute_disclosure, diversity_loss, model_collapse };
  };

  const [localMode, setLocalMode] = useState(false);

  useEffect(() => {
    const fetchPrivacyScores = async () => {
      if (!seedData.length || !syntheticData.length) return;
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("real_json", JSON.stringify(seedData.slice(0, 200)));
        formData.append("synth_json", JSON.stringify(syntheticData.slice(0, 500)));
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const res = await fetch("/api/privacy-metrics", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) throw new Error("API unavailable");
        const data = await res.json();
        const s = {
          ...data,
          diversity_loss: data.diversity_loss ?? 0,
          model_collapse: data.model_collapse ?? 0,
        } as PrivacyScores;
        setScores(s);
        setLocalMode(false);
        const low = [s.nearest_neighbor, s.membership_inference, s.attribute_disclosure].filter(v=>v<70).length;
        setRiskBadge(low>=2 ? 'red' : low===1 ? 'amber' : 'green');
        setConsumed(prev => {
          const next = Math.min(epsilonBudget, prev + (privacySettings.epsilon || 0));
          try { localStorage.setItem('aeg_epsilon_consumed', String(next)); } catch {}
          return next;
        });
      } catch {
        // Fall back to local computation
        const s = computeLocalScores(seedData, syntheticData);
        setScores(s);
        setLocalMode(true);
        const low = [s.nearest_neighbor, s.membership_inference, s.attribute_disclosure].filter(v=>v<70).length;
        setRiskBadge(low>=2 ? 'red' : low===1 ? 'amber' : 'green');
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacyScores();
  }, [seedData, syntheticData]);

  const showSettings = [
    scores.nearest_neighbor,
    scores.membership_inference,
    scores.attribute_disclosure
  ].some(score => score < 70);

  return (
    <div className="privacy-metrics-container">
      <h2>Privacy Metrics</h2>
      <div className="text-xs" style={{color: riskBadge==='red'?'#dc2626': riskBadge==='amber'?'#b45309':'#16a34a'}}>Risk: {riskBadge.toUpperCase()}</div>
      <div className="text-xs text-gray-600">ε budget: {epsilonBudget.toFixed(2)} • consumed: {consumed.toFixed(2)} • remaining: {(Math.max(0, epsilonBudget - consumed)).toFixed(2)}</div>
      {loading && <div className="text-sm text-gray-500 mt-2">Computing privacy metrics…</div>}
      {localMode && !loading && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 mt-1 inline-block">
          Local computation (API offline) — approximations based on {syntheticData.length.toLocaleString()} synthetic vs {seedData.length} seed records
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="dials-row" style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <PrivacyGauge label="Nearest Neighbor" value={scores.nearest_neighbor} info="Measures how closely synthetic data points resemble real data points. Higher is safer." />
        <PrivacyGauge label="Membership Inference" value={scores.membership_inference} info="Assesses the risk that an attacker can determine if a real record was used in training. Higher is safer." />
        <PrivacyGauge label="Attribute Disclosure" value={scores.attribute_disclosure} info="Estimates the risk of inferring sensitive attributes from synthetic data. Higher is safer." />
        <PrivacyGauge label="Diversity Loss" value={scores.diversity_loss} info="Measures loss of diversity in generated data. 100 means total loss (model collapse). Lower is better." />
        <PrivacyGauge label="Model Collapse" value={scores.model_collapse} info="Indicates risk of model collapse. 100 means total collapse. Lower is better." />
      </div>
      {/* Privacy Settings/Fixes Interactive UI */}
      {showSettings && (
        <div style={{ marginTop: '2rem', background: '#fffbe6', border: '1px solid #ffe58f', padding: '1.5rem', borderRadius: '8px', color: '#ad6800' }}>
          <strong>Warning:</strong> One or more privacy metrics are below the safe threshold. Adjust privacy settings and regenerate your synthetic data.
          <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <label>
              Synthetic Ratio (% synthetic):
              <input
                type="number"
                min={50}
                max={100}
                step={1}
                value={localSettings.syntheticRatio}
                onChange={e => setLocalSettings(s => ({ ...s, syntheticRatio: Number(e.target.value) }))}
                style={{ marginLeft: '0.5rem', width: '4rem' }}
              />
            </label>
            <label>
              Epsilon (privacy):
              <input
                type="number"
                min={0.01}
                max={1}
                step={0.01}
                value={localSettings.epsilon}
                onChange={e => setLocalSettings(s => ({ ...s, epsilon: Number(e.target.value) }))}
                style={{ marginLeft: '0.5rem', width: '4rem' }}
              />
            </label>
            <label>
              ε Budget:
              <input
                type="number"
                min={0.1}
                max={10}
                step={0.1}
                value={epsilonBudget}
                onChange={e => {
                  const v = Number(e.target.value) || 1.0;
                  setEpsilonBudget(v);
                  try { localStorage.setItem('aeg_epsilon_budget', String(v)); } catch {}
                }}
                style={{ marginLeft: '0.5rem', width: '4rem' }}
              />
            </label>
            <button
              onClick={() => onPrivacySettingsChange(localSettings)}
              disabled={loading}
              style={{ padding: '0.5rem 1.5rem', background: '#ffe58f', color: '#ad6800', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              Apply & Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type GaugeProps = { label: string; value: number; info: string };
const COLORS = ["#e74c3c", "#f1c40f", "#2ecc71"];
const getGaugeColor = (value: number) => {
  if (value < 70) return COLORS[0]; // Red
  if (value < 90) return COLORS[1]; // Yellow
  return COLORS[2]; // Green
};
const PrivacyGauge: React.FC<GaugeProps> = ({ label, value, info }) => {
  // Gauge is a half-pie (180deg), value from 0-100
  const data = [
    { name: "score", value: value },
    { name: "rest", value: 100 - value }
  ];
  return (
    <div style={{ width: 200, textAlign: "center" }}>
      <h4 title={info} style={{ cursor: "help", marginBottom: 8 }}>{label} &#9432;</h4>
      <PieChart width={180} height={110} style={{ margin: "0 auto" }}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          stroke="none"
        >
          <Cell key="score" fill={getGaugeColor(value)} />
          <Cell key="rest" fill="#e5e7eb" />
        </Pie>
      </PieChart>
      <div style={{ fontWeight: 700, fontSize: 20, color: getGaugeColor(value), marginTop: -20 }}>{value}</div>
    </div>
  );
};

export default PrivacyMetrics; 