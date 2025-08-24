export type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'categorical';

export interface SchemaField {
  name: string;
  type: FieldType;
  required?: boolean;
  categories?: string[]; // for categorical fields
  min?: number;
  max?: number;
}

export interface SeedSchema {
  domain: string;
  fields: SchemaField[];
}

export const getAutomotiveSeedSchema = (): SeedSchema => ({
  domain: 'automotive',
  fields: [
    { name: 'vin', type: 'string', required: true },
    { name: 'plant', type: 'categorical', categories: ['OXF', 'SND', 'MTY', 'STU'], required: true },
    { name: 'model', type: 'categorical', categories: ['Sedan', 'SUV', 'Hatch', 'Truck'] },
    { name: 'trim', type: 'categorical', categories: ['Base', 'Sport', 'Premium'] },
    { name: 'engine_type', type: 'categorical', categories: ['ICE', 'Hybrid', 'BEV'] },
    { name: 'production_date', type: 'date', required: true },
    { name: 'shift', type: 'categorical', categories: ['A', 'B', 'C'] },
    { name: 'operator_id', type: 'string' },
    { name: 'torque_nm', type: 'number', min: 80, max: 450 },
    { name: 'qc_score', type: 'number', min: 0, max: 100 },
    { name: 'test_pass', type: 'boolean' },
    { name: 'defects_count', type: 'number', min: 0, max: 7 },
    { name: 'defect_type', type: 'categorical', categories: ['none', 'paint', 'sensor', 'wiring', 'seal', 'panel'] },
    { name: 'warranty_claim', type: 'boolean' },
    { name: 'supplier_code', type: 'categorical', categories: ['SUP001', 'SUP002', 'SUP003', 'SUP004'] },
    { name: 'batch_id', type: 'string' }
  ]
});

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number, dp = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(dp));

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const randomDateWithinDays = (daysBack: number) => {
  const now = Date.now();
  const past = now - randomInt(0, daysBack) * 24 * 60 * 60 * 1000;
  return new Date(past).toISOString().slice(0, 10);
};

const randomVin = () => `AUS-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${randomInt(100000, 999999)}`;
const randomOperator = () => `OP${randomInt(1000, 9999)}`;
const randomBatch = () => `BATCH-${randomInt(10000, 99999)}`;

export function generateSeedRecords(schema: SeedSchema, count: number): any[] {
  const rows: any[] = [];
  for (let i = 0; i < count; i++) {
    const r: any = {};
    for (const f of schema.fields) {
      switch (f.type) {
        case 'string':
          if (f.name === 'vin') r[f.name] = randomVin();
          else if (f.name === 'operator_id') r[f.name] = randomOperator();
          else if (f.name === 'batch_id') r[f.name] = randomBatch();
          else r[f.name] = `${f.name}_${i}_${Math.random().toString(36).slice(2, 6)}`;
          break;
        case 'number':
          r[f.name] = f.min !== undefined && f.max !== undefined ? randomFloat(f.min, f.max, f.name === 'qc_score' ? 1 : 2) : randomFloat(0, 100);
          break;
        case 'boolean':
          r[f.name] = Math.random() > 0.5;
          break;
        case 'date':
          r[f.name] = randomDateWithinDays(365);
          break;
        case 'categorical':
          r[f.name] = f.categories && f.categories.length ? pick(f.categories) : null;
          break;
      }
    }
    // derive consistency: if defects_count > 0 then test_pass may be false more often
    if (typeof r['defects_count'] === 'number') {
      const failBias = r['defects_count'] > 0 ? 0.3 + Math.min(0.4, r['defects_count'] * 0.05) : 0.05;
      r['test_pass'] = Math.random() > failBias;
      r['defect_type'] = r['defects_count'] > 0 ? r['defect_type'] : 'none';
    }
    // warranty claims correlate with failures and low qc
    if (typeof r['qc_score'] === 'number') {
      const risk = (100 - r['qc_score']) / 100 + (r['test_pass'] ? 0 : 0.2);
      r['warranty_claim'] = Math.random() < Math.min(0.6, risk);
    }
    rows.push(r);
  }
  return rows;
}

export function* generateInChunks(schema: SeedSchema, total: number, chunkSize = 50000): Generator<any[], void, unknown> {
  let generated = 0;
  while (generated < total) {
    const size = Math.min(chunkSize, total - generated);
    yield generateSeedRecords(schema, size);
    generated += size;
  }
}


