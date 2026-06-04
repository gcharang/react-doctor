import * as Schema from "effect/Schema";
import * as Cause from "effect/Cause";
//#region ../core/dist/index.d.ts
//#region src/types/config.d.ts
type FailOnLevel = "error" | "warning" | "none";
interface ReactDoctorIgnoreOverride {
  /** Glob patterns the override applies to (e.g. `["src/legacy/**"]`). */
  files: string[];
  /**
   * Rule keys to suppress for the matched files. Omit (or leave empty) to
   * suppress every rule for those files.
   */
  rules?: string[];
}
interface ReactDoctorIgnoreConfig {
  /**
   * Fully-qualified rule keys (`"<plugin>/<rule>"`) whose diagnostics are
   * dropped AFTER linting. The rule still runs; its findings are filtered
   * out. To stop a rule from running at all, set it to `"off"` in the
   * top-level `rules` map instead. Prefer `react-doctor rules disable
   * <rule>` to edit this safely.
   */
  rules?: string[];
  /**
   * Glob patterns whose files are excluded from scanning entirely (matched
   * against paths relative to the scanned directory).
   */
  files?: string[];
  /** Per-path rule suppressions — narrower than the top-level `rules`/`files`. */
  overrides?: ReactDoctorIgnoreOverride[];
  /**
   * Behavioral tags whose rules are disabled BEFORE linting, skipping a
   * whole family at once (e.g. `["design", "test-noise", "migration-hint"]`).
   * Prefer `react-doctor rules ignore-tag <tag>` to edit this safely.
   */
  tags?: string[];
}
/**
 * Discrete output channels a diagnostic can flow through after a scan.
 * Each surface is filtered independently so a rule can be visible
 * locally but excluded from PR comments, the score, or the CI gate:
 *
 * - `cli` — local terminal output from `react-doctor` (`printDiagnostics`).
 * - `prComment` — diagnostics destined for a sticky pull-request
 *   summary comment. Selected by running the CLI with `--pr-comment`
 *   (sets `outputSurface: "prComment"`).
 * - `score` — diagnostics shipped to the React Doctor score API
 *   (or counted toward local score calculations).
 * - `ciFailure` — diagnostics that count toward the `--fail-on` exit
 *   code gate. A diagnostic excluded from this surface never fails the
 *   build, regardless of severity.
 *
 * Defaults: design rules (tag `"design"`) are excluded from `prComment`,
 * `score`, and `ciFailure` so style cleanup doesn't dilute meaningful
 * React findings. They remain in `cli` so locally-running developers
 * still see the suggestion when they touch the file.
 */
type DiagnosticSurface = "cli" | "prComment" | "score" | "ciFailure";
/**
 * Severity value accepted by the top-level `rules` and `categories`
 * config fields. Exactly the same form ESLint and oxlint accept:
 * `"off"` skips registration entirely (the rule never runs and
 * never enters any surface); `"error"` / `"warn"` change the rule's
 * registered severity.
 *
 * For visibility-only adjustments (silence on PR comments but keep
 * on CLI / score), prefer `surfaces` instead — severity applies
 * before lint runs and is the most aggressive control.
 */
type RuleSeverityOverride = "error" | "warn" | "off";
/**
 * Internal shape consumed by `resolveRuleSeverityOverride` and
 * `buildDiagnosticPipeline`. Assembled at runtime from the top-level
 * `rules` and `categories` fields on `ReactDoctorConfig`. Per-rule
 * wins over per-category when both match the same diagnostic.
 */
/**
 * Closed set of severity buckets. Spelled out (rather than
 * `Record<string, …>`) so an unknown/typo'd bucket key is a type error
 * instead of a silent no-op.
 */
