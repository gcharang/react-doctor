# `react-doctor/no-redundant-roles`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-redundant-roles>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when role on a native element duplicates that element's implicit ARIA role, e.g. <button role='button'> or <img role='img'>. Default carve-out: <nav role='navigation'> is allowed per W3C guidance for legacy AT. False positive: an explicit role kept for an older screen reader that misreports the element's implicit role — increasingly rare in modern assistive tech.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the redundant role attribute — the browser already exposes the correct role to assistive tech, and a duplicate role can actually break some ATs. If you genuinely need to override an element's semantics, reconsider the markup choice instead. Use the rule's options object to whitelist additional element/role pairs (like nav: ['navigation']) when needed. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-redundant-roles
