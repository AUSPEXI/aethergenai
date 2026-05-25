export type LocalTaskType = 'auto' | 'classification' | 'regression';
export type LocalBackend = 'sklearn' | 'pytorch' | 'tensorflow';
export type GeoBaseModel = 'microsoft/Phi-3-mini-4k-instruct' | 'TinyLlama/TinyLlama-1.1B-Chat-v1.0' | 'meta-llama/Llama-3.2-3B-Instruct' | 'mistralai/Mistral-7B-Instruct-v0.2';

export function buildLocalTrainingScript(options: {
  targetColumn: string;
  task: LocalTaskType;
  backend?: LocalBackend;
}): string {
  const { targetColumn, task, backend = 'sklearn' } = options;
  const ts = new Date().toISOString();
  if (backend === 'pytorch') return buildTorchScript(targetColumn, task, ts);
  if (backend === 'tensorflow') return buildTfScript(targetColumn, task, ts);
  return `# AethergenAI Local Training Script
# Generated: ${ts}
# Usage:
#   python train_baseline.py --input synthetic_data.csv --target ${targetColumn} --task ${task}

import argparse, os, json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, accuracy_score, classification_report, r2_score, mean_absolute_error
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
import joblib

try:
    import mlflow
    MLFLOW_AVAILABLE = True
except Exception:
    MLFLOW_AVAILABLE = False


def load_table(path: str) -> pd.DataFrame:
    if path.lower().endswith('.csv'):
        return pd.read_csv(path)
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return pd.DataFrame(data)


parser = argparse.ArgumentParser()
parser.add_argument('--input', required=True, help='Path to CSV or JSON synthetic dataset')
parser.add_argument('--target', required=True, help='Target column name')
parser.add_argument('--task', default='auto', choices=['auto','classification','regression'])
args = parser.parse_args()

df = load_table(args.input)
if args.target not in df.columns:
    raise SystemExit(f'Target column {args.target!r} not in dataset columns: {list(df.columns)}')

# Basic cleaning: drop fully empty columns
df = df.dropna(axis=1, how='all')

# Simple type inference for task if auto
if args.task == 'auto':
    if pd.api.types.is_numeric_dtype(df[args.target]) and df[args.target].nunique() > 20:
        task = 'regression'
    else:
        task = 'classification'
else:
    task = args.task

X = df.drop(columns=[args.target])
y = df[args.target]

# One-hot encode non-numeric for a quick baseline
X = pd.get_dummies(X, drop_first=True)

# Align any non-numeric y for classification
if task == 'classification' and not pd.api.types.is_integer_dtype(y) and not pd.api.types.is_bool_dtype(y):
    y = y.astype('category').cat.codes

strat = y if (task=='classification' and y.nunique() < 50) else None
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42, stratify=strat)

if task == 'classification':
    model = RandomForestClassifier(n_estimators=400, max_depth=None, n_jobs=-1, random_state=42)
else:
    model = RandomForestRegressor(n_estimators=400, n_jobs=-1, random_state=42)

model.fit(Xtr, ytr)
yp = model.predict(Xte)

metrics = {}
if task == 'classification':
    metrics['f1_macro'] = float(f1_score(yte, yp, average='macro'))
    metrics['accuracy'] = float(accuracy_score(yte, yp))
    print('F1(macro):', metrics['f1_macro'])
    print('Accuracy:', metrics['accuracy'])
    try:
        print(classification_report(yte, yp))
    except Exception:
        pass
else:
    metrics['r2'] = float(r2_score(yte, yp))
    metrics['mae'] = float(mean_absolute_error(yte, yp))
    print('R2:', metrics['r2'])
    print('MAE:', metrics['mae'])

joblib.dump(model, 'model.joblib')
print('Model saved to model.joblib')

# Optional MLflow logging (works with local or Databricks if env is configured)
if MLFLOW_AVAILABLE:
    try:
        mlflow.set_experiment('aethergen_local')
        with mlflow.start_run():
            for k,v in metrics.items():
                mlflow.log_metric(k, v)
            mlflow.sklearn.log_model(model, 'model')
            mlflow.log_artifact(args.input)
            mlflow.log_text(json.dumps({'task': task, 'target': args.target}), 'run_meta.json')
        print('Logged to MLflow')
    except Exception as e:
        print('MLflow logging skipped:', e)
`;
}

