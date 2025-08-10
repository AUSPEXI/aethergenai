import { AblationEntry, AblationRecipe, AblationRunResult, CleaningConfig, AdaptationConfig, RecursionPolicy, EvaluationCheck } from '../types/ablation';
import { heuristicRewrite, heuristicUnravel, heuristicRenest } from './heuristicTransformers';
import { advancedAIModels } from '../types/advancedModels';
import { hreTechnologyService } from './hreTechnologyService';
import { cleanSeedData, cleanSyntheticData, triadGuidedConfig } from './dataCleaningService';

export async function runRecipeLocally(
  recipe: AblationRecipe,
  generatedData: any[],
  schema: any
): Promise<AblationRunResult[]> {
  const results: AblationRunResult[] = [];
  const defaultRepeats = recipe.repeats ?? 1;

  // Optional pre-cleaning based on recipe
  let workingData = [...generatedData];
  if (recipe.cleaning?.synthetic || recipe.cleaning?.triadGuided) {
    let cfg = (recipe.cleaning?.synthetic as CleaningConfig) || {};
    if (recipe.cleaning?.triadGuided) {
      // quick triad probe from current data
      const triad = await hreTechnologyService.runHREAnalysis(workingData, schema);
      cfg = triadGuidedConfig(cfg, { geometricConsistency: triad.triadValidation.metrics?.geometricConsistency ?? 0.9, triadValidationScore: triad.triadValidation?.isValid ? 0.9 : 0.8 });
    }
    const { cleaned } = cleanSyntheticData(workingData, schema, cfg);
    workingData = cleaned;
  }

  for (const ablation of recipe.ablations) {
    const repeats = ablation.repeats ?? defaultRepeats;

    // Determine model set
    const modelNames = ablation.training?.modelFilter && ablation.training.modelFilter.length > 0
      ? advancedAIModels.filter(m => ablation.training!.modelFilter!.includes(m.name)).map(m => m.name)
      : advancedAIModels.map(m => m.name);

    // Apply module enable/disable filters (logical only for now)
    const disabled = new Set(ablation.modules?.disable ?? []);

    for (let r = 0; r < repeats; r++) {
      for (const modelName of modelNames) {
        if (disabled.has(modelName)) continue;

        // Run existing comprehensive benchmark for each model (with optional recursion sandbox for prompts)
        const bench = await hreTechnologyService.runComprehensiveBenchmark(
          modelName,
          workingData,
          schema
        );

        results.push({
          ablationName: ablation.name,
          repeatIndex: r,
          modelName,
          metrics: bench.metrics as Record<string, number>,
          experimentalFlags: ablation.modules?.enable ?? undefined,
        });
      }
    }
  }

  return results;
}

export function summarizeAblationResults(results: AblationRunResult[]): Record<string, any> {
  // Aggregate by ablation -> metric -> mean and carry experimental flags
  const byAblation: Record<string, { [metric: string]: number[]; __flags?: string[] }> = {};
  for (const r of results) {
    byAblation[r.ablationName] ||= {};
    for (const [k, v] of Object.entries(r.metrics)) {
      if (typeof v !== 'number') continue;
      byAblation[r.ablationName][k] ||= [];
      byAblation[r.ablationName][k].push(v as number);
    }
    if (r.experimentalFlags && r.experimentalFlags.length > 0) {
      const existing = byAblation[r.ablationName].__flags || [];
      byAblation[r.ablationName].__flags = Array.from(new Set([...existing, ...r.experimentalFlags]));
    }
  }

  const summary: Record<string, any> = {};
  for (const [ablation, metrics] of Object.entries(byAblation)) {
    const obj: any = Object.fromEntries(
      Object.entries(metrics)
        .filter(([k]) => k !== '__flags')
        .map(([k, arr]) => [k, mean(arr as number[])])
    );
    if (metrics.__flags) obj.__flags = metrics.__flags;
    summary[ablation] = obj;
  }
  return summary;
}

function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// --- Recursive prompt sandbox (skeleton) ---
export async function runRecursivePromptChain(promptText: string, policy: RecursionPolicy): Promise<{ steps: any[]; final: string }>{
  const steps: any[] = [];
  const maxDepth = policy.maxDepth ?? 3;
  const maxAttempts = policy.maxAttempts ?? 3;
  let attempt = 0;
  let depth = 0;
  let current = promptText;

  const evalMetric = (text: string): Record<string, number> => ({ wordCount: text.split(/\s+/).filter(Boolean).length });
  const check = (metrics: Record<string, number>, checks?: EvaluationCheck[]): boolean => {
    if (!checks || checks.length === 0) return false;
    return checks.some((c) => {
      const v = metrics[c.metric] ?? 0;
      switch (c.op) {
        case '>': return v > c.value;
        case '>=': return v >= c.value;
        case '<': return v < c.value;
        case '<=': return v <= c.value;
        case '==': return v === c.value;
        case '!=': return v !== c.value;
        default: return false;
      }
    });
  };

  const rewrite = (text: string) => heuristicRewrite(text);
  const unravel = (text: string) => heuristicUnravel(text);
  const renest = (text: string, lines = 5) => heuristicRenest(text, lines);

  while (attempt < maxAttempts && depth <= maxDepth) {
    const metrics = evalMetric(current);
    steps.push({ depth, attempt, current, metrics });
    if (!check(metrics, policy.trigger) && check(metrics, policy.baseCase)) break;
    if (check(metrics, policy.revertOn)) {
      // revert to previous step if available
      const prev = steps[steps.length - 2];
      if (prev) current = prev.current;
      attempt++;
      continue;
    }
    if (check(metrics, policy.trigger)) {
      current = rewrite(current);
      if (policy.unravel?.simplifyToCore) current = unravel(current);
      current = renest(current, policy.renest?.lines ?? 5);
      depth++;
      attempt++;
      continue;
    }
    break;
  }
  return { steps, final: current };
}


