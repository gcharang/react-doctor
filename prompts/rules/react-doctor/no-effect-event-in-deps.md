# `react-doctor/no-effect-event-in-deps`

Call the useEffectEvent callback inside the effect body without listing it; its identity is intentionally unstable

- **Category:** State & Effects
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when an Identifier in the deps array of useEffect, useLayoutEffect, useMemo, or useCallback (HOOKS_WITH_DEPS) was bound earlier in the same component via const X = useEffectEvent(...). The bindings are tracked through a per-component stack so a same-named useEffectEvent in a sibling component cannot taint this one. False positive: extremely rare — would require the binding tracker to misidentify a non-useEffectEvent call, which it cannot (it matches the callee name exactly).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the identifier from the deps array entirely and call it inside the effect body — useEffectEvent has an intentionally unstable identity that always reads the latest props/state, so listing it would force the effect to re-run on every render. Keep only the reactive values the effect truly depends on. See https://react.dev/reference/react/experimental_useEffectEvent
