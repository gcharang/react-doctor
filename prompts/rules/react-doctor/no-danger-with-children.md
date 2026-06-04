# `react-doctor/no-danger-with-children`

Use either children or dangerouslySetInnerHTML on an element, never both.

- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger-with-children>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when one element or createElement call has BOTH dangerouslySetInnerHTML and children — children being nested JSX content, a children prop, or positional createElement args — since React throws a runtime warning and the innerHTML wins, silently dropping the children. The check resolves spread props and createElement prop objects (including a variable's static initializer) to see merged dangerouslySetInnerHTML/children. Whitespace-only JSXText containing a newline is treated as auto-format indentation and does NOT count as a child, but a space-only child with no newline (<Hello> </Hello>) DOES fire. Limitation (under-reports): a spread or props object whose source cannot be statically resolved — e.g. a variable lacking an initializer, a self-referential or already-visited symbol, or any non-object expression — is treated as empty, so a real conflict hidden behind that spread is silently missed rather than reported.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pick one rendering path. If the markup is the real content, drop dangerouslySetInnerHTML and render the children normally: <div>{content}</div>. If you genuinely need raw HTML, remove the children/children prop so only the danger prop remains: <div dangerouslySetInnerHTML={{ __html: sanitized }} />. For createElement, pass the conflicting value either as the children argument or inside props — never both. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger-with-children
