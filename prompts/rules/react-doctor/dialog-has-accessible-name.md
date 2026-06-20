# `react-doctor/dialog-has-accessible-name`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Dialog without accessible name
- **Severity:** warn
- **Category:** Accessibility
- **Framework:** global

## Recommendation

Give every `<dialog>` / `role="dialog"` an accessible name with `aria-label` or `aria-labelledby` (referencing the dialog's title element).
