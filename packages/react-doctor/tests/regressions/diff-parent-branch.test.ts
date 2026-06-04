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

  it("excludes a child branch forked from a midpoint of the current branch and picks the true parent", async () => {
    // #given main → integration → feature(feature1, feature2), and a `child`
    // branch forked from feature's FIRST commit. child's merge-base with HEAD
    // is that midpoint (distance 1) — nearer than integration (distance 2) —
    // so nearest-merge-base alone would wrongly pick child and scope the scan
    // to only feature's last commit.
    const repoDir = initRepoWithApp("child-midpoint");

    git(repoDir, "checkout", "-q", "-b", "integration");
    writeFile(
      path.join(repoDir, "src", "integration.tsx"),
      "export const Integration = () => null;\n",
    );
    commitAll(repoDir, "integration work");

    git(repoDir, "checkout", "-q", "-b", "feature");
    writeFile(path.join(repoDir, "src", "feature1.tsx"), "export const Feature1 = () => null;\n");
    const feature1 = commitAll(repoDir, "feature work 1");
    writeFile(path.join(repoDir, "src", "feature2.tsx"), "export const Feature2 = () => null;\n");
    commitAll(repoDir, "feature work 2");

    git(repoDir, "checkout", "-q", "-b", "child", feature1);
    writeFile(path.join(repoDir, "src", "child.tsx"), "export const Child = () => null;\n");
    commitAll(repoDir, "child work");

    git(repoDir, "checkout", "-q", "feature");

    // #when parent detection runs on `feature`
    const diffInfo = await getDiffInfo(repoDir, undefined, { useParentBranch: true });

    // #then `child` is excluded — it has its own commit, so it is not an
    // ancestor of HEAD — leaving `integration` as the nearest ancestor. BOTH of
    // feature's commits are in scope, not just the last one.
    expect(diffInfo?.baseBranch).toBe("integration");
    expect(sortedChangedFiles(diffInfo?.changedFiles)).toEqual([
      "src/feature1.tsx",
      "src/feature2.tsx",
    ]);
  });

  it("excludes a child branch and falls back to the default branch when there is no intermediate parent", async () => {
    // #given main → feature(feature1, feature2), and a `child` forked from
    // feature's first commit. child's merge-base (distance 1) is nearer than
    // main (distance 2), so nearest-merge-base alone would pick child.
    const repoDir = initRepoWithApp("child-simple");

    git(repoDir, "checkout", "-q", "-b", "feature");
    writeFile(path.join(repoDir, "src", "feature1.tsx"), "export const Feature1 = () => null;\n");
    const feature1 = commitAll(repoDir, "feature work 1");
    writeFile(path.join(repoDir, "src", "feature2.tsx"), "export const Feature2 = () => null;\n");
    commitAll(repoDir, "feature work 2");

    git(repoDir, "checkout", "-q", "-b", "child", feature1);
    writeFile(path.join(repoDir, "src", "child.tsx"), "export const Child = () => null;\n");
    commitAll(repoDir, "child work");

    git(repoDir, "checkout", "-q", "feature");

    // #when parent detection runs on `feature`
    const diffInfo = await getDiffInfo(repoDir, undefined, { useParentBranch: true });

    // #then `child` is excluded (non-ancestor); `main`, the only ancestor, wins
    // and both of feature's commits are in scope.
    expect(diffInfo?.baseBranch).toBe("main");
    expect(sortedChangedFiles(diffInfo?.changedFiles)).toEqual([
      "src/feature1.tsx",
      "src/feature2.tsx",
    ]);
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

  it("excludes a non-ancestor sibling and breaks ties among equidistant ancestors by name", async () => {
    // #given main → base(base.tsx); `base2` points at base's commit too; then
    // both `feature` and a divergent `a-sibling` fork from base. For `feature`,
    // `base` and `base2` are equidistant ancestors (distance 1), `main` is
    // farther (distance 2), and `a-sibling` — carrying its own commit — is a
    // non-ancestor of HEAD at distance 1. Its name sorts before `base`, so on
    // nearest-merge-base alone it would win the tie — the ancestry gate is the
    // only thing that drops it.
    const repoDir = initRepoWithApp("sibling-and-tie");

    git(repoDir, "checkout", "-q", "-b", "base");
    writeFile(path.join(repoDir, "src", "base.tsx"), "export const Base = () => null;\n");
    commitAll(repoDir, "base work");
    // a second branch sitting on the exact same commit as `base`
    git(repoDir, "branch", "base2");

    git(repoDir, "checkout", "-q", "-b", "a-sibling");
    writeFile(path.join(repoDir, "src", "sibling.tsx"), "export const Sibling = () => null;\n");
    commitAll(repoDir, "sibling work");

    git(repoDir, "checkout", "-q", "base");
    git(repoDir, "checkout", "-q", "-b", "feature");
    writeFile(path.join(repoDir, "src", "feature.tsx"), "export const Feature = () => null;\n");
    commitAll(repoDir, "feature work");

    // #when parent detection runs on `feature`
    const diffInfo = await getDiffInfo(repoDir, undefined, { useParentBranch: true });

    // #then `a-sibling` is dropped (non-ancestor) despite sorting first, and the
    // `base`/`base2` tie at the nearest fork point resolves lexicographically to
    // `base` — not the farther default branch. The diff is scoped to feature's
    // own commit.
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
