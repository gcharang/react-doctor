# `react-doctor/rn-detox-missing-await`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Un-awaited Detox action
- **Severity:** warn
- **Category:** Bugs
- **Framework:** react-native

## Recommendation

Prepend `await` to Detox actions, `waitFor(...)` chains, and `expect(element(...))` assertions. They return promises tied to Detox's synchronization, so a missing await runs steps out of order.
