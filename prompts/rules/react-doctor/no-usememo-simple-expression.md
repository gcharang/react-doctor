# `react-doctor/no-usememo-simple-expression`

Remove useMemo — property access, math, and ternaries are already cheap without memoization

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a useMemo(() => expr, ...) whose return is a literal, template literal, arithmetic / comparison of simples, unary, or ternary of simples — NOT a bare identifier or property access (those are intentionally excluded to preserve stable-reference passing). The hook's bookkeeping cost exceeds the computation.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the useMemo and inline the expression directly. Math, ternaries, and string concatenation run in nanoseconds — the dependency-array comparison plus cache bookkeeping is the actual overhead. Reserve useMemo for genuinely expensive O(n) work or for stable reference identity that downstream memo / effects depend on. See https://react.dev/reference/react/useMemo#should-you-add-usememo-everywhere
