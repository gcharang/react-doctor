# `react-doctor/no-layout-transition-inline`

Use `transform` and `opacity` for transitions — they run on the compositor thread. For height animations, use `grid-template-rows: 0fr → 1fr`

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm style.transition or style.transitionProperty explicitly names a layout-triggering property — width, height, their min/max variants, or padding/margin (with any side suffix). The rule deliberately skips values containing 'all'. Animating max-height from 0 to a fixed value is the most common pattern this catches.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Animate transform (scale/translate) and opacity instead — they run on the compositor and skip layout/paint. For accordion-style height animations, transition grid-template-rows from 0fr to 1fr, or animate clip-path. See https://web.dev/articles/animations-guide
