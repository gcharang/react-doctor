# `react-doctor/rn-pressable-shared-value-mutation`

Wrap in <GestureDetector gesture={Gesture.Tap()...}> so the press animation runs on the UI thread instead of bouncing across the JS bridge

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule tracks variables initialised by useSharedValue(...) in the current function scope, then on a Pressable opening element checks inline onPressIn/onPressOut handlers for sv.value = ..., sv.set(...), or sv.value(...). False positive: shared values destructured from a custom hook aren't tracked, so a real bridge-bouncing handler can slip through if its binding isn't a direct useSharedValue call.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap the touch target in GestureDetector with Gesture.Tap().onBegin(() => { 'worklet'; sv.value = withTiming(0.95); }).onFinalize(() => { 'worklet'; sv.value = withTiming(1); }); the worklet runs on the UI thread so the press animation starts in the same frame as the touch. Import GestureDetector and Gesture from react-native-gesture-handler. See https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/tap-gesture
