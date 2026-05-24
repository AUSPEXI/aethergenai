import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const url = (process.env.SUPABASE_URL || process.env.SUPABASE_DATABASE_URL) as string;
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY) as string;

export const handler: Handler = async (event) => {
  console.log('store-schema invoked', { method: event.httpMethod, hasUrl: !!url, hasKey: !!serviceKey, urlPrefix: url?.slice(0,30) });
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (!url || !serviceKey) {
    console.log('Missing config - url:', !!url, 'key:', !!serviceKey);
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing Supabase service config', hasUrl: !!url, hasKey: !!serviceKey }) };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { id, name, description, schema_json } = payload;
    console.log('Payload received', { id, name, hasSchemaJson: !!schema_json });
    if (!name || !schema_json) return { statusCode: 400, body: 'name and schema_json are required' };

    const schemaString = typeof schema_json === 'string' ? schema_json : JSON.stringify(schema_json);
    const schema_hash = crypto.createHash('sha256').update(schemaString).digest('hex');

    const supabase = createClient(url, serviceKey);

    if (id) {
      const { data, error } = await supabase
        .from('ae_schemas')
        .update({ name, description, schema_json: JSON.parse(schemaString), schema_hash })
        .eq('id', id)
        .select('id, schema_hash')
        .single();
      if (error) { console.log('Supabase update error:', error.message); return { statusCode: 500, body: JSON.stringify({ error: error.message }) }; }
      return { statusCode: 200, body: JSON.stringify({ id: data.id, schema_hash: data.schema_hash, updated: true }) };
    } else {
      const { data, error } = await supabase
        .from('ae_schemas')
        .insert({ name, description, schema_json: JSON.parse(schemaString), schema_hash })
        .select('id, schema_hash')
        .single();
      if (error) { console.log('Supabase insert error:', error.message); return { statusCode: 500, body: JSON.stringify({ error: error.message }) }; }
      return { statusCode: 200, body: JSON.stringify({ id: data.id, schema_hash: data.schema_hash, created: true }) };
    }
  } catch (e: any) {
    console.log('Exception:', e.message);
    return { statusCode: 500, body: JSON.stringify({ error: e.message || 'Unknown error' }) };
  }
};
