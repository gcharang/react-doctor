# `react-doctor/state-in-constructor`

Pick one state-initialization style for class components — class field or constructor — and use it consistently.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/state-in-constructor>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Stylistic consistency check on ES6 React class components (those extending React.Component). In the default "always" mode it fires on a non-static class field whose key is `state` (`state = {...}`), wanting it moved into the constructor; in "never" mode it instead fires on `this.state = {...}` assigned directly inside the constructor, wanting a class field. Only the literal key `state` counts — `this.baz` or `foobar` never fire — and a class field guarded check excludes non-components. False positive (never mode): the ancestor walk treats `this.state = {...}` inside a nested helper function declared in the constructor as a constructor assignment, even though `this` there is not the component instance.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Settle on one style and align with the configured mode. For the default "always" mode, move the class field into the constructor: replace `state = { count: 0 }` with `constructor(props) { super(props); this.state = { count: 0 }; }`. For "never" mode, do the reverse — drop the constructor assignment in favor of a class field `state = { count: 0 }`. This is purely stylistic (both forms are runtime-equivalent), so prefer the form already dominant in the file. See https://oxc.rs/docs/guide/usage/linter/rules/react/state-in-constructor
