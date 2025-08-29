# Databricks notebook source
# COMMAND ----------

"""
03_synthetic_generate.py — Generate constrained synthetic automotive QC data, write Delta.

Widgets:
- catalog_name, schema_name, dataset_name
- delta_base_uri (optional)
- rows (default 100000)
"""

# COMMAND ----------

from pyspark.sql import functions as F
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, DoubleType, TimestampType
import random

dbutils.widgets.text("catalog_name", "aethergen", "catalog_name")
dbutils.widgets.text("schema_name", "automotive", "schema_name")
dbutils.widgets.text("dataset_name", "material_defect_v1", "dataset_name")
dbutils.widgets.text("delta_base_uri", "", "delta_base_uri")
dbutils.widgets.text("rows", "100000", "rows")

catalog = dbutils.widgets.get("catalog_name").strip()
schema = dbutils.widgets.get("schema_name").strip()
dataset = dbutils.widgets.get("dataset_name").strip()
delta_base = dbutils.widgets.get("delta_base_uri").strip().rstrip("/")
rows = int(dbutils.widgets.get("rows").strip() or "100000")

full_table = f"{catalog}.{schema}.{dataset}"
delta_uri = f"{delta_base}/{dataset}/" if delta_base else None

schema_def = StructType([
  StructField("ts", TimestampType(), True),
  StructField("line_id", StringType(), True),
  StructField("station_id", StringType(), True),
  StructField("camera_id", StringType(), True),
  StructField("part_serial", StringType(), True),
  StructField("surface_roughness", DoubleType(), True),
  StructField("scratch_length_mm", DoubleType(), True),
  StructField("dent_depth_mm", DoubleType(), True),
  StructField("temperature_c", DoubleType(), True),
  StructField("humidity_pct", DoubleType(), True),
  StructField("defect_label", IntegerType(), True)
])

def gen_row(i: int):
  # synthetic but plausible distributions
  rough = max(0.1, random.gauss(0.22, 0.05))
  scratch = max(0.0, random.gauss(0.4 if random.random() < 0.2 else 0.0, 0.3))
  dent = max(0.0, random.gauss(0.3 if random.random() < 0.1 else 0.0, 0.2))
  temp = random.gauss(22.0, 1.0)
  hum = min(60.0, max(35.0, random.gauss(45.0, 3.0)))
  defect = 1 if (rough > 0.27 or scratch > 1.0 or dent > 0.5) else 0
  return (
    F.current_timestamp(),
    f"L{1 + (i % 3)}",
    f"S{1 + (i % 5)}",
    f"C{1 + (i % 7)}",
    f"PS-{i:06d}",
    float(rough),
    float(scratch),
    float(dent),
    float(temp),
    float(hum),
    int(defect)
  )

rdd = spark.sparkContext.parallelize(range(rows)).map(gen_row)
df = spark.createDataFrame(rdd, schema_def)

if delta_uri:
  (df.write.format("delta").mode("overwrite").save(delta_uri))
  spark.sql(f"CREATE TABLE IF NOT EXISTS {full_table} USING DELTA LOCATION '{delta_uri}'")
else:
  (df.write.format("delta").mode("overwrite").saveAsTable(full_table))

# Optimize & Z-Order on frequent predicates
spark.sql(f"OPTIMIZE {full_table} ZORDER BY (ts, line_id, station_id)")

print({"rows": rows, "table": full_table})


