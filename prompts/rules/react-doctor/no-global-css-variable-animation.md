# `react-doctor/no-global-css-variable-animation`

Set the variable on the nearest element instead of a parent, or use `@property` with `inherits: false` to prevent cascade. Better yet, use targeted `element.style.transform` updates

- **Category:** Performance
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a CSS custom property (string literal starting with --) is set via .setProperty() inside a requestAnimationFrame or setInterval callback. Each write forces style recalculation on every descendant that inherits the variable, every frame. False positive: the element has no descendants, so cascade cost is bounded.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Set the variable on the nearest element instead of an ancestor, declare it with @property { inherits: false } to halt the cascade, or skip CSS variables entirely and write element.style.transform = ... directly each frame for compositor-only updates. See https://developer.mozilla.org/en-US/docs/Web/CSS/@property
