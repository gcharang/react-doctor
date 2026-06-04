---
"@react-doctor/core": patch
"react-doctor": patch
---

Fix `--diff parent` parent-branch detection: require a candidate branch to be an ancestor of HEAD, so a child or sibling branch forked from a recent commit on the current branch is never mistaken for the parent fork point. Previously such a branch could win on nearest-merge-base and scope the scan too narrowly, skipping changed files.
