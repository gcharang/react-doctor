# `react-doctor/expo-no-non-inlined-env`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Non-inlinable process.env access (Expo)
- **Severity:** warn
- **Category:** Bugs
- **Framework:** react-native

## Recommendation

Read env vars with static dotted access (`process.env.EXPO_PUBLIC_NAME`). Computed access and destructuring aren't inlined by babel-preset-expo and resolve to `undefined` at runtime.
