# `react-doctor/no-pure-black-background`

Tint the background slightly toward your brand hue — e.g. `#0a0a0f` or Tailwind's `bg-gray-950`. Pure black looks harsh on modern displays

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the element sets background or backgroundColor to pure black (#000, #000000, rgb(0,0,0), or the keyword black), or uses the Tailwind class bg-black with no opacity modifier — bg-black/50 is explicitly skipped. False positive: an intentional OLED energy-saving mode where pure black is required for battery savings.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Use a near-black tinted toward your brand hue — e.g. #0a0a0f, #0b0c10, or Tailwind's bg-gray-950 / bg-zinc-950. This adds visual depth and reduces the harsh halation that pure black causes around bright text on OLED displays. See https://m2.material.io/design/color/dark-theme.html
