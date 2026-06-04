# `react-doctor/rn-no-scroll-state`

Track scroll position with a Reanimated shared value (`useAnimatedScrollHandler`) or a ref — `setState` on every scroll event causes re-render storms

- **Category:** React Native
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires when an onScroll JSXAttribute holds an inline ArrowFunctionExpression or FunctionExpression whose body contains a CallExpression to any Identifier matching the regex set[A-Z] (the React setState naming convention). False positive: the call is a non-state helper such as setRef or a library setFoo utility that happens to share the naming pattern.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the setState with useSharedValue plus useAnimatedScrollHandler from react-native-reanimated so values update on the UI thread, or a useRef with a requestAnimationFrame throttle if you only need imperative reads. Remember to render the list through Animated.ScrollView (or Animated.FlatList) when binding an animated handler. See https://docs.swmansion.com/react-native-reanimated/docs/scroll/useAnimatedScrollHandler/
