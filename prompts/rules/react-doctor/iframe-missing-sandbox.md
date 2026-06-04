# `react-doctor/iframe-missing-sandbox`

Add sandbox="" (or a curated, minimal set of allow- tokens) to your iframe to restrict embedded content.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/iframe-missing-sandbox>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX `<iframe>` (or `React.createElement("iframe", ...)`) in three cases: no `sandbox` attribute at all; a `sandbox` string containing a token that isn't `""` or a known `allow-*` value; or the `allow-scripts` + `allow-same-origin` pair, which together let the frame remove its own sandbox. A bare `sandbox` / `sandbox={true}` (present with no string value) passes, and `document.createElement("iframe")` is intentionally ignored. False positive: a dynamic value the static check can't resolve to a string literal (`sandbox={computedTokens}` or `sandbox={someVar}`) is skipped, so a real misconfiguration assembled at runtime won't be caught — and conversely a present-but-empty literal is treated as safe.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add a `sandbox` attribute and grant only the minimal capabilities the embed needs: start from `sandbox=""` (fully locked down) and add `allow-*` tokens one at a time, e.g. `<iframe sandbox="allow-forms allow-popups" />`. Never combine `allow-scripts` with `allow-same-origin` for untrusted content, since the frame can then reach into its parent origin and strip the sandbox. Use only valid tokens (`allow-forms`, `allow-scripts`, `allow-popups`, `allow-same-origin`, etc.) and drop anything misspelled. See https://oxc.rs/docs/guide/usage/linter/rules/react/iframe-missing-sandbox
