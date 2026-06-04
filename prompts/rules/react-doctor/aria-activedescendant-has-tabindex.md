# `react-doctor/aria-activedescendant-has-tabindex`

Add `tabIndex` to elements with `aria-activedescendant` so they're keyboard-focusable.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-activedescendant-has-tabindex>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a known HTML element carrying `aria-activedescendant` that is neither intrinsically tabbable (interactive elements like input, button, a[href] are exempt) nor given a focusable `tabIndex` — only a numeric `tabIndex` strictly less than -1 still triggers, while 0, -1, "0", "-1", and any template/non-numeric value count as acceptable. False positive: custom components (`<CustomComponent aria-activedescendant=... />`) pass through untouched unless they're mapped to an HTML tag via the `jsx-a11y` `components` setting, so the rule never sees a wrapper that renders a focusable div internally.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add `tabIndex={0}` so the element can receive keyboard focus and proxy it to the active descendant: `<div role="combobox" aria-activedescendant={activeId} tabIndex={0} />`. Use `tabIndex={-1}` only if focus is moved there programmatically rather than via Tab order, and replace any `tabIndex` below -1 with `0` or `-1`. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-activedescendant-has-tabindex
