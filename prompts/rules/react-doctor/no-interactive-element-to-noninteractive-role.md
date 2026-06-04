# `react-doctor/no-interactive-element-to-noninteractive-role`

Don't override an interactive element's semantics with a non-interactive role.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-interactive-element-to-noninteractive-role>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a natively interactive HTML element carries a string-literal role= whose first token is a non-interactive role or a presentation role (presentation/none): input (every type, even hidden), button, select, textarea, option, menuitem, datalist, audio, video, canvas, embed, summary, td, th, tr, plus a/area with href and img with usemap. Per-tag allowances are skipped (tr permits none/presentation, canvas permits img). False positive: the role value must be a static string literal — dynamic role={expr}, a forwarded {...props}, or a namespaced ns:role is never inspected, so a finding on those is impossible; also note getElementType remaps custom components via jsx-a11y `components` settings, so a flagged <Link role="img" /> only fires when Link is mapped to an interactive tag.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Don't paper over an interactive control with a static role — either drop the conflicting role so the native semantics stand (<button>Save</button> instead of <button role="img">), or if the element is genuinely meant to be non-interactive, swap it for the right non-interactive element (use <div role="img" aria-label="..."> rather than <a href role="img">). Keep interactive roles (button, link, checkbox, etc.) on interactive elements, and reserve role="presentation"/"none" for purely decorative non-interactive tags. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-interactive-element-to-noninteractive-role
