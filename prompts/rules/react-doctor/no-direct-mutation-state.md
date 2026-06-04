# `react-doctor/no-direct-mutation-state`



- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-direct-mutation-state.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on this.state.foo = value (or this.state = value outside the constructor) inside React class components — subclasses of React.Component / Component / PureComponent, or createReactClass factories. The mutation bypasses React's scheduler, so a subsequent setState() can silently overwrite it and no re-render is queued. False positive (non-trigger): constructor assignments (this.state = { foo: 'bar' } inside the constructor) are intentionally allowed.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace mutations with this.setState({ foo: nextValue }), or the updater form this.setState(prev => ({ foo: derive(prev.foo) })) when the next value depends on the previous one. Initialize defaults only in the constructor or via a class field (state = { foo: 'bar' }). Better, port the class to a function component with useState. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-direct-mutation-state.html and https://react.dev/reference/react/Component#setstate
