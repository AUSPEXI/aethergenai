import type { Handler } from '@netlify/functions'

type Json = Record<string, any>

const HOST = process.env.DATABRICKS_HOST || ''
const TOKEN = process.env.DATABRICKS_TOKEN || ''

function url(pathname: string): string {
  const base = pathname.startsWith('/api/2.0') || pathname.startsWith('/api/2.1') ? '' : '/api/2.1'
  return `${HOST}${base}${pathname}`
}

async function api(pathname: string, method: string, body?: any) {
  if (!HOST || !TOKEN) throw new Error('Databricks host/token not configured')
  const res = await fetch(url(pathname), {
    method,
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const txt = await res.text().catch(()=> '')
    throw new Error(`${res.status} ${res.statusText}: ${txt}`)
  }
  return res.status === 204 ? null : res.json()
}

async function ensureCatalog(catalog: string) {
  try { return await api(`/unity-catalog/catalogs/${encodeURIComponent(catalog)}`, 'GET') } catch {}
  return await api(`/unity-catalog/catalogs`, 'POST', { name: catalog, comment: 'Managed by AethergenPlatform' })
}

async function ensureSchema(catalog: string, schema: string) {
  try { return await api(`/unity-catalog/schemas/${encodeURIComponent(catalog)}.${encodeURIComponent(schema)}`, 'GET') } catch {}
  return await api(`/unity-catalog/schemas`, 'POST', { name: schema, catalog_name: catalog, comment: 'Managed by AethergenPlatform' })
}

async function ensureVolume(catalog: string, schema: string, volume: string) {
  try { return await api(`/unity-catalog/volumes/${encodeURIComponent(catalog)}.${encodeURIComponent(schema)}.${encodeURIComponent(volume)}`, 'GET') } catch {}
  return await api(`/unity-catalog/volumes`, 'POST', { name: volume, catalog_name: catalog, schema_name: schema, volume_type: 'MANAGED', comment: 'Evidence volume (managed)' })
}

async function dbfsMkdirs(dbfsPath: string) {
  await api(`/api/2.0/dbfs/mkdirs`, 'POST', { path: dbfsPath })
}

async function dbfsPut(dbfsPath: string, b64: string, overwrite = true) {
  await api(`/api/2.0/dbfs/put`, 'POST', { path: dbfsPath, overwrite, contents: b64 })
}

async function setObjectComment(objectType: 'tables' | 'models' | 'functions' | 'views', fullName: string, comment: string) {
  return await api(`/unity-catalog/${objectType}/${encodeURIComponent(fullName)}`, 'PATCH', { comment })
}

const handler: Handler = async (event) => {
  try {
    const action = event.queryStringParameters?.action || 'help'
    if (action === 'help') {
      return { statusCode: 200, body: 'Actions: ensureObjects, uploadEvidence, setTableComment' }
    }

    if (action === 'ensureObjects') {
      const catalog = (event.queryStringParameters?.catalog || 'aethergen').trim()
      const schema = (event.queryStringParameters?.schema || 'evidence').trim()
      const volume = (event.queryStringParameters?.volume || 'bundles').trim()
      const cat = await ensureCatalog(catalog)
      const sch = await ensureSchema(catalog, schema)
      const vol = await ensureVolume(catalog, schema, volume)
      return { statusCode: 200, body: JSON.stringify({ ok: true, catalog: cat, schema: sch, volume: vol }) }
    }

    if (action === 'uploadEvidence' && event.httpMethod === 'POST') {
      const body = event.body ? JSON.parse(event.body) as Json : {}
      const catalog = (body.catalog || 'aethergen').trim()
      const schema = (body.schema || 'evidence').trim()
      const volume = (body.volume || 'bundles').trim()
      const subdir = (body.subdir || '').trim() // e.g., manifest hash or date
      const files = Array.isArray(body.files) ? body.files as Array<{ name: string; base64: string }> : []
      // dbfs path for volumes: dbfs:/Volumes/<catalog>/<schema>/<volume>/...
      const base = `dbfs:/Volumes/${catalog}/${schema}/${volume}` + (subdir ? `/${subdir}` : '')
      await dbfsMkdirs(base)
      for (const f of files) {
        await dbfsPut(`${base}/${f.name}`, f.base64, true)
      }
      return { statusCode: 200, body: JSON.stringify({ ok: true, path: base, files: files.map(f=>f.name) }) }
    }

    if (action === 'setTableComment' && event.httpMethod === 'POST') {
      const body = event.body ? JSON.parse(event.body) as Json : {}
      const fullName = String(body.full_name || '')
      const comment = String(body.comment || '')
      if (!fullName || !comment) return { statusCode: 400, body: 'full_name and comment required' }
      const res = await setObjectComment('tables', fullName, comment)
      return { statusCode: 200, body: JSON.stringify({ ok: true, table: res }) }
    }

    if (action === 'setObjectComment' && event.httpMethod === 'POST') {
      const body = event.body ? JSON.parse(event.body) as Json : {}
      const type = (String(body.object_type || 'tables') as any)
      const fullName = String(body.full_name || '')
      const comment = String(body.comment || '')
      if (!fullName || !comment) return { statusCode: 400, body: 'object_type, full_name and comment required' }
      const res = await setObjectComment(type, fullName, comment)
      return { statusCode: 200, body: JSON.stringify({ ok: true, object: res }) }
    }

    return { statusCode: 400, body: 'unknown action' }
  } catch (e: any) {
    return { statusCode: 500, body: e?.message || 'error' }
  }
}

export { handler }


