# `react-doctor/svg-filter-clickjacking-risk`

Applying CSS or SVG filters over a cross-origin iframe can be used for clickjacking or to read pixels from framed content the attacker should not see.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx); test/scripts/docs/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in production source when an `<iframe>` sits within ~700 characters of a CSS filter reference (`filter: url(#…)`, in either order) or an SVG filter primitive (`<feDisplacementMap>`, `<feColorMatrix>`, `<feComposite>`, `<feTile>`, `<feMorphology>`) near an iframe — the textual proximity used to build an SVG/CSS-filter clickjacking or visual-exfiltration primitive over an embedded frame. Detection is case-insensitive substring proximity, not real DOM scoping. FALSE POSITIVE: the iframe and the filter are unrelated code that merely happen to fall within the window (a filter applied to a chart/image elsewhere in the same file), or the iframe is same-origin first-party UI where filtering is intentional decoration — confirm the filter actually applies to a cross-origin or privileged frame.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Do not apply CSS or SVG filters to cross-origin or privileged iframes; remove the `filter`/`fe*` primitive from the embedded frame's render path. Protect sensitive pages from being framed with `Content-Security-Policy: frame-ancestors 'self'` (or `'none'`) plus `X-Frame-Options`. Apply visual effects only to first-party content you control, never to embedded third-party UI.
