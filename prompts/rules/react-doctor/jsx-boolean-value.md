# `react-doctor/jsx-boolean-value`

Pick one boolean-attribute style codebase-wide (default: omit `={true}`, e.g. write `<C foo />`).

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-boolean-value>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

In the default "never" mode this fires on a JSX attribute written as an explicit boolean literal `attr={true}` (and on `attr={false}` only when `assumeUndefinedIsFalse` is set), reporting that the value should be omitted; in "always" mode it instead fires on shorthand `attr` with no value, and also on `attr={true}`/`attr={false}` for attributes on the per-attribute `never` list. Per-attribute `always`/`never` lists flip the expectation for named attributes. When an attribute has a value, it fires only on a literal boolean expression container (`{true}`/`{false}`); non-literal values like `disabled={isDisabled}` or `open={cond}` never fire (it also flags value-less shorthand `attr` in "always" mode or when listed in the per-attribute `always` list). False positive: this is a purely stylistic, formatter-adjacent preference (the source marks it `defaultEnabled: false`), so a finding is safe to suppress in any codebase that hasn't deliberately opted into one style.

## Fix prompt

Use this once validation confirms the diagnostic is real.

In the default "never" style, drop the explicit `={true}` and use the shorthand: change `<Modal open={true} />` to `<Modal open />`. If your project standardized on "always" instead, do the reverse and add the value: `<Modal open />` becomes `<Modal open={true} />`. Leave non-literal values (`disabled={isDisabled}`) untouched, and keep `={false}` unless `assumeUndefinedIsFalse` is enabled. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-boolean-value
