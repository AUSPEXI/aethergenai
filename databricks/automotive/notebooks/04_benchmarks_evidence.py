# Databricks notebook source
# COMMAND ----------

"""
04_benchmarks_evidence.py — Compute utility metrics and simple privacy proxies; write evidence.

Widgets:
- catalog_name, schema_name, dataset_name
- volume_uri: where to write evidence (e.g., /Volumes/aethergen/automotive/automotive_assets)
- auc_min: minimum AUC to pass gate (default 0.75)
"""

# COMMAND ----------

from pyspark.sql import functions as F
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.evaluation import BinaryClassificationEvaluator
import json

dbutils.widgets.text("catalog_name", "aethergen", "catalog_name")
dbutils.widgets.text("schema_name", "automotive", "schema_name")
dbutils.widgets.text("dataset_name", "material_defect_v1", "dataset_name")
dbutils.widgets.text("volume_uri", "", "volume_uri")
dbutils.widgets.text("auc_min", "0.75", "auc_min")

catalog = dbutils.widgets.get("catalog_name").strip()
schema = dbutils.widgets.get("schema_name").strip()
dataset = dbutils.widgets.get("dataset_name").strip()
volume_uri = dbutils.widgets.get("volume_uri").strip().rstrip("/")
auc_min = float(dbutils.widgets.get("auc_min").strip() or "0.75")

full_table = f"{catalog}.{schema}.{dataset}"
df = spark.table(full_table)

features = ["surface_roughness","scratch_length_mm","dent_depth_mm","temperature_c","humidity_pct"]
va = VectorAssembler(inputCols=features, outputCol="features")
df2 = df.withColumn("label", F.col("defect_label").cast("double"))
splits = df2.randomSplit([0.8, 0.2], seed=42)
train = va.transform(splits[0]).select("features","label")
test = va.transform(splits[1]).select("features","label")

lr = LogisticRegression(maxIter=50)
model = lr.fit(train)
pred = model.transform(test)
auc = BinaryClassificationEvaluator(metricName="areaUnderROC").evaluate(pred)

# Simple privacy proxies
# k-anonymity proxy: distinct combinations frequency >= k
k = 5
qids = ["line_id","station_id","camera_id"]
freqs = df.groupBy(qids).count()
k_proxy_violations = freqs.filter(F.col("count") < k).count()

evidence = {
  "bundle_version": "1.0",
  "dataset": full_table,
  "metrics": {
    "utility": { "auc": auc },
    "privacy": { "k_proxy_violations": int(k_proxy_violations), "k": k }
  },
  "ablations": {
    "features": features,
    "notes": "Feature family toggles can be evaluated in extended runs."
  }
}

print({"auc": auc, "k_proxy_violations": int(k_proxy_violations)})

if volume_uri:
  out_path = f"{volume_uri}/{dataset}_evidence.json"
  dbutils.fs.put(out_path, json.dumps(evidence, indent=2), True)
  print({"evidence_uri": out_path})

passed = (auc >= auc_min) and (k_proxy_violations == 0)
print({"gate_passed": passed})


