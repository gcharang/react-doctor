# `react-doctor/no-string-false-on-boolean-attribute`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** String true/false on a boolean attribute
- **Severity:** warn
- **Category:** Bugs
- **Framework:** global

## Recommendation

Use the boolean form on boolean attributes: `disabled` / `disabled={true}` / `disabled={false}`, not `disabled="false"`. A non-empty string is truthy, so `="false"` actually turns the attribute ON.
