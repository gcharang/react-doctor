# `react-doctor/jsx-no-comment-textnodes`

Wrap JSX comments in `{/* … */}` so they're parsed as comments, not rendered as literal child text.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-comment-textnodes>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXText child node when any of its lines, after trimming whitespace, starts with `//` or `/*` — these are not comments, they render as visible literal text (e.g. `<div>// empty div</div>` or `<div>/* todo */</div>`). Text inside `<code>`, `<pre>`, `<kbd>`, `<samp>`, and `<tt>` is already excluded since those tags render literal text verbatim. False positive: comment-like prose that is genuinely meant to display, such as a `<span>` showing a syntax-highlighted `//` token or an entity-encoded snippet outside the literal-text tags — confirm only when the author clearly intended a comment, not on-screen text.

## Fix prompt

Use this once validation confirms the diagnostic is real.

If the text was meant to be a JSX comment, wrap it in braces so the parser treats it as a comment instead of a child: change `<div>// empty div</div>` to `<div>{/* empty div */}</div>`. If the `//` or `/*` is intended to be shown on screen, move it into an expression container as a string (`<div>{'// shown literally'}</div>`) or place it inside a literal-text tag like `<code>`/`<pre>`. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-comment-textnodes
