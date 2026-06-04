# `react-doctor/no-this-in-sfc`

Use the function's `props` parameter instead of `this.props` in stateless function components.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-this-in-sfc>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a `this.<member>` access (member expression or `this["props"]` bracket form) inside a function component, identified purely by a PascalCase name — a `function Foo`, or a function/arrow assigned to a PascalCase variable or assignment target. Excluded: class methods, ES5 createReactClass/configured class-factory components, functions with an explicit TS `this:` parameter, and object-property methods (e.g. Tiptap/ProseMirror `.extend({ addAttributes() {…} })`). False positive: the detection is name-based, not JSX-based, so a PascalCase-named helper that is NOT a React component (a factory, hook-like builder, or utility returning a plain object) is flagged even though its `this` is a legitimate non-component binding.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Read props and context from the function's parameters instead of `this`: destructure them in the signature — `function Foo({ foo }) { return <div>{foo}</div>; }` — or accept a `props` argument and use `props.foo`. If the function is genuinely not a stateless component (a class-related helper, a builder, or an object-config method), declare an explicit TypeScript `this:` parameter or rename it to non-PascalCase so the rule correctly skips it. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-this-in-sfc
