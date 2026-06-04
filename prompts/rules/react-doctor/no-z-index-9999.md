# `react-doctor/no-z-index-9999`

Define a z-index scale in your design tokens (e.g. dropdown: 10, modal: 20, toast: 30). Create a new stacking context with `isolation: isolate` instead of escalating values

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm style.zIndex (or a zIndex literal inside a React Native StyleSheet.create({...}) call) has an absolute numeric value of at least 100. Only literal numbers are checked — variable references and computed expressions are skipped. Even centralized constants set to 100+ usually indicate an unresolved stacking-context problem rather than a real need.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Define a small z-index scale in design tokens — e.g. dropdown 10, sticky 20, modal 30, toast 40. To escape a parent stacking context, create a new one with isolation: isolate or render through a React portal instead of escalating values. See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index
