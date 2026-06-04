# `react-doctor/no-dynamic-import-path`

Use a string-literal path: `import('./feature/heavy.js')` so the bundler can split this chunk

- **Category:** Bundle Size
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an ImportExpression whose source is neither a string Literal nor a zero-expression TemplateLiteral, OR a require() CallExpression whose first argument has the same property. The rule fires on variables, string concatenation, and interpolated templates like ./locales/${lang} that webpack, Rollup, and esbuild cannot statically trace into a separate chunk.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the computed path with a literal — typically a switch or object map of every known value to its own import("./locales/en.js") call, or webpack's magic-comment form import(/* webpackChunkName: "locales" */ `./locales/${lang}.js`) where the variable part is constrained. See https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
