# `react-doctor/rn-no-panresponder`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** PanResponder over react-native-gesture-handler
- **Severity:** warn
- **Category:** Bugs
- **Framework:** react-native

## Recommendation

Use `react-native-gesture-handler` (`Gesture.Pan()`) instead of `PanResponder`. It runs gestures on the native UI thread, so they stay smooth even when the JS thread is busy.
