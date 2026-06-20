# `react-doctor/clickjacking-redirect-risk`

A redirect target taken from caller input, or a privileged page that allows untrusted framing, lets attackers send users to malicious sites or trick them through clickjacking.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.tsx) or config/CI files; tests/build/docs/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in production source or config/CI files on four shapes: (1) a `redirect(...)` call whose argument is attacker-controllable caller input — a bare identifier/property referencing `searchParams.get`/`nextUrl.searchParams`/`returnTo`/`callbackUrl`/`continue`/`next` (open redirect); (2) an `<iframe>` whose markup within ~700 chars carries redirect/URL-param shapes like `next=`/`continue=`/`redirect=`/`redirect_uri`/`role=`/`..`; (3) a `frame-ancestors *` (or `'self' *`) CSP; or (4) an `X-Frame-Options: ALLOW…` header. Comments are stripped first. FALSE POSITIVE to suppress: already exempted — a redirect keyword that appears only inside a string literal (e.g. `redirect('/login?...continue...')`) and a target already passed through a `safe*`/`valid*`/`sanitiz*`/`allowlist`/`whitelist` helper are skipped; a remaining FP is a `next`/`returnTo` value already validated against a same-origin or path allowlist before this `redirect()`.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For redirects, validate the target against a strict allowlist of paths or origins (or force it relative: reject anything not starting with a single `/`, and reject `//`) before calling `redirect()`, ideally through one shared `getSafeRedirectUrl()` helper. For framing, set `Content-Security-Policy: frame-ancestors 'self'` (or specific trusted origins) on privileged pages and avoid `X-Frame-Options: ALLOW…`. Do not embed privileged flows in URL-driven `<iframe>`s or URL-prefilled dialogs.
