# `react-doctor/jsx-props-no-spreading`

List each prop explicitly so consumers can see what's being passed instead of spreading.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spreading>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any JSX spread attribute — `<C {...props} />` — across intrinsic HTML tags, capitalized components, and member-expression names (`Nav.Item`); settings can scope it to html-only or custom-only, exempt specific tags, or (with explicitSpread:"ignore") allow object-literal spreads like `<Foo {...{ a, b }} />` unless they contain a nested spread (`{...{ ...rest }}` still fires). False positive: `{...props}` is the canonical composition pattern — forwardRef wrappers, shadcn-ui / Radix / Headless UI consumers, and polymorphic components legitimately forward an open-ended prop bag, so an enabled finding here is often intentional pass-through, not a defect.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the spread with an explicit prop list so the JSX shows exactly what's passed: `<Avatar src={user.avatar} alt={user.name} size="lg" />` instead of `<Avatar {...user} />`. When forwarding is genuinely intended (wrappers, polymorphic `as` components, design-system primitives), this is idiomatic — either leave the rule off for that boundary or add a per-tag entry to the `exceptions` setting rather than rewriting it. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spreading
