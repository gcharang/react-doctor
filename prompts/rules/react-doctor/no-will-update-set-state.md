# `react-doctor/no-will-update-set-state`

Don't call this.setState in componentWillUpdate — move the update to getDerivedStateFromProps or componentDidUpdate.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-will-update-set-state>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a `this.setState(...)` call located directly in a `componentWillUpdate` (or `UNSAFE_componentWillUpdate` when React >= 16.3) method of a createReactClass or `extends React.Component` component; calls inside an `if`/loop block still count as direct. In the default "allowed" mode, calls buried two or more functions deep (event-handler callbacks, inner function declarations passed elsewhere) are NOT flagged — only the stricter "disallow-in-func" mode catches those. False positive: a project pinned to React < 16.3 where a method literally named `UNSAFE_componentWillUpdate` is just an ordinary user method, not a lifecycle hook — set settings.react.version so the rule skips it.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the derivation out of componentWillUpdate: compute prop-derived state in the static `getDerivedStateFromProps(props, state)` (return the partial state instead of calling setState), or run post-render side effects in `componentDidUpdate(prevProps, prevState)` guarded by a prop/state comparison so it doesn't loop. componentWillUpdate is not re-invoked by setState, so the update silently does nothing or recurses — e.g. replace `componentWillUpdate() { this.setState({name: this.props.name}) }` with `static getDerivedStateFromProps(props) { return { name: props.name }; }`. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-will-update-set-state
