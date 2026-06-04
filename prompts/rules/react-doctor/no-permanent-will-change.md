# `react-doctor/no-permanent-will-change`

Add will-change on animation start (`onMouseEnter`) and remove on end (`onAnimationEnd`). Permanent promotion wastes GPU memory and can degrade performance

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a JSX style attribute with an object expression containing a willChange key. The rule flags ANY static willChange value regardless of the actual property listed — the issue is keeping it set permanently rather than scoping it to active animation.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Toggle will-change imperatively: set it on onMouseEnter or animation start, then clear it on onMouseLeave / onAnimationEnd / onTransitionEnd (element.style.willChange = ''). For pure CSS hovers, scope it inside the :hover selector so the hint only exists while hovered. See https://developer.mozilla.org/en-US/docs/Web/CSS/will-change#using_will-change_responsibly
