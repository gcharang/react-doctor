# `react-doctor/git-provider-url-injection-risk`

Interpolating request input into a Git provider URL without encoding lets an attacker inject extra path segments or parameters and redirect the request.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx, etc.); test/build/doc/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a literal Git-provider host (`api.github.com`, `github.com`, `gitlab.com`, or `bitbucket.org`) appears and, within the next ~200 chars up to the template's closing backtick, a `${…}` interpolation reads request-shaped input — a member access on `params`/`searchParams`/`query`/`req`/`request`/`input`/`payload`, or the markers `untrusted`/`decodeURI…` — that is NOT wrapped in `encodeURIComponent(`. Only the first matching host is reported. FALSE POSITIVE: the interpolated value is an internal constant or config (a commit SHA, version string, or a bare `owner`/`repo`/`slug`/`branch` identifier) rather than external input — those are deliberately not matched — or the segment is already `encodeURIComponent(...)`-wrapped, which suppresses the finding.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Validate each path component (owner, repo, org, branch) against a strict slug allowlist (letters, digits, `-`, `_`, `.`) and reject anything else before building the URL. Encode every interpolated segment with `encodeURIComponent`, or build the URL with the `URL`/`URLSearchParams` API (or the provider SDK) instead of raw template strings, so input cannot add path segments, `..`, or query parameters.
