import React, { useEffect, useMemo, useState } from 'react';
import { generateHealthcareClaims } from '../../domain/healthcare/claimsGenerator';
import EnergyLedgerPanel from './EnergyLedgerPanel';
import { EnergyLedger } from '../../types/energyLedger';
import { estimateMass, codaStep } from '../../services/codaScheduler';
import { applyElasticTransfer, TransferState } from '../../services/elasticTransfer';
import { trainLinearAe, trainDeepAe } from '../../services/demoAutoencoder';
import LossChart from './CollisionGraph';
import CollisionGraph from './CollisionGraph';
import { buildGeoSLMBundle, GeoSLMParams, GeoBaseModel } from '../../services/localTrainingScriptService';

interface ModelTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  readyForFineTuning: boolean;
  bundledWithEvidence: boolean;
  sampleDataRows: number;
  features: string[];
  defaultParams: Record<string, any>;
  generator: (params: any) => Promise<any[]>;
  trainer: (data: any[], params: any) => Promise<any>;
}

const MODEL_TEMPLATES: ModelTemplate[] = [
  {
    id: 'geo-slm-v1',
    name: 'GEO SLM Fine-Tuning v1',
    description: 'Fine-tune a small language model on GEO synthetic data to predict the optimal optimisation_action given a search query, brand, AI engine, and content signals. Uses PEFT LoRA via HuggingFace TRL.',
    category: 'GEO / SLM',
    readyForFineTuning: true,
    bundledWithEvidence: true,
    sampleDataRows: 50000,
    features: ['query_text', 'brand', 'ai_engine', 'content_score', 'semantic_cluster', 'competitive_density', 'citation_trigger'],
    defaultParams: {},
    generator: async () => [],
    trainer: async () => null,
  },
  {
    id: 'healthcare-fraud-v1',
    name: 'Healthcare Claims Fraud Detection v1',
    description: 'Baseline heuristic model for detecting fraudulent healthcare claims using ratio analysis and behavioral patterns',
    category: 'Fraud Detection',
    readyForFineTuning: true,
    bundledWithEvidence: true,
    sampleDataRows: 50000,
    features: ['submitted/allowed ratio', 'claim_lag_days', 'out_of_state_flag', 'provider_claim_volume_30d', 'unbundling_indicator'],
    defaultParams: {
      rows: 50000,
      fraudRate: 0.03,
      seed: 42,
      windowEnergy: 1.0,
      allocationEvery: 1,
      useElastic: true,
      useDeepAe: false
    },
    generator: generateHealthcareClaims,
    trainer: async (data, params) => trainLinearAe(data, params),
  },
  {
    id: 'credit-risk-v1',
    name: 'Credit Risk Assessment v1',
    description: 'Machine learning model for credit risk evaluation using financial ratios and payment history',
    category: 'Financial Risk',
    readyForFineTuning: false,
    bundledWithEvidence: false,
    sampleDataRows: 10000,
    features: ['credit_utilization', 'payment_history', 'debt_to_income', 'credit_age'],
    defaultParams: { rows: 10000, riskRate: 0.15, seed: 42 },
    generator: async () => [],
    trainer: async () => null,
  },
  {
    id: 'customer-churn-v1',
    name: 'Customer Churn Prediction v1',
    description: 'Predictive model for identifying customers likely to churn based on usage patterns and demographics',
    category: 'Customer Analytics',
    readyForFineTuning: false,
    bundledWithEvidence: false,
    sampleDataRows: 25000,
    features: ['usage_frequency', 'support_tickets', 'subscription_length', 'feature_adoption'],
    defaultParams: { rows: 25000, churnRate: 0.08, seed: 42 },
    generator: async () => [],
    trainer: async () => null,
  },
];

