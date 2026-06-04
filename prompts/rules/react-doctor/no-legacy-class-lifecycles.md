# `react-doctor/no-legacy-class-lifecycles`

Move side effects in `componentWillMount` to `componentDidMount`; replace `componentWillReceiveProps` with `componentDidUpdate` (compare prevProps) or the static `getDerivedStateFromProps` for pure state derivation; replace `componentWillUpdate` with `getSnapshotBeforeUpdate` paired with `componentDidUpdate`. The `UNSAFE_` prefix only silences the warning — React 19 removes both forms.

- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a class body (`ClassBody`) contains a `MethodDefinition` or `PropertyDefinition` whose key Identifier is exactly `componentWillMount`, `componentWillReceiveProps`, or `componentWillUpdate`, OR their `UNSAFE_`-prefixed aliases — a pure name match, class-body-scoped (object-literal methods, standalone functions, or these names used as variables never fire). CONFIRM whenever the enclosing class is an actual React component — it extends `React.Component`/`Component`/`PureComponent` or any React-derived base (e.g. Joplin's `BaseScreenComponent`) and the method runs in production. All four real positives are this: a `React.Component`/`PureComponent` (or React-base subclass) with the method live in render flow — confirm them. NOT suppression reasons: the `UNSAFE_` prefix (it only silences the React-18 warning; React 19 removes both forms), or `reactMajorVersion` 18 vs 19 (removed in 19, warns in 18.3.1). The ONE genuine false positive: the rule never checks the superclass, so a class that is NOT a React component but coincidentally defines a same-named method — a MobX store, a Lexical/ProseMirror/editor node, a custom non-render base class, or a test mock/type-only stub never mounted by React — fires spuriously; suppress those, since the method has no React lifecycle semantics.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Principle: map each legacy hook to the replacement that matches its INTENT, never just rename it. (A) `componentWillMount` → move side effects/subscriptions to `componentDidMount` (e.g. a `yamlPlugin(CodeMirror)` plugin registration or a `this.refreshUrl()` call belongs in `componentDidMount`); move synchronous initial-state/field setup into the `constructor`. (B) `componentWillReceiveProps(next)` → if it only derives state from props (e.g. `setState({date:newProps.date})` or recomputing `yAxisOptions`), prefer the static `getDerivedStateFromProps(props,state)` returning the partial state (no `this`); if it runs side effects, move them to `componentDidUpdate(prevProps)` GUARDED by a `prevProps.x !== this.props.x` comparison. (C) `componentWillUpdate` → DOM reads go in `getSnapshotBeforeUpdate` (its return is passed to `componentDidUpdate`), other work in `componentDidUpdate`. Best fix: port the class to a function component with `useState`/`useEffect`/`useMemo`. Anti-patterns: do NOT just add/keep the `UNSAFE_` prefix (the `UNSAFE_` prefix is already removed in React 19); do NOT dump `componentWillReceiveProps` bodies into `componentDidUpdate` without the prop-change guard — an unconditional `setState` there causes an infinite render loop. See https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html
