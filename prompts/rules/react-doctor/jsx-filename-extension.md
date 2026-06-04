# `react-doctor/jsx-filename-extension`

Use .jsx / .tsx (or your project's chosen extension) for files containing JSX.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-filename-extension>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSXElement or JSXFragment appears in a file whose extension is not in the allowed set (default `.jsx`, `.tsx`), reporting once per file on the first JSX node. In `allow: "as-needed"` mode it additionally fires on an allowed-extension file that contains zero JSX — unless `ignoreFilesWithoutCode` is set and the file has no non-comment statements. False positive: this is a pure filename-convention check, so JSX in a `.js` file is flagged even though setups like Next.js and Create React App compile JSX in `.js` out of the box — suppress when the project intentionally allows JSX in that extension. (Note: Vite/esbuild is NOT such a setup — it errors on JSX in `.js` by default and effectively agrees with this rule.)

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rename the file to an allowed JSX extension so its contents match its name — e.g. `Button.js` -> `Button.tsx` (or `.jsx` for plain JS), updating any imports that reference the old path. If your toolchain intentionally permits JSX in `.js`/`.ts`, instead add that extension under this port's setting `settings["react-doctor"].jsxFilenameExtension.extensions` (e.g. `extensions: ["js", "jsx", "tsx"]`) rather than renaming. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-filename-extension
