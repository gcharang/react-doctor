# `react-doctor/display-name`

Give each component a stable displayName so React DevTools shows a real name instead of "Unknown".

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/display-name>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on components React DevTools can't name: an anonymous function/arrow returning JSX that is assigned to module.exports, returned from a HoC, nested in another arrow, or default-exported; an anonymous class component lacking a static displayName; createReactClass/createClass configs with no displayName key; memo()/forwardRef()/observer() wrapping an anonymous function; and createContext() (only when checkContextObjects is on). A PascalCase variable/property binding is treated as an inferable name and skipped, and a `Comp.displayName = '...'` assignment anywhere in the file suppresses it. False positive: an anonymous HoC-wrapped component whose displayName is attached in a different module, which the single-file static scan cannot see.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Give the component an inferable name or an explicit displayName. Prefer a named declaration over an anonymous one — `const Hello = React.memo(function Hello() { ... })` rather than `React.memo(() => ...)` — or assign one after the wrapper: `const Hello = React.forwardRef((props, ref) => <main ref={ref} />); Hello.displayName = 'Hello';`. For class components add `static displayName = 'Hello';`, and for createReactClass add a `displayName: 'Hello'` property in the config object. See https://oxc.rs/docs/guide/usage/linter/rules/react/display-name
