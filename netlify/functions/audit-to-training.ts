import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const SESSION_WINDOW_MS = 30 * 60 * 1000; // 30-minute session window

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

// ── Label derivation ──────────────────────────────────────────────────────────
// Mirrors the optimization_action derivation rule documented in the 56-field schema.
// Used when signal confidence is high enough to label without user confirmation.
function deriveActionFromSignals(s: {
  entity_recall_rate?: number | null;
  entity_density_score?: number | null;
  statistical_anchors_score?: number | null;
  fact_category?: string | null;
  competitor_gap?: number | null;
  trojan_horse_opportunity?: boolean | null;
  is_cited?: boolean | null;
  sov_score?: number | null;
  content_score?: number | null;
}): string {
  const err  = s.entity_recall_rate   ?? 50;
  const dens = s.entity_density_score ?? 50;
  const stat = s.statistical_anchors_score ?? 50;
  const fc   = s.fact_category ?? 'extracted';
  const gap  = s.competitor_gap ?? 0;
  const th   = s.trojan_horse_opportunity ?? false;
  const cited = s.is_cited ?? false;
  const sov  = s.sov_score ?? 0;
  const cs   = s.content_score ?? 0;

  if (err < 40 || dens < 40)              return 'update_entity';
  if (stat < 40 && fc === 'none')         return 'publish_fact';
  if (stat < 50)                          return 'add_statistic';
  if (gap < -10 && th)                    return 'build_comparison';
  if (cited && sov > 60 && cs > 70)      return 'no_action';
  return 'publish_fact';
}

// ── Extract feature signals from an audit event's details object ──────────────
function extractSignals(action: string, details: any): Record<string, any> {
  if (!details) return {};
  const d = details;

  switch (action) {
    case 'Ran SOV Simulation':
      return {
        search_query:          d.query || '',
        query_text:            d.query || '',
        brand:                 d.brand || '',
        ai_engine:             d.engine || null,
        sov_score:             d.aSov   ?? d.sov   ?? null,
        competitor_sov:        d.compA  ?? null,
        competitor_gap:        d.compGap ?? (d.aSov != null && d.compA != null ? d.aSov - d.compA : null),
        entity_recall_rate:    d.err    ?? null,
        is_cited:              d.isCited ?? null,
        content_score:         d.contentScore ?? null,
        statistical_anchors_score: d.statisticalAnchorsScore ?? null,
        entity_density_score:  d.entityDensityScore ?? null,
      };

    case 'Ran Brand Monitor':
      return {
        brand:           d.brand  || '',
        risk_score:      d.riskScore  ?? null,
        threat_count:    d.threatCount ?? d.threads ?? null,
        sentiment:       d.sentiment  || null,
        drift_detected:  d.driftDetected ?? null,
        z_score:         d.zScore ?? null,
      };

    case 'Analyzed Competitor':
      return {
        competitor_name:          d.competitor || d.name || '',
        competitor_sov:           d.sov ?? null,
        decay_status:             d.decayStatus || '',
        decay_score:              d.decayScore  ?? null,
        trojan_horse_opportunity: d.trojanHorseOpportunity ?? false,
      };

    case 'Extracted Facts':
    case 'Researched Facts':
      return {
        fact_category: action === 'Researched Facts' ? 'auto_researched' : 'extracted',
      };

    case 'Auto-generated Counter-Fact':
      return {
        fact_category:   'counter_fact',
        competitor_name: d.competitor || '',
      };

    case 'Published Content':
    case 'CONTENT_AUTO_PUBLISHED':
      return {
        content_score: d.contentScore ?? d.score ?? null,
        content_type:  d.contentType  ?? d.type  ?? 'blog',
      };

    case 'CONTENT_AMPLIFIED':
      return {
        fact_text:    d.factPreview ? String(d.factPreview).substring(0, 200) : null,
        content_type: d.contentType ?? 'blog',
      };

    default:
      return {};
  }
}

