# `react-doctor/no-did-mount-set-state`

Derive state in getDerivedStateFromProps or initial state instead of calling this.setState in componentDidMount, which forces an extra render.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-mount-set-state>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a `this.setState(...)` call (callee object must be `this`, property named exactly `setState`) located directly inside a `componentDidMount` method or class field — including calls wrapped in a single `if` block or ternary — but only when that lifecycle method lives inside a genuine React component: an ES5 `createReactClass(...)`/`React.createReactClass(...)` call, or an ES6 class extending `Component`/`PureComponent`/`React.Component`/`React.PureComponent`. In the default "allowed" mode, a `setState` buried two or more functions deep (inside a `setTimeout`, `Promise.then`, or a callback/inner function passed elsewhere) does NOT fire; only "disallow-in-func" mode flags those. A plain function or non-React class with a method named `componentDidMount` is NOT flagged, because detection requires that enclosing `createReactClass(...)` call or React-base-class extension — so the valid fixture `function Hello() { this.setState(...) }` does not trigger.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Compute the value from props synchronously instead of via a post-mount setState: use `static getDerivedStateFromProps(props)` to return the derived slice, or initialize it directly in the constructor/class-field state (`state = { name: props.name.toUpperCase() }`). Reserve `componentDidMount` setState for values that genuinely cannot exist until after mount (e.g. a measured DOM size), and in that case move the call into the async callback that produces the value, where this rule no longer flags it in the default mode. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-mount-set-state
