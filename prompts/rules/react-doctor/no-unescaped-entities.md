# `react-doctor/no-unescaped-entities`

Replace bare ' / " / > / } characters in JSX text with HTML entities.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-unescaped-entities>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXText node (raw text directly between JSX tags or a fragment) whose value contains an unescaped ', ", >, or } — it reports the node once at the first such character found. Characters inside JSX expression containers like {">" + "<"} are never text nodes, so they don't fire; already-escaped entities (>, ’, ") are also fine. False positive: this is a purely stylistic preference — modern JSX compilers and browsers render bare ' and " correctly, so a legitimate apostrophe in prose ("we're here") is harmless and only worth silencing if the team opts into the convention.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the bare character in the JSX text with its HTML entity — ' becomes ' (or ’), " becomes ", > becomes >, and } becomes } — or move the literal into an expression container, e.g. <div>{">"}</div> or <div>{"we're here"}</div>. For a stray closing brace, wrapping as {'}'} also works. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-unescaped-entities
