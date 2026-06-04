# `react-doctor/prefer-function-component`

Re-write the class component as a function component using hooks.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-function-component>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any ClassDeclaration or ClassExpression that extends Component, PureComponent, React.Component, or React.PureComponent — i.e. an ES6 React class component that could be a function with hooks. By default, error-boundary classes (those defining componentDidCatch or getDerivedStateFromError) are exempt, but setting allowErrorBoundary:false makes them fire too. False positive: when allowJsxUtilityClass:true is configured the rule also flags non-Component classes that merely contain JSX, which may be legitimate render-helper utilities rather than components needing conversion.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Convert the class to a function component: turn instance fields and this.state into useState, lifecycle methods (componentDidMount/componentDidUpdate/componentWillUnmount) into useEffect, and move render's JSX into the return — e.g. class Foo extends React.Component { render() { return <div>{this.props.foo}</div> } } becomes function Foo({ foo }) { return <div>{foo}</div> }. If the class is a genuine error boundary (componentDidCatch / getDerivedStateFromError) there is no hook equivalent, so keep it as a class and rely on the default allowErrorBoundary exemption instead of rewriting. See https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-function-component
