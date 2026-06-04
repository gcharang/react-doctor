# `react-doctor/rendering-conditional-render`

Change to `{items.length > 0 && <List />}` or use a ternary: `{items.length ? <List /> : null}`

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule flags numericValue && <Jsx /> where the left operand is either a .length member access (items.length) or an identifier whose name ends with count, length, total, size, or num — in camelCase like userCount or upper snake like USER_COUNT. When the value is 0, React renders the literal text '0' to the DOM. Confirm the left value can actually reach zero in practice.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Convert to an explicit boolean check: {items.length > 0 && <List />}, {Boolean(count) && <Badge />}, or a ternary {items.length ? <List /> : null}. Only false, null, and undefined render to nothing in JSX — 0 always renders. See https://react.dev/learn/conditional-rendering#logical-and-operator-
