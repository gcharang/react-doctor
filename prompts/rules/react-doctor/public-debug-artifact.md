# `react-doctor/public-debug-artifact`

A browser-reachable debug, log, dump, or report file in your build output can expose source paths, internal routes, env data, or secrets.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** browser-reachable build/output artifacts only — public/, out/, dist/assets/, build/static/, .next/static/, .output/public/, storybook-static/, source maps, and minified .iife/.umd/.global/.min.js bundles; server build output (.next/server, .output/server) and locale/i18n dirs skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires purely on FILE PATH and NAME, not content: a browser-reachable artifact (under `public/`, `out/`, `dist/assets/`, `build/static/`, `.next/static/`, `.output/public/`, `storybook-static/`, a `.map`, or a minified `.iife`/`.umd`/`.global`/`.min.js` bundle — server-only `.next/server`/`.output/server` excluded) whose filename is an `.env` file, a `*.log`, or a `*debug|crash|trace|stack|report|dump|phpinfo*.(txt|log|json|html)` dump. Locale/i18n directories (whose names echo product nouns like "trace"/"report") are exempt. The finding sits at line 1:1 and escalates from warn to ERROR when the file content also matches a hard secret value pattern (AWS/GitHub/Stripe/Slack/Discord/private-key/DB-URL). FALSE POSITIVE: a deliberately published artifact that is genuinely safe — a sanitized health/status JSON or a public report containing no source paths, internal routes, env snapshots, or tokens.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the artifact from public build output, add its glob to `.gitignore` and your build tool's ignore config so it is not re-emitted, and purge it from history if it was committed. If the file contained a secret, rotate that credential now and assume it leaked. Route diagnostics through server-only logging that never reaches the browser, and strip source paths, internal routes, env data, and tokens from anything genuinely public.
