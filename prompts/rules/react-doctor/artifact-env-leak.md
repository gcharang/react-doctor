# `react-doctor/artifact-env-leak`

A real secret shipped in a browser bundle under a public env prefix (`NEXT_PUBLIC_`, `VITE_`, `REACT_APP_`, `EXPO_PUBLIC_`) is world-readable and must be treated as compromised.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** browser artifacts only (generated bundles, .map, public/, dist/assets, .next/static, out/, storybook-static); documentation (.md/.mdx, README/CHANGELOG/etc.) and server build output skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only in a browser-shipped artifact (generated/minified bundle, `.map`, or a file under `public/`/`dist/assets/`/`.next/static/`/`out/`/`storybook-static/`; documentation `.md`/`.mdx` is excluded). Two shapes: (1) a public-prefixed env name that names a secret — `NEXT_PUBLIC_`/`VITE_`/`REACT_APP_`/`EXPO_PUBLIC_` followed by a token containing `SECRET`/`TOKEN`/`PASSWORD`/`PRIVATE`/`DATABASE_URL`/`SERVICE_ROLE`/`AWS_ACCESS_KEY`/`AWS_SECRET` (a server secret mistakenly given a client-published prefix); or (2) a full-env-dump shape — `process.env`/`import.meta.env`/`window.__ENV__` co-occurring with a known server-secret name like `DATABASE_URL`/`AWS_SECRET_ACCESS_KEY`/`SESSION_SECRET`/`COOKIE_SECRET`/`PRIVATE_KEY`/`SERVICE_ROLE`. FALSE POSITIVE to suppress: already exempted — public-prefixed names that are genuinely client-safe (`SENTRY_DSN`, `*PUBLISHABLE*`, `*ANON_KEY*`, `POSTHOG_TOKEN`, `CLERK_PUBLISHABLE_KEY`, `ALGOLIA_SEARCH_KEY`, and `NEXT_PUBLIC_ENABLE_*`/`DISABLE_*`/`ALLOW_*`/`REQUIRE_*` feature flags) are skipped; a remaining FP is a secret-looking NAME that holds no real secret value (a documented placeholder).

## Fix prompt

Use this once validation confirms the diagnostic is real.

A `NEXT_PUBLIC_`/`VITE_`/`REACT_APP_`/`EXPO_PUBLIC_` prefix publishes the value to the browser, so never put a real secret behind one. Rename the variable to an unprefixed, server-only env var, read it only in server code (route handlers, server components, API routes), and rebuild so it leaves the client bundle. Rotate any key that already shipped. For full-env dumps, stop serializing `process.env`/`import.meta.env` into client config and allowlist only the public keys you mean to expose.
