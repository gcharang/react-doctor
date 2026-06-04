# `react-doctor/tabindex-no-positive`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/tabindex-no-positive>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a tabIndex prop is a positive integer (1, 2, 3, ...) as a literal or string — tabIndex={0} (focusable in DOM order) and tabIndex={-1} (programmatically focusable only) are allowed. Positive values override the natural tab order and cause focus to jump unpredictably. False positive: an intentional full-document tabindex map for a complex form — but even then, reordering DOM is preferred.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace positive tabIndex values with tabIndex={0} or tabIndex={-1}, then reorder the underlying DOM so the natural tab sequence matches the visual and logical flow of the page. CSS like flex-direction: row-reverse can reorder visuals without breaking focus order. Mixing positive tabIndex with default values almost always skips elements unpredictably. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/tabindex-no-positive
