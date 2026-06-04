# `react-doctor/js-length-check-first`

Short-circuit with `a.length === b.length && a.every((x, i) => x === b[i])` — unequal-length arrays exit immediately

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on arr.every((item, index, ...) => ...) whose callback body indexes a second array via other[index] (computed MemberExpression whose property identifier matches the callback's second parameter), indicating element-wise array comparison. The rule already skips calls sitting inside an existing arr.length === other.length && ... guard. False positive only if you intend to compare just a prefix.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap with a length precheck: a.length === b.length && a.every((item, index) => item === b[index]). The && short-circuits the entire per-element loop when lengths differ — the cheapest possible early exit for deep array equality. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
