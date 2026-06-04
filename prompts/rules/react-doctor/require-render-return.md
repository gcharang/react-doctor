# `react-doctor/require-render-return`



- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/require-render-return.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a render() method whose body lacks a return statement, inside React class components (React.Component subclasses and createReactClass factories) — typically a slipped brace style like render() { <div>Hello</div>; } that returns undefined and renders nothing. Function components are out of scope. The rule is scoped to React class bodies, so an unrelated class with a render() method that intentionally returns undefined is not a false positive.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add the missing return: render() { return <div>Hello</div>; }. For an arrow component using implicit return, drop the surrounding braces: () => <div>Hello</div>. If the JSX is conditional, return null in the no-render branch — React treats null as "render nothing" but treats a missing return (undefined) as a programming mistake. See https://oxc.rs/docs/guide/usage/linter/rules/react/require-render-return.html and https://react.dev/reference/react/Component#render
