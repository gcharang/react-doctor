# `react-doctor/no-event-trigger-state`

Delete the trigger state (`useState(null)` plus the `useEffect` that watches it) and call the side-effect (`post(...)` / `navigate(...)` / `track(...)`) directly inside the event handler that previously called the setter. State should not exist purely to schedule effect runs

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a useState X has setters called ONLY from JSX event handlers AND X isn't read during render AND there's a useEffect([X]) whose body is one IfStatement guarding on X (truthy, !== null/undefined, === Literal, .length, or !) whose consequent invokes an event-shaped side effect (post, navigate, track, toast, push/replace on a router-shaped receiver — EVENT_TRIGGERED_SIDE_EFFECT_CALLEES / MEMBER_METHODS). False positive: a debounce/coalesce pattern that intentionally batches rapid events through state into a single effect run.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete both the trigger state (useState(null)) and the watching useEffect, then call the side effect — post(payload), navigate(...), track(...) — directly inside the JSX event handler that previously called the setter. State should only exist to drive the UI tree, not to schedule effects. See https://react.dev/learn/you-might-not-need-an-effect#sending-a-post-request
