# `react-doctor/jsx-curly-brace-presence`

Pick a consistent quoting style for JSX literal values and drop redundant curly braces around plain strings.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-curly-brace-presence>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

With the default modes (props "never", children "never", propElementValues "ignore"), fires when a JSX attribute or child wraps a plain string literal or single-quasi template in curly braces that add nothing — e.g. prop={'bar'} or <App>{'foo'}</App> — and also flags element/fragment children like <App>{<myApp/>}</App>. It stays silent for whitespace-only braces, line breaks, HTML entities (·), \u escapes, /* */ comments, sibling-adjacent containers, and script-tag children; for children it also ignores strings containing <>{}\ that JSX text cannot hold, plus any single template-literal child carrying a quote, while for props it instead ignores values mixing both quote types. Note the asymmetry: props with <>{}\ DO fire (e.g. <Box mb={'1rem {}'} /> and prop={"< style: true >"}), and children with both quote types DO fire (e.g. <App>{'foo "bar"'}</App>). False positive: a brace-wrapped literal kept intentionally for readability or to sit beside an adjacent {expr} sibling — confirm the surrounding children before suppressing, since this is a stylistic preference, not a bug.

## Fix prompt

Use this once validation confirms the diagnostic is real.

In "never" mode, strip the redundant braces and quotes: change prop={'bar'} to prop="bar" and <App>{'foo'}</App> to <App>foo</App>; for a wrapped element use <App><myApp/></App>. Leave braces in place for whitespace-only content, line breaks, HTML entities, \u escapes, comments, or sibling-adjacent containers; for children also keep them when the text holds <>{}\ characters, and for props keep them when the value mixes both quote types. In "always" mode, do the inverse and wrap the literal in { }. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-curly-brace-presence
