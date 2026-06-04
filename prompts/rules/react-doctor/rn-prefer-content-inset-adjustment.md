# `react-doctor/rn-prefer-content-inset-adjustment`

Drop the SafeAreaView wrapper and set `contentInsetAdjustmentBehavior="automatic"` on the ScrollView for native safe-area handling

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on a SafeAreaView JSXElement that has at least one direct JSX child whose element name is exactly "ScrollView". False positive: the SafeAreaView also wraps non-scrolling siblings such as a fixed header or bottom action bar that still need top safe-area padding — in that case the wrapper isn't redundant.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the SafeAreaView and set contentInsetAdjustmentBehavior="automatic" on the ScrollView; it integrates natively with large titles, sticky headers, and keyboard avoidance. This prop is iOS-only, so on Android you still need useSafeAreaInsets from react-native-safe-area-context to pad the top yourself. See https://reactnative.dev/docs/scrollview#contentinsetadjustmentbehavior-ios
