import React, { useState } from 'react';
import { cleanSeedData, cleanSyntheticData, CleaningConfig, CleaningReport } from '../../services/dataCleaningService';

interface DataCleanerProps {
  mode: 'seed' | 'synthetic';
  schema: any;
  data: any[];
  onCleaned: (cleaned: any[], report: CleaningReport) => void;
}

const defaultConfig: CleaningConfig = {
  enforceSchema: true,
  dedupe: true,
  missing: { strategy: 'leave' },
  outliers: { method: 'iqr', k: 1.5 },
  pii: { redact: true, hash: false },
  text: { trim: true, normalizeWhitespace: true, lowercase: false },
  dates: { iso8601: true },
};

const DataCleaner: React.FC<DataCleanerProps> = ({ mode, schema, data, onCleaned }) => {
  const [config, setConfig] = useState<CleaningConfig>(defaultConfig);
  const [report, setReport] = useState<CleaningReport | null>(null);
  const [running, setRunning] = useState(false);
  const [cleanedData, setCleanedData] = useState<any[]>([]);

  const run = async () => {
    setRunning(true);
    try {
      const fn = mode === 'seed' ? cleanSeedData : cleanSyntheticData;
      const { cleaned, report } = fn(data, schema, config);
      setReport(report);
      setCleanedData(cleaned);
      onCleaned(cleaned, report);
    } finally {
      setRunning(false);
    }
  };

  const downloadCsv = () => {
    if (!cleanedData.length) return;
    const keys = Object.keys(cleanedData[0]);
    const escape = (v: any) => {
      if (v === null || v === undefined) return '';
      const s = String(v);
      return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [keys.join(','), ...cleanedData.map(row => keys.map(k => escape(row[k])).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `cleaned_${mode}_data.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJson = () => {
    if (!cleanedData.length) return;
    const blob = new Blob([JSON.stringify(cleanedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `cleaned_${mode}_data.json`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">🧹 Data Cleaning ({mode})</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!config.enforceSchema} onChange={e=>setConfig({...config, enforceSchema: e.target.checked})}/> Enforce schema</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!config.dedupe} onChange={e=>setConfig({...config, dedupe: e.target.checked})}/> Deduplicate</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!config.text?.trim} onChange={e=>setConfig({...config, text:{...(config.text||{}), trim: e.target.checked}})}/> Trim text</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!config.text?.normalizeWhitespace} onChange={e=>setConfig({...config, text:{...(config.text||{}), normalizeWhitespace: e.target.checked}})}/> Normalize whitespace</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!config.dates?.iso8601} onChange={e=>setConfig({...config, dates:{...(config.dates||{}), iso8601: e.target.checked}})}/> ISO dates</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!config.pii?.redact} onChange={e=>setConfig({...config, pii:{...(config.pii||{}), redact: e.target.checked}})}/> PII redact</label>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <button onClick={run} disabled={running || data.length===0} className={`px-4 py-2 rounded ${running||data.length===0?'bg-gray-400 text-gray-700':'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {running ? 'Cleaning…' : 'Run Cleaning'}
        </button>
        {report && (
          <div className="text-xs text-gray-600">
            {report.totalRows.toLocaleString()} rows • removed {report.rowsRemoved} • dedup {report.duplicatesRemoved} • outliers {report.outliersCapped} • PII {report.piiRedacted}
          </div>
        )}
      </div>

      {cleanedData.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Download cleaned data ({cleanedData.length.toLocaleString()} records)</p>
          <div className="flex gap-2">
            <button
              onClick={downloadCsv}
              className="px-4 py-2 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            >
              ⬇ Download CSV
            </button>
            <button
              onClick={downloadJson}
              className="px-4 py-2 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              ⬇ Download JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCleaner;


