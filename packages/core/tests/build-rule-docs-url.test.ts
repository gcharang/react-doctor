import { describe, expect, it } from "vite-plus/test";
import {
  buildRuleDocsUrl,
  buildRuleRecipeUrl,
  DOCS_RULES_BASE_URL,
  RECIPE_RULES_RAW_BASE_URL,
} from "@react-doctor/core";

describe("buildRuleDocsUrl", () => {
  it("builds the human-facing per-rule docs (GitHub blob) URL from plugin and rule", () => {
    // #given the fork serves vendored recipes as rendered markdown blobs
    // #then the URL is the blob base + `<plugin>/<rule>.md`
    expect(buildRuleDocsUrl("react-doctor", "no-array-index-key")).toBe(
      `${DOCS_RULES_BASE_URL}/react-doctor/no-array-index-key.md`,
    );
  });

  it("preserves non-react-doctor plugin namespaces", () => {
    expect(buildRuleDocsUrl("jsx-a11y", "anchor-is-valid")).toBe(
      `${DOCS_RULES_BASE_URL}/jsx-a11y/anchor-is-valid.md`,
    );
  });
});

describe("buildRuleRecipeUrl", () => {
  it("builds the agent-facing per-rule recipe (raw markdown) URL from plugin and rule", () => {
    // #given an agent curls the recipe directly
    // #then the URL is the raw base + `<plugin>/<rule>.md`
    expect(buildRuleRecipeUrl("react-doctor", "no-array-index-key")).toBe(
      `${RECIPE_RULES_RAW_BASE_URL}/react-doctor/no-array-index-key.md`,
    );
  });

  it("points at the fork's raw GitHub content, not react.doctor", () => {
    expect(buildRuleRecipeUrl("react-doctor", "no-danger")).toContain(
      "raw.githubusercontent.com/gcharang/react-doctor/pinned/prompts/rules/",
    );
  });
});
