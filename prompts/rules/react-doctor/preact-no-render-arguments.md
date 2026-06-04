# `react-doctor/preact-no-render-arguments`

Drop render's positional params and read this.props / this.state inside render() instead

- **Category:** Preact
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** preact
- **Enabled when:** framework=preact and capabilities=preact
- **Documentation:** <https://preactjs.com/guide/v10/components/>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a non-static instance MethodDefinition named render (kind 'method', static !== true) whose owning class extends Component or PureComponent — imported from preact, or referenced as the Preact namespace member Preact.Component / Preact.PureComponent, or the React.Component shape that isEs6Component recognizes (e.g. preact/compat) — when that render's FunctionExpression declares at least one runtime parameter (props, or props plus state). A leading TypeScript `this:` type-only parameter is stripped first, so it does not count. False positive boundary mirroring the valid fixtures: parameterless render() reading this.props/this.state; a `render(target)` on a plain class that does NOT extend a Component/PureComponent base; a function component or arrow assigned `const render = (props) => ...`; a `static render(input)` utility sharing the name; and `render(this: Hello)` where the only param is the type-only this binding with an otherwise empty runtime arg list.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the positional parameter(s) from the lifecycle render() and read the same values off the instance instead: change `render(props, state) { return <h1>{props.name} {state.count}</h1>; }` to `render() { return <h1>{this.props.name} {this.state.count}</h1>; }`. This types cleanly via Component<Props, State>, keeps render() consistent with every other lifecycle method, and survives a switch to preact/compat where render() takes no arguments. Leave a genuine `this:` type annotation in place but delete the user-declared props/state params after it. See https://preactjs.com/guide/v10/components/
