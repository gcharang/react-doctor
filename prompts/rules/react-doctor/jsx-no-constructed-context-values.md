# `react-doctor/jsx-no-constructed-context-values`

Memoize the context value with useMemo/useCallback or hoist it outside the render

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-constructed-context-values>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a `<X.Provider value={…}>` opening element sitting inside a function (a render) when the `value` expression is constructed fresh each render: an object, array, arrow/function/class expression, `new` expression, JSX element/fragment, or a conditional/logical whose branches resolve to any of those. Every such provider re-renders all consumers on each parent render because the value gets a new identity. False positive boundary: it only inspects literal construction at the JSX site — an identifier (`value={foo}`) is never flagged even when `foo` is an inline `{}` or an unmemoized `useMemo(() => …)` with no deps, and spread props (`<X.Provider {...rest}>`) and member accesses (`value={ctx.current}`) are likewise not checked, so a confirmed finding is one where the literal sits directly in the attribute.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap the value in `useMemo` (objects/arrays) or `useCallback` (functions) keyed on its real dependencies: `const value = useMemo(() => ({ user, theme }), [user, theme]); return <Ctx.Provider value={value}>`. If the value never depends on render state, hoist it to a module-level constant instead. Avoid passing inline `{}`/`[]`/arrow functions directly to `value`, since each render creates a new identity and re-renders every consumer. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-constructed-context-values
