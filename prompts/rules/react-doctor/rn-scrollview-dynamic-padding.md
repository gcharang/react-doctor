# `react-doctor/rn-scrollview-dynamic-padding`

Use `contentInset={{ bottom: dynamicValue }}` — the OS applies it as an offset without reflowing the scroll content

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on ScrollView, FlatList, or FlashList opening elements whose contentContainerStyle is an inline ObjectExpression containing a paddingBottom or paddingTop Property whose value is anything other than a Literal — so identifiers, member expressions, and call expressions are flagged while literal numbers pass through. False positive: the dynamic identifier resolves to a value that only changes once at mount.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Lift the dynamic value out of contentContainerStyle and pass it via the ScrollView's contentInset={{ bottom: value }} prop; the OS applies it as an offset without re-laying out rows or re-pinning sticky headers. contentInset is iOS-only, so on Android pair it with KeyboardAvoidingView or react-native-keyboard-controller for keyboard-driven cases. See https://reactnative.dev/docs/scrollview#contentinset
