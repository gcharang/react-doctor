# `react-doctor/no-scale-from-zero`

Use `initial={{ scale: 0.95, opacity: 0 }}` — elements should deflate like a balloon, not vanish into a point

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an initial={{ scale: 0 }} or exit={{ scale: 0 }} attribute on a JSX element (typically framer-motion). The literal value must be exactly 0 — non-zero scales and dynamic expressions are not flagged. scale: 0 makes the element appear from or vanish into a singularity rather than easing smoothly.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Change to initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} (and mirror for exit). Pairing a small-but-visible scale with opacity reads as a balloon inflating/deflating — a natural physical motion the eye can track. See https://motion.dev/docs/react-animation#enter-animations
