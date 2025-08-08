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
  // Local state for settings UI
  const [localSettings, setLocalSettings] = useState(privacySettings);

  useEffect(() => {
    setLocalSettings(privacySettings);
  }, [privacySettings]);

  useEffect(() => {
    const fetchPrivacyScores = async () => {
      if (!seedData.length || !syntheticData.length) return;
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("real_json", JSON.stringify(seedData));
        formData.append("synth_json", JSON.stringify(syntheticData));
        const res = await fetch("/api/privacy-metrics", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Failed to fetch privacy metrics");
        const data = await res.json();
        setScores({
          ...data,
          diversity_loss: 100, // Placeholder, update with real value if available
          model_collapse: 100, // Placeholder, update with real value if available
        });
      } catch (err: any) {
        setError(err.message || "Unknown error");
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
      {loading && <div>Checking privacy...</div>}
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