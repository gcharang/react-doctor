# `react-doctor/forward-ref-uses-ref`

Either accept a `ref` parameter in the forwardRef render function, or drop the forwardRef wrapper entirely.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/forward-ref-uses-ref>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a forwardRef(...) or React.forwardRef(...) call whose first argument is an arrow or function expression with exactly one parameter — i.e. a render function that takes props but never the ref, making the forwardRef wrapper a no-op. Arity-0 functions, two-parameter (props, ref) functions, and a sole rest parameter (...args) are all deliberately exempt and won't fire. False positive: the callee is matched by name only, so a locally defined helper unrelated to React that happens to be named forwardRef can be flagged even though no actual ref forwarding is intended.

## Fix prompt

Use this once validation confirms the diagnostic is real.

If the component genuinely needs to forward a ref, add the second parameter so the wrapper does something: forwardRef((props, ref) => <input ref={ref} {...props} />). If it never uses a ref, delete the forwardRef wrapper and export the plain component: function MyInput(props) { ... }. Note that in React 19+ ref is a regular prop, so forwardRef is no longer needed for new components. See https://oxc.rs/docs/guide/usage/linter/rules/react/forward-ref-uses-ref
