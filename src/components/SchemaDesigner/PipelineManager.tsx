import React, { useMemo, useState } from 'react';
import { CheckCircle, GitBranch, Play, RefreshCw, Download, Settings, Database } from 'lucide-react';
import MultiDataPipelineService, { MultiDataPipelineConfig, SchemaHarmonizationResult, CrossDomainSynthesisResult, FoundationModelInfrastructure } from '../../services/multiDataPipelineService';

type ComputeMode = 'self-service' | 'full-service';

const defaultDomains = ['automotive', 'healthcare'];

const PipelineManager: React.FC = () => {
  const [domainsText, setDomainsText] = useState(defaultDomains.join(', '));
  const [computeMode, setComputeMode] = useState<ComputeMode>('self-service');
  const [domainDataText, setDomainDataText] = useState<string>(`{
  "automotive": [ { "vin": "A1", "defects": 2, "plant": "OXF" } ],
  "healthcare": [ { "patient_id": "P1", "claims": 3, "provider": "NHS" } ]
}`);

  const [harmonizeResult, setHarmonizeResult] = useState<SchemaHarmonizationResult | null>(null);
  const [synthResult, setSynthResult] = useState<CrossDomainSynthesisResult | null>(null);
  const [infraPlan, setInfraPlan] = useState<FoundationModelInfrastructure | null>(null);
  const [busy, setBusy] = useState<'harmonize' | 'synthesize' | 'plan' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const domains = useMemo(() => domainsText.split(',').map(d => d.trim()).filter(Boolean), [domainsText]);

  const svc = useMemo(() => {
    const cfg: MultiDataPipelineConfig = {
      domains,
      schemaHarmonization: true,
      crossDomainSynthesis: true,
      foundationModelReady: true,
      computeManagement: computeMode,
    };
    return new MultiDataPipelineService(cfg);
  }, [domains, computeMode]);

  const parseDomainData = (): Record<string, any[]> => {
    try {
      const parsed = JSON.parse(domainDataText);
      if (typeof parsed !== 'object' || parsed === null) throw new Error('Invalid JSON');
      return parsed as Record<string, any[]>;
    } catch (e: any) {
      throw new Error('Domain data must be valid JSON');
    }
  };

  const onHarmonize = async () => {
    setError(null);
    setBusy('harmonize');
    try {
      const data = parseDomainData();
      const res = await svc.harmonizeSchemas(data);
      setHarmonizeResult(res);
    } catch (e: any) {
      setError(e?.message || 'Failed to harmonize');
    } finally {
      setBusy(null);
    }
  };

  const onSynthesize = async () => {
    if (!harmonizeResult) {
      setError('Run harmonization first');
      return;
    }
    setError(null);
    setBusy('synthesize');
    try {
      const source = domains.slice(0, Math.max(1, domains.length - 1));
      const target = domains[domains.length - 1];
      const res = await svc.synthesizeCrossDomain(source, target, harmonizeResult.harmonizedSchema, { recordCount: 25 });
      setSynthResult(res);
    } catch (e: any) {
      setError(e?.message || 'Failed to synthesize');
    } finally {
      setBusy(null);
    }
  };

  const onPlan = async () => {
    setError(null);
    setBusy('plan');
    try {
      const res = await svc.planFoundationModelInfrastructure(domains, {});
      setInfraPlan(res);
    } catch (e: any) {
      setError(e?.message || 'Failed to plan infra');
    } finally {
      setBusy(null);
    }
  };

  const downloadJson = (obj: unknown, filename: string) => {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 rounded-lg mr-3"><GitBranch className="h-5 w-5 text-blue-600" /></div>
          <h3 className="text-lg font-semibold text-gray-900">Multi‑Schema Pipeline Manager</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">Configure domains, harmonize schemas, synthesize cross‑domain data, and plan foundation model infrastructure.</p>

        {error && (
          <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-red-700 text-sm">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Domains (comma‑separated)</label>
            <input value={domainsText} onChange={e => setDomainsText(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Compute Mode</label>
            <select value={computeMode} onChange={e => setComputeMode(e.target.value as ComputeMode)} className="w-full px-3 py-2 border rounded">
              <option value="self-service">Self‑Hosted (you run compute)</option>
              <option value="full-service">Full‑Service AWS (managed)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={onPlan} className="inline-flex items-center px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900">
              <Settings className="h-4 w-4 mr-2" /> Plan Foundation Infra
            </button>
          </div>
        </div>

        <label className="block text-sm text-gray-700 mb-1">Domain Sample Data (JSON per domain)</label>
        <textarea value={domainDataText} onChange={e => setDomainDataText(e.target.value)} rows={8} className="w-full font-mono text-sm px-3 py-2 border rounded mb-3" />

        <div className="flex gap-3">
          <button onClick={onHarmonize} disabled={busy==='harmonize'} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
            <RefreshCw className="h-4 w-4 mr-2" /> {busy==='harmonize' ? 'Harmonizing…' : 'Harmonize Schemas'}
          </button>
          <button onClick={onSynthesize} disabled={!harmonizeResult || busy==='synthesize'} className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50">
            <Play className="h-4 w-4 mr-2" /> {busy==='synthesize' ? 'Synthesizing…' : 'Synthesize Cross‑Domain'}
          </button>
          {harmonizeResult && (
            <button onClick={() => downloadJson(harmonizeResult, 'harmonized_schema.json')} className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-800 rounded hover:bg-slate-200">
              <Download className="h-4 w-4 mr-2" /> Export Schema
            </button>
          )}
          {synthResult && (
            <button onClick={() => downloadJson(synthResult, 'synthesis_evidence.json')} className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-800 rounded hover:bg-slate-200">
              <Download className="h-4 w-4 mr-2" /> Export Evidence
            </button>
          )}
        </div>
      </div>

      {harmonizeResult && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-green-100 rounded-lg mr-3"><CheckCircle className="h-5 w-5 text-green-600" /></div>
            <h4 className="text-md font-semibold text-gray-900">Harmonized Schema</h4>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-4">Field</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Source</th>
                  <th className="py-2 pr-4">Required</th>
                </tr>
              </thead>
              <tbody>
                {harmonizeResult.harmonizedSchema.map((f, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 pr-4 text-gray-800">{f.name}</td>
                    <td className="py-2 pr-4 text-gray-800">{(f as any).type}</td>
                    <td className="py-2 pr-4 text-gray-600">{(f as any).source}</td>
                    <td className="py-2 pr-4 text-gray-600">{(f as any).required ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {synthResult && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-emerald-100 rounded-lg mr-3"><Database className="h-5 w-5 text-emerald-600" /></div>
            <h4 className="text-md font-semibold text-gray-900">Synthesis Output (sample)</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
            <div>Source Domains: <span className="font-medium">{synthResult.sourceDomains.join(', ')}</span></div>
            <div>Target Domain: <span className="font-medium">{synthResult.targetDomain}</span></div>
            <div>Statistical Fidelity: <span className="font-medium">{synthResult.qualityMetrics.statisticalFidelity}</span></div>
            <div>Domain Specificity: <span className="font-medium">{synthResult.qualityMetrics.domainSpecificity}</span></div>
            <div>Cross‑Domain Consistency: <span className="font-medium">{synthResult.qualityMetrics.crossDomainConsistency}</span></div>
          </div>
          <pre className="bg-gray-50 border rounded p-3 text-xs overflow-auto max-h-64">{JSON.stringify(synthResult.syntheticData.slice(0, 5), null, 2)}</pre>
        </div>
      )}

      {infraPlan && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-indigo-100 rounded-lg mr-3"><Settings className="h-5 w-5 text-indigo-600" /></div>
            <h4 className="text-md font-semibold text-gray-900">Foundation Model Infrastructure Plan</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>Model Type: <span className="font-medium">{infraPlan.modelType}</span></div>
            <div>Total Records: <span className="font-medium">{infraPlan.dataRequirements.totalRecords}</span></div>
            <div>Domain Coverage: <span className="font-medium">{infraPlan.dataRequirements.domainCoverage}</span></div>
            <div>Quality Threshold: <span className="font-medium">{infraPlan.dataRequirements.qualityThreshold}</span></div>
            <div>GPU Hours: <span className="font-medium">{infraPlan.computeRequirements.gpuHours}</span></div>
            <div>Memory (GB): <span className="font-medium">{infraPlan.computeRequirements.memoryGB}</span></div>
            <div>Storage (TB): <span className="font-medium">{infraPlan.computeRequirements.storageTB}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineManager;