const GEO_BASE_MODELS: { value: GeoBaseModel; label: string }[] = [
  { value: 'microsoft/Phi-3-mini-4k-instruct', label: 'Phi-3-mini-4k (Microsoft) — 3.8B' },
  { value: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0', label: 'TinyLlama-1.1B — lightest' },
  { value: 'meta-llama/Llama-3.2-3B-Instruct', label: 'Llama-3.2-3B (Meta) — 3B' },
  { value: 'mistralai/Mistral-7B-Instruct-v0.2', label: 'Mistral-7B-Instruct — 7B' },
];

function toCSV<T extends Record<string, any>>(rows: T[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const esc = (v: any) => {
    const s = Array.isArray(v) ? JSON.stringify(v) : String(v ?? '');
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n');
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

type LabeledScore = { score: number; label: number };

function computeAUC(points: LabeledScore[]): number {
  const sorted = [...points].sort((a, b) => b.score - a.score);
  let pos = 0, neg = 0;
  for (const p of sorted) (p.label ? pos++ : neg++);
  if (pos === 0 || neg === 0) return 0.5;
  let rank = 1, sumRanksPos = 0;
  for (const p of sorted) { if (p.label) sumRanksPos += rank; rank++; }
  return Math.max(0, Math.min(1, (sumRanksPos - (pos * (pos + 1)) / 2) / (pos * neg)));
}

function computePRAUC(points: LabeledScore[]): number {
  const sorted = [...points].sort((a, b) => b.score - a.score);
  const totalPos = sorted.reduce((s, p) => s + (p.label ? 1 : 0), 0);
  if (totalPos === 0) return 0;
  let tp = 0, fp = 0, lastR = 0, lastP = sorted[0] ? (sorted[0].label ? 1 : 0) : 0, area = 0;
  for (const p of sorted) {
    if (p.label) tp++; else fp++;
    const recall = tp / totalPos, precision = tp / (tp + fp);
    area += (recall - lastR) * ((precision + lastP) / 2);
    lastR = recall; lastP = precision;
  }
  return Math.max(0, Math.min(1, area));
}

interface TrainingSummary { auc: number; prAuc: number; prevalence: number; }

const DEFAULT_GEO_PARAMS: GeoSLMParams = {
  baseModel: 'microsoft/Phi-3-mini-4k-instruct',
  loraRank: 16,
  loraAlpha: 32,
  epochs: 3,
  learningRate: 2e-4,
  batchSize: 4,
  maxLength: 256,
  maxTrainRows: 50000,
  targetColumn: 'optimization_action',
};

interface ModelLabProps {
  generatedData?: any[];
  seedData?: any[];
  generatedCount?: number;
}

const ModelLab: React.FC<ModelLabProps> = ({ generatedData = [], seedData = [], generatedCount = 0 }) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('geo-slm-v1');
  const selectedModel = useMemo(() => MODEL_TEMPLATES.find(m => m.id === selectedModelId), [selectedModelId]);
  const totalGenerated = generatedCount || generatedData.length;

  const [params, setParams] = useState<Record<string, any>>({});
  const [geoParams, setGeoParams] = useState<GeoSLMParams>(DEFAULT_GEO_PARAMS);
  const [bundleStatus, setBundleStatus] = useState<string | null>(null);

  const [data, setData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<TrainingSummary | null>(null);
  const [busy, setBusy] = useState<boolean>(false);
  const [ledger, setLedger] = useState<EnergyLedger | null>(null);
  const [lossHistory, setLossHistory] = useState<number[] | null>(null);

  useEffect(() => {
    if (selectedModel && selectedModel.id !== 'geo-slm-v1') {
      setParams(selectedModel.defaultParams);
    }
  }, [selectedModel]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('aeg:modellab:lastRun');
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved?.modelId === selectedModelId && saved.params) {
        if (selectedModelId === 'geo-slm-v1') setGeoParams(p => ({ ...p, ...saved.params }));
        else setParams(prev => ({ ...prev, ...saved.params }));
      }
    } catch {}
  }, [selectedModelId]);

  const canTrain = data.length > 0 && !busy;

  const generate = async () => {
    if (!selectedModel) return;
    setBusy(true);
    try {
      const generatedData = await selectedModel.generator(params);
      setData(generatedData);
      localStorage.setItem('aeg:modellab:lastRun', JSON.stringify({ modelId: selectedModelId, params, timestamp: Date.now() }));
    } catch (error) { console.error('Generation failed:', error); }
    finally { setBusy(false); }
  };

  const train = async () => {
    if (!selectedModel || !canTrain) return;
    setBusy(true);
    try {
      const result = await selectedModel.trainer(data, params);
      setMetrics(result);
    } catch (error) { console.error('Training failed:', error); }
    finally { setBusy(false); }
  };

  const downloadGeneratedCsv = () => {
    if (generatedData.length === 0) return;
    const keys = Object.keys(generatedData[0]);
    const esc = (v: any) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    const csv = [keys.join(','), ...generatedData.map(r => keys.map(k => esc(r[k])).join(','))].join('\n');
    download(`geo_training_data_${generatedData.length}rows.csv`, csv, 'text/csv');
  };

  const downloadTrainingBundle = () => {
    setBundleStatus('Generating bundle…');
    try {
      const bundle = buildGeoSLMBundle(geoParams);
      download('geo_slm_train.py', bundle.script, 'text/x-python');
      download('geo_slm_config.yaml', bundle.config, 'text/yaml');
      download('requirements.txt', bundle.requirements, 'text/plain');
      download('GEO_SLM_README.md', bundle.readme, 'text/markdown');
      localStorage.setItem('aeg:modellab:lastRun', JSON.stringify({ modelId: selectedModelId, params: geoParams, timestamp: Date.now() }));
      setBundleStatus('Downloaded 4 files: geo_slm_train.py, geo_slm_config.yaml, requirements.txt, GEO_SLM_README.md');
      setTimeout(() => setBundleStatus(null), 5000);
    } catch (e: any) {
      setBundleStatus('Error: ' + (e.message || 'Unknown'));
    }
  };

  const exportEvidence = () => {
    if (!ledger) return;
    const bundle = {
      model_id: selectedModelId, model_name: selectedModel?.name,
      data_summary: { rows: data.length, features: selectedModel?.features || [], params },
      training_metrics: metrics, energy_ledger: ledger,
      ae_loss_history: lossHistory, created_at: new Date().toISOString()
    };
    download(`evidence_bundle_${selectedModelId}.json`, JSON.stringify(bundle, null, 2), 'application/json');
  };

  const downloadCSV = () => {
    if (data.length === 0) return;
    download(`${selectedModelId}_synthetic_data.csv`, toCSV(data), 'text/csv');
  };

  const downloadModelCard = () => {
    if (!selectedModel) return;
    const card = {
      name: `AethergenAI – ${selectedModel.name}`, version: '1.0.0',
      model_id: selectedModelId, category: selectedModel.category,
      ready_for_fine_tuning: selectedModel.readyForFineTuning,
      bundled_with_evidence: selectedModel.bundledWithEvidence,
      dataset: { rows: data.length, features: selectedModel.features, params },
      metrics, generated_at: new Date().toISOString()
    };
    download(`model_card_${selectedModelId}.json`, JSON.stringify(card, null, 2), 'application/json');
  };

  if (!selectedModel) return <div className="text-center py-8">Model not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Model Lab</h2>
          <p className="text-slate-600 mt-1">Train and deploy AI models using your synthetic data pipeline</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedModelId}
            onChange={(e) => setSelectedModelId(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-800"
          >
            {MODEL_TEMPLATES.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
          {selectedModelId === 'geo-slm-v1' && (
            <button onClick={downloadTrainingBundle} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
              Download Training Bundle
            </button>
          )}
        </div>
      </div>

      {/* Model info card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{selectedModel.name}</h3>
            <p className="text-blue-700 mb-4">{selectedModel.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📊</span>
                <span className="text-blue-700">Category: {selectedModel.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">🔧</span>
                <span className="text-blue-700">Features: {selectedModel.features.length} input fields</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📈</span>
                <span className="text-blue-700">Sample Data: {selectedModel.sampleDataRows.toLocaleString()} rows</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${selectedModel.readyForFineTuning ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              <span className="text-blue-700">
                {selectedModel.readyForFineTuning ? 'Ready for fine-tuning' : 'Fine-tuning pending'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${selectedModel.bundledWithEvidence ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              <span className="text-blue-700">
                {selectedModel.bundledWithEvidence ? 'Evidence bundled' : 'Evidence collection pending'}
              </span>
            </div>
            {selectedModelId === 'geo-slm-v1' && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600">🤖</span>
                <span className="text-blue-700">PEFT LoRA via HuggingFace TRL</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GEO SLM Parameters */}
      {selectedModelId === 'geo-slm-v1' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">GEO SLM Training Parameters</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="block text-slate-800 font-medium">
              Base Model
              <select
                className="mt-1 w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-800"
                value={geoParams.baseModel}
                onChange={e => setGeoParams(p => ({ ...p, baseModel: e.target.value as GeoBaseModel }))}
              >
                {GEO_BASE_MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </label>
            {(
              [
                ['loraRank', 'LoRA Rank (r)', 1, 64, 1],
                ['loraAlpha', 'LoRA Alpha', 1, 128, 1],
                ['epochs', 'Epochs', 1, 10, 1],
                ['learningRate', 'Learning Rate', 1e-5, 1e-2, 1e-5],
                ['batchSize', 'Batch Size', 1, 32, 1],
                ['maxLength', 'Max Token Length', 64, 512, 32],
                ['maxTrainRows', 'Max Train Rows', 1000, 1000000, 1000],
              ] as [keyof GeoSLMParams, string, number, number, number][]
            ).map(([key, label, min, max, step]) => (
              <label key={key} className="block text-slate-800 font-medium">
                {label}
                <input
                  type="number"
                  className="mt-1 w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-800"
                  value={geoParams[key] as number}
                  min={min} max={max} step={step}
                  onChange={e => setGeoParams(p => ({ ...p, [key]: parseFloat(e.target.value) || min }))}
                />
              </label>
            ))}
            <label className="block text-slate-800 font-medium">
              Target Column
              <input
                type="text"
                className="mt-1 w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-800"
                value={geoParams.targetColumn}
                onChange={e => setGeoParams(p => ({ ...p, targetColumn: e.target.value }))}
              />
            </label>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Input features: {selectedModel.features.join(', ')} → predicts <strong>{geoParams.targetColumn}</strong> (5-class classification)
          </p>
          {bundleStatus && (
            <div className={`mt-3 p-3 rounded text-sm font-medium ${bundleStatus.startsWith('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              {bundleStatus}
            </div>
          )}
        </div>
      )}

      {/* Generic parameters for non-GEO templates */}
      {selectedModelId !== 'geo-slm-v1' && Object.keys(params).length > 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Model Parameters</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(params).map(([key, value]) => (
              <label key={key} className="block text-slate-800 font-medium">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                <input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  className="mt-1 w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-800"
                  value={value}
                  min={typeof value === 'number' ? 0 : undefined}
                  step={typeof value === 'number' ? (key === 'fraudRate' || key === 'riskRate' || key === 'churnRate' ? 0.001 : 1) : undefined}
                  onChange={(e) => setParams(prev => ({
                    ...prev,
                    [key]: typeof value === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                  }))}
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons — only for non-GEO templates that have generators */}
      {selectedModelId !== 'geo-slm-v1' && (
        <div className="flex flex-wrap gap-3">
          <button
            disabled={busy}
            onClick={generate}
            className="px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium"
          >
            {busy ? 'Generating…' : 'Generate Dataset'}
          </button>
          <button
            disabled={!canTrain}
            onClick={train}
            className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium"
          >
            {busy ? 'Training…' : 'Train Model'}
          </button>
          <button
            disabled={data.length === 0}
            onClick={downloadCSV}
            className="px-4 py-3 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white"
          >
            Download CSV
          </button>
          <button
            disabled={!metrics}
            onClick={downloadModelCard}
            className="px-4 py-3 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white"
          >
            Download Model Card
          </button>
          <button
            disabled={!ledger}
            onClick={exportEvidence}
            className="px-4 py-3 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white"
          >
            Export Evidence
          </button>
        </div>
      )}

      {/* GEO SLM — pipeline status + instructions */}
      {selectedModelId === 'geo-slm-v1' && (
        <>
          {/* Pipeline data status */}
          <div className={`border rounded-lg p-4 ${totalGenerated > 0 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className={`font-medium text-sm ${totalGenerated > 0 ? 'text-green-800' : 'text-amber-800'}`}>
                  {totalGenerated > 0
                    ? `Pipeline data ready: ${totalGenerated.toLocaleString()} records generated`
                    : 'No generated data yet — go to Generate tab first'}
                </p>
                {totalGenerated > 0 && generatedData.length < totalGenerated && (
                  <p className="text-xs text-green-700 mt-1">
                    {generatedData.length.toLocaleString()} records in preview · full {totalGenerated.toLocaleString()} available via Generator download
                  </p>
                )}
                {seedData.length > 0 && (
                  <p className="text-xs text-green-700 mt-1">{seedData.length.toLocaleString()} seed records loaded</p>
                )}
              </div>
              {generatedData.length > 0 && (
                <button
                  onClick={downloadGeneratedCsv}
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white text-sm font-medium"
                >
                  Download training CSV ({generatedData.length.toLocaleString()} rows)
                </button>
              )}
            </div>
            {totalGenerated > 10000 && (
              <p className="text-xs text-amber-700 mt-2 bg-amber-100 border border-amber-200 rounded px-2 py-1 inline-block">
                For the full {totalGenerated.toLocaleString()} rows: use the JSON/CSV download buttons on the Generate tab — those stream the complete file.
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 text-slate-100">
            <h3 className="text-lg font-semibold mb-3">Training workflow</h3>
            <ol className="list-decimal ml-5 space-y-2 text-sm text-slate-300">
              <li>Generate data on the <strong className="text-white">Generate tab</strong> — download the CSV from there for large runs (&gt;10k rows).</li>
              <li>Configure LoRA parameters above and click <strong className="text-white">Download Training Bundle</strong> — you get 4 files.</li>
              <li>Run <code className="bg-slate-800 px-1 rounded">pip install -r requirements.txt</code> then <code className="bg-slate-800 px-1 rounded">python geo_slm_train.py --csv your_data.csv</code>.</li>
              <li>The script saves the adapter to <code className="bg-slate-800 px-1 rounded">./geo_slm_adapter/</code> and prints F1 per class.</li>
            </ol>
            <p className="mt-3 text-xs text-slate-400">
              Target: <strong className="text-slate-200">{geoParams.targetColumn}</strong> · 5-class · VRAM: 8 GB (Phi-3-mini/TinyLlama), 16 GB (Mistral-7B).
            </p>
          </div>
        </>
      )}

      {/* Results display */}
      {data.length > 0 && (
        <div className="rounded-xl p-6 bg-slate-900/70 border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Training Results</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-slate-200">
            <div>
              <div className="text-sm text-slate-400 font-medium">Dataset Size</div>
              <div className="text-2xl font-bold">{data.length.toLocaleString()} rows</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 font-medium">Model Performance</div>
              <div className="text-2xl font-bold">
                {metrics ? `${metrics.auc.toFixed(3)} / ${metrics.prAuc.toFixed(3)}` : '—'}
              </div>
              <div className="text-xs text-slate-400 mt-1">ROC-AUC / PR-AUC</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 font-medium">Data Distribution</div>
              <div className="text-2xl font-bold">
                {metrics ? (metrics.prevalence * 100).toFixed(2) + '%' : '—'}
              </div>
              <div className="text-xs text-slate-400 mt-1">Positive Class</div>
            </div>
          </div>
        </div>
      )}

      {/* Model analysis panels */}
      {data.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          <EnergyLedgerPanel ledger={ledger} />
          <div className="space-y-4">
            <LossChart history={lossHistory} />
            <CollisionGraph ledger={ledger} />
          </div>
        </div>
      )}

      {/* Business value proposition */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Ready for Production</h3>
        <div className="grid md:grid-cols-2 gap-4 text-green-800">
          <div>
            <h4 className="font-medium mb-2">For GEO Consultants:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Fine-tune on your own synthetic GEO data</li>
              <li>• PEFT LoRA — runs on an 8 GB GPU or Google Colab</li>
              <li>• Predicts best optimisation action for any search query</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">For Enterprises:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Privacy-preserving synthetic data pipeline</li>
              <li>• Full audit trail and evidence bundles</li>
              <li>• Swap base model without changing training code</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelLab;
