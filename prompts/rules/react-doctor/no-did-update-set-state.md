# `react-doctor/no-did-update-set-state`

Avoid calling this.setState in componentDidUpdate; derive the value with getDerivedStateFromProps to prevent re-render loops

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-update-set-state>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on `this.setState(...)` reached directly inside a `componentDidUpdate` method of an ES5 (`createReactClass`) or ES6 (`extends React.Component`) component — including calls in `if`/ternary branches, since the method body counts as one function level. In the default `allowed` mode, calls nested more than one function deep are intentionally skipped, so `setState` inside `setTimeout`, `Promise.then`, or an event-handler callback does NOT fire; the strict `disallow-in-func` mode flags those too. False positive: a guarded `setState` wrapped in a prop-comparison `if (prevProps.x !== this.props.x)` is the React-sanctioned escape hatch and won't loop, even though the rule still flags it.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move derived state out of the lifecycle: compute it in the static `getDerivedStateFromProps(props, state)` so no extra render is queued, e.g. `static getDerivedStateFromProps(props) { return { name: props.name.toUpperCase() }; }`. If you must keep `setState` in `componentDidUpdate`, gate it on a prop/state diff so it can't loop: `if (prevProps.name !== this.props.name) this.setState(...)`. Prefer migrating the component to a function component with `useEffect` for side effects that depend on prior props. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-update-set-state
