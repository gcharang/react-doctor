#!/usr/bin/env node
// Vendor the agent playbook + per-rule fix recipes into the `pinned` branch.
//
// The hardened fork serves these from raw GitHub instead of fetching them
// live from react.doctor at runtime (the prompt-injection surface). This
// script pulls a one-time, reviewable snapshot from the upstream site into
// `prompts/`, which is then committed. RE-RUN after merging `main` to refresh
// the snapshot — and REVIEW the diff before committing, since the content
// originates from the site the fork is hardening against.
//
// Usage:  node scripts/vendor-prompts.mjs
//
// Requires the engine to be built first (`pnpm build`) so the rule list can be
// read from its dist, and outbound network access to www.react.doctor.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const PROMPTS_DIR = resolve(REPO_ROOT, "prompts");
const RULES_DIR = resolve(PROMPTS_DIR, "rules", "react-doctor");
const ENGINE_DIST = resolve(REPO_ROOT, "packages/oxlint-plugin-react-doctor/dist/index.js");

const SOURCE_BASE = "https://www.react.doctor/prompts";
const PLAYBOOK_URL = `${SOURCE_BASE}/react-doctor-agent.md`;
const FETCH_TIMEOUT_MS = 15_000;

// The fork's runtime targets. The upstream content references react.doctor and
// the published npm package in a few spots (notably the playbook's scan command
// and its per-rule recipe `curl`). Repoint them so the vendored copy contains
// no runtime react.doctor fetch or `react-doctor@latest` invocation — the whole
// point of vendoring. More-specific URLs are replaced before the bare domain.
const FORK_RAW_PROMPTS = "https://raw.githubusercontent.com/gcharang/react-doctor/pinned/prompts";
const FORK_REPO_URL = "https://github.com/gcharang/react-doctor";
const FORK_PACKAGE_SPEC = "github:gcharang/react-doctor#pinned";

const sanitize = (text) =>
  text
    .replaceAll("https://www.react.doctor/prompts", FORK_RAW_PROMPTS)
    .replaceAll("https://react.doctor/prompts", FORK_RAW_PROMPTS)
    .replaceAll("react-doctor@latest", FORK_PACKAGE_SPEC)
    .replaceAll("https://www.react.doctor", FORK_REPO_URL)
    .replaceAll("https://react.doctor", FORK_REPO_URL);

const fetchText = async (url) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: { "Cache-Control": "no-cache" },
      signal: controller.signal,
    });
    if (response.status === 404) return { status: 404, body: null };
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return { status: 200, body: await response.text() };
  } finally {
    clearTimeout(timeout);
  }
};

const loadRules = async () => {
  const engine = await import(ENGINE_DIST).catch((cause) => {
    throw new Error(
      `Cannot import the built engine at ${ENGINE_DIST} — run \`pnpm build\` first. (${cause})`,
    );
  });
  const plugin = engine.default ?? engine;
  if (!plugin?.rules || typeof plugin.rules !== "object") {
    throw new Error("oxlint-plugin-react-doctor default export has no `rules` map.");
  }
  return plugin.rules;
};

// For the handful of engine rules with no upstream recipe (they 404), the CLI
// still advertises a recipe link because `hasPublishedFixRecipe` is true for
// every react-doctor-namespaced rule. Rather than leave those links dead,
// synthesize a minimal recipe from the rule's own in-repo metadata — no
// react.doctor content involved.
const buildFallbackRecipe = (id, rule) => {
  const field = (label, value) => (value ? `- **${label}:** ${value}\n` : "");
  return (
    `# \`react-doctor/${id}\`\n\n` +
    "> Auto-generated from the rule's metadata — no standalone fix recipe is " +
    "published for this rule. The guidance below comes from the rule definition " +
    "in this fork.\n\n" +
    field("Title", rule?.title) +
    field("Severity", rule?.severity) +
    field("Category", rule?.category) +
    field("Framework", rule?.framework) +
    (rule?.recommendation ? `\n## Recommendation\n\n${rule.recommendation}\n` : "")
  );
};

const main = async () => {
  mkdirSync(RULES_DIR, { recursive: true });

  // 1. The agent playbook — essential; a failure here aborts the run.
  process.stdout.write(`Fetching playbook → ${PLAYBOOK_URL}\n`);
  const playbook = await fetchText(PLAYBOOK_URL);
  if (playbook.status !== 200 || !playbook.body) {
    throw new Error(`Playbook fetch failed (status ${playbook.status}); aborting.`);
  }
  writeFileSync(resolve(PROMPTS_DIR, "react-doctor-agent.md"), sanitize(playbook.body));

  // 2. A recipe for EVERY engine rule (so no advertised link 404s). Fetch the
  //    upstream recipe; for the few that have none, synthesize one from the
  //    rule's metadata.
  const rules = await loadRules();
  const ruleIds = Object.keys(rules).sort();
  process.stdout.write(`Fetching recipes for ${ruleIds.length} engine rules…\n`);

  let fetched = 0;
  let synthesized = 0;
  const failed = [];
  for (const id of ruleIds) {
    const url = `${SOURCE_BASE}/rules/react-doctor/${id}.md`;
    try {
      const recipe = await fetchText(url);
      if (recipe.status === 404 || !recipe.body) {
        writeFileSync(resolve(RULES_DIR, `${id}.md`), sanitize(buildFallbackRecipe(id, rules[id])));
        synthesized += 1;
        continue;
      }
      writeFileSync(resolve(RULES_DIR, `${id}.md`), sanitize(recipe.body));
      fetched += 1;
    } catch (cause) {
      failed.push(`${id}: ${cause instanceof Error ? cause.message : String(cause)}`);
    }
  }

  // Prune recipes for rules upstream removed/renamed. The dir is strictly
  // one-recipe-per-engine-rule; a leftover .md with no matching rule would serve a
  // dead recipe and silently re-accumulate on every scrape (this script only ever
  // wrote files before). Without this, `prompts/` drifts even with a fresh scrape.
  const liveRecipeIds = new Set(ruleIds);
  let pruned = 0;
  for (const file of readdirSync(RULES_DIR)) {
    if (!file.endsWith(".md") || liveRecipeIds.has(file.slice(0, -3))) continue;
    rmSync(resolve(RULES_DIR, file));
    pruned += 1;
  }

  process.stdout.write(
    `\nVendored: 1 playbook + ${fetched} fetched recipes + ${synthesized} synthesized (no upstream recipe)` +
      `${pruned > 0 ? ` + ${pruned} pruned (rule removed upstream)` : ""}.\n`,
  );
  if (failed.length > 0) {
    process.stdout.write(`\n${failed.length} recipe fetches errored (not 404):\n`);
    for (const line of failed) process.stdout.write(`  - ${line}\n`);
    process.exitCode = 1;
  }
};

await main();
