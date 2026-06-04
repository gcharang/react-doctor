# `react-doctor/rerender-transitions-scroll`

Wrap the setState in startTransition (mark as non-urgent), use useDeferredValue, or stash in a ref + rAF throttle so scroll/pointer events don't trigger a re-render per fire

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an addEventListener call where the event name is the literal 'scroll', 'mousemove', 'wheel', 'pointermove', 'touchmove', or 'drag', and the handler is an inline arrow / function expression containing a setter call matching /^set[A-Z]/ that is NOT already nested inside startTransition, requestAnimationFrame, or requestIdleCallback.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap the setter in startTransition(() => setX(...)) to mark it non-urgent so React can interrupt for input, use useDeferredValue(value) downstream, or stash the latest value in a ref and commit once per frame via requestAnimationFrame. Usually startTransition alone is enough. See https://react.dev/reference/react/startTransition
