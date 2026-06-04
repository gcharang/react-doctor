# `react-doctor/rerender-memo-before-early-return`

Extract the JSX into a memoized child component so the parent's early return short-circuits before the child renders

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a const x = useMemo(() => <jsx/>, [...]) declaration inside a PascalCase component, followed by any if (...) return ...; early-return statement later in the same block. The memo callback executes every render before the bailout — useMemo caches the result, not the JSX construction work.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Extract the JSX into a memo-wrapped child component at module scope, then render <Child ... /> AFTER the early returns. The parent short-circuits before React reconciles the child, and the child still benefits from prop-equality memoization on the slow path. See https://react.dev/reference/react/memo
