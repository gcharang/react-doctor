import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { calculateScore, filterDiagnosticsForSurface } from "@react-doctor/core";
import { inspect } from "../src/inspect.js";
import path from "node:path";
import reactDoctorPlugin from "oxlint-plugin-react-doctor";

vi.mock("ora", () => ({
  default: () => ({
    text: "",
    start: function () {
      return this;
    },
    stop: function () {
      return this;
    },
    succeed: () => {},
    fail: () => {},
  }),
}));

const FIXTURES_DIRECTORY = path.resolve(
  import.meta.dirname,
  "..",
  "..",
  "core",
  "tests",
  "fixtures",
);

const hasDesignTag = (ruleId: string): boolean =>
  reactDoctorPlugin.rules[ruleId]?.tags?.includes("design") ?? false;

// The `design`-tagged rules ship `defaultEnabled: false`, so the surface
// filter has nothing to act on unless we opt them back in. Enable a few
// inline-style design rules that fire on `basic-react/src/design-issues.tsx`
// (no Tailwind capability required) so these surface-filter assertions
// exercise real design-tagged diagnostics.
const DESIGN_RULE_OVERRIDES = {
  "react-doctor/no-gradient-text": "warn",
  "react-doctor/no-pure-black-background": "warn",
  "react-doctor/no-dark-mode-glow": "warn",
  "react-doctor/no-side-tab-border": "warn",
} satisfies Record<string, "error" | "warn" | "off">;

const isReactDoctorDesign = (diagnostic: { plugin: string; rule: string }): boolean =>
  diagnostic.plugin === "react-doctor" && hasDesignTag(diagnostic.rule);

describe("inspect — score surface filter", () => {
  beforeEach(() => {
    // Scoring is computed locally on the `pinned` fork, so a scan must never
    // reach the network. Fail loudly if anything tries.
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("unexpected network access during inspect");
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("strips `design`-tagged diagnostics from the score surface but keeps them in the output", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    try {
      const result = await inspect(path.join(FIXTURES_DIRECTORY, "basic-react"), {
        lint: true,
        deadCode: false,
        noScore: false,
        warnings: true,
        configOverride: { rules: DESIGN_RULE_OVERRIDES },
      });

      // #then a score was computed (offline — no network)
      expect(result.score).not.toBeNull();

      // #and design-tagged diagnostics are excluded from the score surface
      const scoreSurface = filterDiagnosticsForSurface([...result.diagnostics], "score", null);
      expect(scoreSurface.filter(isReactDoctorDesign)).toEqual([]);

      // #and the reported score is exactly the score of that design-excluded
      // surface (integration: the filtered set is what actually got scored)
      const expectedScore = await calculateScore([...scoreSurface]);
      expect(result.score?.score).toBe(expectedScore.score);

      // #but they remain in the full returned diagnostics
      expect(result.diagnostics.filter(isReactDoctorDesign).length).toBeGreaterThan(0);
    } finally {
      consoleSpy.mockRestore();
    }
  });

  // Regression for the Bugbot finding on #271: the `cli` outputSurface
  // used to short-circuit to the raw diagnostic list, which silently
  // dropped any user-configured `surfaces.cli.exclude*` controls before
  // the printed output rendered. The filter now always runs so user
  // overrides on the cli surface flow through end-to-end.
  it(
    "honors user-configured `surfaces.cli` overrides on the printed output",
    { timeout: 60_000 },
    async () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      const printedLines: string[] = [];
      consoleSpy.mockImplementation((...args: unknown[]) => {
        printedLines.push(args.map(String).join(" "));
      });

      try {
        const baselineResult = await inspect(path.join(FIXTURES_DIRECTORY, "basic-react"), {
          lint: true,
          deadCode: false,
          noScore: true,
          warnings: true,
          configOverride: { rules: DESIGN_RULE_OVERRIDES },
        });
        const baselineDesignCount = baselineResult.diagnostics.filter(isReactDoctorDesign).length;
        expect(baselineDesignCount).toBeGreaterThan(0);
        printedLines.length = 0;

        await inspect(path.join(FIXTURES_DIRECTORY, "basic-react"), {
          lint: true,
          deadCode: false,
          noScore: true,
          warnings: true,
          outputSurface: "cli",
          configOverride: {
            rules: DESIGN_RULE_OVERRIDES,
            surfaces: { cli: { excludeTags: ["design"] } },
          },
        });

        const printedText = printedLines.join("\n");
        expect(printedText).toContain(`${baselineDesignCount} demoted from the cli surface`);
      } finally {
        consoleSpy.mockRestore();
      }
    },
  );
});
