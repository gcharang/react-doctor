# `react-doctor/no-transition-all`

List specific properties: `transition: "opacity 200ms, transform 200ms"` — or in Tailwind use `transition-colors`, `transition-opacity`, or `transition-transform`

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a style={{ transition: 'all ...' }} where the value is a string literal starting with 'all'. The check is literal-prefix only — template literals, variables, and Tailwind class names are not inspected. transition: 'all' animates every changed CSS property, including ones that re-trigger layout and paint.

## Fix prompt

Use this once validation confirms the diagnostic is real.

List the properties you actually animate: transition: 'opacity 200ms, transform 200ms'. In Tailwind use transition-colors, transition-opacity, or transition-transform rather than the broad transition-all. See https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
