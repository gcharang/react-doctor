# `react-doctor/auth-token-in-web-storage`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Auth token in web storage
- **Severity:** warn
- **Category:** Security
- **Framework:** global

## Recommendation

Don't persist auth tokens (JWTs, access/refresh tokens, secrets) in `localStorage`/`sessionStorage`; they're readable by any XSS. Use an `HttpOnly` cookie set by the server.
