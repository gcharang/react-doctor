# `react-doctor/no-unsafe`

Replace UNSAFE_componentWillMount / WillReceiveProps / WillUpdate with their modern lifecycle equivalents.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-unsafe>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a React class component (detected via getParentComponent) or a createReactClass ES5 component defines a method/property named UNSAFE_componentWillMount, UNSAFE_componentWillReceiveProps, or UNSAFE_componentWillUpdate; the non-prefixed aliases (componentWillMount etc.) are only flagged when settings.react-doctor.noUnsafe.checkAliases is true. The prefixed methods are additionally skipped when settings.react.version is below 16.3 (an unknown version is treated as modern and still flagged). False positive boundary: an identically named method on a class that is NOT a React component (e.g. extends Bar, a plain helper class) is correctly NOT flagged — confirm the enclosing class actually extends React.Component / PureComponent or is a createReactClass call before acting.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Migrate each unsafe lifecycle to its async-safe replacement: move side effects from componentWillMount to componentDidMount, derive prop-driven state in static getDerivedStateFromProps(props, state) instead of componentWillReceiveProps, and capture pre-update info in getSnapshotBeforeUpdate / handle it in componentDidUpdate instead of componentWillUpdate. For most components, prefer porting the class to a function component with hooks (useEffect, useState). See https://oxc.rs/docs/guide/usage/linter/rules/react/no-unsafe
