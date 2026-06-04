# `react-doctor/forbid-component-props`

Configure forbidden props per component via the `forbidComponentProps.forbid` setting.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-component-props>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a configured prop appears on a user-defined JSX component — a PascalCase tag or a member-expression name like `Module.Foo` (HTML tags and namespaced shapes such as `<fbt:param>` pass through). With no config it forbids `className` and `style`; otherwise it matches each attribute against `forbid` entries (exact `propName` or `propNamePattern` glob) and reports unless the tag is exempted via `allowedFor`/`allowedForPatterns` or excluded from `disallowedFor`/`disallowedForPatterns`. False positive: a wrapper component that deliberately re-exposes `className`/`style` as part of its public API (the common Tailwind/shadcn/Radix pattern) — add that component to `allowedFor` rather than stripping the prop.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pass the styling/behavior through the component's intended API instead of the forbidden prop — e.g. a `variant`/`size` prop or a design-system token rather than `<Card className="p-4" />`. If a component is legitimately meant to accept the prop, allowlist it in config (`{ propName: "className", allowedFor: ["Card"] }` or `allowedForPatterns: ["*Icon"]`) instead of suppressing each call site. See https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-component-props
