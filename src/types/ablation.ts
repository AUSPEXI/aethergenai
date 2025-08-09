export type AblationPrivacy = {
  epsilon?: number;
  synthetic_ratio?: number;
};

export type AblationTraining = {
  moe?: { experts?: number; top_k?: number };
  precision?: 'FP32' | 'FP16' | 'BF16' | 'INT8' | 'FP8';
  modelFilter?: string[]; // run only these model names
};

export type AblationModules = {
  enable?: string[];
  disable?: string[];
};

export type AblationEntry = {
  name: string;
  description?: string;
  modules?: AblationModules;
  training?: AblationTraining;
  privacy?: AblationPrivacy;
  repeats?: number;
};

export type AblationRecipe = {
  version?: string; // e.g., '1.0'
  dataset?: string; // optional logical name/path
  schema_hash?: string; // optional for auditability
  repeats?: number; // default repeats per ablation
  cleaning?: CleaningSection; // optional cleaning config applied pre/post
  ablations: AblationEntry[];
  metrics?: string[]; // names of metrics to highlight
};

export type AblationRunResult = {
  ablationName: string;
  repeatIndex: number;
  modelName: string;
  metrics: Record<string, number>;
  experimentalFlags?: string[];
};

// Cleaning types (co-located to avoid a new import for now)
export type CleaningSection = {
  seed?: CleaningConfig;
  synthetic?: CleaningConfig;
  triadGuided?: boolean;
};

export type CleaningConfig = {
  enforceSchema?: boolean;
  dedupe?: boolean;
  missing?: {
    strategy: 'leave' | 'drop-row' | 'impute-mean' | 'impute-median' | 'impute-mode';
  };
  outliers?: {
    method: 'iqr' | 'zscore' | 'none';
    k?: number; // IQR multiplier or z threshold
  };
  pii?: {
    redact?: boolean;
    hash?: boolean;
  };
  text?: {
    trim?: boolean;
    normalizeWhitespace?: boolean;
    lowercase?: boolean;
  };
  dates?: {
    iso8601?: boolean;
  };
};


