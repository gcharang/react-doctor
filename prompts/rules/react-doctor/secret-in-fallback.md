# `react-doctor/secret-in-fallback`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Hardcoded secret fallback for env var
- **Severity:** error
- **Category:** Security
- **Framework:** global

## Recommendation

Remove the literal fallback and fail closed (throw when the variable is unset). The hardcoded value is a committed secret, and the `??`/`||` default makes the app run with it in any environment that forgot to set the var.
