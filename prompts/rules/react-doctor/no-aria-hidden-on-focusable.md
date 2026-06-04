# `react-doctor/no-aria-hidden-on-focusable`

Remove `aria-hidden` from focusable elements (or remove the focusability).

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-aria-hidden-on-focusable>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a focusable JSX element that also has aria-hidden set truthy. aria-hidden counts as truthy when it is the bare attribute (no value), the literal "true", a literal {true}, or any non-literal expression (e.g. {cond} or an empty expression {}); it is treated as not-set when it is a string literal other than "true" (aria-hidden="false", "0", "hidden", etc.) or a falsy literal expression ({false}, {0}, {""}). The element must be focusable via tabIndex >= 0 or by being a native interactive element (button, a[href], input[type!=hidden], textarea, select, etc.), and tabIndex < 0 always exempts it even when otherwise interactive. Limitation (false negative, not false positive): href/tabIndex/aria-hidden arriving via spread props (<a {...rest} aria-hidden />) and onClick-only non-interactive elements (<div onClick={fn} aria-hidden="true" />, a confirmed pass case) are invisible to the static check and will not fire.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pick one: if the element should stay reachable, drop aria-hidden so screen readers can perceive it; if it should be hidden, remove it from the focus order too with tabIndex={-1} (and disabled where applicable) — e.g. <button aria-hidden="true" tabIndex={-1} disabled>. Never leave an element both keyboard-focusable and aria-hidden, since focus would land on a node assistive tech reports as absent. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-aria-hidden-on-focusable
