# `react-doctor/no-default-props`

React 19 removes `Component.defaultProps` for function components. Move the defaults into the destructured props parameter: `function Foo({ size = "md", variant = "primary" })` instead of `Foo.defaultProps = { size: "md", variant: "primary" }`.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any UppercaseIdentifier.defaultProps = {...} assignment (the rule keys off the uppercase first letter of the left-hand object, skipping computed access like Foo['defaultProps']). It cannot tell class from function components from the assignment alone, so confirm the target is an actual React component rather than an unrelated object that coincidentally has a defaultProps property.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the Foo.defaultProps = {...} statement and inline each default into the destructured props parameter, e.g. function Foo({ size = "md", variant = "primary" }). In TypeScript, mark those props optional (size?: "md" | "lg"). For class components, switch to JavaScript class field defaults on a destructured props read or migrate to a function component. See https://react.dev/blog/2024/12/05/react-19#removed-proptypes-and-defaultprops
