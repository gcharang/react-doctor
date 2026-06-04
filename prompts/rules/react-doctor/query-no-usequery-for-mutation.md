# `react-doctor/query-no-usequery-for-mutation`

Use `useMutation()` for POST/PUT/DELETE — it provides onSuccess/onError callbacks, doesn't auto-refetch, and correctly models write operations

- **Category:** TanStack Query
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-query
- **Enabled when:** framework=tanstack-query and capabilities=tanstack-query

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on useQuery|useInfiniteQuery|useSuspenseQuery|useSuspenseInfiniteQuery({ queryFn }) when queryFn's body contains a fetch(url, { method: 'POST'|'PUT'|'DELETE'|'PATCH' }) call with a literal method string. Wrapper clients like axios.post(...) or ky.post(...) won't match — only the bare global fetch identifier paired with a literal method property.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Swap useQuery for useMutation({ mutationFn }) and trigger it from an event handler via mutation.mutate(input). useMutation exposes onSuccess/onError/onSettled, doesn't auto-refetch on focus/mount/reconnect, and won't fire on render — exactly the semantics writes need. https://tanstack.com/query/latest/docs/framework/react/guides/mutations