// ── Direct action → label (high-confidence, no signal derivation needed) ──────
function getDirectLabel(action: string, details: any): string | null {
  switch (action) {
    case 'Auto-generated Counter-Fact': return 'build_comparison';
    case 'CONTENT_AMPLIFIED':           return 'publish_fact';
    case 'Extracted Facts':             return 'publish_fact';
    case 'Researched Facts':            return 'publish_fact';
    case 'Updated Latent Anchors':      return 'update_entity';
    case 'Analyzed Competitor':
      if (details?.trojanHorseOpportunity || details?.decayStatus === 'stale') return 'build_comparison';
      return null;
    default:
      return null;
  }
}

// ── Assemble a training row ───────────────────────────────────────────────────
function buildRow(
  triggerAction: string,
  label: string,
  userId: string,
  sessionId: string,
  signals: Record<string, any>,
  eventDate: string | null
) {
  const hashInput = `${userId}:${triggerAction}:${label}:${signals.search_query || ''}:${signals.brand || ''}:${eventDate || ''}`;
  const row_hash  = crypto.createHash('sha256').update(hashInput).digest('hex');

  return {
    source:               'audit_log',
    audit_trigger_event:  triggerAction,
    user_id_hash:         crypto.createHash('sha256').update(userId || 'anon').digest('hex'),
    session_id:           sessionId,
    row_hash,
    optimization_action:  label,
    brand:                signals.brand          ?? null,
    ai_engine:            signals.ai_engine      ?? null,
    sov_score:            signals.sov_score      ?? null,
    competitor_gap:       signals.competitor_gap ?? null,
    entity_recall_rate:   signals.entity_recall_rate ?? null,
    content_score:        signals.content_score  ?? null,
    risk_score:           signals.risk_score     ?? null,
    sentiment:            signals.sentiment      ?? null,
    decay_status:         signals.decay_status   ?? null,
    feature_json:         { ...signals, optimization_action: label },
    event_date:           eventDate,
  };
}

// ── Core processing ───────────────────────────────────────────────────────────
interface AuditEvent {
  id?: string;
  userId?: string;
  action: string;
  details?: any;
  timestamp?: string | number;
}

