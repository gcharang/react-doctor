# `react-doctor/no-effect-chain`

Compute as much as possible during render (e.g. `const isGameOver = round > 5`) and write all related state inside the event handler that originally fires the chain. Each effect link adds an extra render and makes the code rigid as requirements evolve

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a useEffect B whose deps include a state X synchronously set by another sibling useEffect A in the same component, where neither effect is 'external sync' — neither returns a function-shaped cleanup nor calls fetch / setInterval / observer constructors / assigns to a ref's .current. Setters nested inside .then or setTimeout do NOT count toward A's writes. False positive: a deliberate two-phase state machine where the next phase must wait for a render commit (rare).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Compute as much as possible during render (const isGameOver = round > 5) and move ALL related state writes into the one event handler that originally fires the chain — a single useReducer dispatch can set every chained value at once. Reserve useEffect for synchronizing with truly external systems. See https://react.dev/learn/you-might-not-need-an-effect#chains-of-computations
