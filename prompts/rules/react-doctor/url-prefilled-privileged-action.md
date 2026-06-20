# `react-doctor/url-prefilled-privileged-action`

Reading a privileged action from the URL (invite, role, permission, redirect, sharing) and acting on it lets an attacker craft a link that performs that action for a victim.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** client (browser-bundled) production source files; server dirs (api/backend/server/middleware/route/functions/lambdas/workers, *.server.*) skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in client code that reads a privileged action parameter from the URL: `searchParams`/`useSearchParams()`/`new URLSearchParams(...)` `.get(...)`/`.getAll(...)` (or `searchParams.<name>`) for one of `userstoinvite`, `role`, `permission`, `sharingaction`, `invite`, `admin`, `next`, `continue`, `returnTo`, `redirect_uri`, or `callbackUrl`. Reads already wrapped in a validating helper (`safe*`/`valid*`/`sanitiz*`/`relativ*`/`allowlist*`/`whitelist*`(...)) are skipped, and benign `email`/`user` params are deliberately not matched. FALSE POSITIVE: the value is used only for display/prefill while the actual privileged action is independently authorized and confirmed server-side, or it is immediately validated by a helper whose name the lookbehind did not recognize.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Treat URL-sourced invite, role, permission, redirect, and sharing values as untrusted: never auto-run the action from the query string. Require an explicit user confirmation and re-authorize on the server before applying it. For `next`/`returnTo`/`redirect_uri`/`callbackUrl`, accept only same-origin relative paths (or an exact allowlist) to prevent open redirects, and check `role`/`permission`/`invite` against the actor's real entitlements server-side, not the URL.
