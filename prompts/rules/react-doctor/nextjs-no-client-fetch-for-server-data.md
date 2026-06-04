# `react-doctor/nextjs-no-client-fetch-for-server-data`

Remove 'use client' and fetch directly in the Server Component — no API round-trip, secrets stay on server

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Triggers in page.tsx/layout.tsx (App Router) or any file under /pages/ when the file has 'use client' and a useEffect/useLayoutEffect callback contains a fetch() call. False positive when the fetch genuinely needs browser-only auth (e.g. a user token in localStorage) or hits a real-time endpoint that must stay client-driven.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove 'use client' and the useEffect; await fetch() directly in the async Server Component body. Secrets stay on the server, there's no client/server round-trip, and data streams via RSC. For mutations or polling, keep client fetch but move it into a child client component below page/layout. https://nextjs.org/docs/app/getting-started/fetching-data
