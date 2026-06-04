import { PERFECT_SCORE, SCORE_GOOD_THRESHOLD, SCORE_OK_THRESHOLD } from "./constants.js";
import type { Diagnostic, ProjectInfo, ScoreResult } from "./types/index.js";

// Per-distinct-rule penalties — a mirror of the (now unused) hosted score
// API. The `pinned` fork computes the identical score offline so no scan
// diagnostics ever leave the machine. Penalty is per distinct rule key, not
// per finding: a rule firing 100× costs the same as firing once.
const ERROR_RULE_PENALTY = 1.5;
const WARNING_RULE_PENALTY = 0.75;

export interface CalculateScoreOptions {
  /**
   * Marks the run as CI-originated. Retained for API compatibility; the
   * offline score is identical for CI and local runs.
   */
  isCi?: boolean;
  metadata?: ScoreRequestMetadata;
}

/**
 * Metadata the upstream CLI attached to its hosted score requests. Retained
 * as the public request-shape contract (callers — `Score.compute`,
 * `run-inspect` — still construct it) even though the offline scorer ignores
 * it: nothing is sent anywhere.
 */
export interface ScoreRequestMetadata {
  repo?: string;
  sha?: string;
  framework?: ProjectInfo["framework"];
  reactVersion?: string;
  sourceFileCount?: number;
  defaultBranch?: string;
  doctorVersion?: string;
  runId?: string;
  githubEventName?: string;
  githubActorAssociation?: string;
  githubViewerPermission?: string;
}

/**
 * Text label bucketing the numeric score. Mirrors the upstream website's
 * `getScoreLabel` so the header reads identically offline.
 */
export const getScoreLabel = (score: number): string => {
  if (score >= SCORE_GOOD_THRESHOLD) return "Great";
  if (score >= SCORE_OK_THRESHOLD) return "Needs work";
  return "Critical";
};

const computeScore = (diagnostics: ReadonlyArray<Diagnostic>): number => {
  if (diagnostics.length === 0) return PERFECT_SCORE;

  const errorRules = new Set<string>();
  const warningRules = new Set<string>();
  for (const diagnostic of diagnostics) {
    const ruleKey = `${diagnostic.plugin}/${diagnostic.rule}`;
    if (diagnostic.severity === "error") errorRules.add(ruleKey);
    else warningRules.add(ruleKey);
  }

  const penalty = errorRules.size * ERROR_RULE_PENALTY + warningRules.size * WARNING_RULE_PENALTY;
  return Math.max(0, Math.round(PERFECT_SCORE - penalty));
};

/**
 * Compute the project health score entirely offline (`pinned` fork). The
 * upstream tool POSTed diagnostics to a hosted scoring API; this mirror keeps
 * the exact formula so scores match, while guaranteeing no scan data leaves
 * the machine. The async signature and `null` return are preserved so the
 * `Score` service and every caller stay unchanged (the hosted API could
 * return `null` on failure; the offline scorer never does).
 */
export const calculateScore = async (
  diagnostics: Diagnostic[],
  _options: CalculateScoreOptions = {},
): Promise<ScoreResult | null> => {
  const score = computeScore(diagnostics);
  return { score, label: getScoreLabel(score) };
};
