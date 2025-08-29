# Databricks notebook source
# COMMAND ----------

"""
01_setup_uc.py — Create/ensure Unity Catalog catalog, schema, and (optional) external Volume.

Widgets:
- catalog_name: e.g., aethergen
- schema_name: e.g., automotive
- volume_name: e.g., automotive_assets
- external_location_uri: optional, e.g., s3://your-bucket/aethergen/automotive/
"""

# COMMAND ----------

dbutils.widgets.text("catalog_name", "aethergen", "catalog_name")
dbutils.widgets.text("schema_name", "automotive", "schema_name")
dbutils.widgets.text("volume_name", "automotive_assets", "volume_name")
dbutils.widgets.text("external_location_uri", "", "external_location_uri")

catalog = dbutils.widgets.get("catalog_name").strip()
schema = dbutils.widgets.get("schema_name").strip()
volume = dbutils.widgets.get("volume_name").strip()
external_uri = dbutils.widgets.get("external_location_uri").strip()

print({
  "catalog": catalog,
  "schema": schema,
  "volume": volume,
  "external_location_uri": external_uri
})

# COMMAND ----------

# Create catalog and schema
spark.sql(f"CREATE CATALOG IF NOT EXISTS {catalog}")
spark.sql(f"CREATE SCHEMA IF NOT EXISTS {catalog}.{schema}")

# Create an external volume if a URI is provided
if external_uri:
  try:
    spark.sql(f"CREATE VOLUME IF NOT EXISTS {catalog}.{schema}.{volume} LOCATION '{external_uri}'")
    print({"volume_created": True, "uri": external_uri})
  except Exception as e:
    print({"volume_created": False, "error": str(e)})
else:
  print({"volume_skipped": True})

# COMMAND ----------

print("Unity Catalog setup complete.")


