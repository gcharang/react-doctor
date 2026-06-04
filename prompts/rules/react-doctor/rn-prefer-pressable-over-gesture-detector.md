# `react-doctor/rn-prefer-pressable-over-gesture-detector`

Replace tap-only `<GestureDetector>` with `<Pressable>`: <Pressable onPress={onPress}> or createCSSAnimatedComponent(Pressable) for animated press feedback

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native
- **Documentation:** <https://reactnative.dev/docs/pressable>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose resolved name is GestureDetector AND is imported from "react-native-gesture-handler", whose gesture={...} expression (inline, or one level of identifier binding via the variable's initializer) resolves to a CallExpression chain rooted at Gesture.Tap() — the chain's factoryName must equal "Tap", it must contain none of simultaneousWithExternalGesture/requireExternalGestureToFail/blocksExternalGesture, and any .numberOfTaps(arg) (using the OUTERMOST/effective call) must be the static numeric literal 1. False positive: do NOT flag the non-tap or composed gestures the rule already excludes — Gesture.Pan()/Pinch() (factoryName !== "Tap") or a composition like Gesture.Race(Gesture.Tap(), Gesture.Pan())/Gesture.Simultaneous(...) whose chain root is Race/Simultaneous rather than Tap; multi-tap, namely numberOfTaps(2) or a non-literal/dynamic count like numberOfTaps(config.taps) or numberOfTaps(double ? 2 : 1) that Pressable cannot model; a tap chained to simultaneousWithExternalGesture/requireExternalGestureToFail/blocksExternalGesture; a GestureDetector named identically but imported from a local module; or a gesture prop bound to an unresolvable identifier (e.g. a prop) with no initializer chain to follow.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Swap the GestureDetector wrapping a lone Gesture.Tap() for a native Pressable: replace <GestureDetector gesture={Gesture.Tap().onStart(onPress)}><Animated.View/></GestureDetector> with <Pressable onPress={onPress}>...</Pressable>, moving the tap callback to onPress. If the inner view animated its press scale/opacity, preserve it with const AnimatedPressable = createCSSAnimatedComponent(Pressable) from react-native-reanimated/css and render that instead, since every GestureDetector registers a native handler on mount and tap-only feedback does not need one. Keep GestureDetector only when the gesture is truly pan/pinch/multi-tap/composed. See https://reactnative.dev/docs/pressable
