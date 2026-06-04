# `react-doctor/no-children-prop`



- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-children-prop.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when children is passed as an explicit JSX attribute (<Wrapper children={<Inner />} />) or as a key inside React.createElement's props object. Both forms are equivalent to nested JSX but less idiomatic. False positive: legacy render-prop APIs like React Router 5's <Route children={(routeProps) => ...}> or Apollo's <Query children={({ data }) => ...}> deliberately pass a function via the children attribute.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the value between the opening and closing tags: <Wrapper><Inner /></Wrapper>, or pass siblings (<Wrapper><Header /><Body /></Wrapper>). For React.createElement, pass children as positional arguments: createElement("div", {}, "Hi") or createElement("ul", {}, item1, item2). See https://oxc.rs/docs/guide/usage/linter/rules/react/no-children-prop.html and https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
