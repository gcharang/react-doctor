# `react-doctor/design-no-em-dash-in-jsx-text`

Replace em dashes in JSX prose with commas, colons, semicolons, or parentheses so UI copy reads less like generated text.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSXText node literally contains the em-dash character — (U+2014). The rule walks up the ancestor chain and skips text inside <code>, <pre>, <kbd>, <samp>, <var>, <tt>, or any element with translate="no". Dynamic strings inside {expression} containers aren't inspected, so interpolated copy escapes the check.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace — with a comma, colon, semicolon, parentheses, or a plain hyphen for ranges. Em dashes scream LLM output in product copy; tightening the sentence almost always improves it. Reserve em dashes for long-form editorial content where you've audited the voice. https://practicaltypography.com/hyphens-and-dashes.html
