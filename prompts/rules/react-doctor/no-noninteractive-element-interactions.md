# `react-doctor/no-noninteractive-element-interactions`

Move the interaction to a semantic interactive element, or add an interactive role plus keyboard support.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-interactions>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX element whose resolved tag is a semantic non-interactive HTML element (img, li, ul, ol, article, section, figure, form, label, headings, etc. — not the generic div/span) that carries a mouse or keyboard handler: onClick, onMouseDown, onMouseUp, onKeyDown, onKeyPress, or onKeyUp (case-insensitive). It is suppressed only when a role prop resolves to a static interactive-role string (button, link, menuitem, checkbox, tab, slider, etc.). False positive: a role whose value comes from a dynamic expression (role={isLink ? 'link' : 'button'}) can't be statically read, so the element is flagged even though it is correctly interactive at runtime.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the handler onto a semantic interactive element instead of the content element: replace <li onClick={open}>…</li> with <li><button onClick={open}>…</button></li>, or use an <a> for navigation. If the element must stay non-interactive in markup, give it a literal interactive role plus keyboard support and focusability (role="button" tabIndex={0} onKeyDown={…}) so assistive tech can operate it. When role is already interactive but set via an expression, hoist it to a static string literal so the rule can verify it. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-interactions
