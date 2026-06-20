# `react-doctor/jwt-insecure-verification`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** JWT verified with the 'none' algorithm
- **Severity:** error
- **Category:** Security
- **Framework:** global

## Recommendation

Never accept the `none` algorithm; it disables signature verification and lets any forged token through. Pin the real algorithm(s) explicitly (`jwt.verify(token, key, { algorithms: ['RS256'] })`).
