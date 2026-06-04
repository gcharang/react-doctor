# `react-doctor/design-no-redundant-size-axes`

Collapse `w-N h-N` to `size-N` (Tailwind v3.4+) when both axes match

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when className contains matching w-N and h-N tokens with identical values (w-10 h-10, w-[12px] h-[12px], negatives included). Fractional widths like w-1/2 don't match because no size-1/2 shorthand exists, and a responsive prefix on either axis suppresses the warning. The rule is tagged requires: tailwind:3.4.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Collapse to size-N (w-10 h-10 → size-10, w-[24px] h-[24px] → size-[24px]). The size-* utility shipped in Tailwind v3.4 and sets width and height in one token, cutting your icon and avatar classes in half. https://tailwindcss.com/docs/size
