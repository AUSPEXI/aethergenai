import { contextEngine, DocSpan } from './contextEngine'
import { hallucinationRisk, RiskThreshold } from './hallucinationRiskService'
import { cpuRunner } from './cpuRunnerService'

export type ComposeInput = {
  query: string
  candidates: { bm25: DocSpan[]; dense: DocSpan[]; reranked?: DocSpan[] }
  tokenBudget?: number
  riskThreshold?: RiskThreshold
  aggressiveSummaries?: boolean
}

export type ComposeResult = {
  packedContext: string
  included: DocSpan[]
  risk: number
  action: 'generate'|'fetch_more_context'|'reroute'|'abstain'
  draft?: string
  escalated?: boolean
}

export class ComposedRouterService {
  async run(input: ComposeInput): Promise<ComposeResult> {
    const k = 6
    const tokenBudget = input.tokenBudget ?? 900
    const ranked = contextEngine.rankHybrid(input.candidates.bm25, input.candidates.dense, input.candidates.reranked, k)
    const signals = contextEngine.computeSignals(ranked, k)
    const features = {
      margin: signals.retrieval_margin,
      entropy: 1 - Math.min(1, signals.retrieval_margin),
      retrieval: Math.min(1, 0.5 * signals.support_docs + 0.5 * signals.source_trust),
      selfConsistency: 0.6,
      supportDocs: signals.support_docs
    }
    const risk = hallucinationRisk.computeRisk(features)
    const threshold = input.riskThreshold ?? { threshold: 0.55, targetRate: 0.1, calibratedOn: 0 }
    const action = hallucinationRisk.decideAction(risk, threshold)
    let { packed, included } = contextEngine.pack(ranked, tokenBudget)

    // For simple fact queries, keep only the top span to minimize tokens
    const q = (input.query || '').toLowerCase()
    const facty = /(what|which|is|p50|p90|median|largest|highest)/.test(q)
    const summaryLike = /(summarize|summary|overview|operations readiness|report)/.test(q)
    if (facty && included.length > 0) {
      included = [included[0]]
      packed = included[0].text
    }
    // For summaries, cap to top-2 and bulletize numeric facts to ~120 tokens
    if (summaryLike && included.length > 0) {
      const top2 = included.slice(0, 2)
      const bullets = top2.map((d, i) => `• ${condense(d.text)}`).join('\n')
      included = top2
      packed = bullets
    }

    // SLM-first draft using CPU runner (lightweight) if action permits
    let draft: string | undefined
    let escalated = false
    let decided: 'generate'|'fetch_more_context'|'reroute'|'abstain' = action
    // If support is strong and query is factual, permit generate under a small risk buffer
    const top = included[0]
    const topTrust = (top?.trust ?? 0.9)
    const topScore = (top?.score ?? 0)
    if (decided !== 'generate' && facty && features.retrieval >= 0.45 && (risk < Math.min(1, threshold.threshold + 0.12) || (topScore >= 0.85 && topTrust >= 0.85))) {
      decided = 'generate'
    }
    if (decided !== 'generate' && summaryLike) {
      if (input.aggressiveSummaries) {
        if (features.retrieval >= 0.45) decided = 'generate'
      } else {
        if (features.retrieval >= 0.4 && risk < Math.min(1, threshold.threshold + 0.1)) decided = 'generate'
      }
    }
    if (decided === 'generate') {
      try {
        // Use a trivial scorer as a placeholder to demonstrate CPU path
        const scores = await cpuRunner.score(included.map(d => [d.score, d.recency ?? 0, d.trust ?? 0] as any))
        draft = `Answer (grounded): ${top ? top.text.slice(0, 600) : ''}`
      } catch {
        draft = included[0]?.text.slice(0, 400) || ''
      }
    } else if (decided === 'reroute') {
      escalated = true
    }
    return { packedContext: packed, included, risk, action: decided, draft, escalated }
  }
}

function condense(text: string): string {
  // Keep concise: numbers, key tokens, remove long stopwords. Simple heuristic.
  const t = (text || '')
    .replace(/\s+/g, ' ')
    .replace(/Source:\s*[^\n]*\n?/gi, '')
    .replace(/Score:[^\n]*\n?/gi, '')
    .trim()
  const words = t.split(' ')
  const keep = new Set(['p50','p90','p99','median','mean','share','largest','highest','km','usd','minutes','quantiles','correlations', 'hour','borough'])
  const filtered = words.filter(w => /\d/.test(w) || keep.has(w.toLowerCase()) || w.length <= 12)
  return filtered.join(' ').slice(0, 600)
}

export const composedRouter = new ComposedRouterService()


