import type { Handler } from '@netlify/functions';
import { getServiceSupabase, ok, bad, parseBody, checkCsrf } from './_shared/supabase';

const handler: Handler = async (event) => {
  try {
    const action = event.queryStringParameters?.action || 'ping';
    if (event.httpMethod !== 'GET' && !checkCsrf(event)) return bad('CSRF', 403);
    if (action === 'ping') return ok({ ok: true });
    const supabase = getServiceSupabase();
    if (action === 'list') {
      const { data, error } = await supabase.from('pipeline_snapshots').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) return bad(error.message, 500);
      return ok({ items: data || [] });
    }
    if (action === 'snapshot') {
      const body = parseBody(event);
      const { label, config, org_id, owner_id } = body;
      if (!config || !owner_id) return bad('config and owner_id required');
      const { data, error } = await supabase.from('pipeline_snapshots').insert({ label, config, org_id, owner_id }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ snapshot: data });
    }
    return bad('unknown action');
  } catch (e: any) {
    return bad(e.message || 'Server error', 500);
  }
};

export { handler };


