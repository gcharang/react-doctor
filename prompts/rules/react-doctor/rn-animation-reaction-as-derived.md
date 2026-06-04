# `react-doctor/rn-animation-reaction-as-derived`

Replace useAnimatedReaction with `useDerivedValue(() => ..., [deps])` — shorter, native dependency tracking, no side-effect implication

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Verify the second argument to useAnimatedReaction is a function whose body is exactly one statement assigning to some sharedValue.value. Multiple statements, a runOnJS call, conditionals, or any logging mean the side-effect semantics are intentional and useDerivedValue would change behavior — that's a false positive.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rewrite as const derived = useDerivedValue(() => prepareExpression). Reanimated tracks shared-value dependencies inside the worklet automatically, so you drop the prepare/reaction split and get the same write to derived.value on each change. See https://docs.swmansion.com/react-native-reanimated/docs/core/useDerivedValue
