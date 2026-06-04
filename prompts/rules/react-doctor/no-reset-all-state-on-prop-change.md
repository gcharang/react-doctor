# `react-doctor/no-reset-all-state-on-prop-change`

Disallow resetting all state in an effect when a prop changes.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** eslint-plugin-react-you-might-not-need-an-effect
- **Framework:** global
- **Enabled when:** eslint-plugin-react-you-might-not-need-an-effect installed in project
- **Documentation:** <https://react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a useEffect resets every useState in the component back to its initial value (the rule counts useState declarations and requires the setter calls to match that count exactly, with each set to the original initial value) in response to a prop in the deps array. Custom hooks are explicitly skipped. False positive: rare — the recommended key-prop fix works in virtually all component shapes.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist the discriminator one level up and remount via key: <UserProfile key={userId} {...rest} />. React unmounts the previous subtree and mounts a fresh one, resetting all state automatically with no setter calls and no wasted render. The rule's error message already names which prop is the candidate for the key. See https://react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes
