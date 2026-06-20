# `react-doctor/rn-no-set-native-props`

Drive the prop via state, an Animated.Value (useNativeDriver: true), or a Reanimated shared value instead of imperative setNativeProps

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a CallExpression whose callee is a static non-computed `.setNativeProps` member access AND whose receiver is itself a static non-computed `.current` member access — i.e. the `*.current.setNativeProps(...)` or optional-chained `*.current?.setNativeProps(...)` React host-ref shape (e.g. inputRef.current.setNativeProps({ text }), this.rootViewRef.current.setNativeProps(...), or a chained inputRef.current?.textInputRef.current?.setNativeProps(...)). The rule deliberately only matches the ref `.current` escape hatch. False positives a reviewer should SUPPRESS: an uncalled member access used as a value (const fn = ref.current.setNativeProps), setNativeProps on a non-`.current` receiver such as a plain config/options object (config.setNativeProps({...})), a callback-ref form with no `.current` (iconRef.setNativeProps(...), explicitly out of v1 scope), and other imperative ref methods (inputRef.current.focus()).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the imperative call with declarative state: hold the value in useState and pass it as a prop (e.g. instead of inputRef.current.setNativeProps({ text }), keep const [text, setText] = useState(...) and render <TextInput value={text} />). For animated visual props, drive them through an Animated.Value with useNativeDriver: true, or a Reanimated useSharedValue/useAnimatedStyle, so updates run on the native thread. setNativeProps is a warn-and-return no-op under the New Architecture (Fabric, default since RN 0.76), so the imperative update silently stops changing the view after migration.
