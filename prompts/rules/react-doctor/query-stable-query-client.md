# `react-doctor/query-stable-query-client`

Move `new QueryClient()` to module scope or wrap in `useState(() => new QueryClient())` — recreating it on every render resets the entire cache

- **Category:** TanStack Query
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-query
- **Enabled when:** framework=tanstack-query and capabilities=tanstack-query

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on new QueryClient() that appears inside an uppercase-named function or const arrow/function (a component) AND is NOT nested inside a useState, useMemo, or useRef wrapper hook. Module-scope instantiation and stable-hook-wrapped instances are correctly skipped. The class identifier must literally be QueryClient — aliased imports (new QC()) are not detected.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move const queryClient = new QueryClient() to module scope, or for per-request isolation in SSR/Next.js use const [queryClient] = useState(() => new QueryClient()). The factory form keeps init lazy and per-component; a bare new QueryClient() in the body runs every render and wipes the cache. https://tanstack.com/query/latest/docs/framework/react/guides/ssr
