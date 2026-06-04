# `react-doctor/rerender-dependencies`

Extract to a useMemo, useRef, or module-level constant so the reference is stable

- **Category:** State & Effects
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a literal ObjectExpression, ArrayExpression, ArrowFunctionExpression, or FunctionExpression sitting directly inside a useEffect, useLayoutEffect, useMemo, or useCallback deps array. Each creates a fresh reference every render, so Object.is comparison always fails and the hook re-runs every render. Identifier deps that happen to resolve to literals defined elsewhere are not flagged.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For object or array literals, lift to module scope or wrap with useMemo so the reference is stable. For inline functions, hoist outside the component when they capture no reactive values, or wrap with useCallback otherwise. A useRef works when you don't actually need re-runs on change. See https://react.dev/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally
