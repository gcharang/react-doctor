# `react-doctor/no-chain-state-updates`

Disallow chaining state changes in an effect.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** eslint-plugin-react-you-might-not-need-an-effect
- **Framework:** global
- **Enabled when:** eslint-plugin-react-you-might-not-need-an-effect installed in project
- **Documentation:** <https://react.dev/learn/you-might-not-need-an-effect#chains-of-computations>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a cleanup-less useEffect whose deps include state AND that synchronously calls another state setter where the setter's arguments are NOT themselves derived from state — i.e. setting state A in a handler triggers an effect that sets state B from unrelated data. False positive: the effect legitimately synchronizes an external system, but those usually return a cleanup function (which the rule already excludes).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Compute both values at the call site that updates the upstream state (the click/submit handler) and call both setters back-to-back so React batches them into a single render. For purely derived values (B is always f(A)), drop the second useState entirely and compute during render or with useMemo. Chains force one extra render per link, cascading into observable jank. See https://react.dev/learn/you-might-not-need-an-effect#chains-of-computations
