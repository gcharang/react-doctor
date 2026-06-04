# `react-doctor/rendering-animate-svg-wrapper`

Wrap the SVG: `<motion.div animate={...}><svg>...</svg></motion.div>`

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the JSX element is literally <svg> (lowercase tag) and has a framer-motion animation prop: animate, initial, exit, whileHover, whileTap, whileFocus, whileDrag, or whileInView. Animating the <svg> element directly forces full re-rasterization each frame instead of compositing a promoted layer.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the animation props onto a wrapper element: <motion.div animate={...}><svg>...</svg></motion.div>. The div is promoted to its own GPU layer and translated/scaled on the compositor without re-rasterizing the SVG paths. See https://motion.dev/docs/react-motion-component
