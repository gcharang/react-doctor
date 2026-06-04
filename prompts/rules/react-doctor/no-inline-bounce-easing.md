# `react-doctor/no-inline-bounce-easing`

Use `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for natural deceleration — objects in the real world don't bounce

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the inline style uses a cubic-bezier whose Y control points fall outside the [-0.1, 1.1] range (i.e. overshoots), or an animation/animationName containing 'bounce', 'elastic', 'wobble', 'jiggle', or 'spring', or the Tailwind utility animate-bounce. Subtle physics-based springs from Framer Motion are an acceptable exception.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Use cubic-bezier(0.16, 1, 0.3, 1) (ease-out-expo) or plain ease-out for natural deceleration. Reserve overshoot bezier curves and animate-bounce for playful illustrations and game UIs — never for default form, toast, or modal feedback. See https://easings.net/
