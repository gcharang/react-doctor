# `react-doctor/insecure-session-cookie`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Auth cookie missing HttpOnly protection
- **Severity:** warn
- **Category:** Security
- **Framework:** global

## Recommendation

Set auth/session cookies server-side with `httpOnly: true`, `secure: true`, and `sameSite`. Cookies set via `document.cookie` or with `httpOnly: false` are readable by any XSS payload and can be stolen.
