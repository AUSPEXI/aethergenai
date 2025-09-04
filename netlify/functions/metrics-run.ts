import type { Handler } from '@netlify/functions'

type Json = Record<string, any>

const HOST = process.env.DATABRICKS_HOST || ''
const TOKEN = process.env.DATABRICKS_TOKEN || ''

async function dbx(path: string, method: string, body?: any) {
  if (!HOST || !TOKEN) throw new Error('Databricks host/token not configured')
  const res = await fetch(`${HOST}${path}`, {
    method,
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const txt = await res.text()
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${txt}`)
  try { return JSON.parse(txt) } catch { return {} }
}

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'method not allowed' }
    const body = event.body ? JSON.parse(event.body) as Json : {}
    const { dataset_path, uc_volume, config } = body
    if (!dataset_path || !uc_volume) return { statusCode: 400, body: 'dataset_path and uc_volume required' }

    // Define a one-off job to run a notebook/script that computes metrics and writes results.json to uc_volume
    const runs = await dbx('/api/2.1/jobs/runs/submit', 'POST', {
      run_name: `metrics-${Date.now()}`,
      tasks: [
        {
          task_key: 'compute_metrics',
          notebook_task: {
            notebook_path: process.env.METRICS_NOTEBOOK_PATH || '/Shared/metrics/compute_metrics',
            base_parameters: {
              dataset_path,
              uc_volume,
              config: JSON.stringify(config || {})
            }
          },
          existing_cluster_id: process.env.DATABRICKS_CLUSTER_ID || undefined,
        }
      ]
    })

    return { statusCode: 200, body: JSON.stringify({ ok: true, run_id: runs?.run_id }) }
  } catch (e: any) {
    return { statusCode: 500, body: e?.message || 'error' }
  }
}

export { handler }


