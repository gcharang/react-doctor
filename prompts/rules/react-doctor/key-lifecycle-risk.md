# `react-doctor/key-lifecycle-risk`

A private key or release credential committed inline to the repo is exposed in git history and must be rotated and revoked.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** any scanned text/config/secret file except test and documentation/markdown (.md/.mdx) paths

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when the file contains a PEM private-key header (`-----BEGIN [RSA|EC|OPENSSH|DSA ]PRIVATE KEY-----`) followed by a real base64 body of ≥38 chars, or a release-key NAME assigned an inline literal — `SSH_PRIVATE_KEY`/`GPG_PRIVATE_KEY`/`DEPLOY_KEY`/`SIGNING_KEY` set to a `'…'` string of ≥16 chars. FALSE POSITIVE: the PEM header is a placeholder with no/short body, is preceded within ~40 chars by `placeholder`/`example`/`sample`/`dummy`/`fake`, or is a truncated docs sample (a `...` ellipsis appears early in the body) — all excluded — and a key-shaped env NAME that merely references a secret store (no inline literal value) is not flagged, because a name alone is the correct way to point at a secret.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the private key or inline credential from source and purge it from git history (for example `git filter-repo`), then rotate and revoke it now, because the history is already compromised. Load key material at runtime from a secrets manager or CI secret store referenced by name only, prefer short-lived scoped deploy credentials, and document the rotation, expiry, and revocation procedure for any long-lived release or signing key.
