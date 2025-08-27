import type { Handler } from '@netlify/functions';
import { getServiceSupabase, ok, bad, parseBody, checkCsrf } from './_shared/supabase';

const handler: Handler = async (event) => {
  try {
    const action = event.queryStringParameters?.action || 'ping';
    if (event.httpMethod !== 'GET' && !checkCsrf(event)) return bad('CSRF', 403);
    if (action === 'ping') return ok({ ok: true });
    const supabase = getServiceSupabase();

    if (action === 'record') {
      const body = parseBody(event);
      const { event_type, details, org_id, owner_id } = body;
      if (!event_type || !owner_id) return bad('event_type and owner_id required');
      const { data, error } = await supabase.from('evidence_events').insert({ event_type, details, org_id, owner_id }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ event: data });
    }

    if (action === 'link-proof') {
      const body = parseBody(event);
      const { dataset_version_id, model_version_id, proof_id } = body;
      if (!dataset_version_id && !model_version_id) return bad('one of dataset_version_id or model_version_id required');
      const { data, error } = await supabase.from('proof_links').insert({ dataset_version_id, model_version_id, proof_id }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ link: data });
    }

    return bad('unknown action');
  } catch (e: any) {
    return bad(e.message || 'Server error', 500);
  }
};

export { handler };


