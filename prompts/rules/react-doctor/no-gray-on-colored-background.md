# `react-doctor/no-gray-on-colored-background`

Use a darker shade of the background color for text, or white/near-white for contrast. Gray text on colored backgrounds looks washed out

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the className contains a gray-family text utility (text-gray|slate|zinc|neutral|stone-NNN) AND a chromatic background utility such as bg-blue-500. False positive: pale tints like bg-blue-50 paired with a dark text-slate-900 often still pass WCAG contrast — verify the computed ratio before fixing.

## Fix prompt

Use this once validation confirms the diagnostic is real.

On saturated backgrounds switch to text-white or text-{bg-color}-50 for legibility; on pale tints use text-{bg-color}-900 instead. Verify the result meets a 4.5:1 contrast ratio for normal text (3:1 for large text). See https://webaim.org/articles/contrast/
