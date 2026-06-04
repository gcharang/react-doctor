# `react-doctor/iframe-has-title`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/iframe-has-title>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on <iframe> elements missing a title attribute, or with title set to an empty string, undefined, false, true, or a non-string literal. Frames need a unique descriptive title so assistive tech users can identify and skip embedded content. False positive: spread props like <iframe {...props} /> can forward a title that the static check cannot see — destructure title explicitly.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add a unique, descriptive title that distinguishes this frame from others on the page: <iframe src='...' title='Q3 revenue chart' />. Avoid generic titles like 'iframe', 'frame', or 'content'. aria-hidden does not exempt the frame — still give it a title even if it's decorative. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/iframe-has-title
