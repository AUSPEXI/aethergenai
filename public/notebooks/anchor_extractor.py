# Databricks Python notebook (save and import as .py)
# Computes DP-friendly anchors from a table and writes anchors.json to DBFS or local

import json
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, expr

spark = SparkSession.builder.getOrCreate()

# CONFIG
TABLE = dbutils.widgets.get("table") if 'dbutils' in globals() else "default.sample"
OUT_PATH = dbutils.widgets.get("out_path") if 'dbutils' in globals() else "dbfs:/FileStore/aethergen/anchors.json"
SEG_BOROUGH = "pickup_borough"
NUMS = ["trip_distance_km", "trip_time_min", "fare_amount"]

df = spark.table(TABLE)

anchors = {"row_count": df.count(), "quantiles": {}, "segments": {}, "correlations": []}

for c in NUMS:
    q = (df
         .approxQuantile(c, [0.5, 0.9, 0.99], 0.01))
    anchors["quantiles"][c] = {"p50": q[0], "p90": q[1], "p99": q[2]}

# Segment mixes
seg = df.groupBy(SEG_BOROUGH).count()
total = seg.agg({"count":"sum"}).collect()[0][0]
anchors["segments"][SEG_BOROUGH] = [
    {"key": r[SEG_BOROUGH], "share": r["count"] / total} for r in seg.collect()
]

# Simple correlations
def corr(a,b):
    return df.select(expr(f"corr({a},{b}) AS c")).collect()[0][0]

pairs = [("trip_distance_km","fare_amount"),("trip_time_min","fare_amount")]
for a,b in pairs:
    anchors["correlations"].append({"pair":[a,b], "pearson": float(corr(a,b) or 0.0)})

data = {
    "name": "Anchors",
    "schema": {c:{"type":"number"} for c in NUMS},
    "aggregates": anchors,
}

content = json.dumps(data, indent=2)
if OUT_PATH.startswith("dbfs:"):
    dbutils.fs.put(OUT_PATH, content, True)
else:
    with open(OUT_PATH, 'w') as f:
        f.write(content)

print(f"Wrote anchors to {OUT_PATH}")


