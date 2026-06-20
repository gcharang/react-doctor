# `react-doctor/request-body-mass-assignment`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Request input spread without field allowlist
- **Severity:** warn
- **Category:** Security
- **Framework:** global

## Recommendation

Assign explicit, allowlisted fields (or validate with a strict schema and no `.passthrough()`) instead of spreading/merging request input. Otherwise the client can set ownership, role, or price columns (mass assignment) or pollute the prototype.