function processEvents(events: AuditEvent[]) {
  // Group by userId
  const byUser: Record<string, AuditEvent[]> = {};
  for (const ev of events) {
    const uid = ev.userId || 'anon';
    (byUser[uid] ??= []).push(ev);
  }

  const rows: ReturnType<typeof buildRow>[] = [];

  for (const [userId, userEvents] of Object.entries(byUser)) {
    // Sort ascending by timestamp
    userEvents.sort((a, b) => {
      const ta = typeof a.timestamp === 'string' ? Date.parse(a.timestamp) : (a.timestamp as number || 0);
      const tb = typeof b.timestamp === 'string' ? Date.parse(b.timestamp) : (b.timestamp as number || 0);
      return ta - tb;
    });

    // Session windowing
    const sessions: AuditEvent[][] = [];
    let current: AuditEvent[] = [];
    let lastT = 0;

    for (const ev of userEvents) {
      const t = typeof ev.timestamp === 'string' ? Date.parse(ev.timestamp) : (ev.timestamp as number || 0);
      if (lastT && t - lastT > SESSION_WINDOW_MS) { sessions.push(current); current = []; }
      current.push(ev); lastT = t;
    }
    if (current.length) sessions.push(current);

    for (let si = 0; si < sessions.length; si++) {
      const session = sessions[si];
      const sessionId = `${crypto.createHash('sha256').update(userId).digest('hex').slice(0, 8)}-s${si}`;

      // Accumulate feature context across the whole session
      let sessionSignals: Record<string, any> = {};
      for (const ev of session) {
        sessionSignals = { ...sessionSignals, ...extractSignals(ev.action, ev.details) };
      }

      // Label each event
      for (let i = 0; i < session.length; i++) {
        const ev      = session[i];
        const nextEv  = session[i + 1] ?? null;
        const tVal    = typeof ev.timestamp === 'string' ? ev.timestamp : new Date(ev.timestamp || Date.now()).toISOString();
        const evDate  = tVal.split('T')[0] ?? null;
        const evSig   = { ...sessionSignals, ...extractSignals(ev.action, ev.details) };

        // 1. Direct label
        const direct = getDirectLabel(ev.action, ev.details);
        if (direct) {
          rows.push(buildRow(ev.action, direct, userId, sessionId, evSig, evDate));
          continue;
        }

        // 2. SOV simulation → derive label from signals or next action
        if (ev.action === 'Ran SOV Simulation') {
          let label: string;

          if (nextEv) {
            // Next event confirms intent — prefer its direct label, fall back to signal derivation
            label = getDirectLabel(nextEv.action, nextEv.details) ?? deriveActionFromSignals(evSig);
          } else {
            // Standalone simulation: only emit row when signals are strongly diagnostic
            const err = evSig.entity_recall_rate;
            const sov = evSig.sov_score;
            const gap = evSig.competitor_gap;

            if (err != null && err < 40)                        label = 'update_entity';
            else if (sov != null && sov > 60 && evSig.is_cited) label = 'no_action';
            else if (gap != null && gap < -10)                   label = 'build_comparison';
            else continue; // not confident enough without context
          }

          rows.push(buildRow(ev.action, label, userId, sessionId, evSig, evDate));
        }
      }
    }
  }

  return rows;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: 'Missing Supabase config' }) };
  }

  const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

  // GET — stats
  if (event.httpMethod === 'GET') {
    try {
      const { data, error } = await sb
        .from('geo_training_rows')
        .select('optimization_action, source, event_date')
        .order('event_date', { ascending: false })
        .limit(5000);

      if (error) throw error;

      const distribution: Record<string, number> = {};
      let auditCount = 0;
      let lastDate: string | null = null;
      let firstDate: string | null = null;

      for (const r of data ?? []) {
        distribution[r.optimization_action] = (distribution[r.optimization_action] || 0) + 1;
        if (r.source === 'audit_log') auditCount++;
        if (r.event_date) {
          if (!lastDate || r.event_date > lastDate) lastDate = r.event_date;
          if (!firstDate || r.event_date < firstDate) firstDate = r.event_date;
        }
      }

      return {
        statusCode: 200, headers: CORS,
        body: JSON.stringify({
          total:        data?.length ?? 0,
          audit_rows:   auditCount,
          distribution,
          date_range:   firstDate ? { from: firstDate, to: lastDate } : null,
        }),
      };
    } catch (e: any) {
      return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: e.message }) };
    }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // POST — ingest audit events
  let payload: { events?: AuditEvent[] };
  try { payload = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const events = payload.events;
  if (!Array.isArray(events) || events.length === 0) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'events array required' }) };
  }

  const trainingRows = processEvents(events);

  if (trainingRows.length === 0) {
    return {
      statusCode: 200, headers: CORS,
      body: JSON.stringify({ inserted: 0, skipped: 0, processed: events.length, message: 'No labelable events found in this batch' }),
    };
  }

  // Upsert — row_hash prevents duplicates across repeated uploads
  const { data, error } = await sb
    .from('geo_training_rows')
    .upsert(trainingRows, { onConflict: 'row_hash', ignoreDuplicates: true })
    .select('id');

  if (error) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: error.message }) };
  }

  return {
    statusCode: 200, headers: CORS,
    body: JSON.stringify({
      inserted:  data?.length ?? 0,
      skipped:   trainingRows.length - (data?.length ?? 0),
      processed: events.length,
      label_distribution: trainingRows.reduce((acc, r) => {
        acc[r.optimization_action] = (acc[r.optimization_action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    }),
  };
};
