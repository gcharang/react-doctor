# `react-doctor/query-destructure-result`

Destructure the query result instead of binding the whole object: const { data, isLoading } = useQuery(...)

- **Category:** TanStack Query
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-query
- **Enabled when:** framework=tanstack-query and capabilities=tanstack-query
- **Documentation:** <https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a VariableDeclarator whose id is a plain Identifier (not an ObjectPattern/ArrayPattern) and whose init is a CallExpression whose callee is itself an Identifier matching one of the four TANSTACK_QUERY_HOOKS: useQuery, useInfiniteQuery, useSuspenseQuery, useSuspenseInfiniteQuery — i.e. const query = useQuery(...) where the whole result is captured under one name. It does NO scope or usage analysis: it reports unconditionally on that shape regardless of how the binding is later used. Only two real exclusions, both structural: already-destructured (node.id is an ObjectPattern or ArrayPattern, so const { data } = useQuery(...) never matches), and a callee that is not literally one of those four Identifiers (a member-expression call like queryClient.fetchQuery, a wrapper hook of your own, or a same-named local Identifier that is not the TanStack import). False positive is a reviewer judgment, not a detector suppression: the rule still fires when the whole object must legitimately be held as one value (forwarded as-is to a child, returned untouched from a custom hook, or kept to spread later) — suppress those manually.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the whole-object binding with a destructuring pattern naming only the fields this scope reads, e.g. change const query = useQuery(...) to const { data, isLoading, error } = useQuery(...), then rewrite each query.data / query.isLoading reference to the bare field. This keeps TanStack Query's tracked-property optimization working so the component re-renders only when a field it actually reads changes; capturing the whole object and reaching in via property access subscribes to every field. If the result genuinely must be passed around as one object, leave it and suppress. https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations
