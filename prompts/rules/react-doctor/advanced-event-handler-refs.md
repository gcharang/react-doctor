# `react-doctor/advanced-event-handler-refs`

Store the handler in a ref and have the listener read `handlerRef.current()` — the subscription stays put while the latest handler is always called

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a useEffect has an identifier in its deps array AND that same identifier is passed as the second argument of a subscription-shaped call inside the body — addEventListener, subscribe, addListener, on, watch, listen, or sub from SUBSCRIPTION_METHOD_NAMES. The rule names the registered handler in the message. False positive: the listener genuinely must re-bind every render because it captures a different DOM target each time.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add a sibling effect (or use useEffectEvent on React 19+) that keeps the latest handler in a ref — handlerRef.current = handler on every render — then change the registered listener to a stable wrapper that calls handlerRef.current(...), and remove the handler from the subscription effect's deps so it sets up exactly once. See https://react.dev/learn/separating-events-from-effects
