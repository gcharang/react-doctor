# `react-doctor/react-compiler-no-manual-memoization`

Delete the React useMemo / useCallback / memo wrapper — React Compiler memoizes it for you.

- **Category:** Architecture
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react.dev/learn/react-compiler>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any CallExpression whose callee resolves to React's useMemo, useCallback, or memo (the only three names in REMOVAL_MESSAGE_BY_REACT_API_NAME) imported from the "react" package — either a named/renamed import (import { useMemo }, or useMemo as memoize), or a non-computed member expression on a React namespace (React.useMemo via default or * as import, an aliased namespace like ReactStuff.useMemo, the canonical React prefix, or a transpiled _react.useMemo with no import declaration). It reports module-scope memo(Component) and nested memo(forwardRef(...)) (outer call only), and one diagnostic per call. False positive to suppress: a useMemo/useCallback/memo that does NOT resolve to react — a locally-declared lookalike, an import from ./local-memo or preact/hooks or lodash.memoize or some-internal-renderer, computed access React["useMemo"](), an uncalled reference (const r = useMemo), an alias that resolves to a non-memo React API (useState as memoize), or an inexact namespace like Reactosaurus.useMemo.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the memoization wrapper and use the bare value, function, or component: replace const v = useMemo(() => expr, [deps]) with const v = expr, replace const fn = useCallback(handler, [deps]) with const fn = handler, and replace export default memo(Component) (or memo(forwardRef(...))) with the unwrapped component, dropping any custom areEqual comparator. React Compiler auto-memoizes every value, function, and component output, so the manual call is redundant noise. Before removing, confirm no react-hooks-js/preserve-manual-memoization case applies (referential identity the compiler cannot safely auto-memoize). See https://react.dev/learn/react-compiler
