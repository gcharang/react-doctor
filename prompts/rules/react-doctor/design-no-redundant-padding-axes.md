# `react-doctor/design-no-redundant-padding-axes`

Collapse `px-N py-N` to `p-N` when both axes match. Keep them split only when one axis varies at a breakpoint (`py-2 md:py-3`)

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when className contains matching px-N and py-N tokens with identical numeric or arbitrary values (px-4 py-4, or px-[10px] py-[10px], negatives included). Skipped if either axis appears with a responsive variant like md:px-6 — per-breakpoint variation is a legit reason to keep them split. Only static className strings are inspected.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Collapse to p-N (px-4 py-4 → p-4, px-[10px] py-[10px] → p-[10px]). Keep them split only when one axis varies at a breakpoint (py-2 md:py-3) or you need a negative on just one side. https://tailwindcss.com/docs/padding
