import { DOCS_RULES_BASE_URL, RECIPE_RULES_RAW_BASE_URL } from "../constants.js";

/**
 * Human-facing URL for a rule's documentation — its reviewer-tested fix
 * recipe, vendored into `prompts/rules/<plugin>/<rule>.md` on the `pinned`
 * branch and rendered as markdown by GitHub. The CLI links here from its
 * "Learn more" line so humans read the recipe in a browser.
 */
export const buildRuleDocsUrl = (plugin: string, rule: string): string =>
  `${DOCS_RULES_BASE_URL}/${plugin}/${rule}.md`;

/**
 * Agent-facing URL for a rule's fix recipe — the same vendored markdown as
 * `buildRuleDocsUrl`, served raw so an agent can `curl` it directly. The CLI
 * emits this in its fix-recipe directive so each fix follows the canonical,
 * pinned recipe instead of being improvised per diagnostic.
 */
export const buildRuleRecipeUrl = (plugin: string, rule: string): string =>
  `${RECIPE_RULES_RAW_BASE_URL}/${plugin}/${rule}.md`;
