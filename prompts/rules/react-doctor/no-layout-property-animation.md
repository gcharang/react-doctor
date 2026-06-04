# `react-doctor/no-layout-property-animation`

Use `transform: translateX()` or `scale()` instead — they run on the compositor and skip layout/paint

- **Category:** Performance
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSX element whose name is NOT literally 'motion.X', 'm.X', or 'Motion*' has an animate/initial/exit/whileHover/whileTap/whileFocus/whileDrag/whileInView object containing a layout key (width, height, top/left/right/bottom, padding*, margin*, borderWidth, fontSize, lineHeight, gap). The rule matches only on the element's textual NAME, so its dominant FALSE POSITIVE is a real framer-motion element it cannot see: a wrapped motion component such as 'styled(motion.div)' / 'styled(motion.create(...))' (linaria/emotion/styled-components, e.g. names like Wrapper, AnimatedContent, ExpandableContent, StyledFullWidthMotionDiv) or 'const X = motion.create(Base)' / 'motion(Base)'. Trace the JSX tag to its definition: if it resolves to motion, framer-motion owns the animation — SUPPRESS. Second FP, even on a confirmed motion element: an ENTER/EXIT transition (typically inside <AnimatePresence>, or initial+animate+exit) that animates height or width between 0 and the string 'auto'/'unset'/'100%'/'fit-content' — motion measures the target and runs a FLIP, so this is the intended, optimized pattern; SUPPRESS. CONFIRM only when it is genuinely a non-motion DOM element (plain div/span/li with these props from a non-FLIP lib), OR a motion element animating a layout key to NUMERIC pixel values continuously — keyframe arrays like 'width: [8,12,8]', tween-to-number, or 'repeat: Infinity'/spring loops — which motion cannot composite and which thrash layout every frame.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Principle: the cost is per-FRAME layout recomputation, not animating size per se — so fix by either moving off the layout property OR letting framer-motion's FLIP do the measuring once. Pick by case. (A) Plain numeric size animation that should be visual only (scale/move): animate 'transform' + opacity instead — replace 'animate={{ width: 200 }}' with 'animate={{ scaleX: ... }}' or 'translateX(Npx)' and 'opacity'; these composite on the GPU with zero layout/paint. (B) Continuous/looping numeric size keyframes on a motion element (e.g. a loader doing 'width:[8,12,8], height:[8,2,8]' with 'repeat: Infinity'): this is the real offender — re-express the pulse as 'scaleX/scaleY' keyframes (set 'transformOrigin') or 'translate', NOT width/height, so the repeat runs on the compositor. (C) Genuine enter/exit reveal where the natural size is unknown ('0' -> 'auto'/'fit-content'): do NOT hand-translate to scale (it distorts/clips content) — render it through framer-motion with 'height: auto' inside <AnimatePresence>, or add the 'layout' prop so motion performs a FLIP and only reads layout once at the boundary; CSS alternative is 'grid-template-rows: 0fr -> 1fr' or 'clip-path'. Anti-pattern: do NOT mechanically swap every width/height for scale — scaling an 'auto'-sized reveal squashes its children and breaks text reflow; and do NOT 'fix' a styled(motion)/motion.create element at all — it is already FLIP-optimized, the rule just failed to recognize the name. See https://web.dev/articles/animations-guide#triggers
