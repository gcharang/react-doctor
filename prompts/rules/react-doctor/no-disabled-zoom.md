# `react-doctor/no-disabled-zoom`

Remove `user-scalable=no` and `maximum-scale` from the viewport meta tag. If your layout breaks at 200% zoom, fix the layout — don't punish users with disabilities

- **Category:** Accessibility
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the flagged JSX is a meta element with name='viewport' whose content string literal contains user-scalable=no or maximum-scale set below 2. This is a hard WCAG 1.4.4 violation; legitimate exceptions are essentially limited to dedicated kiosk apps, so treat the diagnostic as a true positive.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove user-scalable=no entirely, and either drop maximum-scale or set it to 5. The standard tag is content='width=device-width, initial-scale=1'. If the layout breaks at 200% zoom, fix the responsive CSS rather than blocking zoom. See https://www.w3.org/WAI/WCAG21/Understanding/resize-text
