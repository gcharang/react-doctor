# `react-doctor/no-render-return-value`



- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-render-return-value.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when the return value of ReactDOM.render() is captured — assigned to a variable, returned from a function, or used in any expression. The instance return was a legacy escape hatch; React 18 deprecated it and React 19 removed ReactDOM.render entirely. A bare ReactDOM.render(<App />, container) call with no assignment is fine. False positive: an unrelated render() helper not imported from react-dom.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Drop the variable assignment — if you needed a handle to the root component, use a regular ref inside <App /> instead. On React 18+, switch to createRoot from react-dom/client: const root = createRoot(container); root.render(<App />); call root.unmount() where you previously needed unmountComponentAtNode. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-render-return-value.html and https://react.dev/reference/react-dom/client/createRoot
