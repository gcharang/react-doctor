# `react-doctor/rerender-memo-with-default-value`

Move to module scope: `const EMPTY_ITEMS: Item[] = []` then use as the default value

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a PascalCase component destructures props with an inline default of an empty object literal ({ options = {} }) or empty array literal ({ items = [] }). Each render allocates a fresh reference, breaking downstream memo / useMemo / useEffect dependency checks that rely on referential equality.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist the default to module scope: const EMPTY_ITEMS: readonly Item[] = []; then destructure as ({ items = EMPTY_ITEMS }). The same reference is reused across renders, restoring referential equality for memoized children and dependency arrays. See https://react.dev/reference/react/memo#updating-a-memoized-component-using-state
