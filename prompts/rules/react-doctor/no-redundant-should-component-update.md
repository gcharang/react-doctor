# `react-doctor/no-redundant-should-component-update`

Drop shouldComponentUpdate when extending PureComponent, or extend React.Component if custom comparison logic is genuinely needed.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-redundant-should-component-update>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a class extends `PureComponent` (a bare identifier named `PureComponent` or the `React.PureComponent` member expression — strictly `object.name === "React"` and property `PureComponent`) AND its body defines a `shouldComponentUpdate` member, as a method, an arrow class field, or a string-literal key, since PureComponent already implements a shallow prop/state comparison that makes the override redundant. The check is purely structural: it matches the superclass name and the member name, never the method body, and it does not handle a string-literal-keyed or computed superClass. False positive: a class extending a non-React class that happens to be named `PureComponent` will be flagged, since the match is name-only regardless of import origin. Conversely it misses (false negative) an aliased React import — e.g. `extends RPC` where `RPC` aliases `React.PureComponent` — because the superclass identifier isn't literally `PureComponent`, so nothing fires.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the redundant `shouldComponentUpdate` and rely on PureComponent's built-in shallow comparison: `class Foo extends React.PureComponent { render() { /* ... */ } }`. If you truly need custom update logic (deep comparison, ignoring a field), switch the base class to `React.Component` instead so the method is meaningful: `class Foo extends React.Component { shouldComponentUpdate(next) { /* custom */ } }`. Don't keep both — PureComponent plus an override defeats the optimization it provides. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-redundant-should-component-update
