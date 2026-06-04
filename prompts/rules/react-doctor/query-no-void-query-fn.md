# `react-doctor/query-no-void-query-fn`

queryFn must return a value for the cache. Use the `enabled` option to conditionally disable the query instead of returning undefined

- **Category:** TanStack Query
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-query
- **Enabled when:** framework=tanstack-query and capabilities=tanstack-query

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when useQuery|useInfiniteQuery|useSuspenseQuery|useSuspenseInfiniteQuery({ queryFn }) defines queryFn as a function with a literally empty block body — () => {} or function () {}. Concise-body arrows like () => data and any body with at least one statement are skipped, so only true placeholder/stub shapes trip the check.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Either return the fetched value from queryFn, or remove the property and gate the query with enabled: Boolean(id). Returning undefined caches undefined and freezes the loading state; enabled keeps the query pending without polluting the cache with bad data. https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries
