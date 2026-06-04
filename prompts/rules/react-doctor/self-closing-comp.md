# `react-doctor/self-closing-comp`

Use the self-closing form `<X />` for elements with no children.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/self-closing-comp>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXElement that carries an explicit closing tag yet has no real children — either zero children or a single JSXText child that is whitespace containing a newline (`<X>\n</X>`) — meaning `<X />` would render identically. Custom components (PascalCase, member like `Foo.Bar`, or namespaced) and lowercase HTML tags are both flagged, but the `component` and `html` settings can independently silence either group. False positive / non-trigger to watch: single-line whitespace with no newline (`<X> </X>`), an expression child like `<div>{' '}</div>`, and entity children like `<div> </div>` are all intentionally left alone — only flag when the element is genuinely childless.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Collapse the empty element to its self-closing form, dropping the redundant closing tag: rewrite `<Hello name="John"></Hello>` (or the multi-line `<div className="content">\n</div>`) as `<Hello name="John" />` and `<div className="content" />`. This is a purely stylistic equivalence — behavior and output are unchanged, so it is safe to apply mechanically. If a single space is intentional content, use `<X> </X>` (no newline) or `<X>{' '}</X>`, which the rule already permits. See https://oxc.rs/docs/guide/usage/linter/rules/react/self-closing-comp
