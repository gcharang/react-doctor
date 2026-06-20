# `react-doctor/untrusted-redirect-following`

Following a redirect from a request-supplied URL without re-validating each hop lets an attacker bounce your server into internal addresses (server-side request forgery).

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** server route source files only — server-context dirs (api/backend/server/functions/lambdas/workers, *.server.*) plus middleware.* and route.* entrypoints

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in server route code on an outbound `fetch(url …)` (bare `fetch`, not `this.fetch` or other method fetches), `axios.get/post/put/delete/head(`, `got(`, or `got.get/post(` whose URL argument BOTH is named like caller input (`url`, `targetUrl`, `callbackUrl`, `redirectUrl`, `webhookUrl`, `imageUrl`, `next`, `returnTo`, `destination`, `location`, …) AND is request-sourced — read directly from `req.`/`request.query|body|params|nextUrl`/`searchParams`/`params.`/`body.`/`query.`, or a bare identifier assigned from one of those in the same file — with no `redirect: "manual"` or `redirect: "error"` within 5 lines of the call. FALSE POSITIVE: the URL is validated against a host allowlist before the fetch, or its target is actually a trusted constant the name only resembles caller input; since the default mode silently follows redirects to a new origin, prefer manual mode even then.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Set `redirect: "manual"` (fetch) or `maxRedirects: 0` / `followRedirect: false` (axios/got) and re-validate the `Location` of every hop against a strict host allowlist before following it. Resolve the final host, reject private and link-local IP ranges, and only then make the follow-up request. Never pass raw request input into an auto-following fetch.
