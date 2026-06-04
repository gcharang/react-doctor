# `react-doctor/no-inline-prop-on-memo-component`

Hoist the inline `() => ...` / `[]` / `{}` to a stable reference (useMemo, useCallback, or module scope) so the memoized child doesn't re-render every parent render

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the JSX element name is bound to memo(...) or React.memo(...) in the same file, and the flagged attribute is a fresh-each-render value: arrow function, function expression, .bind() call, object literal, array literal, or inline JSX. memo() short-circuits only when props are referentially equal, so each new reference breaks memoization.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap functions in useCallback, objects/arrays in useMemo, or hoist them to module scope when they don't depend on props/state. For inline JSX children, declare them as constants outside the component or extract a separate memoized child. See https://react.dev/reference/react/memo#minimizing-props-changes
