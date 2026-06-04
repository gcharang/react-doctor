# `react-doctor/rn-prefer-pressable`

Use `<Pressable>` from react-native (or react-native-gesture-handler) instead of legacy Touchable* components

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on an ImportSpecifier from "react-native" whose imported name is TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, or TouchableNativeFeedback. The JSX usage itself isn't analysed. False positive: a very old RN target where Pressable's Android ripple parity was incomplete — rare today since Pressable has been stable since 0.63.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Swap the legacy component for Pressable from react-native and move opacity or ripple feedback into the style callback (style={({ pressed }) => ...}) or the android_ripple prop. For complex gestures such as simultaneous pan plus long-press, use GestureDetector with Gesture.Tap() from react-native-gesture-handler instead. See https://reactnative.dev/docs/pressable
