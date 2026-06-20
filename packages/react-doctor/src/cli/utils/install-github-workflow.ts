import * as path from "node:path";
import * as fs from "node:fs";

export interface InstallGitHubWorkflowResult {
  readonly status: "created" | "exists" | "failed";
  readonly workflowPath: string;
}

// Self-documenting workflow file. It installs advisory-first: the action's
// `blocking` input defaults to `none`, so the check never fails on day one —
// every PR still gets the full report (sticky comment, inline review comments,
// a commit-status score). The push trigger scans the repo's actual default
// branch (`master`, `develop`, …) — not a hardcoded `main`. The inline YAML
// comments give a new user one-line explanations of each trigger and show how
// to graduate the gate (uncomment `with:` and set `blocking: error`), without
// forcing them off to the docs site to learn the basics. This hardened fork
// ships the action from its audited `@pinned` branch (the fork's release
// channel), so the workflow references `gcharang/react-doctor@pinned` rather
// than a published tag.
const buildWorkflowContent = (
  defaultBranch: string,
): string => `# React Doctor — finds security, performance, correctness, accessibility,
# bundle-size, and architecture issues in React codebases.
#
# Docs: https://github.com/gcharang/react-doctor
# Source: https://github.com/gcharang/react-doctor

name: React Doctor

on:
  # Scans the PR's changed files and posts a sticky summary comment listing only the new issues introduced relative to the merge base of the target branch.
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
  # Scans \`${defaultBranch}\` on every push to track the health-score trend and catch regressions that slipped past PR review.
  push:
    branches: ["${defaultBranch}"]

permissions:
  contents: read
  pull-requests: write
  issues: write
  statuses: write

# Cancels any in-flight scan for the same PR (or branch, on push) the moment a new commit arrives, so reviewers only ever see the latest run.
concurrency:
  group: react-doctor-\${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

jobs:
  react-doctor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - uses: gcharang/react-doctor@pinned
        # Advisory by default: React Doctor reports findings on every PR — a
        # sticky summary comment, inline review comments, and a commit status
        # with the health score — but never fails the check, so it won't red-X
        # a teammate's PR on day one. When your team trusts the signal, graduate
        # the gate: uncomment the block below and set blocking to "error" (fail
        # on new error-severity findings) or "warning" (fail on any finding).
        # Full reference: https://github.com/gcharang/react-doctor
        # with:
        #   blocking: error          # Gate level: "none" (advisory, the default) | "warning" | "error"
        #   scope: full              # On PRs, scan the whole project instead of just changed files
        #   comment: false           # Disable the sticky PR summary comment
        #   review-comments: false   # Disable inline review comments on changed lines
        #   commit-status: false     # Disable the commit status (score + counts, links to the run)
        #   version: "0.4.0"         # Pin to a specific react-doctor version instead of "latest"
        #   directory: apps/web      # Scan a sub-directory (default: ".")
        #   project: "web,admin"     # In a monorepo, scan specific workspace project(s)
`;

export const getReactDoctorWorkflowPath = (projectRoot: string): string =>
  path.join(projectRoot, ".github", "workflows", "react-doctor.yml");

export const isReactDoctorWorkflowInstalled = (projectRoot: string): boolean =>
  fs.existsSync(getReactDoctorWorkflowPath(projectRoot));

// Writes `.github/workflows/react-doctor.yml`, creating the workflows
// directory if needed. Returns "exists" without overwriting a workflow that's
// already there, and "failed" (rather than throwing) so callers can degrade to
// printing manual setup instructions. `defaultBranch` lands in the template's
// push trigger; callers resolve it via `detectDefaultBranch` and fall back to
// `main` when the repo has no detectable default.
export const installReactDoctorWorkflow = (
  projectRoot: string,
  defaultBranch: string = "main",
): InstallGitHubWorkflowResult => {
  const workflowPath = getReactDoctorWorkflowPath(projectRoot);
  if (fs.existsSync(workflowPath)) return { status: "exists", workflowPath };

  try {
    fs.mkdirSync(path.dirname(workflowPath), { recursive: true });
    fs.writeFileSync(workflowPath, buildWorkflowContent(defaultBranch));
    return { status: "created", workflowPath };
  } catch {
    return { status: "failed", workflowPath };
  }
};
