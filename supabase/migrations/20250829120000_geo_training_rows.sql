-- geo_training_rows: real labeled training data derived from audit logs and Citacious
-- Each row is a 56-field GEO feature vector + an optimization_action label.
-- Source 'audit_log' rows are derived from consultancy platform user activity.
-- Source 'citacious' rows will come from copilot recommendation logging (future).
-- row_hash prevents duplicates when the same audit export is uploaded twice.

CREATE TABLE IF NOT EXISTS geo_training_rows (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Provenance
  source               text        NOT NULL DEFAULT 'audit_log'
                                   CHECK (source IN ('audit_log', 'synthetic', 'citacious')),
  audit_trigger_event  text,                    -- audit log action that generated this row
  user_id_hash         text,                    -- SHA-256 of userId (privacy-safe)
  session_id           text,                    -- session bucket (userId + window index)
  row_hash             text        UNIQUE NOT NULL, -- SHA-256 dedup key

  -- Training label
  optimization_action  text        NOT NULL
                                   CHECK (optimization_action IN (
                                     'publish_fact', 'update_entity', 'add_statistic',
                                     'build_comparison', 'no_action'
                                   )),

  -- Key feature columns (indexed for distribution queries)
  brand                text,
  ai_engine            text,
  sov_score            numeric,
  competitor_gap       numeric,
  entity_recall_rate   numeric,
  content_score        numeric,
  risk_score           numeric,
  sentiment            text,
  decay_status         text,

  -- Full 56-field feature vector (flexible JSONB for schema evolution)
  feature_json         jsonb       NOT NULL DEFAULT '{}',

  -- Optional Citacious preference signal (Phase 2)
  copilot_recommended  boolean     DEFAULT false,

  event_date           date,
  created_at           timestamptz DEFAULT now()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_geo_tr_action  ON geo_training_rows (optimization_action);
CREATE INDEX IF NOT EXISTS idx_geo_tr_source  ON geo_training_rows (source);
CREATE INDEX IF NOT EXISTS idx_geo_tr_date    ON geo_training_rows (event_date);
CREATE INDEX IF NOT EXISTS idx_geo_tr_brand   ON geo_training_rows (brand);
CREATE INDEX IF NOT EXISTS idx_geo_tr_engine  ON geo_training_rows (ai_engine);
