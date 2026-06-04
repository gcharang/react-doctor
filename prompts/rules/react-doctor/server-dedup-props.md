# `react-doctor/server-dedup-props`

Pass the source array once and derive the projection on the client — passing both doubles RSC serialization bytes

- **Category:** Server
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule walks the attributes on a single JSXOpeningElement: it maps identifier-valued props by their identifier name, then reports any other prop whose value is a .toSorted(), .toReversed(), .filter(), .map(), or .slice() call chained off that same root identifier. Both projections then serialize across the RSC wire. Skip when the projection differs enough that client-side re-derivation would duplicate non-trivial server logic.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Send the source array once and derive the projection on the client with useMemo, or pre-derive on the server and drop the source prop entirely. Doubling the RSC payload to save a one-line client transform is rarely worth it. See https://react.dev/reference/rsc/use-client#serializable-types
