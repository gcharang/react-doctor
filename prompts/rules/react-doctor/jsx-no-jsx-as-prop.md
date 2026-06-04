# `react-doctor/jsx-no-jsx-as-prop`

Hoist the inline JSX out of render or memoize it with useMemo so the prop value is stable across renders.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-jsx-as-prop>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSX attribute on a custom (non-intrinsic) component receives freshly-created JSX inside a render function — directly (jsx={<X />}), nested in a logical/ternary (jsx={a || <X />}, jsx={a ? a : <X />}), or via a render-local variable initialized to JSX — producing a new element instance every render. It already skips test files, intrinsic HTML hosts, same-file consumers that aren't React.memo'd, and a large allowlist of slot-style prop names (icon, tooltip, fallback, header, render*, *Button, *Icon, *Component, etc.) where inline JSX is the canonical pattern. False positive: a slot whose name isn't in the allowlist (e.g. a custom design-system prop) where inline JSX is intentional and the child isn't memoized, so re-render cost is negligible.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the inline JSX to a stable reference so the prop doesn't get a new instance each render: hoist a static element to module scope (const icon = <Spinner />;) or, if it closes over props/state, memoize it with useMemo (const jsx = useMemo(() => <SubItem id={id} />, [id])). Prefer passing a component/render-prop the child invokes rather than a prebuilt element when the content depends on per-row data. See https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-jsx-as-prop
