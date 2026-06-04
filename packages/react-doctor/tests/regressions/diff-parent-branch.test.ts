/**
 * `--diff parent` resolves the branch the current branch forked from
 * (nearest merge-base) instead of the repo default branch, so stacked
 * branches (feature forked off an integration branch forked off `main`)
 * scope the scan to their OWN changes rather than the whole stack.
 *
 * Detection is opt-in: `getDiffInfo(dir, undefined, { useParentBranch: true })`
 * mirrors the CLI's `--diff parent`. With no diff-able parent it degrades
 * to the default-branch behavior of bare `--diff`.
 */

import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import os from "node:os";
import * as path from "node:path";
import { afterAll, describe, expect, it } from "vite-plus/test";

import { getDiffInfo } from "@react-doctor/core";
import { commitAll, initGitRepo, writeFile } from "./_helpers.js";

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "rd-diff-parent-"));

afterAll(() => {
  fs.rmSync(tempRoot, { recursive: true, force: true });
});

const sortedChangedFiles = (files: readonly string[] | undefined): string[] =>
  [...(files ?? [])].sort();

const git = (repoDir: string, ...args: string[]): void => {
  spawnSync("git", args, { cwd: repoDir });
};

/** Fresh repo on `main` with a committed `src/app.tsx`. */
const initRepoWithApp = (caseId: string): string => {
  const repoDir = path.join(tempRoot, caseId);
  fs.mkdirSync(repoDir, { recursive: true });
  writeFile(path.join(repoDir, "src", "app.tsx"), "export const App = () => null;\n");
  initGitRepo(repoDir);
  commitAll(repoDir, "init");
  return repoDir;
};