interface SeverityBuckets {
  "compiler-cleanup"?: RuleSeverityOverride;
}
interface SurfaceControls {
  /**
   * Tag names whose diagnostics should be force-included on the surface,
   * even if a default or category-level exclusion would otherwise drop
   * them. Include wins over exclude when both apply to the same rule.
   */
  includeTags?: string[];
  /**
   * Tag names whose diagnostics should be excluded from the surface.
   * Use this to silence whole rule families (e.g. `["design"]`,
   * `["test-noise"]`) for a single channel without touching others.
   */
  excludeTags?: string[];
  /** Category names (e.g. `"Maintainability"`) to force-include. */
  includeCategories?: string[];
  /** Category names (e.g. `"Maintainability"`) to exclude. */
  excludeCategories?: string[];
  /**
   * Fully-qualified rule keys (`"<plugin>/<rule>"`, e.g.
   * `"react-doctor/design-no-redundant-size-axes"`) to force-include.
   */
  includeRules?: string[];
  /** Fully-qualified rule keys to exclude from this surface. */
  excludeRules?: string[];
}
interface ReactDoctorConfig {
  $schema?: string;
  ignore?: ReactDoctorIgnoreConfig;
  lint?: boolean;
  /**
   * Whether to run dead-code analysis (via `deslop-js`) alongside lint.
   * Reports unused files, unused exports, unused dependencies, and
   * circular imports under the "Maintainability" category. Default: `true`.
   * Always skipped in `--diff` / `--staged` modes because reachability
   * is a whole-project property.
   */
  deadCode?: boolean;
  verbose?: boolean;
  /**
   * Whether to surface `"warning"`-severity diagnostics. Default: `true`
   * — every warning reaches every surface (CLI, PR comment, score,
   * `--fail-on`).
   *
   * Set to `false` to surface only `"error"`-severity findings. This is the
   * master toggle and runs after per-rule / per-category severity
   * overrides: a rule the user explicitly restamps to `"warn"` (via
   * `rules` / `categories`) still shows even when `warnings` is `false`.
   */
  warnings?: boolean;
  diff?: boolean | string;
  failOn?: FailOnLevel;
  customRulesOnly?: boolean;
  share?: boolean;
  noScore?: boolean;
  /**
   * Redirect react-doctor at a different project directory than the one
   * it was invoked against. Resolved relative to the location of the
   * config file that declared this field (NOT relative to the CWD), so
   * the redirect is stable no matter where the CLI / `diagnose()` is
   * run from. Absolute paths are used as-is.
   *
   * Typical use: a monorepo root holds the only `doctor.config.*`
   * (so editor tooling and child commands all find it), but the React
   * app lives in `apps/web`. Setting `"rootDir": "apps/web"` makes
   * every invocation that loads this config scan that subproject
   * without anyone needing to `cd` first or pass an explicit path.
   *
   * Ignored if the resolved path does not exist or is not a directory
   * (a warning is emitted and react-doctor falls back to the originally
   * requested directory).
   */
  rootDir?: string;
  textComponents?: string[];
  /**
   * Names of components that safely route string-only children through a
   * React Native `<Text>` internally (e.g. `heroui-native`'s `Button`,
   * which stringifies its children and renders them through a
   * `ButtonLabel` → `Text`). For listed components, `rn-no-raw-text`
   * is suppressed ONLY when the wrapper's children are entirely
   * stringifiable (no nested JSX elements). A wrapper with mixed
   * children — e.g. `<Button>Save<Icon /></Button>` — still reports,
   * because the wrapper can't safely route raw text alongside a
   * sibling JSX element.
   *
   * Use this instead of `textComponents` when the component is not
   * itself a text element but is known to wrap its string children
   * in one. `textComponents` is the broader escape hatch and
   * suppresses regardless of sibling content.
   */
  rawTextWrapperComponents?: string[];
  /**
   * Project-level allowlist of function names that the
   * `server-auth-actions` rule treats as an auth check at the top of
   * a server action. Names are accepted whether called as a bare
   * identifier (`myAuthGuard()`) or as the final property of a
   * member call (`ctx.myAuthGuard()`); unlike the built-in default
   * list, user-provided names are treated as distinctive and never
   * subject to receiver-object disambiguation.
   *
   * Use this to teach react-doctor about custom auth guards in
   * codebases that wrap their auth library — e.g. a project-local
   * `requireWorkspaceMember` or `ensureSignedIn`.
   */
  serverAuthFunctionNames?: string[];
  /**
   * Whether to respect inline `// eslint-disable*`, `// oxlint-disable*`,
   * and `// react-doctor-disable*` comments in source files. Default: `true`.
   *
   * File-level ignores (`.gitignore`, `.eslintignore`, `.oxlintignore`,
   * `.prettierignore`, `.gitattributes` `linguist-vendored` /
   * `linguist-generated`) are ALWAYS honored regardless of this option
   * — they typically point at vendored or generated code that
   * genuinely shouldn't be linted at all.
   *
   * Set to `false` for "audit mode": every inline suppression is
   * neutralized so react-doctor reports every diagnostic regardless
   * of historical hide-comments.
   */
  respectInlineDisables?: boolean;
  /**
   * Whether to merge the user's existing JSON oxlint / eslint config
   * (`.oxlintrc.json` or `.eslintrc.json`) into the generated scan via
   * oxlint's `extends` field, so diagnostics from those rules count
   * toward the react-doctor score. Default: `true`.
   *
   * Detection runs at the scanned directory and walks up to the
   * nearest project boundary (`.git` directory or monorepo root).
   * The first match wins, with `.oxlintrc.json` preferred over
   * `.eslintrc.json`.
   *
   * Only JSON-format configs are supported because oxlint's `extends`
   * cannot evaluate JS/TS configs. Flat configs (`eslint.config.js`),
   * legacy JS configs (`.eslintrc.js`), and TypeScript oxlint configs
   * (`oxlint.config.ts`) are silently skipped.
   *
   * Category-level enables in the user's config (`"categories": { ... }`)
   * are NOT honored — react-doctor explicitly disables every oxlint
   * category to keep the scan scoped to its curated rule surface, and
   * local config wins over `extends`. Use rule-level severities to
   * fold rules into the score.
   *
   * Set to `false` to scan only react-doctor's curated rule set.
   */
  adoptExistingLintConfig?: boolean;
  /**
   * Per-surface include/exclude controls. Each `DiagnosticSurface` is
   * resolved independently against rule tags, category, and id so a
   * single rule can be visible locally yet hidden from PR comments,
   * neutralized from the score, and excluded from `--fail-on` — all
   * without touching the rule's severity or activation.
   *
   * Defaults (applied before user overrides):
   *
   * - `prComment` excludes tag `"design"`
   * - `score` excludes tag `"design"`
   * - `ciFailure` excludes tag `"design"`
   *
   * Pass any controls block (even an empty `{}`) to keep the default
   * exclusions; the user's include/exclude entries layer on top.
   * Include entries always win over exclude entries — handy for
   * promoting a single high-signal `design-*` rule back into the
   * score or PR-comment surface.
   */
  surfaces?: Partial<Record<DiagnosticSurface, SurfaceControls>>;
  /**
   * Per-rule severity map — the exact ESLint / oxlint top-level
   * `rules` field. Keys are fully-qualified rule keys
   * (`"<plugin>/<rule>"`, e.g. `"react-doctor/no-array-index-as-key"`),
   * values are `"error" | "warn" | "off"`.
   *
   * `"off"` skips registration in the generated lint config so the
   * rule never runs; `"error"` / `"warn"` re-stamp the registered
   * severity and the post-lint diagnostic, so downstream consumers
   * (`--fail-on`, the score, the printed list) all see the
   * user-chosen severity.
   *
   * For visibility-only changes (silence on PR comments but keep on
   * CLI / score), prefer `surfaces` instead. Most specific control
   * wins: `rules` > `categories` > `tags`.
   *
   * ```json
   * { "rules": { "react-doctor/no-array-index-as-key": "error" } }
   * ```
   */
  rules?: Record<string, RuleSeverityOverride>;
  /**
   * Per-category severity map. Mirrors oxlint's top-level
   * `categories` field, but keyed by React Doctor's five user-facing
   * buckets: `"Security"`, `"Bugs"`, `"Performance"`,
   * `"Accessibility"`, `"Maintainability"`.
   *
   * ```json
   * { "categories": { "Maintainability": "off", "Performance": "warn" } }
   * ```
   *
   * To silence a whole tag-defined rule family (e.g. `"design"`,
   * `"test-noise"`, `"migration-hint"`) that doesn't align with a
   * single category, use `ignore.tags` instead.
   */
  categories?: Record<string, RuleSeverityOverride>;
  /**
   * Per-bucket severity map. Buckets are curated rule families with a
   * shared gating story (not categories). Today the only bucket is
   * `"compiler-cleanup"`: the redundant-memoization rule
   * (`react-compiler-no-manual-memoization`) that ships as a warning once
   * React Compiler is detected. Set it to `"error"` to re-enable strictness.
   *
   * ```json
   * { "buckets": { "compiler-cleanup": "error" } }
   * ```
   *
   * A per-rule override in `rules` still wins over a bucket entry.
   */
  buckets?: SeverityBuckets;
  /**
   * User-defined oxlint plugins to load alongside the built-in
   * `react-doctor` plugin. Each entry is either:
   *
   * - A **relative path** to a JS / TS file (resolved relative to
   *   the directory of the config file that declared it — NOT the
   *   CWD), e.g. `"./lint/my-rules.js"`.
   * - An **npm package name**, e.g. `"react-doctor-plugin-team-conventions"`.
   *
   * The module must default-export an oxlint-shaped plugin:
   * `{ meta: { name: string }, rules: Record<string, HostRule> }`.
   * Use `defineRule` from `oxlint-plugin-react-doctor` for the
   * cleanest authoring shape — see CONTRIBUTING.md → "Writing a
   * custom plugin" for the full template.
   *
   * Rules from a user plugin are **opt-in by default**: a rule
   * doesn't run unless `rules: { "<plugin-name>/<rule>": "warn" | "error" }`
   * explicitly enables it. (Mirrors how `defaultEnabled: false`
   * rules behave in the built-in plugin.) Once enabled, the rule
   * flows through every react-doctor surface (CLI / PR comment /
   * score / CI gate) the same as a built-in rule.
   *
   * ```json
   * {
   *   "plugins": [
   *     "./lint/my-team-rules.js",
   *     "react-doctor-plugin-shopify-conventions"
   *   ],
   *   "rules": {
   *     "my-team-rules/no-bare-fetch": "error",
   *     "shopify-conventions/use-polaris-tokens": "warn"
   *   }
   * }
   * ```
   */
  plugins?: string[];
} //#endregion
//#region src/types/diagnostic.d.ts
interface Diagnostic {
  filePath: string;
  plugin: string;
  rule: string;
  severity: "error" | "warning";
  title?: string;
  message: string;
  help: string;
  url?: string;
  line: number;
  column: number;
  category: string;
  suppressionHint?: string;
}
//#endregion
//#region src/types/project-info.d.ts
type Framework = "nextjs" | "vite" | "cra" | "remix" | "gatsby" | "expo" | "react-native" | "tanstack-start" | "preact" | "unknown";
interface ProjectInfo {
  rootDirectory: string;
  projectName: string;
  reactVersion: string | null;
  reactMajorVersion: number | null;
  tailwindVersion: string | null;
  zodVersion: string | null;
  /** Parsed major from `zodVersion`, or `null` when absent/unparseable. Mirrors `reactMajorVersion`. */
  zodMajorVersion: number | null;
  framework: Framework;
  hasTypeScript: boolean;
  hasReactCompiler: boolean;
  hasTanStackQuery: boolean;
  /**
   * The declared `preact` version spec, or `null` when Preact isn't a
   * dependency. Parallels `reactVersion` so a React-compatible runtime is
   * modeled the same way React is. Drives the `preact` capability in
   * `buildCapabilities` (which gates every `preact-*` rule) — keyed off
   * this rather than `framework` because the dominant Preact setup
   * (Preact-on-Vite) classifies as `framework: "vite"` but still needs
   * Preact rules to fire.
   */
  preactVersion: string | null;
  /** Parsed major from `preactVersion`, or `null` when absent/unparseable. Mirrors `reactMajorVersion`. */
  preactMajorVersion: number | null;
  /**
   * `true` when the project (or any of its workspace packages) declares
   * React Native or Expo as a dependency. Enables the `react-native`
   * capability — and therefore every `rn-*` rule — even on web-rooted
   * monorepos where the entry-point `package.json` is Next / Vite /
   * Remix but a sibling workspace (`apps/mobile`, `packages/native-ui`)
   * targets React Native. The file-level package-boundary check in
   * `oxlint-plugin-react-doctor` still keeps the rules silent on the
   * web workspaces.
   *
   * `false` collapses the gate to the legacy "framework is RN" behavior
   * — no `rn-*` rules load for the project at all.
   */
  hasReactNativeWorkspace: boolean;
  /**
   * The declared `expo` package version spec (e.g. `"~51.0.0"`), looked up
   * in the project or any of its workspace packages, or `null` when `expo`
   * isn't a dependency. Doubles as react-doctor's "is this an Expo project?"
   * signal (`expoVersion !== null`) and its SDK-version source — the `expo`
   * major tracks the Expo SDK release one-to-one — paralleling how
   * `reactVersion` models the React runtime.
   *
   * Keyed off the dependency rather than `framework === "expo"` because
   * `detectFramework` returns the first matching package, so a project
   * declaring both `expo` and a web bundler (`vite` / `next`) classifies as
   * the web framework yet is still an Expo project. Drives the `expo`
   * capability in `buildCapabilities` (which gates every Expo-specific
   * rule) and the ported expo-doctor checks.
   */
  expoVersion: string | null;
  /**
   * The declared `@shopify/flash-list` package version spec, or `null` when
   * absent. FlashList v2 removed the need for `estimatedItemSize`, so this
   * lets the RN list sizing rule stay scoped to versions where the prop is
   * still useful.
   */
  shopifyFlashListVersion: string | null;
  /** Parsed major from `shopifyFlashListVersion`, or `null` when absent/unparseable. */
  shopifyFlashListMajorVersion: number | null;
  /**
   * `true` when the project (or any of its workspace packages) declares
   * `react-native-reanimated`. Lets diagnostics surface reanimated's
   * Compiler-compatible `.get()` / `.set()` accessors only where they
   * apply, instead of on every React Native project.
   */
  hasReanimated: boolean;
  sourceFileCount: number;
}
//#endregion
//#region src/types/score.d.ts
type RuleTier = "P0" | "P1" | "P2" | "P3";
interface RulePriority {
  readonly priority: number | null;
  readonly tier: RuleTier;
}
interface ScoreResult {
  score: number;
  label: string;
  readonly rules?: Readonly<Record<string, RulePriority>>;
} //#endregion
//#region src/types/diagnose.d.ts
interface DiagnoseOptions {
  lint?: boolean;
  /** See `ReactDoctorConfig.deadCode`. Ignored in diff mode. */
  deadCode?: boolean;
  verbose?: boolean;
  includePaths?: string[];
  /**
   * Per-call override for `ReactDoctorConfig.respectInlineDisables`.
   * See that field's docs for the full contract.
   */
  respectInlineDisables?: boolean;
  /**
   * Per-call override for `ReactDoctorConfig.warnings`. See that field's
   * docs — `"warning"`-severity diagnostics surface by default unless this
   * (or the config) opts out via `false`.
   */
  warnings?: boolean;
}
interface DiagnoseResult {
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  /**
   * Checks that did not run to completion (e.g. `"dead-code"` when the
   * `deslop-js` native binding crashed). Empty when everything ran.
   * Mirrors `InspectResult.skippedChecks`.
   */
  skippedChecks: string[];
  /** See `InspectResult.skippedCheckReasons`. */
  skippedCheckReasons?: Record<string, string>;
  project: ProjectInfo;
  elapsedMilliseconds: number;
}
/**
 * A single project to scan as part of a `diagnoseProjects()` batch.
 * Scan options (`deadCode`, `lint`, etc.) are flat on the entry and
 * layer on top of the global defaults — omitted fields fall through.
 * `config` is a full `ReactDoctorConfig` override that replaces the
 * on-disk `doctor.config.*` for this project's scan.
 */
