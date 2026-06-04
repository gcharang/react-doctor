# `react-doctor/heading-has-content`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/heading-has-content>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on <h1>-<h6> (and configured custom heading components) that render no children, or whose only children are aria-hidden / role='presentation'. dangerouslySetInnerHTML counts as content. False positive: the heading text comes from a child component the rule cannot statically inspect, e.g. <h1><Translate id='page.title' /></h1> where Translate emits text at runtime.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Render visible heading text inline (<h1>Create Account</h1>) or via a wrapper component that yields text content (<h1><Title /></h1>). Never use empty headings for spacing or styling — drop the heading or use a styled div instead. Don't aria-hide the only child. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/heading-has-content
