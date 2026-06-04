# `react-doctor/rendering-svg-precision`

Truncate path/points/transform decimals to 1–2 digits — sub-pixel precision adds bytes with no visible difference

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule flags the SVG attributes d, points, and transform whose literal string value contains a number with 4 or more decimal digits (regex \d+\.\d{4,}). This catches editor exports like 'M 10.293847 20.847362' that ship sub-pixel precision the user cannot see. False positive: an SVG drawn into a very large viewBox where the extra decimals actually translate to visible pixels.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Round all coordinates and transforms to 1–2 decimals. Run the file through SVGO's cleanupNumericValues plugin with precision: 2 for an automatic fix, or trim manually (10.293847 becomes 10.29). Decimal truncation typically shrinks markup 30–50% with no visible difference. See https://svgo.dev/docs/plugins/cleanupNumericValues/
