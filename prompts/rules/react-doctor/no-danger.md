# `react-doctor/no-danger`



- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on every use of dangerouslySetInnerHTML — the only React API that bypasses JSX's automatic HTML escaping and injects a raw string into the DOM. The rule can't see whether a sanitizer (DOMPurify, sanitize-html) ran upstream, so even sanitized markdown or CMS output is flagged. False positive: HTML that is provably sanitized at the boundary — verify the value can never carry attacker-controllable input before silencing on a specific line.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For plain text, render as children — JSX escapes it automatically: <div>{userContent}</div>. When you genuinely need rich HTML, sanitize at the boundary with DOMPurify.sanitize(html) immediately before passing it in, and add an eslint-disable comment with a written justification on that exact line. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger.html and https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
