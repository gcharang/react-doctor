# `react-doctor/scope`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/scope>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when the scope attribute appears on any element other than <th> — scope is only defined in HTML for table header cells. False positives are essentially impossible: scope has no meaning on <div>, <td>, or any non-th element, so any non-<th> usage is either a copy-paste error or a misunderstanding of the attribute.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove scope from the non-<th> element. If the element should associate headers with data cells, restructure the markup to use a real <th scope='col'> or <th scope='row'> inside a <table>. For complex tables where scope is insufficient, use the headers attribute on <td> pointing to one or more <th id> values. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/scope
