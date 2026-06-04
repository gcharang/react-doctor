# `react-doctor/prefer-es6-class`

Use one component style consistently — ES2015 `class extends React.Component` (default) over the legacy `createReactClass` factory.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-es6-class>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

In its default "always" mode, fires on any CallExpression whose callee is `createReactClass(...)` or `React.createReactClass(...)` — the legacy ES5 component factory. Under the opt-in "never" mode it flips to flag `class X extends Component | PureComponent | React.Component | React.PureComponent` instead. False positive: matching is purely syntactic on the callee name, so a same-named local helper called `createReactClass` that has nothing to do with React's factory is still flagged; confirm the call actually resolves to the react-create-class package before acting.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Convert the `createReactClass({ render() {...} })` call into an ES2015 class: `class Hello extends React.Component { render() { return <div>Hello {this.props.name}</div>; } }`, moving `displayName` to a static field and lifecycle/`render` methods onto the class. Better still in modern React, rewrite as a function component if the class holds no state or lifecycle logic. See https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-es6-class
