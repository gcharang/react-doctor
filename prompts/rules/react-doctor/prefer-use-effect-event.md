# `react-doctor/prefer-use-effect-event`

Wrap the callback with `useEffectEvent(callback)` (React 19+) and call the resulting binding from inside the sub-handler. The Effect Event captures the latest props/state without being a reactive dep, so the effect doesn't re-subscribe on every parent render. See https://react.dev/reference/react/useEffectEvent

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only on React 19+ projects. Requires a useEffect with two or more Identifier deps where one dep is either an on-prefixed destructured prop or a useCallback-bound local, and EVERY read of it inside the effect sits inside a sub-handler (setTimeout, setInterval, requestAnimationFrame, queueMicrotask, store.subscribe, addEventListener, etc.) — never at the effect's top level.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap the callable with useEffectEvent — const onSearchEvent = useEffectEvent(onSearch) — call onSearchEvent(...) from inside the sub-handler, and remove the original from the dep array so the effect stops re-subscribing on every parent render. Effect Events always read the latest props and state without being reactive. See https://react.dev/reference/react/useEffectEvent
