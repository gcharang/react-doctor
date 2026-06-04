# `react-doctor/no-react-children`

Pass children as props or render them directly instead of calling React.Children methods.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-react-children>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a call whose callee is a member access on the React Children namespace — either Children.<method>(...) where Children was imported from 'react', or React.Children.<method>(...) where React is the local name of any react import (covering map, forEach, only, count, toArray, and the parenthesized or `as any` forms). It does NOT fire on a locally-declared `Children` object, a `Children` imported from a non-react module, or the bare strings/JSX text "Children". False positive: React.Children.only / React.Children.map used as a deliberate runtime invariant (e.g. enforcing a single child in a tooltip or trigger wrapper) — that is a valid, intentional pattern, not a bug, which is exactly why this rule ships off by default.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Prefer plumbing children through directly: accept the children prop and render {children}, or pass renderable nodes as explicit props (e.g. <Layout header={<Header />} body={<Body />} />) instead of slicing a children collection apart. When you need per-child wrapping, map over an explicit array prop rather than Children.map(children, ...): items.map(item => <Row key={item.id}>{item.node}</Row>). If a single-child invariant is genuinely required, keep React.Children.only and add an eslint-disable with a justification. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-react-children
