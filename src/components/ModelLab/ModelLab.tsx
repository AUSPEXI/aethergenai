import React, { useMemo, useState } from 'react';
import { generateHealthcareClaims } from '../../domain/healthcare/claimsGenerator';

type LabeledScore = { score: number; label: number };

function toCSV<T extends Record<string, any>>(rows: T[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const esc = (v: any) => {
    const s = Array.isArray(v) ? JSON.stringify(v) : String(v ?? '');
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const lines = [headers.join(',')].concat(rows.map(r => headers.map(h => esc(r[h])).join(',')));
  return lines.join('\n');
}

function download(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime + ';charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function computeAUC(points: LabeledScore[]): number {
  // ROC-AUC via rank-sum (Mann–Whitney U)
  const sorted = [...points].sort((a, b) => b.score - a.score);
  let pos = 0, neg = 0;
  for (const p of sorted) (p.label ? pos++ : neg++);
  if (pos === 0 || neg === 0) return 0.5;
  let rank = 1;
  let sumRanksPos = 0;
  for (const p of sorted) {
    if (p.label) sumRanksPos += rank;
    rank++;
  }
  const auc = (sumRanksPos - (pos * (pos + 1)) / 2) / (pos * neg);
  return Math.max(0, Math.min(1, auc));
}

function computePRAUC(points: LabeledScore[]): number {
  // Simple trapezoidal PR curve on thresholds at each score
  const sorted = [...points].sort((a, b) => b.score - a.score);
  const totalPos = sorted.reduce((s, p) => s + (p.label ? 1 : 0), 0);
  if (totalPos === 0) return 0;
  let tp = 0, fp = 0;
  let lastR = 0, lastP = sorted[0] ? (sorted[0].label ? 1 : 0) : 0;
  let area = 0;
  for (const p of sorted) {
    if (p.label) tp++; else fp++;
    const recall = tp / totalPos;
    const precision = tp / (tp + fp);
    // Trapezoid between (lastR,lastP) and (recall,precision)
    area += (recall - lastR) * ((precision + lastP) / 2);
    lastR = recall; lastP = precision;
  }
  return Math.max(0, Math.min(1, area));
}

interface TrainingSummary {
  auc: number;
  prAuc: number;
  prevalence: number;
}

const ModelLab: React.FC = () => {
  const [rows, setRows] = useState<number>(50000);
  const [fraudRate, setFraudRate] = useState<number>(0.03);
  const [seed, setSeed] = useState<number>(42);
  const [data, setData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<TrainingSummary | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  const canTrain = data.length > 0 && !busy;

  const generate = async () => {
    setBusy(true);
    try {
      const generated = generateHealthcareClaims(rows, { fraud_rate: fraudRate, seed });
      setData(generated);
      setMetrics(null);
    } finally {
      setBusy(false);
    }
  };

  const train = async () => {
    if (data.length === 0) return;
    setBusy(true);
    try {
      // Lightweight heuristic model: combine indicative signals
      const scored: LabeledScore[] = data.map(r => {
        const ratio = r.allowed_amount > 0 ? r.submitted_amount / r.allowed_amount : 1;
        const lag = r.claim_lag_days;
        const outState = r.out_of_state_flag ? 1 : 0;
        const vol = r.provider_claim_volume_30d;
        const unbundling = Array.isArray(r.procedure_codes) && r.procedure_codes.includes('CPT11010') ? 1 : 0;
        const score = 0.8*ratio + 0.3*outState + 0.15*unbundling + 0.001*vol - 0.02*lag;
        return { score, label: r.fraud_flag ? 1 : 0 };
      });
      const auc = computeAUC(scored);
      const prAuc = computePRAUC(scored);
      const prevalence = data.reduce((s, r) => s + (r.fraud_flag ? 1 : 0), 0) / data.length;
      setMetrics({ auc, prAuc, prevalence });
    } finally {
      setBusy(false);
    }
  };

  const downloadCSV = () => {
    if (data.length === 0) return;
    download('healthcare_claims_synth.csv', toCSV(data), 'text/csv');
  };

  const downloadModelCard = () => {
    const card = {
      name: 'AethergenAI – Healthcare Claims Fraud v1 (Baseline Heuristic)',
      version: '1.0.0',
      dataset: {
        rows: data.length,
        fraud_rate_config: fraudRate,
        observed_prevalence: metrics?.prevalence ?? null
      },
      model: {
        type: 'heuristic-linear-score',
        features: ['submitted/allowed ratio','claim_lag_days','out_of_state_flag','provider_claim_volume_30d','unbundling_indicator'],
        weights: { ratio: 0.8, out_of_state: 0.3, unbundling: 0.15, volume: 0.001, lag: -0.02 }
      },
      metrics: metrics ?? null,
      generated_at: new Date().toISOString()
    };
    download('model_card_healthcare_fraud_v1.json', JSON.stringify(card, null, 2), 'application/json');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-extrabold">Model Lab: Healthcare Claims Fraud</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">Rows
          <input type="number" className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded px-3 py-2" value={rows} min={1000} step={1000} onChange={e=>setRows(parseInt(e.target.value||'0',10))} />
        </label>
        <label className="block">Fraud rate
          <input type="number" className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded px-3 py-2" value={fraudRate} min={0.001} max={0.2} step={0.001} onChange={e=>setFraudRate(parseFloat(e.target.value||'0'))} />
        </label>
        <label className="block">Seed
          <input type="number" className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded px-3 py-2" value={seed} onChange={e=>setSeed(parseInt(e.target.value||'0',10))} />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button disabled={busy} onClick={generate} className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50">Generate Dataset</button>
        <button disabled={!canTrain} onClick={train} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50">Train Baseline</button>
        <button disabled={data.length===0} onClick={downloadCSV} className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50">Download CSV</button>
        <button disabled={!metrics} onClick={downloadModelCard} className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50">Download Model Card</button>
      </div>

      <div className="rounded-xl p-4 bg-slate-900/70 border border-slate-700">
        <div className="grid sm:grid-cols-3 gap-4 text-slate-200">
          <div>
            <div className="text-sm text-slate-400">Rows</div>
            <div className="text-xl font-bold">{data.length}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Observed prevalence</div>
            <div className="text-xl font-bold">{metrics ? (metrics.prevalence*100).toFixed(2)+'%' : '—'}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">ROC‑AUC / PR‑AUC</div>
            <div className="text-xl font-bold">{metrics ? `${metrics.auc.toFixed(3)} / ${metrics.prAuc.toFixed(3)}` : '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelLab;


