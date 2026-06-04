# `react-doctor/no-side-tab-border`

Use a subtler accent (box-shadow inset, background gradient, or border-bottom) instead of a thick one-sided border

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the element has a one-sided border (borderLeft, borderRight, borderInlineStart, borderInlineEnd, or Tailwind border-l-N/border-r-N/etc) at least 3px wide (1px when border-radius > 0; 4px for Tailwind without rounded) AND the border color has chroma. Neutral grays, white, black, and transparent are skipped. False positive: established design-system active-tab indicators.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Use a subtler accent: box-shadow: inset 3px 0 0 var(--muted), a thin linear-gradient strip, or a 2px border-bottom for tab rows. Reserve thick side bars for editor gutters or annotation rails where they encode real meaning. See https://www.nngroup.com/articles/tabs-used-right/