export function downloadScriptFile(content: string, filename: string = 'train_baseline.py') {
  const blob = new Blob([content], { type: 'text/x-python' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildRequirements(backend: LocalBackend): string {
  const common = ['pandas', 'scikit-learn', 'mlflow>=2.9.0'];
  if (backend === 'sklearn') return [...common, 'joblib'].join('\n') + '\n';
  if (backend === 'pytorch') return [...common, 'torch', 'numpy'].join('\n') + '\n';
  return [...common, 'tensorflow>=2.14.0', 'numpy'].join('\n') + '\n';
}

export function buildReadmeSnippet(options: { backend: LocalBackend; target: string }): string {
  const { backend, target } = options;
  const file = 'synthetic_data.csv';
  return `# AethergenAI Local Training ( ${backend} )\n\n## Setup\npython -m venv .venv\n. .venv/bin/activate  # Windows: .venv\\\\Scripts\\\\activate\npip install -r requirements.txt\n\n## Train\npython train_baseline.py --input ${file} --target ${target} --task auto\n`;
}

function buildTorchScript(targetColumn: string, task: LocalTaskType, ts: string): string {
  return `# AethergenAI Local Training Script (PyTorch)\n# Generated: ${ts}\n\nimport argparse, json\nimport pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nimport torch\nimport torch.nn as nn\nfrom torch.utils.data import TensorDataset, DataLoader\n\ntry:\n    import mlflow\n    MLFLOW_AVAILABLE = True\nexcept Exception:\n    MLFLOW_AVAILABLE = False\n\nparser = argparse.ArgumentParser()\nparser.add_argument('--input', required=True)\nparser.add_argument('--target', required=True)\nparser.add_argument('--task', default='auto', choices=['auto','classification','regression'])\nparser.add_argument('--epochs', type=int, default=10)\nparser.add_argument('--batch_size', type=int, default=128)\nparser.add_argument('--lr', type=float, default=1e-3)\nparser.add_argument('--hidden', type=int, default=128)\nargs = parser.parse_args()\n\ndf = pd.read_csv(args.input) if args.input.lower().endswith('.csv') else pd.DataFrame(json.load(open(args.input)))\nif args.target not in df.columns: raise SystemExit('target not in columns')\n\nif args.task == 'auto':\n    task = 'regression' if pd.api.types.is_numeric_dtype(df[args.target]) and df[args.target].nunique()>20 else 'classification'\nelse:\n    task = args.task\n\nX = pd.get_dummies(df.drop(columns=[args.target]), drop_first=True)\ny_raw = df[args.target]\nif task=='classification': y = y_raw.astype('category').cat.codes.values.astype(np.int64)\nelse: y = y_raw.values.astype(np.float32)\n\nXtr, Xte, ytr, yte = train_test_split(X.values.astype(np.float32), y, test_size=0.2, random_state=42, stratify=(y if task=='classification' and len(np.unique(y))<50 else None))\n\ninput_dim = Xtr.shape[1]\nnum_classes = int(np.max(y)+1) if task=='classification' else 1\n\nclass MLP(nn.Module):\n    def __init__(self, inp, hid, out):\n        super().__init__()\n        self.net = nn.Sequential(nn.Linear(inp,hid), nn.ReLU(), nn.Linear(hid,out))\n    def forward(self, x): return self.net(x)\n\nmodel = MLP(input_dim, args.hidden, num_classes)\nopt = torch.optim.Adam(model.parameters(), lr=args.lr)\ncrit = nn.CrossEntropyLoss() if task=='classification' else nn.MSELoss()\n\ntr_ds = TensorDataset(torch.from_numpy(Xtr), torch.from_numpy(ytr))\nte_ds = TensorDataset(torch.from_numpy(Xte), torch.from_numpy(yte))\ntr_dl = DataLoader(tr_ds, batch_size=args.batch_size, shuffle=True)\n\ndef eval_acc():\n    model.eval()\n    with torch.no_grad():\n        Xb, yb = te_ds[:]\n        out = model(Xb)\n        if task=='classification':\n            pred = out.argmax(dim=1)\n            acc = (pred==yb).float().mean().item()\n            return {'accuracy': acc}\n        else:\n            mse = ((out.squeeze()-yb)**2).mean().item()\n            return {'mse': mse}\n\nfor epoch in range(args.epochs):\n    model.train()\n    for xb, yb in tr_dl:\n        opt.zero_grad()\n        out = model(xb)\n        loss = crit(out, yb if task=='classification' else yb.view(-1,1))\n        loss.backward(); opt.step()\n\nmetrics = eval_acc(); print(metrics)\nimport joblib; joblib.dump(model.state_dict(), 'model_state.pt')\n\nif MLFLOW_AVAILABLE:\n    try:\n        mlflow.set_experiment('aethergen_local')\n        with mlflow.start_run():\n            for k,v in metrics.items(): mlflow.log_metric(k, float(v))\n            mlflow.log_artifact(args.input)\n            mlflow.log_text(str(metrics), 'metrics.txt')\n    except Exception as e:\n        print('MLflow logging skipped:', e)\n`;
}

function buildTfScript(targetColumn: string, task: LocalTaskType, ts: string): string {
  return `# AethergenAI Local Training Script (TensorFlow)\n# Generated: ${ts}\n\nimport argparse, json\nimport pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nimport tensorflow as tf\n\ntry:\n    import mlflow\n    MLFLOW_AVAILABLE = True\nexcept Exception:\n    MLFLOW_AVAILABLE = False\n\nparser = argparse.ArgumentParser()\nparser.add_argument('--input', required=True)\nparser.add_argument('--target', required=True)\nparser.add_argument('--task', default='auto', choices=['auto','classification','regression'])\nparser.add_argument('--epochs', type=int, default=10)\nparser.add_argument('--batch_size', type=int, default=128)\nparser.add_argument('--hidden', type=int, default=128)\nargs = parser.parse_args()\n\ndf = pd.read_csv(args.input) if args.input.lower().endswith('.csv') else pd.DataFrame(json.load(open(args.input)))\nif args.target not in df.columns: raise SystemExit('target not in columns')\n\nif args.task == 'auto':\n    task = 'regression' if pd.api.types.is_numeric_dtype(df[args.target]) and df[args.target].nunique()>20 else 'classification'\nelse:\n    task = args.task\n\nX = pd.get_dummies(df.drop(columns=[args.target]), drop_first=True)\ny_raw = df[args.target]\nif task=='classification': y = y_raw.astype('category').cat.codes.values.astype(np.int64)\nelse: y = y_raw.values.astype(np.float32)\n\nXtr, Xte, ytr, yte = train_test_split(X.values.astype(np.float32), y, test_size=0.2, random_state=42, stratify=(y if task=='classification' and len(np.unique(y))<50 else None))\n\ninput_dim = Xtr.shape[1]\nnum_classes = int(np.max(y)+1) if task=='classification' else 1\n\nmodel = tf.keras.Sequential([tf.keras.layers.Input(shape=(input_dim,)), tf.keras.layers.Dense(args.hidden, activation='relu'), tf.keras.layers.Dense(num_classes)])\nif task=='classification':\n    loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)\n    metrics=['accuracy']\nelse:\n    loss = 'mse'\n    metrics=['mse']\nmodel.compile(optimizer=tf.keras.optimizers.Adam(1e-3), loss=loss, metrics=metrics)\n\nh = model.fit(Xtr, ytr, validation_split=0.1, epochs=args.epochs, batch_size=args.batch_size, verbose=0)\nresults = model.evaluate(Xte, yte, verbose=0)\nprint(dict(zip(model.metrics_names, [float(r) for r in results])))\nmodel.save('model_tf')\n\nif MLFLOW_AVAILABLE:\n    try:\n        mlflow.set_experiment('aethergen_local')\n        with mlflow.start_run():\n            mlflow.log_artifact(args.input)\n            mlflow.log_text(str(dict(zip(model.metrics_names, [float(r) for r in results]))), 'metrics.txt')\n    except Exception as e:\n        print('MLflow logging skipped:', e)\n`;
}

// ─────────────────────────────────────────────────────────────────────────────
// GEO SLM Fine-tuning Bundle
// Produces a complete HuggingFace PEFT LoRA training kit for GEO SLM
// ─────────────────────────────────────────────────────────────────────────────

export interface GeoSLMParams {
  baseModel: GeoBaseModel;
  loraRank: number;
  loraAlpha: number;
  epochs: number;
  learningRate: number;
  batchSize: number;
  maxLength: number;
  maxTrainRows: number;
  targetColumn: string;
}

export function buildGeoSLMBundle(params: GeoSLMParams): {
  script: string;
  config: string;
  requirements: string;
  readme: string;
} {
  return {
    script: buildGeoSLMScript(params),
    config: buildGeoSLMConfig(params),
    requirements: buildGeoSLMRequirements(),
    readme: buildGeoSLMReadme(params),
  };
}

function buildGeoSLMScript(p: GeoSLMParams): string {
  return `#!/usr/bin/env python3
"""
AethergenAI – GEO SLM Fine-tuning Script
Task:  Predict optimization_action from GEO query context + brand metrics
Input: geo_synthetic_data.csv (69 fields, 1M rows)
Label: ${p.targetColumn}  →  publish_fact | update_entity | add_statistic | build_comparison | no_action

Run:   python train_geo_slm.py --data geo_synthetic_data.csv --config config.yaml
Colab: Upload this script + config.yaml + data CSV, then run in a T4 GPU notebook.
"""

import argparse
import os
import json
import yaml
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, classification_report

import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    BitsAndBytesConfig,
)
from peft import (
    LoraConfig,
    TaskType,
    get_peft_model,
    prepare_model_for_kbit_training,
)
from trl import SFTTrainer
from datasets import Dataset

# ── Config ────────────────────────────────────────────────────────────────────

parser = argparse.ArgumentParser()
parser.add_argument('--data',   required=True, help='Path to GEO synthetic CSV')
parser.add_argument('--config', default='config.yaml')
parser.add_argument('--output', default='geo_slm_adapter')
args = parser.parse_args()

with open(args.config) as f:
    cfg = yaml.safe_load(f)

BASE_MODEL    = cfg.get('base_model',    '${p.baseModel}')
LORA_RANK     = cfg.get('lora_rank',     ${p.loraRank})
LORA_ALPHA    = cfg.get('lora_alpha',    ${p.loraAlpha})
LORA_DROPOUT  = cfg.get('lora_dropout',  0.05)
EPOCHS        = cfg.get('epochs',        ${p.epochs})
LR            = cfg.get('learning_rate', ${p.learningRate})
BATCH_SIZE    = cfg.get('batch_size',    ${p.batchSize})
GRAD_ACCUM    = cfg.get('gradient_accumulation_steps', 4)
MAX_LENGTH    = cfg.get('max_length',    ${p.maxLength})
MAX_ROWS      = cfg.get('max_train_rows',${p.maxTrainRows})
TARGET_COL    = cfg.get('target_column', '${p.targetColumn}')
USE_4BIT      = cfg.get('use_4bit', True) and torch.cuda.is_available()

LABEL_CLASSES = ['publish_fact', 'update_entity', 'add_statistic', 'build_comparison', 'no_action']

# ── Data formatting ───────────────────────────────────────────────────────────

def row_to_prompt(row: pd.Series) -> str:
    """Convert a 56-field GEO data row into an instruction-style prompt."""
    cited_rank = "" if pd.isna(row.get('citation_rank')) else f" (rank {int(row.get('citation_rank', 0))})"
    fact_snippet = str(row.get('fact_text', ''))[:120]
    return (
        "### GEO Optimisation Request\\n"
        f"Query: {row.get('query_text', row.get('search_query', ''))}\\n"
        f"Brand: {row.get('brand', '')}\\n"
        f"AI Engine: {row.get('ai_engine', '')}  |  Model: {row.get('model_version', '')}\\n"
        f"Semantic Cluster: {row.get('semantic_cluster', '')}\\n"
        f"Anchor Type: {row.get('anchor_type', 'none')}\\n"
        "\\n# Content Quality\\n"
        f"Content Score: {float(row.get('content_score', 0)):.1f}\\n"
        f"Entity Recall Rate: {float(row.get('entity_recall_rate', 0)):.1f}\\n"
        f"Entity Density Score: {float(row.get('entity_density_score', 0)):.1f}\\n"
        f"Statistical Anchors: {float(row.get('statistical_anchors_score', 0)):.1f}\\n"
        f"Inverted Pyramid: {float(row.get('inverted_pyramid_score', 0)):.1f}\\n"
        f"Entropy Score: {float(row.get('entropy_score', 0)):.1f}\\n"
        f"Content Feedback Count: {int(row.get('content_feedback_count', 0))}\\n"
        f"Rewrite Available: {row.get('rewritten_snippet_available', False)}\\n"
        f"Days Since Published: {int(row.get('days_since_published', 0))}\\n"
        f"Content Type: {row.get('content_type', '')}\\n"
        "\\n# Citation & Visibility\\n"
        f"Is Cited: {row.get('is_cited', False)}{cited_rank}\\n"
        f"Citation Trigger: {row.get('citation_trigger', 'none')}\\n"
        f"SOV Score: {float(row.get('sov_score', 0)):.1f}\\n"
        f"Cross-Engine Citation Rate: {float(row.get('cross_engine_citation_rate', 0)):.2f}\\n"
        f"AI Traffic: {int(row.get('ai_traffic', 0))}\\n"
        f"Competitive Density: {int(row.get('competitive_density', 0))}\\n"
        "\\n# Competitive Position\\n"
        f"Competitor Gap: {float(row.get('competitor_gap', 0)):.1f}\\n"
        f"Competitor SOV: {float(row.get('competitor_sov', 0)):.1f}\\n"
        f"Trojan Horse Opportunity: {row.get('trojan_horse_opportunity', False)}\\n"
        "\\n# Fact Vault\\n"
        f"Fact Category: {row.get('fact_category', 'none')}\\n"
        f"Fact Entropy Score: {float(row.get('fact_entropy_score', 0)):.1f}\\n"
        f"Best Fact: {fact_snippet}\\n"
        "\\n# Brand Health\\n"
        f"Sentiment: {row.get('sentiment', '')} ({float(row.get('sentiment_score', 0)):.0f})\\n"
        f"Threat Count: {int(row.get('threat_count', 0))}\\n"
        f"Risk Score: {float(row.get('risk_score', 0)):.1f}\\n"
        f"Z-Score: {float(row.get('z_score', 0)):.2f}\\n"
        f"Drift Detected: {row.get('drift_detected', False)}\\n"
        f"Decay Status: {row.get('decay_status', '')} (score: {float(row.get('decay_score', 0)):.1f})\\n"
        "\\n# Latent Space Geometry\\n"
        f"UMAP Position: x={float(row.get('umap_x', 0)):.2f}  y={float(row.get('umap_y', 0)):.2f}  z={float(row.get('umap_z', 0)):.2f}\\n"
        f"Distance to Nearest Anchor: {float(row.get('distance_to_nearest_anchor', 0.5)):.3f}\\n"
        f"Distance Delta (30d): {float(row.get('distance_delta_30d', 0)):+.3f}\\n"
        f"Drift Direction: {row.get('drift_direction', 'neutral')}\\n"
        "\\n# Anchor Proximity Scores\\n"
        f"  enterprise-trusted:   {float(row.get('cluster_sim_enterprise_trusted', 0)):.3f}\\n"
        f"  thought-leader:       {float(row.get('cluster_sim_thought_leader', 0)):.3f}\\n"
        f"  cost-leader:          {float(row.get('cluster_sim_cost_leader', 0)):.3f}\\n"
        f"  technical-authority:  {float(row.get('cluster_sim_technical_authority', 0)):.3f}\\n"
        f"  brand-advocate:       {float(row.get('cluster_sim_brand_advocate', 0)):.3f}\\n"
        f"  challenger:           {float(row.get('cluster_sim_challenger', 0)):.3f}\\n"
        f"  niche-specialist:     {float(row.get('cluster_sim_niche_specialist', 0)):.3f}\\n"
        "\\n### Recommended Optimisation Action:"
    )

def build_hf_dataset(df: pd.DataFrame) -> Dataset:
    records = []
    for _, row in df.iterrows():
        label = row.get(TARGET_COL)
        if pd.isna(label) or label not in LABEL_CLASSES:
            continue
        prompt = row_to_prompt(row)
        records.append({'text': f"{prompt} {label}", 'prompt': prompt})
    return Dataset.from_list(records)

# ── Load data ─────────────────────────────────────────────────────────────────

print(f"Loading {args.data} ...")
df = pd.read_csv(args.data)
df = df[df[TARGET_COL].isin(LABEL_CLASSES)].copy()
print(f"  {len(df):,} rows with valid labels")
print(f"  Distribution:\\n{df[TARGET_COL].value_counts().to_string()}")

if len(df) > MAX_ROWS:
    df = df.sample(MAX_ROWS, random_state=42)
    print(f"  Sampled to {MAX_ROWS:,} rows")

train_df, eval_df = train_test_split(
    df, test_size=0.1, random_state=42, stratify=df[TARGET_COL]
)
print(f"  Train: {len(train_df):,}  |  Eval: {len(eval_df):,}")

train_ds = build_hf_dataset(train_df)
eval_ds  = build_hf_dataset(eval_df)

# ── Model + LoRA ─────────────────────────────────────────────────────────────

print(f"\\nLoading {BASE_MODEL} ...")
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type='nf4',
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
) if USE_4BIT else None

model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL,
    quantization_config=bnb_config,
    device_map='auto' if torch.cuda.is_available() else 'cpu',
    trust_remote_code=True,
    torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
)
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL, trust_remote_code=True)
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = 'right'

if USE_4BIT:
    model = prepare_model_for_kbit_training(model)

lora_cfg = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=LORA_RANK,
    lora_alpha=LORA_ALPHA,
    lora_dropout=LORA_DROPOUT,
    target_modules=['q_proj', 'v_proj', 'k_proj', 'o_proj'],
    bias='none',
)
model = get_peft_model(model, lora_cfg)
model.print_trainable_parameters()

# ── Training ─────────────────────────────────────────────────────────────────

training_args = TrainingArguments(
    output_dir=args.output,
    num_train_epochs=EPOCHS,
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    gradient_accumulation_steps=GRAD_ACCUM,
    warmup_ratio=0.03,
    learning_rate=LR,
    weight_decay=0.001,
    bf16=USE_4BIT,
    fp16=torch.cuda.is_available() and not USE_4BIT,
    logging_steps=100,
    eval_strategy='epoch',
    save_strategy='epoch',
    load_best_model_at_end=True,
    report_to='none',
)

trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=train_ds,
    eval_dataset=eval_ds,
    tokenizer=tokenizer,
    dataset_text_field='text',
    max_seq_length=MAX_LENGTH,
    packing=False,
)

print("\\nFine-tuning started ...")
trainer.train()

# ── Save adapter ──────────────────────────────────────────────────────────────

trainer.model.save_pretrained(args.output)
tokenizer.save_pretrained(args.output)
print(f"\\nLoRA adapter saved to {args.output}/")

# ── Quick evaluation ──────────────────────────────────────────────────────────

print("\\nEvaluating on 500 held-out samples ...")
model.eval()
sample = eval_df.sample(min(500, len(eval_df)), random_state=42)
preds, truths = [], []

with torch.no_grad():
    for _, row in sample.iterrows():
        prompt = row_to_prompt(row)
        inputs = tokenizer(prompt, return_tensors='pt', max_length=MAX_LENGTH, truncation=True)
        inputs = {k: v.to(model.device) for k, v in inputs.items()}
        out = model.generate(
            **inputs, max_new_tokens=8, do_sample=False,
            pad_token_id=tokenizer.eos_token_id
        )
        decoded = tokenizer.decode(
            out[0][inputs['input_ids'].shape[1]:], skip_special_tokens=True
        ).strip().split()[0] if out[0].shape[0] > inputs['input_ids'].shape[1] else ''
        preds.append(decoded if decoded in LABEL_CLASSES else 'no_action')
        truths.append(row[TARGET_COL])

f1 = f1_score(truths, preds, average='macro', labels=LABEL_CLASSES, zero_division=0)
print(f"\\nF1 (macro): {f1:.4f}")
print(classification_report(truths, preds, labels=LABEL_CLASSES, zero_division=0))

results = {
    'base_model': BASE_MODEL, 'lora_rank': LORA_RANK, 'epochs': EPOCHS,
    'f1_macro': round(f1, 4), 'train_rows': len(train_df), 'eval_rows': len(eval_df),
}
with open(os.path.join(args.output, 'eval_results.json'), 'w') as f:
    json.dump(results, f, indent=2)
print(f"Results: {results}")
print(f"\\nDone. Load adapter with:")
print(f"  from peft import PeftModel")
print(f"  model = PeftModel.from_pretrained(base_model, '{args.output}')")
`;
}

function buildGeoSLMConfig(p: GeoSLMParams): string {
  return `# AethergenAI GEO SLM Training Configuration
# Edit these values before running train_geo_slm.py

base_model: "${p.baseModel}"
target_column: "${p.targetColumn}"

# LoRA parameters
lora_rank: ${p.loraRank}
lora_alpha: ${p.loraAlpha}
lora_dropout: 0.05

# Training
epochs: ${p.epochs}
learning_rate: ${p.learningRate}
batch_size: ${p.batchSize}
gradient_accumulation_steps: 4
max_length: ${p.maxLength}
max_train_rows: ${p.maxTrainRows}

# Hardware
use_4bit: true        # set false if bitsandbytes not available

# Optional
use_wandb: false
run_name: geo-slm-finetune
`;
}

function buildGeoSLMRequirements(): string {
  return `# AethergenAI GEO SLM requirements
torch>=2.1.0
transformers>=4.40.0
peft>=0.10.0
trl>=0.8.6
datasets>=2.18.0
accelerate>=0.27.0
bitsandbytes>=0.43.0
scikit-learn>=1.3.0
pandas>=2.0.0
numpy>=1.24.0
pyyaml>=6.0
`;
}

function buildGeoSLMReadme(p: GeoSLMParams): string {
  return `# GEO SLM Fine-tuning — AethergenAI

## What this does
Fine-tunes **${p.baseModel}** on GEO Platform synthetic data using LoRA (PEFT).

**Task:** Given a GEO query + brand metrics, predict the best optimisation action.
**Label field:** \`${p.targetColumn}\`
**Classes:** publish_fact | update_entity | add_statistic | build_comparison | no_action

---

## Files
| File | Purpose |
|---|---|
| \`train_geo_slm.py\` | Main fine-tuning script |
| \`config.yaml\` | All hyperparameters — edit here |
| \`requirements.txt\` | Python dependencies |
| \`geo_synthetic_data.csv\` | Your 1M row training data — 69 fields (download from AethergenAI) |

---

## Quick start (Google Colab — free T4 GPU)

\`\`\`python
# In a Colab cell:
!pip install -r requirements.txt
!python train_geo_slm.py --data geo_synthetic_data.csv --config config.yaml
\`\`\`

Upload all 4 files to your Colab session before running.

---

## Quick start (local GPU, 8GB+ VRAM)

\`\`\`bash
python -m venv .venv
source .venv/bin/activate       # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python train_geo_slm.py --data geo_synthetic_data.csv --config config.yaml
\`\`\`

---

## Using the trained adapter

\`\`\`python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch

base = AutoModelForCausalLM.from_pretrained("${p.baseModel}", torch_dtype=torch.bfloat16)
model = PeftModel.from_pretrained(base, "geo_slm_adapter")
tokenizer = AutoTokenizer.from_pretrained("${p.baseModel}")

prompt = """### GEO Optimisation Request
Query: best AI SEO tools for enterprise
Brand: AcmeCloud
AI Engine: ChatGPT  |  Model: gpt-4o
Semantic Cluster: enterprise-trusted
Anchor Type: systemic_anchor

# Content Quality
Content Score: 62.5
Entity Recall Rate: 38.0
Entity Density Score: 41.2
Statistical Anchors: 35.8
Inverted Pyramid: 71.0
Entropy Score: 58.3
Content Feedback Count: 3
Rewrite Available: True
Days Since Published: 187
Content Type: blog

# Citation & Visibility
Is Cited: False
Citation Trigger: none
SOV Score: 41.3
Cross-Engine Citation Rate: 0.25
AI Traffic: 3420
Competitive Density: 4

# Competitive Position
Competitor Gap: -14.2
Competitor SOV: 55.5
Trojan Horse Opportunity: False

# Fact Vault
Fact Category: none
Fact Entropy Score: 72.0
Best Fact:

# Brand Health
Sentiment: Neutral (8)
Threat Count: 2
Risk Score: 31.0
Z-Score: 0.42
Drift Detected: False
Decay Status: decaying (score: 52.1)

# Latent Space Geometry
UMAP Position: x=3.18  y=1.31  z=0.64
Distance to Nearest Anchor: 0.214
Distance Delta (30d): +0.038
Drift Direction: negative

# Anchor Proximity Scores
  enterprise-trusted:   0.786
  thought-leader:       0.541
  cost-leader:          0.112
  technical-authority:  0.423
  brand-advocate:       0.198
  challenger:           0.087
  niche-specialist:     0.143

### Recommended Optimisation Action:"""

inputs = tokenizer(prompt, return_tensors="pt")
out = model.generate(**inputs, max_new_tokens=8, do_sample=False)
print(tokenizer.decode(out[0][inputs["input_ids"].shape[1]:], skip_special_tokens=True))
\`\`\`

---

## Phase 2 — augment with real Gemini data

Once the base SLM is fine-tuned, collect real GEO queries via the Gemini API
(with Google Search grounding enabled) and fine-tune again on the augmented dataset.
This replaces synthetic optimization_action labels with real observed citation outcomes.

\`\`\`python
# Gemini grounded collection (see consultancy repo collect-geo-data.ts)
tools = [{"googleSearch": {}}]
response = genai_client.generate_content(query, tools=tools)
citations = response.candidates[0].grounding_metadata.grounding_chunks
\`\`\`
`;
}
