import type { Handler } from '@netlify/functions';
import { getServiceSupabase, ok, bad, parseBody, checkCsrf } from './_shared/supabase';

const handler: Handler = async (event) => {
  try {
    const action = event.queryStringParameters?.action || 'list';
    if (event.httpMethod !== 'GET' && !checkCsrf(event)) return bad('CSRF', 403);
    const supabase = getServiceSupabase();
    if (action === 'list') {
      const { data, error } = await supabase.from('schema_templates').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) return bad(error.message, 500);
      return ok({ items: data || [] });
    }
    if (action === 'create') {
      const body = parseBody(event);
      const { name, domain, tags, org_id, owner_id } = body;
      if (!name || !owner_id) return bad('name and owner_id required');
      const { data, error } = await supabase.from('schema_templates').insert({ name, domain, tags, org_id, owner_id }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ template: data });
    }
    if (action === 'addVersion') {
      const body = parseBody(event);
      const { template_id, schema_json, dp_defaults } = body;
      if (!template_id || !schema_json) return bad('template_id and schema_json required');
      const { data, error } = await supabase.from('schema_template_versions').insert({ template_id, schema_json, dp_defaults }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ version: data });
    }
    return bad('unknown action');
  } catch (e: any) {
    return bad(e.message || 'Server error', 500);
  }
};

export { handler };


