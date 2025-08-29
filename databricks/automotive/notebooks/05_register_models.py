# Databricks notebook source
# COMMAND ----------

"""
05_register_models.py — Train/log a simple model; register in MLflow (Unity Catalog).

Widgets:
- catalog_name, schema_name, dataset_name
- model_name (defaults to catalog.schema.material_defect_detection_v1)
"""

# COMMAND ----------

import mlflow
from pyspark.sql import functions as F
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import LogisticRegression

dbutils.widgets.text("catalog_name", "aethergen", "catalog_name")
dbutils.widgets.text("schema_name", "automotive", "schema_name")
dbutils.widgets.text("dataset_name", "material_defect_v1", "dataset_name")
dbutils.widgets.text("model_name", "", "model_name")

catalog = dbutils.widgets.get("catalog_name").strip()
schema = dbutils.widgets.get("schema_name").strip()
dataset = dbutils.widgets.get("dataset_name").strip()
model_name = dbutils.widgets.get("model_name").strip() or f"{catalog}.{schema}.material_defect_detection_v1"

# Ensure Spark session exists (defensive)
try:
  _ = spark.version  # type: ignore
except Exception:
  from pyspark.sql import SparkSession  # type: ignore
  spark = SparkSession.builder.getOrCreate()

full_table = f"{catalog}.{schema}.{dataset}"
df = spark.table(full_table).withColumn("label", F.col("defect_label").cast("double"))

features = ["surface_roughness","scratch_length_mm","dent_depth_mm","temperature_c","humidity_pct"]
va = VectorAssembler(inputCols=features, outputCol="features")
data = va.transform(df).select("features","label")
train, test = data.randomSplit([0.9, 0.1], seed=42)

mlflow.set_registry_uri("databricks-uc")
mlflow.set_experiment(f"/Users/{spark.sql('select current_user()').first()[0]}/aethergen_automotive")

with mlflow.start_run(run_name="material_defect_detection_v1"):
  lr = LogisticRegression(maxIter=50)
  model = lr.fit(train)
  mlflow.spark.log_model(model, "model")
  run_id = mlflow.active_run().info.run_id

registered = mlflow.register_model(f"runs:/{run_id}/model", model_name)
print({"registered_model": model_name, "version": registered.version})