//#endregion
//#region src/types/inspect.d.ts
interface InspectResult {
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  skippedChecks: string[];
  /**
   * Human-readable explanation for each entry in `skippedChecks`. Keyed
   * by check name (e.g. `"lint"`). Optional so existing consumers that
   * only read `skippedChecks` keep working unchanged — but JSON output
   * and CI integrations should prefer this for diagnostic clarity
   * (e.g. distinguishing "oxlint native binding missing" from "oxlint
   * spawn timed out on a large project").
   */
  skippedCheckReasons?: Record<string, string>;
  project: ProjectInfo;
  elapsedMilliseconds: number;
  /**
   * Number of files the scan reported. Distinct from
   * `project.sourceFileCount` in diff / staged mode (where only changed
   * files are scanned). Optional so non-orchestrator constructors keep
   * working; the multi-project summary falls back to
   * `project.sourceFileCount` when absent.
   */
  scannedFileCount?: number;
  /**
   * Absolute paths of every file the scan considered. Lets the
   * multi-project summary count UNIQUE files across projects instead of
   * summing per-project counts, which double-counts shared files when one
   * workspace package's tree is nested inside another's.
   */
  scannedFilePaths?: ReadonlyArray<string>;
  /**
   * Wall-clock duration of the scan phase, in milliseconds. Distinct
   * from `elapsedMilliseconds` (which spans the full `inspect()` call
   * including score fetch + rendering). Used by the multi-project
   * summary to report combined scan time.
   */
  scanElapsedMilliseconds?: number;
}
/**
 * Options accepted by `inspect()`. Mixes two concern groups; ordered
 * here in the source to make the split visible to future readers:
 *
 *   - **Engine inputs** (`lint`, `deadCode`, `includePaths`,
 *     `configOverride`, `respectInlineDisables`) — flow into
 *     `runInspect`'s `InspectInput` and shape what the engine
 *     actually does.
 *   - **Rendering / orchestration knobs** (`scoreOnly`, `noScore`,
 *     `silent`, `verbose`, `outputSurface`, `isCi`) — consumed by
 *     the public-API shell to decide what to print, which surface
 *     to filter for, and whether to mark the run as CI-originated.
 *
 * A full type split was investigated as the plan's T4 follow-up but
 * deferred — every call site builds the union anyway, so the gain
 * was purely documentary. Grouping the fields here captures the
 * same intent without churning a published-API type.
 */
