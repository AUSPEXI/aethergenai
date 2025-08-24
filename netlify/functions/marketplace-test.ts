import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    const body = JSON.parse(event.body || '{}');
    const { workspaceUrl, patToken } = body;

    if (!workspaceUrl || !patToken) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'workspaceUrl and patToken required' }) };
    }

    // Non-destructive validation: check URL format and token shape
    const urlOk = /^https?:\/\/.+/.test(workspaceUrl);
    const tokenOk = typeof patToken === 'string' && patToken.length > 10;

    // Optionally, attempt a harmless GET to a public metadata endpoint if provided in env
    // Skipping live call to avoid leaking tokens and to keep this generic.

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store'
      },
      body: JSON.stringify({ ok: urlOk && tokenOk, urlOk, tokenOk })
    };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: e?.message || 'Internal error' }) };
  }
};



