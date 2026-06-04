# `react-doctor/design-no-space-on-flex-children`

Use `gap-*` on the flex/grid parent. `space-x-*` / `space-y-*` produce phantom gaps when a sibling is conditionally rendered, lose vertical spacing on wrapped lines, and don't mirror in RTL

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when ONE className contains both a flex/grid display token (flex, inline-flex, grid, inline-grid — variant prefixes like md:flex are honored by stripping to the last segment) AND a space-x-N or space-y-N token. The rule does NOT flag space-* on plain block containers, even though gap is preferable there too.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace space-x-N with gap-x-N and space-y-N with gap-y-N on the parent — keep the axis suffix (bare gap-N adds the other direction silently). gap survives conditional siblings without phantom margins, mirrors correctly in RTL, and handles flex-wrap rows. https://tailwindcss.com/docs/gap
