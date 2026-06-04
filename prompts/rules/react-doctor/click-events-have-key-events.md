# `react-doctor/click-events-have-key-events`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/click-events-have-key-events>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on JSX elements with onClick that lack onKeyUp, onKeyDown, or onKeyPress, restricted to non-interactive HTML elements like div or span — native <button> and <a href> are skipped, as are elements with aria-hidden='true'. False positive: a wrapper div whose only job is to bubble clicks up from an inner <button> that already handles keyboard input.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Prefer replacing the static element with a native <button>, which gives Enter/Space activation for free. If the div must stay, add an onKeyDown handler that fires the same callback when event.key is 'Enter' or ' ', plus role='button' and tabIndex={0} so keyboard users can focus and activate it. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/click-events-have-key-events
