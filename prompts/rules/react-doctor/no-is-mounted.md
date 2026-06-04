# `react-doctor/no-is-mounted`



- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-is-mounted.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on this.isMounted() calls inside React class components (React.Component subclasses and createReactClass factories). The legacy isMounted() API was removed and is universally treated as an anti-pattern — it was used to silence "Can't call setState on an unmounted component" warnings while masking real subscription/listener leaks. The rule is scoped to React class bodies, so an unrelated class with its own isMounted method is not a false positive.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Cancel the async work instead of guarding setState: use an AbortController for fetch, unsubscribe in componentWillUnmount, or return a cleanup function from useEffect. If you must track mount state, set this._isMounted in componentDidMount and clear it in componentWillUnmount as a temporary shim until you migrate the class to a function component with hooks. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-is-mounted.html
