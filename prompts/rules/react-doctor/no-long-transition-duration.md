# `react-doctor/no-long-transition-duration`

Keep UI transitions under 1s — 100-150ms for instant feedback, 200-300ms for state changes, 300-500ms for layout changes. Use longer durations only for page-load hero animations

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the longest duration parsed from transitionDuration, animationDuration, transition, or animation exceeds 1000ms. The rule splits comma-separated segments and uses the maximum. False positive: deliberate page-load hero, intro, parallax, or ambient loop animations that are intentionally long.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Trim UI feedback transitions to 100-300ms (200ms is a safe default); layout shifts can go to roughly 500ms. Long durations are only appropriate for one-shot hero or onboarding animations, never repeated micro-interactions like hovers. See https://www.nngroup.com/articles/response-times-3-important-limits/
