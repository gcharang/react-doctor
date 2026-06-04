# `react-doctor/no-fetch-in-effect`

Use `useQuery()` from @tanstack/react-query, `useSWR()`, or fetch in a Server Component instead

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a useEffect callback contains anywhere a CallExpression whose callee is in FETCH_CALLEE_NAMES (fetch, ky, got, wretch, ofetch) or whose object identifier is in FETCH_MEMBER_OBJECTS (axios.get, ky.post, got.json, request.delete — any method on those receivers). The walker descends into nested functions, so await fetch(...) inside an async IIFE or a .then() callback still triggers. False positive: a one-shot fetch with proper AbortController cleanup in a small project that has not adopted a data-fetching library.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the effect with useQuery from @tanstack/react-query or useSWR — both handle caching, request deduplication, race conditions, retries, and refetch-on-focus for you. In Next.js App Router and other RSC frameworks, move the fetch into a Server Component or Route Handler so it never ships to the client. See https://react.dev/reference/react/useEffect#fetching-data-with-effects
