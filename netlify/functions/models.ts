import type { Handler } from '@netlify/functions';
import { getServiceSupabase, ok, bad, parseBody, checkCsrf, rateLimit, tooMany } from './_shared/supabase';
import JSZip from 'jszip';

const handler: Handler = async (event) => {
  try {
    const rl = rateLimit(event, 'models', 120, 60); // 120/min per IP
    if (!rl.allowed) return tooMany(rl.retryAfter)
    const action = event.queryStringParameters?.action || 'list';
    if (event.httpMethod !== 'GET' && !checkCsrf(event)) return bad('CSRF', 403);
    const supabase = getServiceSupabase();
    if (action === 'list') {
      const { data, error } = await supabase.from('models').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) return bad(error.message, 500);
      return ok({ items: data || [] });
    }
    if (action === 'usage') {
      const mv = await supabase.from('model_versions').select('id');
      let bytes = 0;
      try {
        const { data: arts } = await supabase.from('model_artifacts').select('byte_size');
        bytes = (arts||[]).reduce((a:number,b:any)=> a + (Number(b.byte_size)||0), 0);
      } catch {}
      const modelsHead = await supabase.from('models').select('id', { count: 'exact', head: true });
      return ok({ modelsCount: modelsHead.count || 0, versions: (mv.data||[]).length, modelsBytes: bytes });
    }
    if (action === 'bundle') {
      const model_id = event.queryStringParameters?.model_id;
      if (!model_id) return bad('model_id required');
      const { data: m, error: e1 } = await supabase.from('models').select('*').eq('id', model_id).single();
      if (e1 || !m) return bad(e1?.message || 'model not found', 404);
      const { data: ver, error: e2 } = await supabase.from('model_versions').select('*').eq('model_id', model_id).order('created_at', { ascending: false }).limit(1).single();
      if (e2 || !ver) return bad(e2?.message || 'no versions', 404);
      const manifest = {
        bundle_version: 1,
        generated_at: new Date().toISOString(),
        model: { id: m.id, name: m.name, task: m.task, created_at: m.created_at },
        version: { id: ver.id, framework: ver.framework, format: ver.format, quantization: ver.quantization, created_at: ver.created_at },
        sbom: ver.sbom || null,
        license: ver.license || null
      };
      const accept = event.headers?.['accept'] || '';
      if (String(accept).includes('application/zip') || event.queryStringParameters?.format === 'zip') {
        const zip = new JSZip();
        zip.file('manifest.json', JSON.stringify(manifest, null, 2));
        if (ver.sbom) zip.file('sbom.json', JSON.stringify(ver.sbom, null, 2));
        const blob = await zip.generateAsync({ type: 'nodebuffer' });
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename="${m.name.replace(/\s+/g,'_')}_model_bundle.zip"` },
          body: (blob as any).toString('base64'),
          isBase64Encoded: true
        } as any;
      }
      return ok(manifest);
    }
    if (action === 'create') {
      const body = parseBody(event);
      const { name, task, org_id, owner_id, description } = body;
      if (!name || !owner_id) return bad('name and owner_id required');
      const { data, error } = await supabase.from('models').insert({ name, task, org_id, owner_id, description }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ model: data });
    }
    if (action === 'addVersion') {
      const body = parseBody(event);
      const { model_id, framework, format, quantization, params, sbom, license } = body;
      if (!model_id) return bad('model_id required');
      const { data, error } = await supabase.from('model_versions').insert({ model_id, framework, format, quantization, params, sbom, license }).select('*').single();
      if (error) return bad(error.message, 500);
      return ok({ version: data });
    }
    return bad('unknown action');
  } catch (e: any) {
    return bad(e.message || 'Server error', 500);
  }
};

export { handler };


