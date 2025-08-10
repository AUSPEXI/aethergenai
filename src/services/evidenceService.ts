export type EvidenceBundle = {
  bundle_version: string;
  generated_at: string;
  app_version?: string;
  schema_hash?: string;
  recipe_hash?: string;
  dataset_hash?: string;
  privacy?: { epsilon?: number; synthetic_ratio?: number };
  cleaning_report?: any;
  ablation_summary?: any;
  notes?: string[];
  run_seed?: string;
  training?: {
    backend?: 'sklearn'|'pytorch'|'tensorflow';
    template?: string;
    params?: Record<string, any>;
  };
  ago?: { agoCoherence:number; symmetry72Loss:number; resonance432:number; stability137:number };
  harmonic432?: { resonanceEntropy:number; cycleClosure:number; offGridVariance:number; chordPurity:number };
  aum?: { aumScore:number; sustainSmoothness:number; fadeSymmetry:number; pass:boolean; certificateId:string };
  zk_upb_proof?: { proof: any; public: { epsilonBound: number; uniqueBound: number; ok?: boolean } };
};

export function buildEvidenceBundle(params: Partial<EvidenceBundle>): EvidenceBundle {
  return {
    bundle_version: '1.0',
    generated_at: new Date().toISOString(),
    ...params,
  } as EvidenceBundle;
}

export function downloadEvidenceBundle(bundle: EvidenceBundle, filename?: string) {
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `evidence_bundle_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Redacted share bundle (public)
export function buildRedactedShare(bundle: EvidenceBundle, sampleRows: any[], fieldsToRedact: string[] = [], maxRows = 200) {
  const piiRx = [
    /email/i,
    /phone/i,
    /address/i,
    /ssn|nhs|nin|passport/i,
  ];
  const redact = (row: any) => {
    const out: any = {};
    for (const k of Object.keys(row)) {
      if (fieldsToRedact.includes(k) || piiRx.some(rx => rx.test(k))) out[k] = '[redacted]';
      else out[k] = row[k];
    }
    return out;
  };
  const sample = sampleRows.slice(0, maxRows).map(redact);
  return {
    ...bundle,
    public_sample: sample,
  } as EvidenceBundle & { public_sample: any[] };
}

// Hash helpers
export function simpleHashString(s: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16);
}

export function hashArray(arr: any[], limit = 1000): string {
  const s = JSON.stringify(arr.slice(0, limit));
  return simpleHashString(s);
}


