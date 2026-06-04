# `react-doctor/tanstack-start-no-secrets-in-loader`

Loaders are isomorphic (run on both server and client). Wrap secret access in `createServerFn()` so it stays server-only

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires (error severity) on process.env.X or import.meta.env.X reads inside a route's loader or beforeLoad where X matches /secret|token|api_?key|password|private/i. NODE_ENV, MODE, DEV, and PROD are exempt. False positive: a deliberately public env var whose name contains a flagged substring, e.g. NEXT_PUBLIC_API_KEY or VITE_PUBLIC_TURNSTILE_SITE_KEY.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap the secret read inside a createServerFn().handler(async () => process.env.STRIPE_SECRET) and call it from the loader. Loaders are isomorphic — they run on the server during SSR and re-run on the client for subsequent navigations — so a literal env read ships the value into the client bundle. See https://tanstack.com/start/latest/docs/framework/react/server-functions
