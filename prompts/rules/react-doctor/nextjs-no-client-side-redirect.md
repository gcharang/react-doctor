# `react-doctor/nextjs-no-client-side-redirect`

Avoid redirects inside useEffect. Use an event handler, middleware, or server-side redirect (App Router: redirect() from next/navigation; Pages Router: getServerSideProps redirect)

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Detects router.push()/router.replace(), window.location = ..., or location.href = ... inside a useEffect/useLayoutEffect callback. Mount-only redirects flash the wrong UI before navigating and break back-button behavior. False positive if the redirect is gated by an async subscription that has no event-handler equivalent.

## Fix prompt

Use this once validation confirms the diagnostic is real.

App Router: call redirect() from next/navigation in a Server Component, layout, or Server Action. Pages Router: return a redirect from getServerSideProps or use middleware. For user-triggered navigation, move router.push() into the onClick/onSubmit handler instead. https://nextjs.org/docs/app/api-reference/functions/redirect
