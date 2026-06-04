# `react-doctor/no-cascading-set-state`

Combine into useReducer: `const [state, dispatch] = useReducer(reducer, initialState)`

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when 3 or more identifier calls matching /^set[A-Z]/ appear anywhere inside a useEffect or useLayoutEffect body — CASCADING_SET_STATE_THRESHOLD is 3. The walker recurses into nested callbacks, so setters inside .then() or setTimeout still count toward the total. False positive: identifiers that happen to start with set + uppercase but are not useState setters (setHours on a Date, element.style.setProperty), or genuinely independent updates that touch disparate state slices.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Combine the related fields into a single useReducer: const [state, dispatch] = useReducer(reducer, initialState), then dispatch ONE action whose reducer returns the next snapshot in a single immutable step. If some values are derivable from others, compute the derived ones during render instead of writing them to state. See https://react.dev/reference/react/useReducer
