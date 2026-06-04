# `react-doctor/aria-props`

Use only documented aria-* attributes from the WAI-ARIA spec.

- **Category:** Accessibility
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-props>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any literal JSX attribute name that starts with `aria-` but is not a recognized WAI-ARIA property — catching typos (aria-labeledby), malformed names (bare `aria-`), and made-up attributes (aria-skldjfaria-klajsd). Names without the `aria-` prefix are ignored, so `abcARIAdef` and `fooaria-hidden` never trigger, and valid props like aria-errormessage pass. False positive: the check only sees statically-written attribute names, so a typo'd aria prop spread in via `<div {...props} />` is invisible — but a directly-written aria-* is essentially always a real bug, since the WAI-ARIA list is fixed.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Correct the attribute to the exact WAI-ARIA spelling — most hits are typos like aria-labeledby → aria-labelledby, or aria-describby → aria-describedby. If the attribute isn't a real ARIA property at all, remove it; invalid aria-* names are ignored by assistive technology and can mislead screen readers. Cross-check against the documented aria-* list rather than guessing. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-props