interface DiffInfo {
  /**
   * `null` when `HEAD` is detached (e.g. GitHub Actions `pull_request`
   * runs that check out `refs/pull/N/merge`). The diff itself still
   * resolves via `git merge-base <base> HEAD`; callers should render
   * this case as `"(detached HEAD)"` or similar.
   */
  currentBranch: string | null;
  baseBranch: string;
  changedFiles: string[];
  isCurrentChanges?: boolean;
}
type JsonReportMode = "full" | "diff" | "staged";
interface JsonReportDiffInfo {
  baseBranch: string;
  /** `null` when `HEAD` is detached — see `DiffInfo.currentBranch`. */
  currentBranch: string | null;
  changedFileCount: number;
  isCurrentChanges: boolean;
}
interface JsonReportProjectEntry {
  directory: string;
  project: ProjectInfo;
  diagnostics: Diagnostic[];
  score: ScoreResult | null;
  skippedChecks: string[];
  /** Human-readable explanation per skipped check. See `InspectResult.skippedCheckReasons`. */
  skippedCheckReasons?: Record<string, string>;
  elapsedMilliseconds: number;
}
interface JsonReportSummary {
  errorCount: number;
  warningCount: number;
  affectedFileCount: number;
  totalDiagnosticCount: number;
  score: number | null;
  scoreLabel: string | null;
}
interface JsonReportError {
  message: string;
  name: string;
  chain: string[];
}
interface JsonReport {
  schemaVersion: 1;
  version: string;
  ok: boolean;
  directory: string;
  mode: JsonReportMode;
  diff: JsonReportDiffInfo | null;
  projects: JsonReportProjectEntry[];
  /**
   * Flattened across `projects[].diagnostics` for convenience. Equivalent to
   * `projects.flatMap((project) => project.diagnostics)`.
   */
  diagnostics: Diagnostic[];
  summary: JsonReportSummary;
  elapsedMilliseconds: number;
  error: JsonReportError | null;
} //#endregion
//#region src/types/prompts.d.ts
//#endregion
//#region src/project-info/errors.d.ts
/**
 * Narrow errors raised by the project-discovery helpers
 * (`discoverProject` / `resolveDiagnoseTarget` / `readPackageJson`).
 *
 * These extend `Error` directly — they are NOT the tagged
 * `ReactDoctorError` from `../errors.js` (that one wraps every
 * runtime-pipeline failure as a `Schema.TaggedErrorClass` for
 * `Effect.catchReasons` dispatch). The split is intentional:
 *
 * - Discovery happens BEFORE the Effect runtime takes over — at the
 *   `diagnose()` / CLI entry point — and throws plain JS exceptions
 *   so callers can `try/catch` without an Effect-layer-aware
 *   `instanceof` check.
 * - The Project service (`services/project.ts → translateProjectInfoError`)
 *   translates each of these into the equivalent tagged-error
 *   `reason` before re-raising inside the Effect pipeline, so the
 *   runtime never sees a non-tagged failure.
 *
 * If you're inside the Effect runtime, use the tagged
 * `ReactDoctorError` from `../errors.js` instead.
 */
