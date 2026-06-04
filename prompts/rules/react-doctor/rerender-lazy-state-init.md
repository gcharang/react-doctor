# `react-doctor/rerender-lazy-state-init`

Wrap in an arrow function so it only runs once: `useState(() => expensiveComputation())`

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on useState(expensiveCall()) — a direct CallExpression as the useState first argument where the callee is not one of the trivial coercion helpers (Boolean, String, Number, Array, Object, parseInt, parseFloat). The argument is evaluated on every render even though React discards every result after the first mount.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap the initializer in an arrow function so React only calls it once on mount: useState(() => expensiveCall()). The lazy form is essential for JSON.parse(localStorage.getItem(...)), large precomputed arrays, and any pure but costly setup that has no reason to re-run on subsequent renders. See https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state
