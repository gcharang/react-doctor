# `react-doctor/no-derived-useState`

Remove useState and compute the value inline: `const value = transform(propName)`

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on useState(propName) or useState(propName.nested) where propName is a destructured prop or props.x reference tracked by the per-component prop-stack. Only direct Identifier and non-computed MemberExpression initializers are checked — useState(transform(prop)) or useState(() => transform(prop)) will not trigger. False positive: an intentionally uncontrolled-component pattern that captures the initial prop value ONCE and never re-syncs.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the useState and read the prop directly during render: const value = transform(propName). If you need a separate editable local copy that resets when the prop changes, lift the prop to a key on the component — <Form key={userId} initialValue={...} /> — so React remounts with a fresh useState on each change. See https://react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes
