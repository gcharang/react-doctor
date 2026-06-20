# `react-doctor/public-env-secret-name`

A public-prefixed env var whose name implies a secret (token, password, private key, service role) is inlined into the client bundle, so a real credential there is world-readable.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** client (browser-bundled) production source files; server dirs (api/backend/server/middleware/route/functions/lambdas/workers, *.server.*) and docs trees skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in client (browser-bundled) code when a public-prefixed env var — `NEXT_PUBLIC_`, `VITE_`, `REACT_APP_`, or `EXPO_PUBLIC_` — has a NAME containing `SECRET`, `TOKEN`, `PASSWORD`, `PRIVATE`, `DATABASE_URL`, `SERVICE_ROLE`, `AWS_ACCESS_KEY`, or `AWS_SECRET`. It reports the first such name that is NOT on the trusted-public allowlist (Sentry DSN, `*PUBLISHABLE*`, Supabase `ANON_KEY`, PostHog/Mixpanel/Mapbox tokens, Algolia search key, Google Maps key, `*PUBLIC_KEY*`, and `*_(DISABLE|ENABLE|ALLOW|REQUIRE)_*` feature flags). Matching is name-only — it never inspects the value. FALSE POSITIVE: a value that is genuinely client-safe despite a scary name — a vendor's designated publishable/anon token not yet allowlisted, or a boolean flag like `NEXT_PUBLIC_ENABLE_SECRET_MENU`; confirm only when the name denotes a real credential that would be inlined into the bundle.

## Fix prompt

Use this once validation confirms the diagnostic is real.

If it is a real credential, move it to a server-only env var (drop the public prefix) and read it from server code or a backend route, because every `NEXT_PUBLIC_`/`VITE_`/`REACT_APP_`/`EXPO_PUBLIC_` value is embedded in client JavaScript. Rotate it if it ever shipped in a bundle. If the value is genuinely public, rename it to a non-secret form (for example `*_PUBLISHABLE_KEY`, `*_ANON_KEY`) so it stops tripping the check.