describe("--diff parent: nearest-merge-base parent-branch detection", () => {
  it("picks the intermediate integration branch over the default branch on a stacked branch", async () => {
    // #given main → base (forked from main) → feature (forked from base)
    const repoDir = initRepoWithApp("stacked");

    git(repoDir, "checkout", "-q", "-b", "base");
    writeFile(path.join(repoDir, "src", "base.tsx"), "export const Base = () => null;\n");
    commitAll(repoDir, "base work");

    git(repoDir, "checkout", "-q", "-b", "feature");
    writeFile(path.join(repoDir, "src", "feature.tsx"), "export const Feature = () => null;\n");
    commitAll(repoDir, "feature work");

    // #when parent detection runs on `feature`
    const diffInfo = await getDiffInfo(repoDir, undefined, { useParentBranch: true });

    // #then it diffs against `base` (nearest fork point), NOT `main` — so
    // only feature's own commit is in scope, not base's.
    expect(diffInfo).not.toBeNull();
    expect(diffInfo?.baseBranch).toBe("base");
    expect(diffInfo?.currentBranch).toBe("feature");
    expect(diffInfo?.isCurrentChanges).toBeUndefined();
    expect(sortedChangedFiles(diffInfo?.changedFiles)).toEqual(["src/feature.tsx"]);
  });

  it("falls back to the default branch when the branch forked directly from it", async () => {
    // #given main → feature (forked from main); main is the only other branch
    const repoDir = initRepoWithApp("feature-off-main");

    git(repoDir, "checkout", "-q", "-b", "feature");
    writeFile(path.join(repoDir, "src", "feature.tsx"), "export const Feature = () => null;\n");
    commitAll(repoDir, "feature work");

    // #when parent detection runs on `feature`
    const diffInfo = await getDiffInfo(repoDir, undefined, { useParentBranch: true });

    // #then `main` is the detected parent (only candidate)
    expect(diffInfo?.baseBranch).toBe("main");
    expect(diffInfo?.currentBranch).toBe("feature");
    expect(sortedChangedFiles(diffInfo?.changedFiles)).toEqual(["src/feature.tsx"]);
  });

  it("degrades to default-branch behavior when no sibling branch exists", async () => {
    // #given a lone `main` with an uncommitted change to a tracked file
    const repoDir = initRepoWithApp("no-sibling");
    writeFile(path.join(repoDir, "src", "app.tsx"), "export const App = () => <span />;\n");

    // #when parent detection runs but there is no other branch to fork from
    const diffInfo = await getDiffInfo(repoDir, undefined, { useParentBranch: true });

    // #then it behaves exactly like bare `--diff`: working-tree vs HEAD on main
    expect(diffInfo?.baseBranch).toBe("main");
    expect(diffInfo?.isCurrentChanges).toBe(true);
    expect(sortedChangedFiles(diffInfo?.changedFiles)).toEqual(["src/app.tsx"]);
  });

  it("breaks ties among equidistant non-default branches by name, not by picking the default branch", async () => {
    // #given main → base → {sibling, feature}, sibling and feature both forked
    // from base at the same commit. So `base` and `sibling` share feature's
    // merge-base (distance 1) while `main` is farther (distance 2).
    const repoDir = initRepoWithApp("sibling-tie");

    git(repoDir, "checkout", "-q", "-b", "base");
    writeFile(path.join(repoDir, "src", "base.tsx"), "export const Base = () => null;\n");
    commitAll(repoDir, "base work");

    git(repoDir, "checkout", "-q", "-b", "sibling");
    writeFile(path.join(repoDir, "src", "sibling.tsx"), "export const Sibling = () => null;\n");
    commitAll(repoDir, "sibling work");

    git(repoDir, "checkout", "-q", "base");
    git(repoDir, "checkout", "-q", "-b", "feature");
    writeFile(path.join(repoDir, "src", "feature.tsx"), "export const Feature = () => null;\n");
    commitAll(repoDir, "feature work");

    // #when parent detection runs on `feature`
    const diffInfo = await getDiffInfo(repoDir, undefined, { useParentBranch: true });

    // #then the nearest fork point wins over the farther default branch, and
    // the distance-1 tie between `base` and `sibling` (neither is the default)
    // resolves lexicographically to `base`. The diff is scoped to feature's commit.
    expect(diffInfo?.baseBranch).toBe("base");
    expect(sortedChangedFiles(diffInfo?.changedFiles)).toEqual(["src/feature.tsx"]);
  });

  it("prefers the default branch when it ties with a non-default branch at the same fork point", async () => {
    // #given main and `alt` both sit at the commit `feature` forked from, so
    // they tie at distance 1. `alt` sorts before `main` lexicographically, so
    // only the default-branch preference makes `main` win.
    const repoDir = initRepoWithApp("default-tie");

    git(repoDir, "checkout", "-q", "-b", "alt"); // alt == main == init commit
    git(repoDir, "checkout", "-q", "main");
    git(repoDir, "checkout", "-q", "-b", "feature");
    writeFile(path.join(repoDir, "src", "feature.tsx"), "export const Feature = () => null;\n");
    commitAll(repoDir, "feature work");

    // #when parent detection runs on `feature`
    const diffInfo = await getDiffInfo(repoDir, undefined, { useParentBranch: true });

    // #then `main` wins the tie via the default-branch preference (not `alt`,
    // which would win on name alone).
    expect(diffInfo?.baseBranch).toBe("main");
    expect(sortedChangedFiles(diffInfo?.changedFiles)).toEqual(["src/feature.tsx"]);
  });

  it("returns null on a detached HEAD (no current branch to fork from), like bare --diff", async () => {
    // #given a repo with two commits, then a detached checkout of the first
    const repoDir = initRepoWithApp("detached");
    const firstSha = spawnSync("git", ["rev-parse", "HEAD"], { cwd: repoDir, encoding: "utf-8" })
      .stdout.toString()
      .trim();
    writeFile(path.join(repoDir, "src", "later.tsx"), "export const Later = () => null;\n");
    commitAll(repoDir, "later work");
    git(repoDir, "checkout", "-q", firstSha);

    // #when / #then parent detection cannot infer scope → full scan
    await expect(getDiffInfo(repoDir, undefined, { useParentBranch: true })).resolves.toBeNull();
  });
});
