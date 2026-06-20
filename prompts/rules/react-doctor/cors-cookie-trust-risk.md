# `react-doctor/cors-cookie-trust-risk`

Combining credentialed CORS with a wildcard or less-trusted origin, or scoping auth cookies to a parent domain, lets other sites or subdomains ride a user's session.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.tsx) or config/CI files; tests/build/docs/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in production source or config/CI files on two shapes: (1) credentialed CORS — `Access-Control-Allow-Credentials: true` within ~700 chars of an `Access-Control-Allow-Origin` of `*`, `https://docs.`, or a `mintlify` host (combining credentials with a wildcard or less-trusted docs origin); or (2) a broad auth-cookie scope — a `session`/`auth`/`token`/`jwt` cookie string carrying `Domain=.` (a leading-dot parent-domain scope that shares the cookie across all subdomains). FALSE POSITIVE to suppress: an `Access-Control-Allow-Origin: *` endpoint that serves only PUBLIC, non-credentialed data (so the `Allow-Credentials: true` is a stale/unused header), or a `Domain=.` cookie that is intentionally non-sensitive (not a real session token despite a matching name) — confirm the cookie actually authenticates and that the wildcard origin is genuinely paired with credentials.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Do not pair `Access-Control-Allow-Credentials: true` with a wildcard or less-trusted (docs/vendor) `Access-Control-Allow-Origin`; when credentials are required, reflect only an explicit allowlist of fully-trusted origins, and serve docs and marketing domains without credentialed CORS. Keep auth cookies host-only by dropping the leading-dot `Domain=.`, and set `HttpOnly`, `Secure`, and `SameSite`. Isolate documentation and custom domains from the app session so an XSS there cannot use app cookies.
