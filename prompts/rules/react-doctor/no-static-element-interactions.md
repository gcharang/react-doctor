# `react-doctor/no-static-element-interactions`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-static-element-interactions>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a static element (div, span, etc.) has a configured interactive handler (default: onClick, onMouseDown, onMouseUp, onKeyPress, onKeyDown, onKeyUp) but no role mapping it to an interactive role like button, link, or menuitem. False positive: a wrapper that catches bubbled events from interactive descendants and isn't itself an interaction target — disable with an explanatory comment.

## Fix prompt

Use this once validation confirms the diagnostic is real.

If the element is an interaction target, use a native semantic element (<button>, <a href>, <input>) — they ship with role, focus, and keyboard support. If you must keep the div, add an appropriate role (role='button', 'link', 'menuitem', 'switch', etc.) plus tabIndex={0} and keyboard handlers so users can reach and activate it. Do not use role='presentation'. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-static-element-interactions
