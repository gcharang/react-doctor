# `react-doctor/no-distracting-elements`



- **Category:** Accessibility
- **Severity:** error
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-distracting-elements>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on <marquee> or <blink> JSX elements — both are deprecated, visually distracting, and can trigger seizures or vestibular issues. The element list is hardcoded; you cannot extend it. False positives are essentially nonexistent in modern code: neither element appears in any current HTML spec or browser implementation, so any usage is almost certainly an oversight.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the <marquee> or <blink> element and rebuild the effect with CSS @keyframes inside a @media (prefers-reduced-motion: no-preference) block so users who opt out of motion don't see the animation. For non-essential ambient motion, prefer no animation at all. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-distracting-elements
