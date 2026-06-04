# `react-doctor/button-has-type`

Set type="button" (or "submit"/"reset") explicitly on every <button> so it never defaults to submit.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/button-has-type>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a `<button>` (or `React.createElement("button", …)`) that has no `type`, has bare `type` shorthand (= `type={true}`), or whose `type` cannot be statically proven to be one of the enabled values button/submit/reset — covering `type="foo"`, `type={foo}` identifiers, dynamic template literals like `type={`button${x}`}`, and conditionals where any branch isn't a proven-valid literal. Test/Storybook-like filenames are skipped entirely, and disabling an option (e.g. `reset:false`) makes that value fire. False positive: this isn't one — consumer prop-forwarding wrappers (`type={type}`, `type={props.type}`, `type={type ?? "button"}`) are deliberately NOT flagged because the diagnostic is meant to fire at the consumer's literal call site, so don't suppress those expecting the rule; do confirm any concrete non-allowed or missing literal.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add an explicit, statically valid `type` to the button: `<button type="button">` for ordinary click handlers, `type="submit"` only for the form's primary submit, or `type="reset"`. For dynamic values, ensure every branch resolves to a literal in the allowed set (`type={primary ? "submit" : "button"}`) rather than an identifier or interpolated template, and apply the same to `React.createElement("button", { type: "button" })`. See https://oxc.rs/docs/guide/usage/linter/rules/react/button-has-type
