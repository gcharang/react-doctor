# `react-doctor/no-polymorphic-children`

Expose explicit subcomponents (`<Button.Text>`, `<Button.Icon>`) so consumers don't need to switch on `typeof children`

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule fires on a BinaryExpression of the form typeof children === 'string' (or ==), in either operand order. Targets components that branch their render shape based on what the consumer passed. Confirm children here is the component prop and not a local variable shadowing the name, and that the branch actually changes rendering rather than performing pure normalization or validation.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Expose explicit subcomponents that encode the shape in the API — for example Button.Text for string content and Button.Icon for icons — so consumers spell out intent and TypeScript catches misuse at compile time. This is the compound component pattern used by Radix, Headless UI, and shadcn. See https://www.patterns.dev/react/compound-pattern
