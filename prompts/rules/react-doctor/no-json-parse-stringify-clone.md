# `react-doctor/no-json-parse-stringify-clone`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** JSON parse/stringify deep clone
- **Severity:** warn
- **Category:** Performance
- **Framework:** global

## Recommendation

Replace `JSON.parse(JSON.stringify(value))` with `structuredClone(value)`. It is faster and preserves Dates, Maps, Sets, and cyclic references.
