# `react-doctor/no-set-state-in-render`

Move the setter call into a `useEffect`, an event handler, or replace the state with a value computed during render. Calling a setter at render time triggers another render, which calls the setter again — an infinite loop

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only on a setX(...) call written as an UNCONDITIONAL top-level ExpressionStatement directly inside the component body, where setX is the setter from a useState binding in the same component. Calls nested inside an if, loop, try-catch, event handler, or useEffect are intentionally skipped to avoid false-positiving the canonical derive-state-from-props pattern.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Guard the setter when deriving from props (if (prevProp !== prop) setPrev(prop)), move it into a useEffect for genuine side effects, or — best — drop the state entirely and compute the value during render. Unconditional setters at render time cause an infinite re-render loop with the maximum-update-depth error. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state
