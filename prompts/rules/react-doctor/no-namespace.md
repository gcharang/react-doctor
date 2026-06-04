# `react-doctor/no-namespace`

Drop the namespace and use a plain (Pascal-cased) component or DOM tag.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-namespace>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on JSX elements whose tag is a namespaced name with a colon separator (`<ns:Foo />`), and on `React.createElement` calls whose first argument is a string literal containing a colon (`React.createElement("ns:foo")`) — React supports neither and treats them as runtime errors. Member-expression tags using a dot (`<Object.TestComponent />`, `React.createElement("object.test")`) are intentionally NOT flagged, and `createElement` with a non-string-literal first arg (a variable, null, boolean, or object) is never inspected. False positive: the createElement check is purely static, so a colon-bearing type passed through a variable rather than an inline string literal slips past it — and conversely, an inline literal like `React.createElement("data:image")` is flagged even when no JSX is involved.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the namespace prefix and reference the component or DOM tag directly: rewrite `<ns:Foo />` as `<Foo />` and `React.createElement("ns:foo")` as `React.createElement("foo")` (or a Pascal-cased component reference). If you need to render a true XML namespace like SVG, use the standard JSX tag React maps for you (`<circle />` inside `<svg>`), not the `svg:` prefix. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-namespace
