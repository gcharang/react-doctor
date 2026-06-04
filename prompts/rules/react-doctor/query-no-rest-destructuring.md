# `react-doctor/query-no-rest-destructuring`

Destructure only the fields you need: `const { data, isLoading } = useQuery(...)` — rest destructuring subscribes to all fields and causes extra re-renders

- **Category:** TanStack Query
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-query
- **Enabled when:** framework=tanstack-query and capabilities=tanstack-query

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on const { ...rest } = useQuery|useInfiniteQuery|useSuspenseQuery|useSuspenseInfiniteQuery(...) where the destructuring ObjectPattern contains a RestElement. React Query tracks which fields a component actually reads and only re-renders when those change; rest subscribes to every observed field, defeating the optimization.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Destructure only what you actually read: const { data, isLoading, error } = useQuery(...). If you need to forward every field downstream, pass the result object directly instead of spreading. Plain named destructuring (without ...rest) is fine — the rule only flags the rest element. https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations
