# `react-doctor/design-no-three-period-ellipsis`

Use the typographic ellipsis "…" (or `&hellip;`) instead of three periods — pairs with action-with-followup labels ("Rename…", "Loading…")

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSXText node contains a letter immediately followed by three periods (Loading..., Rename...). Numeric ranges like 3...5 and decorative leading periods don't match. Skipped inside <code>, <pre>, <kbd>, <samp>, <var>, <tt>, or translate="no" ancestors, and dynamic strings inside {expression} containers aren't inspected.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace ... with the typographic ellipsis … (U+2026) or the HTML entity &hellip;. Pairs especially well with action-with-follow-up labels (Rename…, Save as…) and loading states (Loading…). The single glyph kerns properly and signals deliberate UI craft. https://practicaltypography.com/ellipses.html
