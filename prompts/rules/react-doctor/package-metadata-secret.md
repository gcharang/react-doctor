# `react-doctor/package-metadata-secret`

A secret or public-prefixed secret name in `package.json` leaks easily, because package metadata is routinely published to registries, logs, and browser bundles.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** only `package.json` files

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a `package.json` contains either a public-prefixed env secret NAME — `NEXT_PUBLIC_`/`VITE_`/`REACT_APP_`/`EXPO_PUBLIC_` joined with `SECRET`/`TOKEN`/`PASSWORD`/`PRIVATE`/`DATABASE_URL`/`SERVICE_ROLE`/`AWS_ACCESS_KEY`/`AWS_SECRET` — or a concrete secret VALUE matching the shared shapes (AWS `AKIA…`, `ghp_`/`github_pat_`, `glpat-`, Slack `xox*`, Stripe `sk_live/test_`, OpenAI `sk-`, Anthropic `sk-ant-…`, npm/Vercel/SendGrid tokens, Slack/Discord webhook URLs, PEM private keys, etc.). FALSE POSITIVE: a public-prefixed name that is a known client-safe value is exempted (`SENTRY_DSN`, `*PUBLISHABLE*`, `ANON_KEY`, PostHog/Algolia/Mapbox/Mixpanel public tokens, `NEXT_PUBLIC_ENABLE_*`/`DISABLE`/`ALLOW`/`REQUIRE` flags) — those are designed to ship publicly and are not flagged.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the secret out of `package.json` (and any report it feeds) into an untracked `.env` or a secrets manager, reference it at runtime by name, and rotate it, because published metadata is exposed. For a `NEXT_PUBLIC_`/`VITE_`-prefixed name that holds a real secret, rename it to a non-public env var and read it only in server code, because anything with a public prefix is inlined into the client bundle.
