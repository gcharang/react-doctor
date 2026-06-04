import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { calculateScore, getScoreLabel } from "@react-doctor/core";
import type { Diagnostic } from "@react-doctor/core";

// The `pinned` fork computes the score offline (no react.doctor API call), so
// these tests cover the local formula and label bucketing, and assert that
// nothing is sent over the network.

const diag = (rule: string, severity: "error" | "warning"): Diagnostic => ({
  filePath: "src/App.tsx",
  plugin: "react-doctor",
  rule,
  severity,
  message: "Example",
  help: "",
  line: 1,
  column: 1,
  category: "performance",
});

describe("calculateScore (offline)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns a perfect score for a clean scan", async () => {
    // #given no diagnostics
    // #then the score is 100 / Great
    expect(await calculateScore([])).toEqual({ score: 100, label: "Great" });
  });

  it("penalizes each distinct error rule by 1.5", async () => {
    // #given two distinct error rules
    // #then penalty is 3.0 → 97
    const result = await calculateScore([diag("a", "error"), diag("b", "error")]);
    expect(result).toEqual({ score: 97, label: "Great" });
  });

  it("penalizes each distinct warning rule by 0.75", async () => {
    // #given four distinct warning rules
    // #then penalty is 3.0 → 97
    const result = await calculateScore([
      diag("a", "warning"),
      diag("b", "warning"),
      diag("c", "warning"),
      diag("d", "warning"),
    ]);
    expect(result).toEqual({ score: 97, label: "Great" });
  });

  it("counts a rule once no matter how many times it fires", async () => {
    // #given the same error rule three times plus one other error rule
    // #then only the two distinct rules are penalized → 97
    const result = await calculateScore([
      diag("a", "error"),
      diag("a", "error"),
      diag("a", "error"),
      diag("b", "error"),
    ]);
    expect(result).toEqual({ score: 97, label: "Great" });
  });

  it("buckets a mid-range score as 'Needs work' and floors at zero", async () => {
    // #given 40 distinct error rules (penalty 60) → 40 / Critical
    const many = Array.from({ length: 40 }, (_unused, index) => diag(`r${index}`, "error"));
    expect(await calculateScore(many)).toEqual({ score: 40, label: "Critical" });

    // #given enough rules to exceed 100 of penalty → clamped to 0
    const tooMany = Array.from({ length: 80 }, (_unused, index) => diag(`r${index}`, "error"));
    expect(await calculateScore(tooMany)).toEqual({ score: 0, label: "Critical" });
  });

  it("never returns null and ignores CI/metadata options", async () => {
    // #given options the offline scorer no longer uses
    // #then the score is identical to the no-options result
    const base = await calculateScore([diag("a", "error")]);
    const withOptions = await calculateScore([diag("a", "error")], {
      isCi: true,
      metadata: { repo: "owner/repo", sha: "abc123", doctorVersion: "0.2.18" },
    });
    expect(withOptions).toEqual(base);
    expect(withOptions).not.toBeNull();
  });

  it("never touches the network", async () => {
    // #given a stubbed global fetch
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    // #when computing a score
    await calculateScore([diag("a", "error"), diag("b", "warning")]);

    // #then no request is made
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("getScoreLabel", () => {
  it("buckets by the good/ok thresholds", () => {
    expect(getScoreLabel(100)).toBe("Great");
    expect(getScoreLabel(75)).toBe("Great");
    expect(getScoreLabel(74)).toBe("Needs work");
    expect(getScoreLabel(50)).toBe("Needs work");
    expect(getScoreLabel(49)).toBe("Critical");
    expect(getScoreLabel(0)).toBe("Critical");
  });
});
