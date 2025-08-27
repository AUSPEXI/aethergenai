import type { Handler } from '@netlify/functions';
import { getServiceSupabase, ok, bad, parseBody, checkCsrf, rateLimit, tooMany } from './_shared/supabase';
import JSZip from 'jszip';

const handler: Handler = async (event) => {
  try {
    const rl = rateLimit(event, 'datasets', 120, 60); // 120/min per IP
    if (!rl.allowed) return tooMany(rl.retryAfter)
    const action = event.queryStringParameters?.action || 'list';
    if (event.httpMethod !== 'GET' && !checkCsrf(event)) return bad('CSRF', 403);
    const supabase = getServiceSupabase();
    if (action === 'list') {
      const { data, error } = await supabase.from('datasets').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) return bad(error.message, 500);
      return ok({ items: data || [] });
    }
    if (action === 'usage') {
      // Sum byte_size from dataset_versions for total storage
      const { data: vers, error: eBytes } = await supabase.from('dataset_versions').select('byte_size');
      if (eBytes) return ok({ datasetsBytes: 0, datasetsCount: 0 });
      const bytes = (vers||[]).reduce((a:number,b:any)=> a + (Number(b.byte_size)||0), 0);
      const dsCount = await supabase.from('datasets').select('id', { count: 'exact', head: true });
      return ok({ datasetsBytes: bytes, datasetsCount: dsCount.count || 0 });
    }
    if (action === 'bundle') {
      const dataset_id = event.queryStringParameters?.dataset_id;
      if (!dataset_id) return bad('dataset_id required');
      const { data: ds, error: e1 } = await supabase.from('datasets').select('*').eq('id', dataset_id).single();
      if (e1 || !ds) return bad(e1?.message || 'dataset not found', 404);
      const { data: ver, error: e2 } = await supabase.from('dataset_versions').select('*').eq('dataset_id', dataset_id).order('created_at', { ascending: false }).limit(1).single();
      if (e2 || !ver) return bad(e2?.message || 'no versions', 404);
      const manifest = {
        bundle_version: 1,
        generated_at: new Date().toISOString(),
        dataset: { id: ds.id, name: ds.name, description: ds.description, created_at: ds.created_at },
        version: { id: ver.id, label: ver.version_label, row_count: ver.row_count, byte_size: ver.byte_size, checksum: ver.checksum, created_at: ver.created_at },
        proof: ver.proof_json || null
      };
      // If accept=zip, return a zip with manifest.json and proof.json (if any), and redacted_preview.json
      const accept = event.headers?.['accept'] || '';
      if (String(accept).includes('application/zip') || event.queryStringParameters?.format === 'zip') {
        const zip = new JSZip();
        zip.file('manifest.json', JSON.stringify(manifest, null, 2));
        if (ver.proof_json) zip.file('proof.json', JSON.stringify(ver.proof_json, null, 2));
        // redacted preview placeholder
        const preview = { sample_rows: Math.min(10, Number(ver.row_count||0)), note: 'redacted preview; full data stored separately' };
        zip.file('redacted_preview.json', JSON.stringify(preview, null, 2));
        const blob = await zip.generateAsync({ type: 'nodebuffer' });
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="${ds.name.replace(/\s+/g,'_')}_bundle.zip"`
          },
          body: (blob as any).toString('base64'),
          isBase64Encoded: true
        } as any;
      }
      return ok(manifest);
    }
    if (action === 'create') {
      const body = parseBody(event);
      const { name, description, org_id, owner_id } = body;
      if (!name || !owner_id) return bad('name and owner_id required');
      const { data, error } = await supabase.from('datasets').insert({ name, description, org_id, owner_id }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ dataset: data });
    }
    if (action === 'addVersion') {
      const body = parseBody(event);
      const { dataset_id, version_label, row_count, byte_size, checksum, proof_json } = body;
      if (!dataset_id || !version_label) return bad('dataset_id and version_label required');
      const { data, error } = await supabase.from('dataset_versions').insert({ dataset_id, version_label, row_count, byte_size, checksum, proof_json }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ version: data });
    }
    return bad('unknown action');
  } catch (e: any) {
    return bad(e.message || 'Server error', 500);
  }
};

export { handler };


