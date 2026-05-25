import React, { useState, useEffect, useRef } from 'react';
import ModelCollapseRiskDial from '../ModelCollapseRiskDial/ModelCollapseRiskDial';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ReportingDashboardProps {
  schema: any;
  seedData: any[];
  generatedData: any[];
  benchmarkResults: any[];
}

interface QualitySnapshot {
  time: string;
  fidelity: number;
  privacy: number;
  utility: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function calcFidelity(seedData: any[], generatedData: any[], fields: any[]): number {
  if (!fields?.length || !seedData.length || !generatedData.length) return 0;
  let total = 0, count = 0;
  for (const field of fields) {
    const real  = seedData.map((d: any) => d[field.name]).filter((v: any) => v != null);
    const synth = generatedData.map((d: any) => d[field.name]).filter((v: any) => v != null);
    if (!real.length || !synth.length) continue;
    const numReal  = real.filter((v: any) => typeof v === 'number' && !isNaN(v));
    const numSynth = synth.filter((v: any) => typeof v === 'number' && !isNaN(v));
    let sim: number;
    if (numReal.length > 0 && numSynth.length > 0) {
      const rMean = numReal.reduce((a: number, b: number) => a + b, 0) / numReal.length;
      const sMean = numSynth.reduce((a: number, b: number) => a + b, 0) / numSynth.length;
      sim = Math.max(0, 1 - Math.abs(rMean - sMean) / Math.max(Math.abs(rMean), 1));
    } else {
      const rSet = new Set(real.map(String));
      const sSet = new Set(synth.map(String));
      const inter = [...rSet].filter(v => sSet.has(v)).length;
      const union = new Set([...rSet, ...sSet]).size;
      sim = union > 0 ? inter / union : 1;
    }
    if (!isNaN(sim)) { total += sim; count++; }
  }
  return count > 0 ? Math.min(1, total / count) : 0;
}

function calcPrivacy(seedData: any[], generatedData: any[]): number {
  if (!seedData.length || !generatedData.length) return 1;
  const seedHashes = new Set(seedData.map(d => JSON.stringify(d)));
  const overlap = generatedData.filter(d => seedHashes.has(JSON.stringify(d))).length;
  return 1 - overlap / generatedData.length;
}

function calcUtility(generatedData: any[]): number {
  if (!generatedData.length) return 0;
  const fields = Object.keys(generatedData[0] || {});
  if (!fields.length) return 0;
  let totalUniqueness = 0;
  for (const f of fields) {
    const vals = generatedData.map(d => d[f]).filter(v => v != null);
    if (!vals.length) continue;
    totalUniqueness += new Set(vals.map(String)).size / vals.length;
  }
  return Math.min(1, totalUniqueness / fields.length);
}

function calcDiversityLoss(data: any[]): number {
  if (!data.length) return 0;
  const unique = new Set(data.map(d => JSON.stringify(d)));
  return 1 - unique.size / data.length;
}

function calcModeCollapse(data: any[], fields: any[]): number {
  if (!fields?.length || !data.length) return 0;
  const diversities = fields.map((field: any) => {
    const vals = data.map((d: any) => d[field.name]).filter((v: any) => v != null);
    if (!vals.length) return 1;
    return new Set(vals).size / vals.length;
  });
  const avg = diversities.reduce((a, b) => a + b, 0) / diversities.length;
  return 1 - avg;
}

function calcQualityDegradation(data: any[], fields: any[]): number {
  // Only flag records where a REQUIRED field is missing — optional nulls are expected
  if (!data.length) return 0;
  const requiredFields = fields?.filter((f: any) => f.constraints?.required).map((f: any) => f.name) ?? [];
  if (!requiredFields.length) return 0;
  const bad = data.filter(record =>
    requiredFields.some(name => record[name] == null || record[name] === '')
  ).length;
  return bad / data.length;
}

function calcNovelty(seedData: any[], generatedData: any[]): number {
  if (!generatedData.length) return 0;
  if (!seedData.length) return 1;
  const seedHashes = new Set(seedData.map(d => JSON.stringify(d)));
  const novel = generatedData.filter(d => !seedHashes.has(JSON.stringify(d))).length;
  return novel / generatedData.length;
}

function assessRisk(diversityLoss: number, modeCollapse: number, qualityDegradation: number, noveltyScore: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  // Weight quality degradation of required fields more heavily; novelty inverted (low novelty = risk)
  const noveltyRisk = 1 - noveltyScore;
  const avg = (diversityLoss + modeCollapse + qualityDegradation + noveltyRisk) / 4;
  if (avg < 0.2) return 'LOW';
  if (avg < 0.4) return 'MEDIUM';
  if (avg < 0.6) return 'HIGH';
  return 'CRITICAL';
}

function riskColorClass(level: string) {
  switch (level) {
    case 'LOW':      return 'text-green-700 bg-green-50 border-green-300';
    case 'MEDIUM':   return 'text-yellow-700 bg-yellow-50 border-yellow-300';
    case 'HIGH':     return 'text-orange-700 bg-orange-50 border-orange-300';
    case 'CRITICAL': return 'text-red-700 bg-red-50 border-red-300';
    default:         return 'text-gray-700 bg-gray-50 border-gray-300';
  }
}

function downloadJson(obj: any, filename: string) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── Component ─────────────────────────────────────────────────────────────────

const ReportingDashboard: React.FC<ReportingDashboardProps> = ({ schema, seedData, generatedData }) => {
  const fields = schema?.fields ?? [];

  const fidelity          = calcFidelity(seedData, generatedData, fields);
  const privacy           = calcPrivacy(seedData, generatedData);
  const utility           = calcUtility(generatedData);
  const overallScore      = generatedData.length ? (fidelity + privacy + utility) / 3 : 0;

  const diversityLoss     = calcDiversityLoss(generatedData);
  const modeCollapse      = calcModeCollapse(generatedData, fields);
  const qualityDegradation = calcQualityDegradation(generatedData, fields);
  const noveltyScore      = calcNovelty(seedData, generatedData);
  const riskLevel         = generatedData.length
    ? assessRisk(diversityLoss, modeCollapse, qualityDegradation, noveltyScore)
    : 'LOW';

  // History — append a snapshot whenever generatedData changes
  const [history, setHistory] = useState<QualitySnapshot[]>([]);
  const prevLenRef = useRef(0);
  useEffect(() => {
    if (!generatedData.length) return;
    if (generatedData.length === prevLenRef.current) return;
    prevLenRef.current = generatedData.length;
    setHistory(prev => {
      const snap: QualitySnapshot = {
        time: new Date().toLocaleTimeString(),
        fidelity: parseFloat((fidelity * 100).toFixed(1)),
        privacy:  parseFloat((privacy  * 100).toFixed(1)),
        utility:  parseFloat((utility  * 100).toFixed(1)),
      };
      return [...prev.slice(-19), snap]; // keep last 20
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedData.length]);

  const noData = generatedData.length === 0;

  const radarData = [
    { subject: 'Diversity Loss',       A: parseFloat((diversityLoss     * 100).toFixed(1)), fullMark: 100 },
    { subject: 'Mode Collapse',        A: parseFloat((modeCollapse      * 100).toFixed(1)), fullMark: 100 },
    { subject: 'Quality Degradation',  A: parseFloat((qualityDegradation* 100).toFixed(1)), fullMark: 100 },
    { subject: 'Novelty Risk',         A: parseFloat(((1 - noveltyScore)* 100).toFixed(1)), fullMark: 100 },
  ];

  const qualityBarData = [
    { name: 'Fidelity', value: parseFloat((fidelity * 100).toFixed(1)) },
    { name: 'Privacy',  value: parseFloat((privacy  * 100).toFixed(1)) },
    { name: 'Utility',  value: parseFloat((utility  * 100).toFixed(1)) },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 text-gray-900">

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Reporting Dashboard</h1>
            <p className="text-sm text-gray-600">
              Computed from {generatedData.length.toLocaleString()} generated records
              {seedData.length > 0 && ` vs ${seedData.length.toLocaleString()} seed records`}
            </p>
          </div>
          <div className="text-sm text-gray-700 bg-gray-50 border rounded px-3 py-2 space-y-0.5">
            <div><span className="font-medium">ε</span>: {schema?.privacySettings?.epsilon ?? '—'}</div>
            <div><span className="font-medium">Synthetic Ratio</span>: {((schema?.privacySettings?.syntheticRatio ?? 1) * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      {noData && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-800 text-sm">
          No generated data yet. Run a generation job and come back here to see real quality metrics.
        </div>
      )}

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Quality Score',    value: `${(overallScore * 100).toFixed(1)}%`, sub: 'avg fidelity / privacy / utility', color: 'text-blue-600' },
          { label: 'Records',          value: generatedData.length.toLocaleString(), sub: `of ${schema?.targetVolume?.toLocaleString() ?? '—'} target`, color: 'text-green-600' },
          { label: 'Seed Records',     value: seedData.length.toLocaleString(),      sub: 'reference dataset',                  color: 'text-purple-600' },
          { label: 'Collapse Risk',    value: riskLevel,                             sub: 'from required-field analysis',       color: riskLevel === 'LOW' ? 'text-green-600' : riskLevel === 'MEDIUM' ? 'text-yellow-600' : riskLevel === 'HIGH' ? 'text-orange-600' : 'text-red-600' },
        ].map(m => (
          <div key={m.label} className="bg-white rounded-lg border shadow-sm p-5">
            <p className="text-sm font-medium text-gray-600 mb-1">{m.label}</p>
            <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            <p className="text-xs text-gray-500 mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Quality history */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Quality Over Time</h2>
        <p className="text-xs text-gray-500 mb-4">Snapshot appended on each completed generation run. No data until you generate.</p>
        {history.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">No snapshots yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => `${v}%`} />
              <Legend />
              <Line type="monotone" dataKey="fidelity" stroke="#3B82F6" strokeWidth={2} dot />
              <Line type="monotone" dataKey="privacy"  stroke="#10B981" strokeWidth={2} dot />
              <Line type="monotone" dataKey="utility"  stroke="#8B5CF6" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Collapse risk */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Model Collapse Risk</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-3">Higher = more risk. Novelty Risk = 1 − novelty (low novelty is a collapse signal).</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Risk" dataKey="A" stroke="#EF4444" fill="#FEE2E2" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className={`p-4 rounded-lg border-2 mb-4 ${riskColorClass(riskLevel)}`}>
              <p className="font-bold text-lg mb-3">Level: {riskLevel}</p>
              {[
                { label: 'Diversity Loss',      val: diversityLoss,      note: 'duplicate records / total' },
                { label: 'Mode Collapse',       val: modeCollapse,       note: 'avg per-field repetition' },
                { label: 'Quality Degradation', val: qualityDegradation, note: 'required fields missing' },
                { label: 'Novelty Score',       val: noveltyScore,       note: 'records not in seed (higher = better)', invert: true },
              ].map(({ label, val, note, invert }) => (
                <div key={label} className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">{label}</span>
                  <span className={`font-semibold ${invert ? (val > 0.5 ? 'text-green-700' : 'text-orange-700') : (val > 0.5 ? 'text-red-700' : 'text-green-700')}`}>
                    {(val * 100).toFixed(1)}%
                    <span className="text-gray-400 font-normal ml-1 text-xs">({note})</span>
                  </span>
                </div>
              ))}
            </div>
            {noData && <p className="text-sm text-gray-400">Generate data to see collapse indicators.</p>}
          </div>
        </div>
      </div>

      {/* Live risk dial */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <ModelCollapseRiskDial syntheticData={generatedData} schema={schema} />
      </div>

      {/* Quality breakdown bar */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quality Breakdown</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={qualityBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
            <Tooltip formatter={(v: any) => `${v}%`} />
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Export */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Export</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => downloadJson({ schema: schema?.id, generated: generatedData.length, seed: seedData.length, fidelity, privacy, utility, overallScore, timestamp: new Date().toISOString() }, 'quality-report.json')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Export Quality Report
          </button>
          <button
            onClick={() => downloadJson({ riskLevel, diversityLoss, modeCollapse, qualityDegradation, noveltyScore, timestamp: new Date().toISOString() }, 'risk-assessment.json')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Export Risk Assessment
          </button>
          <button
            onClick={() => downloadJson(history, 'quality-history.json')}
            disabled={history.length === 0}
            className={`px-4 py-2 rounded text-sm ${history.length ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            Export Quality History
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportingDashboard;
