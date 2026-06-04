# `react-doctor/aria-unsupported-elements`

Don't put role / aria-* attributes on reserved HTML elements like meta, head, script, or style.

- **Category:** Accessibility
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-unsupported-elements>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX element whose tag resolves to a reserved HTML element that has no accessibility semantics — base, col, colgroup, head, html, link, meta, noembed, noscript, param, picture, script, source, style, title, track — when it carries a `role` attribute or any attribute whose name starts with `aria-`. Spread props (`{...props}`) and other reserved tags without such attributes are ignored. False positive: the name check is purely prefix-based, so a non-standard attribute like `aria-role` is flagged even though it is not a real ARIA attribute; also, a custom component mapped to a reserved tag via plugin settings can fire even though the runtime DOM element may differ.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the `role` and `aria-*` attributes from the reserved element — they are inert on elements with no accessibility semantics (e.g. change `<meta aria-hidden="true" />` to `<meta />`). If you need to influence assistive tech, move the attribute to a real visible element that actually renders content; these reserved tags (meta, head, script, style, link, etc.) are never exposed to the accessibility tree. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-unsupported-elements
