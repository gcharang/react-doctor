# `react-doctor/jsx-no-script-url`



- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-script-url.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on DOM <a>, <area>, and <link> elements (plus components added via the components option) whose href is a string literal starting with javascript: — including obfuscated forms with whitespace or escape characters interleaved inside the scheme name. React 16.9+ warns; React 19 throws entirely. False positive: a non-anchor custom component like <Foo href="javascript:void(0)" /> not in the configured components list is intentionally ignored.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace href="javascript:void(0)" with a real <button type="button" onClick={handler}> when triggering an action, or with the router's navigation primitive when changing routes. Never use an anchor as a clickable shell — buttons are accessible by default and don't need preventDefault tricks. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-script-url.html and https://react.dev/blog/2024/04/25/react-19-upgrade-guide#other-breaking-changes
