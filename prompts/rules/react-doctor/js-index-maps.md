# `react-doctor/js-index-maps`

Build an index `Map` once outside the loop instead of `array.find(...)` inside it

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on array.find(...) or array.findIndex(...) inside any loop body (uses createLoopAwareVisitors). False positive when the searched array changes per iteration (so a pre-built index can't be reused), or when the array is tiny (< ~10 items) where linear scan beats Map allocation and hashing overhead.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Before the loop, build const byId = new Map(items.map(item => [item.id, item])); then use byId.get(targetId) inside — O(1) lookups turn the total cost from O(n*m) into O(n+m). For multi-key lookups, build several Maps or a Map keyed on a composite string. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
