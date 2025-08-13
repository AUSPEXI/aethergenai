import React from 'react';
import { EnergyLedger, EnergyLedgerEntry } from '../../types/energyLedger';

const Row: React.FC<{ e: EnergyLedgerEntry }> = ({ e }) => (
  <tr className="border-b border-slate-700/50">
    <td className="px-3 py-2 text-slate-300 text-sm">{new Date(e.time).toLocaleTimeString()}</td>
    <td className="px-3 py-2 text-slate-200 text-sm">{e.type}</td>
    <td className="px-3 py-2 text-slate-300 text-xs">{e.from || '—'}</td>
    <td className="px-3 py-2 text-slate-300 text-xs">{e.to || '—'}</td>
    <td className="px-3 py-2 text-slate-300 text-sm">{e.deltaEnergy ?? '—'}</td>
  </tr>
);

export const EnergyLedgerPanel: React.FC<{ ledger: EnergyLedger | null }> = ({ ledger }) => {
  if (!ledger) return (
    <div className="rounded-xl p-4 bg-slate-900/70 border border-slate-700 text-slate-300">No energy transfers recorded yet.</div>
  );
  return (
    <div className="rounded-xl p-4 bg-slate-900/70 border border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <div className="text-slate-100 font-semibold">Energy Ledger</div>
        <div className="text-slate-400 text-sm">window {ledger.windowId} • total {ledger.totalEnergy.toFixed(2)}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs">
              <th className="px-3 py-2">Time</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">From</th>
              <th className="px-3 py-2">To</th>
              <th className="px-3 py-2">ΔEnergy</th>
            </tr>
          </thead>
          <tbody>
            {ledger.entries.map((e,i)=>(<Row key={i} e={e} />))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnergyLedgerPanel;


