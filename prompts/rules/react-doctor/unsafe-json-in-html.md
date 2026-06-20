# `react-doctor/unsafe-json-in-html`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Unescaped JSON in HTML or script sink
- **Severity:** warn
- **Category:** Security
- **Framework:** global

## Recommendation

JSON.stringify does not HTML-escape, so a `</script>` (or `<`) in the data breaks out and becomes XSS. Use an HTML-safe serializer (serialize-javascript, devalue) or escape `<`, `>`, and `&`, or pass data via a JSON `<script type="application/json">` read with JSON.parse.
