# `react-doctor/rn-no-set-native-props`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Imperative setNativeProps (no-op under Fabric)
- **Severity:** warn
- **Category:** Bugs
- **Framework:** react-native

## Recommendation

Drive the prop through React state, an `Animated.Value` (with `useNativeDriver: true`), or a Reanimated shared value. `setNativeProps` is a silent no-op under the New Architecture.
