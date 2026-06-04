# `react-doctor/no-outline-none`

Use `:focus-visible { outline: 2px solid var(--color-muted); outline-offset: 2px }` to show focus only for keyboard users while hiding it for mouse clicks

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the inline style sets outline to 'none', '0', or the number 0, AND has no sibling boxShadow property (the rule treats any boxShadow as a possible replacement focus ring and skips reporting). Even outline: 'none' on a non-interactive div is worth fixing, since focusable descendants may inherit.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move focus styling to :focus-visible in CSS — e.g. outline: 2px solid var(--muted); outline-offset: 2px. If a fully custom ring is required, apply a box-shadow under :focus-visible. Never hide focus globally for all input modalities. See https://www.w3.org/WAI/WCAG21/Understanding/focus-visible
