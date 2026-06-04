# `react-doctor/server-fetch-without-revalidate`

Pass `{ next: { revalidate: <seconds> } }` (or `cache: "no-store"` / `next: { tags: [...] }`) so stale cached data doesn't silently persist

- **Category:** Server
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule only fires in App Router files matching app/.../{route,page,layout,template,loading,error,default}.tsx? that do not start with 'use client'. It reports fetch(url) calls whose second argument is missing or omits both a cache key and next.revalidate / next.tags. Note: Next.js 15+ removed the auto-cache default, so on newer projects treat this as a hardening recommendation rather than an active staleness bug.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pass an explicit cache directive: fetch(url, { next: { revalidate: 60 } }) for time-based revalidation, { next: { tags: ['user'] } } paired with revalidateTag() for on-demand invalidation, or { cache: 'no-store' } for fully dynamic data. Spelling out the intent also documents staleness expectations for reviewers. See https://nextjs.org/docs/app/api-reference/functions/fetch
