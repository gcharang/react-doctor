# `react-doctor/no-sync-xhr`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Synchronous XMLHttpRequest
- **Severity:** warn
- **Category:** Performance
- **Framework:** global

## Recommendation

Never open an XMLHttpRequest synchronously (`async` = `false`). It blocks the main thread. Use `fetch()` or pass `true` and handle the response asynchronously.
