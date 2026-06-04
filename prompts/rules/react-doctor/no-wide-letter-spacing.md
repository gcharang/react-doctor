# `react-doctor/no-wide-letter-spacing`

Reserve wide tracking (letter-spacing > 0.05em) for short uppercase labels, navigation items, and buttons — not body text

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm style.letterSpacing is greater than 0.05em AND the element does NOT have textTransform: 'uppercase'. The rule normalizes bare numbers and Npx to em assuming a 16px base. False positive: stylized hero brand-mark text where wide tracking is part of the established typographic system.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove letterSpacing (typefaces ship with optimal tracking) or pair wide tracking with textTransform: 'uppercase' on short labels, nav items, and pill buttons. For display sizes, slightly negative tracking often reads tighter and more polished than positive tracking. See https://practicaltypography.com/letterspacing.html
