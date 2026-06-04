# `react-doctor/jsx-props-no-spread-multi`

Spread each unique expression at most once per JSX element.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spread-multi>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when the same spread argument appears more than once on a single JSX opening element — either a bare identifier (<App {...props} {...props} />) or a member expression that flattens to the same canonical name (<App {...props.foo} {...props.foo} />), reporting once per duplicated name even across intervening attributes (<div {...props} a="a" {...props} />). Parentheses and TS wrappers are peeled before comparison, so (props.foo).baz and (props.foo.baz) are treated as identical and DO fire. Non-trigger to confirm against: distinct expressions never collide — {...a} {...b} or {...props.x} {...props.foo} are clean, as is any computed/dynamic member access that can't be flattened to a static name.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the redundant spread and keep a single one, since a second spread of the same expression silently re-overrides any attributes written between them — collapse <App {...props} myAttr="1" {...props} /> to <App {...props} myAttr="1" /> (or {...props} after, if that override order is intended). If the two spreads were meant to merge different data, spread distinct objects instead: <App {...defaults} {...overrides} />. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spread-multi
