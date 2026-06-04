# `react-doctor/rerender-functional-setstate`

Use the callback form: `setState(prev => prev + 1)` to always read the latest value

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on setX(x + n), setX(x ** n), setX(++x), setX([...x, item]), or setX({ ...x, k: v }) where x is the state variable name derived from the setter (setCount → count). The derived-name check prevents false positives on patterns like setCount(1 + computedValue) where no operand structurally references the state.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Use the updater form so React reads the latest queued value: setCount(prev => prev + 1), setMessages(prev => [...prev, msg]), setUser(prev => ({ ...prev, name })). This is critical inside subscription handlers, setInterval callbacks, and batched event handlers where the captured value otherwise goes stale. See https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
