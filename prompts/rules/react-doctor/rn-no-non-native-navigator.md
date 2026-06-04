# `react-doctor/rn-no-non-native-navigator`

Use `@react-navigation/native-stack` (or `native-tabs` in v7+) for platform-native transitions and gestures

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on an ImportDeclaration whose source string is exactly "@react-navigation/stack" or "@react-navigation/drawer". Confirm the import is one of those two packages and not the already-native variant. True positive in almost every case. False positive: a deliberate web fallback layer where the JS stack covers something native-stack does not.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rename the import source: "@react-navigation/stack" becomes "@react-navigation/native-stack" and "@react-navigation/drawer" becomes "@react-navigation/native-drawer" (v7+). The screen-options API is mostly identical, but native-stack drops JS-only options like cardStyleInterpolator and headerStyleInterpolator, so swap them for the supported native equivalents. See https://reactnavigation.org/docs/native-stack-navigator/
