# `react-doctor/no-tiny-text`

Use at least 12px for body content, 16px is ideal. Small text is hard to read, especially on high-DPI mobile screens

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm style.fontSize resolves to a pixel value below 12. The rule treats bare numbers as px, parses Npx directly, and converts Nrem assuming a 16px root. Footnotes, legal disclaimers, and dense tabular data near 11px are occasionally intentional but should still be reviewed for readability.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Use at least 12px (0.75rem) for any body content; 16px (1rem) is ideal for prose. Captions and labels can go to 14px (0.875rem) with strong contrast. Don't shrink the font to make a layout fit — fix the layout. See https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation
