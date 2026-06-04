---
"@react-doctor/core": minor
"react-doctor": minor
---

Add `--diff parent` to scope a scan to the branch you forked from.

Bare `--diff` diffs against the repository default branch (`main`/`master`), which over-reports on stacked branches — a feature branch cut from an intermediate integration branch shows that branch's changes too. `--diff parent` (also `diff: "parent"` in config) now auto-detects the branch the current branch most likely forked from by nearest merge-base across local branches, so the scan covers only the current branch's own changes. It falls back to the default branch when no diverging parent can be inferred (no sibling branches, detached HEAD, unrelated histories). An explicit `--diff <base>` is unchanged.
