# `react-doctor/no-dark-mode-glow`

Use a subtle `box-shadow` with neutral colors for depth, or `border` with low opacity. Colored glows on dark backgrounds are the default AI-generated aesthetic

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the JSX style object has a dark background (backgroundColor or background with all RGB channels at or below 35) AND a boxShadow whose color has visible chroma and blur greater than 4px. False positive: an intentional brand-glow hero CTA, or a tinted neutral shadow that gets its color from a CSS variable.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the colored glow with a subtle neutral box-shadow such as 0 1px 3px rgba(0,0,0,0.4), or use a low-opacity border for depth. If a glow is essential, dim the chroma and lower opacity so it reads as ambient light rather than neon. See https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
