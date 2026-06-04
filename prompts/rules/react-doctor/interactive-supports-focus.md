# `react-doctor/interactive-supports-focus`

Add tabIndex to elements that have interactive roles and event handlers.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/interactive-supports-focus>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an intrinsic HTML element (e.g. div, span, a) that carries an event handler (onClick, onKeyDown, etc.) and an interactive role (button, link, checkbox, menuitem, option, tab, etc.) but has no tabIndex — making the control unreachable by keyboard. It skips elements that are disabled, aria-hidden, role='presentation'/'none', natively interactive for that role, or non-interactive by role/element. False positive: custom PascalCase components like <SegmentButton role='option' onClick={...} /> are intentionally NOT flagged because they manage tabIndex on their internal intrinsic element — but a component mapped to an intrinsic tag via the jsx-a11y components setting (e.g. Div: 'div') is treated as that tag and will fire.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add tabIndex to put the element in the focus order: use tabIndex={0} for the standard tabbable roles (button, checkbox, link, searchbox, spinbutton, switch, textbox) and tabIndex={0} or {-1} for the rest (menuitem, option, tab, treeitem, slider, gridcell), e.g. <div role='button' tabIndex={0} onClick={...} />. Better still, replace the div/span with the native semantic element (<button>, <a href>) which is focusable and keyboard-operable by default, dropping the role entirely. Also pair the click handler with a keyboard handler so Enter/Space activate it. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/interactive-supports-focus
