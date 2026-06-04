# `react-doctor/use-lazy-motion`

Use `import { LazyMotion, m } from "framer-motion"` with `domAnimation` features — saves ~30kb

- **Category:** Bundle Size
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an ImportDeclaration from "framer-motion" or "motion/react" that includes a named motion specifier. The rule fires even when you animate a single element because importing motion pulls the full animation graph (~34kb gzipped). False positive: a tiny one-off root animation where the <LazyMotion> provider overhead negates the saving.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Switch to import { LazyMotion, m, domAnimation } from "framer-motion", wrap the tree once in <LazyMotion features={domAnimation}>, and replace <motion.div> usages with <m.div>. Use domMax instead of domAnimation if you need drag, pan, or layout-projection features. See https://motion.dev/docs/react-reduce-bundle-size