/**
 * Distinguishes the two situations that both surface as "no project here", so
 * the rendered message matches reality:
 *
 * - `no-project` (default): the path exists but has no React project — no
 *   `package.json` at the root and no discoverable nested React subproject.
 * - `missing-path`: the resolved scan target does not exist on disk at all
 *   (a typo, a stale temp path, a monorepo subdir that isn't present). The
 *   generic "expected a package.json" guidance is misleading here, so point
 *   at the missing path instead.
 */
interface ProjectNotFoundOptions extends ErrorOptions {
  readonly kind?: "no-project" | "missing-path";
}
declare class ProjectNotFoundError extends Error {
  readonly name = "ProjectNotFoundError";
  readonly directory: string;
  readonly kind: "no-project" | "missing-path";
  constructor(directory: string, options?: ProjectNotFoundOptions);
}
declare class NoReactDependencyError extends Error {
  readonly name = "NoReactDependencyError";
  readonly directory: string;
  constructor(directory: string, options?: ErrorOptions);
}
declare class PackageJsonNotFoundError extends Error {
  readonly name = "PackageJsonNotFoundError";
  readonly directory: string;
  constructor(directory: string, options?: ErrorOptions);
}
declare class NotADirectoryError extends Error {
  readonly name = "NotADirectoryError";
  readonly resolvedPath: string;
  constructor(resolvedPath: string, options?: ErrorOptions);
}
declare class AmbiguousProjectError extends Error {
  readonly name = "AmbiguousProjectError";
  readonly directory: string;
  readonly candidates: readonly string[];
  constructor(directory: string, candidates: readonly string[], options?: ErrorOptions);
}
declare const isProjectDiscoveryError: (value: unknown) => value is ProjectNotFoundError | NoReactDependencyError | PackageJsonNotFoundError | NotADirectoryError | AmbiguousProjectError; //#endregion
//#region src/project-info/utils/is-directory.d.ts
//#endregion
//#region src/errors.d.ts
declare const OxlintUnavailable_base: Schema.Class<OxlintUnavailable, Schema.TaggedStruct<"OxlintUnavailable", {
  readonly kind: Schema.Literals<readonly ["binary-not-found", "native-binding-missing"]>;
  readonly detail: Schema.String;
}>, Cause.YieldableError>;
declare class OxlintUnavailable extends OxlintUnavailable_base {
  get message(): string;
}
declare const OxlintBatchExceeded_base: Schema.Class<OxlintBatchExceeded, Schema.TaggedStruct<"OxlintBatchExceeded", {
  readonly kind: Schema.Literals<readonly ["timeout", "output-too-large", "oom", "killed"]>;
  readonly detail: Schema.String;
}>, Cause.YieldableError>;
declare class OxlintBatchExceeded extends OxlintBatchExceeded_base {
  get message(): string;
}
declare const OxlintSpawnFailed_base: Schema.Class<OxlintSpawnFailed, Schema.TaggedStruct<"OxlintSpawnFailed", {
  readonly cause: Schema.Unknown;
}>, Cause.YieldableError>;
declare class OxlintSpawnFailed extends OxlintSpawnFailed_base {
  get message(): string;
}
declare const OxlintOutputUnparseable_base: Schema.Class<OxlintOutputUnparseable, Schema.TaggedStruct<"OxlintOutputUnparseable", {
  readonly preview: Schema.String;
}>, Cause.YieldableError>;
declare class OxlintOutputUnparseable extends OxlintOutputUnparseable_base {
  get message(): string;
}
declare const ConfigParseFailed_base: Schema.Class<ConfigParseFailed, Schema.TaggedStruct<"ConfigParseFailed", {
  readonly path: Schema.String;
  readonly cause: Schema.Unknown;
}>, Cause.YieldableError>;
declare class ConfigParseFailed extends ConfigParseFailed_base {
  get message(): string;
}
declare const ProjectNotFound_base: Schema.Class<ProjectNotFound, Schema.TaggedStruct<"ProjectNotFound", {
  readonly directory: Schema.String;
}>, Cause.YieldableError>;
declare class ProjectNotFound extends ProjectNotFound_base {
  get message(): string;
}
declare const NoReactDependency_base: Schema.Class<NoReactDependency, Schema.TaggedStruct<"NoReactDependency", {
  readonly directory: Schema.String;
}>, Cause.YieldableError>;
declare class NoReactDependency extends NoReactDependency_base {
  get message(): string;
}
declare const AmbiguousProject_base: Schema.Class<AmbiguousProject, Schema.TaggedStruct<"AmbiguousProject", {
  readonly directory: Schema.String;
  readonly candidates: Schema.$Array<Schema.String>;
}>, Cause.YieldableError>;
declare class AmbiguousProject extends AmbiguousProject_base {
  get message(): string;
}
declare const DeadCodeAnalysisFailed_base: Schema.Class<DeadCodeAnalysisFailed, Schema.TaggedStruct<"DeadCodeAnalysisFailed", {
  readonly cause: Schema.Unknown;
}>, Cause.YieldableError>;
declare class DeadCodeAnalysisFailed extends DeadCodeAnalysisFailed_base {
  get message(): string;
}
declare const GitInvocationFailed_base: Schema.Class<GitInvocationFailed, Schema.TaggedStruct<"GitInvocationFailed", {
  readonly args: Schema.$Array<Schema.String>;
  readonly directory: Schema.String;
  readonly cause: Schema.Unknown;
}>, Cause.YieldableError>;
declare class GitInvocationFailed extends GitInvocationFailed_base {
  get message(): string;
}
declare const GitBaseBranchMissing_base: Schema.Class<GitBaseBranchMissing, Schema.TaggedStruct<"GitBaseBranchMissing", {
  readonly branch: Schema.String;
}>, Cause.YieldableError>;
declare class GitBaseBranchMissing extends GitBaseBranchMissing_base {
  get message(): string;
}
declare const GitBaseBranchInvalid_base: Schema.Class<GitBaseBranchInvalid, Schema.TaggedStruct<"GitBaseBranchInvalid", {
  readonly detail: Schema.String;
}>, Cause.YieldableError>;
declare class GitBaseBranchInvalid extends GitBaseBranchInvalid_base {
  get message(): string;
}
declare const ReactDoctorError_base: Schema.Class<ReactDoctorError, Schema.TaggedStruct<"ReactDoctorError", {
  readonly reason: Schema.Union<readonly [typeof OxlintUnavailable, typeof OxlintBatchExceeded, typeof OxlintSpawnFailed, typeof OxlintOutputUnparseable, typeof ConfigParseFailed, typeof ProjectNotFound, typeof NoReactDependency, typeof AmbiguousProject, typeof DeadCodeAnalysisFailed, typeof GitInvocationFailed, typeof GitBaseBranchMissing, typeof GitBaseBranchInvalid]>;
}>, Cause.YieldableError>;
declare class ReactDoctorError extends ReactDoctorError_base {
  get message(): string;
}
declare const isReactDoctorError: (error: unknown) => error is ReactDoctorError;
/**
 * Tagged-reason → legacy thrown-class boundary shared by every public
 * shell (`inspect()` in `react-doctor`, `diagnose()` in `@react-doctor/api`).
 *
 * `Effect.catchReasons` dispatches on the tagged-error sub-channel
 * without manual `instanceof` checks. Each handler converts a tagged
 * reason into the historical thrown class advertised by the legacy
 * public-API contract (via `Effect.die`, which `Effect.runPromise`
 * re-throws unchanged). The `orElse` branch re-`die`s the original
 * `ReactDoctorError` instance so advanced callers can still narrow on
 * `error.reason._tag` while grep-stderr users keep the same
 * `error.message` they always saw.
 *
 * Adding a new legacy thrown class is a one-line change on the
 * `Effect.catchReasons` map — both shells pick it up automatically.
 */
