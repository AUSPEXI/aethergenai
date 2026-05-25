-- RLS for geo_training_rows
-- Service-role key bypasses RLS (used by the Netlify function).
-- No anon/authenticated reads needed; writes only via service role.

ALTER TABLE geo_training_rows ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (RLS is bypassed for service role by default,
-- but this makes the intent explicit and ensures future role grants work correctly).
CREATE POLICY "service_role_all" ON geo_training_rows
  AS PERMISSIVE FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
