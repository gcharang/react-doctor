# `react-doctor/rerender-state-only-in-handlers`

Replace useState with useRef when the value is only mutated and never read in render — `ref.current = ...` updates without re-rendering the component

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a useState whose value name is never read along the render path — not in returned JSX and not in any local that transitively feeds into JSX — but whose setter is still called somewhere. The transitive dependency walk includes locals and memos that JSX consumes indirectly, so values used through layers still count as render-reachable.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace useState with useRef(initial) and mutate via ref.current = newValue. The component no longer re-renders on every update, which is the right shape for instance values like the latest event timestamp, a scroll-position cache, or an accumulated debounce counter. Refs never trigger reconciliation. See https://react.dev/reference/react/useRef