//#endregion
//#region src/build-json-report-error.d.ts
interface BuildJsonReportErrorInput {
  version: string;
  directory: string;
  error: unknown;
  elapsedMilliseconds: number;
  mode?: JsonReportMode;
}
declare const buildJsonReportError: (input: BuildJsonReportErrorInput) => JsonReport; //#endregion
//#region src/build-json-report.d.ts
interface BuildJsonReportInput {
  version: string;
  directory: string;
  mode: JsonReportMode;
  diff: DiffInfo | null;
  scans: Array<{
    directory: string;
    result: InspectResult;
  }>;
  totalElapsedMilliseconds: number;
}
declare const buildJsonReport: (input: BuildJsonReportInput) => JsonReport; //#endregion
//#region src/build-skipped-checks.d.ts
//#endregion
//#region src/get-diff-files.d.ts
/**
 * Programmatic façade over `Git.diffSelection`. Async because the
 * Git service runs through Effect's `ChildProcess` (true subprocess
 * spawn, not `spawnSync`).
 *
 * Failures propagate as the tagged `ReactDoctorError` (rejected by
 * `Effect.runPromise`) rather than being flattened into a plain
 * `Error`. The message is unchanged — `ReactDoctorError.message`
 * defers to `reason.message` — so message-matching callers keep
 * working, while the CLI can now dispatch on `error.reason._tag` to
 * render diff-base mistakes (`GitBaseBranchInvalid` /
 * `GitBaseBranchMissing`) as clean user errors instead of crashes.
 */
