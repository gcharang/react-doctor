# `react-doctor/client-passive-event-listeners`

Add `{ passive: true }` as the third argument: `addEventListener('scroll', handler, { passive: true })`. Only do this if the handler does NOT call `event.preventDefault()` — passive listeners silently ignore `preventDefault()`, which breaks features like pull-to-refresh suppression, custom gestures, and nested-scroll containment.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an addEventListener call whose first string-literal argument is one of scroll, wheel, touchstart, touchmove, or touchend AND whose third options argument is missing or an ObjectExpression without passive: true. False positive: the handler intentionally calls event.preventDefault() to block pull-to-refresh, implement a custom gesture, or contain a nested scroll container.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pass { passive: true } as the third argument so the browser can scroll without waiting for the handler to return. If the handler must call preventDefault(), leave the option off (or set passive: false explicitly) since passive listeners silently ignore preventDefault. See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners
