# `react-doctor/no-effect-event-handler`

Move the conditional logic into onClick, onChange, or onSubmit handlers directly

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a useEffect body is a single IfStatement whose test references a prop also listed in the deps, AND the consequent contains an event-shaped side effect — fetch, post, navigate, toast, capture, track, document.classList mutations, etc. The early-return + post-if event-like statements shape also triggers. Prop identity is tracked through the per-component prop-stack. False positive: the prop change really is programmatic (e.g. URL param via routing) rather than user-driven.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the side-effect call out of the useEffect and into the JSX event handler (onClick, onChange, onSubmit) that actually triggers the prop change, so the side effect runs synchronously with the interaction. If the prop comes from a parent, lift the handler up — most 'react to a prop' effects are really 'parent needs to do X on click'. See https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers
