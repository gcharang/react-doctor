# `react-doctor/jotai-select-atom-in-render-body`

Lift selectAtom to module scope, or wrap it: const a = useMemo(() => selectAtom(base, fn), [deps])

- **Category:** State & Effects
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://jotai.org/docs/utilities/select>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a CallExpression whose callee is an Identifier that resolves (via import tracking) to the named export selectAtom from "jotai/utils" or "jotai" — alias imports like {selectAtom as makeSlice} still count — when the nearest enclosing function-like node is NOT the first argument of a memoizing hook (useMemo/useCallback) and some outer enclosing function is a component (name matches /^[A-Z]/) or hook (name matches /^use[A-Z]/), resolving the binding through transparent memo()/forwardRef() wrappers; it also fires for selectAtom inside a helper arrow/function nested in a component since that runs at render time. False positive: do NOT flag selectAtom called at module scope, inside a useMemo/useCallback callback (the first-arg memoized form), imported from a non-jotai source like a homegrown ./my-utils helper of the same name, or called inside a lowercase non-hook helper such as function buildSliceAtom() that is itself defined at module scope.

## Fix prompt

Use this once validation confirms the diagnostic is real.

selectAtom(base, fn) returns a brand-new derived atom on every call, so calling it in a component or hook body makes useAtomValue re-subscribe to a fresh atom each render and loop forever. If the base atom and selector are static, lift the call to module scope: const sliceAtom = selectAtom(baseAtom, (s) => s.foo) outside the component. If it depends on props/state, memoize it: const sliceAtom = useMemo(() => selectAtom(baseAtom, (s) => s[field]), [field]), keeping the selector function stable too. See https://jotai.org/docs/utilities/select
