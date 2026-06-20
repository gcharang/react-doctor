# `react-doctor/no-async-effect-callback`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Async effect callback
- **Severity:** warn
- **Category:** Bugs
- **Framework:** global

## Recommendation

Don't make the effect callback `async`. Define an async function inside the effect and call it, then return a real cleanup function if you need one.
