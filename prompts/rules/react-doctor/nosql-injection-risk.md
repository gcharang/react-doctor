# `react-doctor/nosql-injection-risk`

Building a NoSQL query from raw client input lets an attacker inject operator-shaped keys or `$where` code and read or alter data they should not.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production .js/.ts/.jsx/.tsx/.py files; test/build/doc/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on operator-shaped query construction: a `$where` value built from a template-literal `${…}`, a `function`, or a Python f-string; `.find(JSON.parse(req|request.…))`; an `.aggregate([{ … $where … }])` pipeline; `new RegExp(req|request.…)`; or a `$regex: req|request.…` operator. Comments are stripped for JS/TS. FALSE POSITIVE: the `$where`/`$regex`/`RegExp` value is a hard-coded server-side constant rather than client input, or the `JSON.parse(req…)` result is validated/coerced (operator keys stripped, fields cast to scalars) before it reaches the query — the static check cannot see that sanitization and may over-report.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Coerce each query field to its expected scalar type (for example `String(req.query.id)`) and reject objects or `$`-prefixed operator keys from client input before building the filter. Avoid `$where` (server-side JavaScript) entirely, replace request-derived `new RegExp`/`$regex` with anchored, escaped patterns or exact matches, and never pass `JSON.parse(req.body)` straight into `.find`/`.aggregate`.
