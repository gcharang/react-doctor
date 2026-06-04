# `react-doctor/rn-style-prefer-boxshadow`

Use the cross-platform CSS `boxShadow` string (RN v7+): `boxShadow: "0 2px 8px rgba(0,0,0,0.1)"` instead of platform-specific shadow*/elevation keys

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on shadowColor, shadowOffset, shadowOpacity, shadowRadius, or elevation Properties inside a JSX style or *Style inline ObjectExpression, or inside any object value passed to StyleSheet.create({...}). False positive: the project targets React Native earlier than 0.76 — boxShadow shipped in RN 0.76 (the New Architecture release) and is only fully supported from that version onward.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Collapse the platform-specific keys into a single boxShadow string of the form "offset-x offset-y blur spread color" (e.g. "0 2px 8px rgba(0, 0, 0, 0.1)"); multiple comma-separated shadows and the inset keyword are supported. Verify the project is on RN 0.76 or newer before deleting the iOS shadow* and Android elevation fallback. See https://reactnative.dev/docs/view-style-props#boxshadow
