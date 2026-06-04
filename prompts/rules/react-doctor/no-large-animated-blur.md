# `react-doctor/no-large-animated-blur`

Keep blur radius under 10px, or apply blur to a smaller element. Large blurs multiply GPU memory usage with layer size

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a style, animate, whileHover, initial, exit (etc.) attribute contains filter, backdropFilter, or WebkitBackdropFilter with a string literal blur(Npx) where N exceeds 10. The check uses the regex blur\((\d+(?:\.\d+)?)px\) — dynamic values built from template literals or variables are not inspected.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Reduce the blur radius below 10px, shrink the blurred element (cost scales with layer area × radius), or pre-blur the source as a static image / SVG feGaussianBlur rendered once. For frosted-glass effects, apply backdrop-filter to a small overlay rather than a full-viewport pane. See https://web.dev/articles/animations-guide#expensive_filters
