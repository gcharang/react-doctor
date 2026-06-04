# `react-doctor/no-set-state`

Lift state up or use an external store instead of this.setState.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-set-state>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a `this.setState(...)` call expression whose callee is exactly `this.setState` and that sits inside a recognized React component — an es5 `createReactClass({...})` or an es6 `class extends React.Component`. It does NOT fire on `this.setState` used in a plain function that isn't a component, nor on merely referencing the method without invoking it (e.g. `this.someHandler = this.setState`). False positive: a legitimate class component kept on purpose — error boundaries, third-party/legacy integrations, or code not yet migrated — where local class state is still the correct tool; this is a style/architecture rule, so confirm the codebase has actually committed to banning class state before flagging.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the state out of the class: lift it to a parent and pass it down as props, or back it with an external store (Redux/Zustand/Flux) and dispatch instead of calling `this.setState({count})`. Where the component itself should own the state, convert it to a function component and use a hook: `const [count, setCount] = useState(0)`. If this class component must stay (e.g. an error boundary), suppress the finding on that line with a written justification. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-set-state