declare const getDiffInfo: (directory: string, explicitBaseBranch?: string) => Promise<DiffInfo | null>;
declare const filterSourceFiles: (filePaths: string[]) => string[]; //#endregion
//#region ../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/types.d.ts
//#endregion
//#region src/summarize-diagnostics.d.ts
declare const summarizeDiagnostics: (diagnostics: Diagnostic[], worstScore?: number | null, worstScoreLabel?: string | null) => JsonReportSummary; //#endregion
//#region src/validate-config-types.d.ts
//#endregion
//#region ../api/dist/index.d.ts
//#region src/diagnose.d.ts
declare const diagnose: (directory: string, options?: DiagnoseOptions) => Promise<DiagnoseResult>;
/**
 * Scan multiple projects in parallel and return per-project scores,
 * diagnostics, and an aggregate score (worst-of across all projects).
 *
 * Each project runs its own independent `runInspect` pipeline — the
 * same pipeline `diagnose()` uses — so per-project config overrides,
 * dead-code analysis, and scoring all work identically to a single
 * `diagnose()` call.
 *
 * Projects that fail (e.g. missing `package.json`, no React dependency)
 * are included in the result with `ok: false` rather than aborting the
 * entire batch, so callers always receive partial results.
 *
 * ```ts
 * const result = await diagnoseProjects({
 *   projects: [
 *     { directory: "packages/app" },
 *     { directory: "packages/shared", deadCode: false },
 *     { directory: "packages/admin", config: {
 *       rules: { "react-doctor/no-array-index-as-key": "off" },
 *     }},
 *   ],
 *   concurrency: 4,
 * });
 *
 * for (const project of result.projects) {
 *   if (project.ok) {
 *     console.log(project.directory, project.score);
 *   } else {
 *     console.error(project.directory, project.error);
 *   }
 * }
 * ```
 */
//#endregion
//#region src/index.d.ts
declare const clearCaches: () => void;
interface ToJsonReportOptions {
  version: string;
  directory?: string;
  mode?: JsonReportMode;
}
declare const toJsonReport: (result: DiagnoseResult, options: ToJsonReportOptions) => JsonReport;
//#endregion
export { AmbiguousProjectError, type DiagnoseOptions, type DiagnoseResult, type Diagnostic, type DiffInfo, type JsonReport, type JsonReportDiffInfo, type JsonReportError, type JsonReportMode, type JsonReportProjectEntry, type JsonReportSummary, NoReactDependencyError, NotADirectoryError, PackageJsonNotFoundError, type ProjectInfo, ProjectNotFoundError, type ReactDoctorConfig, ReactDoctorError, type ScoreResult, buildJsonReport, buildJsonReportError, clearCaches, diagnose, filterSourceFiles, getDiffInfo, isProjectDiscoveryError, isReactDoctorError, summarizeDiagnostics, toJsonReport };
//# sourceMappingURL=index.d.ts.map