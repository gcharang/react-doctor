# `react-doctor/no-unstable-nested-components`

Hoist nested components to module scope or memoize them — never define one inside another.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-unstable-nested-components>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a component candidate is defined inside an enclosing React component (or class render method) — a candidate being a PascalCase-named function/class, a function passed as a JSX prop value, or an object-property callback inside a call/array — whose body contains JSX or React.createElement. Excluded: useCallback-wrapped functions, .map/.forEach/.filter/.flatMap/.reduce callbacks, the children prop, render-prop names matching render*, and the first argument of an HoC (memo/forwardRef/lazy/observer — the outer call is reported instead). False positive: with the default allowAsProps:true, a render-prop component passed via a prop (e.g. footer={() => <div/>}) is the canonical composition pattern and is NOT flagged — only inline definitions in the render body that remount on every render are real findings.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the nested component to module scope so its identity is stable across renders: declare `function NestedThing() {...}` outside the parent and pass data via props instead of closing over the parent's variables. If it must read parent state and is genuinely small, lift the dynamic value to a prop or memoize with useCallback (`const Nested = useCallback(() => <div/>, [deps])`) so React preserves the subtree's DOM and state. For render props, pass the component as a prop rather than redefining it inline. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-unstable-nested-components
