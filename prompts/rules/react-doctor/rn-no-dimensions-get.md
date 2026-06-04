# `react-doctor/rn-no-dimensions-get`

Use `const { width, height } = useWindowDimensions()` — it updates reactively on rotation and resize

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Verify the call is Dimensions.get(...) or Dimensions.addEventListener(...); the latter was removed in RN 0.72. False positive: a one-shot module-level read for a static StyleSheet constant is fine, but anything consumed by a component should switch to useWindowDimensions so it reacts to rotation, split-screen, and resize.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Inside components/hooks use const { width, height } = useWindowDimensions() — it subscribes to rotation, split-screen, and resize automatically. Delete any Dimensions.addEventListener setup/cleanup; the hook handles teardown for you. See https://reactnative.dev/docs/usewindowdimensions
