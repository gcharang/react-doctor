# `react-doctor/forbid-elements`

Replace each configured forbidden element with its sanctioned component or wrapper.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-elements>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only when the `forbidElements.forbid` setting is non-empty, then reports any JSX opening element whose flattened name (e.g. `button`, `Modal`, `dotted.Component`) is in that list, plus matching `React.createElement(...)` / bare `createElement(...)` calls whose first argument resolves to a forbidden name. createElement string args only match if they look like a real DOM tag — lowercase first char and no dots — while identifier args match only when PascalCase or leading-underscore, and member expressions match by flattened name. False positive: it cannot tell apart two distinct things sharing a name, so a forbidden `button` entry also flags a legitimate local component or third-party export that happens to be named identically.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Swap the forbidden element for the sanctioned replacement named in the finding's message, e.g. replace `<button>` with your design-system `<Button>` (and likewise rewrite `React.createElement("button", ...)` to `React.createElement(Button, ...)`). If a flagged usage is a genuine, intentional exception, remove that entry from the `forbidElements.forbid` setting or add an inline disable with a written justification rather than suppressing project-wide. See https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-elements
