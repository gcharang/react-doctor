# `react-doctor/query-mutation-missing-invalidation`

Add `onSuccess: () => queryClient.invalidateQueries({ queryKey: ['...'] })` so cached data stays in sync after the mutation

- **Category:** TanStack Query
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-query
- **Enabled when:** framework=tanstack-query and capabilities=tanstack-query

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on useMutation({ mutationFn: ..., ... }) when the options object nowhere contains a member call whose property is invalidateQueries, setQueryData, setQueriesData, resetQueries, refetchQueries, removeQueries, cancelQueries, or clear. The walker searches the entire options tree (onSuccess/onSettled/onError/optimisticUpdate). False positive: invalidation lives in a parent router.refresh() or a global mutation success handler.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }) inside the options (or setQueryData for an optimistic update, resetQueries for a hard reset). Always use the object form { queryKey: [...] } — the deprecated string-key signature won't match and stale data lingers. https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations
