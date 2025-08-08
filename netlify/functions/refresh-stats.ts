import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) as string;
const key = (process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY) as string; // read anon from either name

export const handler: Handler = async () => {
  if (!url || !key) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_ANON_KEY/VITE_SUPABASE_ANON_KEY' })
    };
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase.rpc('ae_get_stats');
  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
  return { statusCode: 200, body: JSON.stringify({ ok: true, data }) };
};
