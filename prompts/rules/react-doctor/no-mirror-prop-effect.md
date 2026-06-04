# `react-doctor/no-mirror-prop-effect`

Delete both the `useState` and the `useEffect` and read the prop directly during render. Mirroring a prop into local state forces a stale first render before the effect re-syncs

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on the canonical mirror-prop pattern: const [X, setX] = useState(prop) (or prop.nested / prop.method()) plus a top-level useEffect whose deps include the prop root and whose body is exactly setX(<expression structurally equal to the original initializer>). Both initializer and setter argument are compared via areExpressionsStructurallyEqual — transforms must match identically. False positive: a transient local edit that is intentionally re-synced to the prop on a separate trigger (the structural-equality check usually filters this out).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete BOTH the useState and the useEffect, and read the prop directly during render: function Form({ value }) { /* use value */ }. Mirroring forces a stale first render where local state still holds the OLD prop before the effect re-syncs, and React warns about it in StrictMode. If you need an editable local copy that resets on prop change, key off the prop instead. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state
