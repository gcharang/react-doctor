# `react-doctor/rn-no-single-element-style-array`

Use `style={value}` instead of `style={[value]}` — single-element arrays add unnecessary allocation

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on JSX attributes named style or anything ending in Style whose value is an ArrayExpression with exactly one element. The inner expression isn't inspected — even style={[styles.foo]} is flagged. Essentially no false positives: a single-element array literal is always cheaper to unwrap into a bare value, and the style prop already accepts a single object directly.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Drop the surrounding brackets — style={[expr]} becomes style={expr}. Reintroduce the array literal only when you actually have a second value to compose, such as style={[styles.base, isActive && styles.active]}. The style prop also accepts false, null, and undefined directly, so conditional fallbacks don't need a wrapping array either. See https://reactnative.dev/docs/style
