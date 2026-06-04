# `react-doctor/rn-prefer-reanimated`

Use `import Animated from 'react-native-reanimated'` — animations run on the UI thread instead of the JS thread

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on import { Animated } from "react-native" — specifically a named ImportSpecifier whose imported name is Animated. Namespace imports and default imports are not flagged. False positive: a single trivial fade/opacity tween where pulling in reanimated, its babel plugin, and the worklet runtime is overkill.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Install react-native-reanimated, add react-native-reanimated/plugin to babel.config.js, then switch to import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated". Replace Animated.Value with useSharedValue, Animated.timing with withTiming, and apply styles via useAnimatedStyle so animations run on the UI thread. See https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/
