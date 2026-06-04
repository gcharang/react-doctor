# `react-doctor/no-pass-live-state-to-parent`

Disallow passing live state to parents in an effect.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** eslint-plugin-react-you-might-not-need-an-effect
- **Framework:** global
- **Enabled when:** eslint-plugin-react-you-might-not-need-an-effect installed in project
- **Documentation:** <https://react.dev/learn/you-might-not-need-an-effect#notifying-parent-components-about-state-changes>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a useEffect that synchronously calls a prop function with state in its arguments (useEffect(() => onChange(value), [value])) — the 'notify parent whenever my state changes' anti-pattern. False positive: rare; the standard lifting-state-up refactor applies almost universally. Custom hooks use a separate message that suggests returning the value from the hook rather than forwarding.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Lift the state to the parent (useState there) and pass it down plus a setter callback — single source of truth, zero extra renders, no stale-callback surprises. If the logic must stay in a custom hook, return the value from the hook so the caller drives the parent's state directly: const { value } = useThing(); <Parent value={value} />. See https://react.dev/learn/you-might-not-need-an-effect#notifying-parent-components-about-state-changes
