# `react-doctor/no-event-handler`

Disallow using state and an effect as an event handler.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** eslint-plugin-react-you-might-not-need-an-effect
- **Framework:** global
- **Enabled when:** eslint-plugin-react-you-might-not-need-an-effect installed in project
- **Documentation:** <https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a cleanup-less useEffect containing an if statement with no else whose test reads state (avoidEventHandler) or a prop (avoidPropHandler) — the textbook 'when X becomes truthy, do the side effect' pattern that belongs in the handler that flipped X. False positive: the state being checked is set by an external subscription (storage event, IntersectionObserver) the handler cannot observe.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the work into the event handler that sets the state (onClick, onSubmit, onChange) and call it directly — no intermediate state hop. If multiple handlers share the work, extract a regular function and call it from each; do not route through useEffect. For prop-callback variants (onSomething from props), invoke the callback from the parent's handler instead. See https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers
