# `react-doctor/no-document-write`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** document.write/writeln
- **Severity:** warn
- **Category:** Performance
- **Framework:** global

## Recommendation

Don't use `document.write()`/`document.writeln()`. Append DOM nodes or set `innerHTML`/`textContent` on a specific element instead.
