# `react-doctor/jsx-handler-names`

Use the `on…` prefix for event-handler props and `handle…` for the functions that handle them.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-handler-names>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX attribute whose value is a member-expression or `this.props` chain (and, when opted in via checkLocalVariables/checkInlineFunction, a bare identifier or single-call arrow) where the prop name and handler name disagree on prefix: an `on…`-prefixed prop wired to a value that does NOT start with `handle…` (e.g. `onChange={this.onChange}` or `onChange={this.doSomethingOnChange}`), or a non-`on…` prop wired to a `handle…`-prefixed value (e.g. `handleChange={this.handleChange}`). `ref`, empty expressions, and plain literals are skipped by default (literals fire only when checkLocalVariables is enabled). False positive: conditional-render APIs that reuse the `on` namespace for non-event data, such as solid-js `<Show when={props.onFoo}>`, where the prop `when` carries the `on`-named value `props.onFoo`, which is not an event handler.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Align the two names: give event-handler props the `on` prefix and name the function they receive with `handle` (e.g. `<Button onClick={handleClick} />`, not `onClick={clickButton}` or `whenClick={handleClick}`). When a prop's value legitimately reuses the `on` namespace for non-handler data — as in solid-js `<Show when={props.onFoo}>`, where `props.onFoo` is conditional-render data, not an event handler — disable the rule on that line or add the component to `ignoreComponentNames` rather than renaming. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-handler-names
