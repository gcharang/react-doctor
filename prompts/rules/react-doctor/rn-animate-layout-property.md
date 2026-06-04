# `react-doctor/rn-animate-layout-property`

Animate `transform: [{ translateX/Y }, { scale }]` and `opacity` instead of layout props — layout runs on the JS thread; transform/opacity run on the GPU compositor

- **Category:** React Native
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an animated property inside useAnimatedStyle is a layout-affecting key (width, height, top, left, right, bottom, min/max width/height, margin*, padding*, flex*) — each frame forces a layout pass on the JS thread. False positive: a static layout key sitting next to an animated transform isn't problematic unless the layout key itself is driven by a shared value or withTiming/withSpring.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Animate transform: [{ translateX }, { translateY }, { scale }] and opacity on an Animated.View instead — both stay on the UI thread compositor. If size really must animate, scale a parent of fixed dimensions rather than animating width/height directly. See https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started
