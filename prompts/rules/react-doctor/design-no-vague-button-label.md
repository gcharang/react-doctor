# `react-doctor/design-no-vague-button-label`

Name the action: "Save changes" instead of "Continue", "Send invite" instead of "Submit", "Delete account" instead of "OK". The label IS the button's accessible name

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on <button> or <Button> elements whose entire visible label is a STATIC string (JSXText, string literal, or single-quasi template — no interpolation, no nested elements) that, after lowercasing and stripping trailing .!?…, matches one of: continue, submit, ok, okay, click here, here, yes, no, go, done. Buttons with icons or interpolated children are intentionally skipped.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Name the action that will happen: Save changes (not Submit), Send invite (not Continue), Delete account (not OK), Got it (not OK). The visible label IS the accessible name read by screen readers — generic verbs strand both sighted and assistive users mid-decision. https://www.nngroup.com/articles/ui-copy/
