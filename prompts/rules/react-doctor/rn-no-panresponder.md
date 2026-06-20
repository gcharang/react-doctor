# `react-doctor/rn-no-panresponder`

Replace PanResponder with react-native-gesture-handler's Gesture.Pan(), which runs gesture math on the native UI thread instead of the JS thread.

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an ImportDeclaration whose source is exactly "react-native" that has a non-type ImportSpecifier whose resolved imported name (getImportedName, so an alias like `import { PanResponder as PR }` still resolves to PanResponder) equals "PanResponder"; it reports each such specifier. The detector deliberately skips type-only imports (declaration-level `import type { PanResponder } from "react-native"` and inline `import { View, type PanResponder } from "react-native"`) because they erase at build time. Suppress as a false positive when: PanResponder is imported from any source other than "react-native" (e.g. a local `./my-gestures` module or a re-export), it is only a local binding such as `const PanResponder = makeResponder()`, or the import is type-only — none of these create a runtime JS-thread PanResponder.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Migrate the gesture off PanResponder to react-native-gesture-handler so it runs on the native UI thread: replace `PanResponder.create({ onPanResponderMove, ... })` plus the spread `{...panResponder.panHandlers}` with a `Gesture.Pan()` configured via `.onUpdate(e => ...)`/`.onEnd(...)` and apply it through `<GestureDetector gesture={pan}>`, wrapping the tree in `GestureHandlerRootView` and driving position with Reanimated shared values for 60fps under JS load. Remove the now-unused PanResponder import from react-native.
