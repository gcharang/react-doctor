# `react-doctor/query-no-query-in-effect`

React Query manages refetching automatically via queryKey dependencies and the `enabled` option — manual refetch() in useEffect is usually unnecessary

- **Category:** TanStack Query
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-query
- **Enabled when:** framework=tanstack-query and capabilities=tanstack-query

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a useEffect or useLayoutEffect callback contains a bare refetch() CallExpression — the callee must be a plain Identifier named refetch. Member access like query.refetch() or result.refetch() is NOT matched; only an aliased const { refetch } = useQuery(...) followed by refetch() inside the effect.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the effect. Encode the trigger as part of queryKey (e.g. queryKey: ['user', userId]) so React Query refetches automatically when it changes, or toggle the enabled flag to gate the fetch. Reserve imperative refetch() for event handlers, not effects. https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
