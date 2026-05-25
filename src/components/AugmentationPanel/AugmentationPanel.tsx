import React, { useCallback, useEffect, useRef, useState } from 'react';

interface DistStats {
  total: number;
  audit_rows: number;
  distribution: Record<string, number>;
  date_range: { from: string; to: string } | null;
}

const ACTION_COLORS: Record<string, string> = {
  publish_fact:    'bg-blue-500',
  update_entity:   'bg-emerald-500',
  add_statistic:   'bg-purple-500',
  build_comparison:'bg-amber-500',
  no_action:       'bg-gray-400',
};

const ACTION_LABELS: Record<string, string> = {
  publish_fact:    'Publish Fact',
  update_entity:   'Update Entity',
  add_statistic:   'Add Statistic',
  build_comparison:'Build Comparison',
  no_action:       'No Action',
};

export default function AugmentationPanel() {
  const [stats, setStats]       = useState<DistStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError]     = useState<string | null>(null);

  const [file, setFile]         = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    inserted: number; skipped: number; processed: number;
    label_distribution?: Record<string, number>;
  } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const ENDPOINT = '/.netlify/functions/audit-to-training';

  // ── Load stats ─────────────────────────────────────────────────────────────
  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStats(await res.json());
    } catch (e: any) {
      setStatsError(e.message || 'Failed to load stats');
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  // ── File handling ──────────────────────────────────────────────────────────
  const processFile = (f: File) => {
    setFile(f);
    setUploadResult(null);
    setUploadError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  };

  // ── Upload ─────────────────────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    setUploadResult(null);

    try {
      const text = await file.text();
      let events: any[];

      // Support: raw array, or { events: [...] }, or NDJSON, or CSV-ish
      if (file.name.endsWith('.json') || file.name.endsWith('.jsonl')) {
        const parsed = JSON.parse(text);
        events = Array.isArray(parsed) ? parsed : parsed.events ?? [];
      } else {
        throw new Error('Please upload a JSON file exported from the audit log.');
      }

      if (events.length === 0) throw new Error('No events found in file.');

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);

      setUploadResult(json);
      // Refresh stats after successful upload
      await loadStats();
    } catch (e: any) {
      setUploadError(e.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // ── Download real rows as CSV ──────────────────────────────────────────────
  const downloadCSV = async () => {
    try {
      // Fetch rows via Supabase REST (anon key, read-only public)
      const url = (window as any).__SUPABASE_URL__ || import.meta?.env?.VITE_SUPABASE_URL;
      const anon = (window as any).__SUPABASE_ANON__ || import.meta?.env?.VITE_SUPABASE_ANON_KEY;
      if (!url || !anon) { alert('Supabase env not configured for client reads'); return; }

      const res = await fetch(
        `${url}/rest/v1/geo_training_rows?source=eq.audit_log&select=*&limit=10000`,
        { headers: { apikey: anon, Authorization: `Bearer ${anon}` } }
      );
      const rows: any[] = await res.json();
      if (!rows.length) { alert('No real data rows yet'); return; }

      // Flatten feature_json + top-level cols
      const merged = rows.map(r => ({ ...r.feature_json, optimization_action: r.optimization_action, source: r.source, event_date: r.event_date }));
      const headers = Object.keys(merged[0]);
      const csv = [headers.join(','), ...merged.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(','))].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `geo_real_training_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (e: any) {
      alert('Download failed: ' + e.message);
    }
  };

  const total = stats?.total ?? 0;
  const dist  = stats?.distribution ?? {};
  const maxCount = Math.max(1, ...Object.values(dist));

  const webhookUrl = `${window.location.origin}/.netlify/functions/audit-to-training`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">

      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Real Data Augmentation</h2>
        <p className="text-sm text-gray-600">
          Upload an audit log export from the GEO dashboard to extract real labeled training rows.
          Each simulation run, fact operation, and competitor analysis becomes a labeled
          &nbsp;<code className="bg-gray-100 px-1 rounded text-xs">optimization_action</code> training example.
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Pipeline Stats</h3>
          <button
            onClick={loadStats}
            disabled={statsLoading}
            className="text-xs text-blue-600 hover:underline disabled:text-gray-400"
          >
            {statsLoading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {statsError && <p className="text-sm text-red-600 mb-3">{statsError}</p>}

        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-gray-50 rounded p-3">
            <div className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-0.5">Real training rows</div>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <div className="text-2xl font-bold text-gray-900">{(stats?.audit_rows ?? 0).toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-0.5">From audit logs</div>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <div className="text-2xl font-bold text-gray-900">
              {stats?.date_range ? `${stats.date_range.from} → ${stats.date_range.to}` : '—'}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Date range</div>
          </div>
        </div>

        {/* Label distribution bar chart */}
        {total > 0 ? (
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Label Distribution</div>
            {['publish_fact', 'update_entity', 'add_statistic', 'build_comparison', 'no_action'].map(action => {
              const count = dist[action] ?? 0;
              const pct   = Math.round((count / total) * 100);
              return (
                <div key={action} className="flex items-center gap-3">
                  <div className="w-32 text-xs text-gray-700 text-right">{ACTION_LABELS[action]}</div>
                  <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                    <div
                      className={`h-full rounded ${ACTION_COLORS[action]} transition-all`}
                      style={{ width: `${Math.round((count / maxCount) * 100)}%` }}
                    />
                  </div>
                  <div className="w-16 text-xs text-gray-500 tabular-nums">{count} ({pct}%)</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No real rows yet — upload an audit export below to get started.</p>
        )}

        {total > 0 && (
          <button
            onClick={downloadCSV}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700"
          >
            Download real_training_rows.csv ({total.toLocaleString()} rows)
          </button>
        )}
      </div>

      {/* Upload */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-semibold text-gray-900 mb-1">Upload Audit Export</h3>
        <p className="text-sm text-gray-500 mb-4">
          From the GEO dashboard go to <strong>Audit Logs</strong>, export as JSON, then drop it here.
          Duplicate events are ignored automatically via row hash.
        </p>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
          }`}
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".json,.jsonl"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }}
          />

          {file ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-5 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {uploading ? 'Processing…' : 'Extract training rows'}
                </button>
                <button
                  onClick={() => { setFile(null); setUploadResult(null); setUploadError(null); }}
                  className="px-4 py-2 border text-sm rounded text-gray-600 hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-500">Drop audit export JSON here</p>
              <button
                onClick={() => fileRef.current?.click()}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded border hover:bg-gray-200"
              >
                Browse file
              </button>
            </div>
          )}
        </div>

        {uploadError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {uploadError}
          </div>
        )}

        {uploadResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded text-sm">
            <p className="font-medium text-green-800 mb-2">Upload complete</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xl font-bold text-green-700">{uploadResult.inserted}</div>
                <div className="text-xs text-green-600">New rows inserted</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-600">{uploadResult.skipped}</div>
                <div className="text-xs text-gray-500">Duplicates skipped</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-600">{uploadResult.processed}</div>
                <div className="text-xs text-gray-500">Events processed</div>
              </div>
            </div>
            {uploadResult.label_distribution && (
              <div className="mt-3 text-xs text-green-700">
                Labels extracted:{' '}
                {Object.entries(uploadResult.label_distribution)
                  .map(([k, v]) => `${ACTION_LABELS[k] ?? k}: ${v}`)
                  .join('  ·  ')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Webhook */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-semibold text-gray-900 mb-1">Automated Ingestion (webhook)</h3>
        <p className="text-sm text-gray-500 mb-3">
          POST batches of audit events directly — no manual upload needed once wired up.
        </p>
        <div className="bg-gray-900 text-green-400 rounded p-4 text-xs font-mono overflow-x-auto">
          <div className="text-gray-500 mb-1">POST</div>
          <div className="mb-3 break-all">{webhookUrl}</div>
          <div className="text-gray-500 mb-1">Body (JSON)</div>
          <div>{`{ "events": [ ...audit_logs array... ] }`}</div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Duplicate events are idempotent — safe to post the same batch multiple times.
        </p>
      </div>

      {/* Citacious note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <p className="font-medium mb-1">Citacious integration — Phase 2</p>
        <p>
          Once the base SLM is trained, log what Citacious recommends alongside the feature context
          and whether the user acted on it. These preference pairs feed a second fine-tuning pass
          (RLHF-style). Each row will appear here with <code className="bg-amber-100 px-1 rounded">source = citacious</code>.
        </p>
      </div>

    </div>
  );
}
