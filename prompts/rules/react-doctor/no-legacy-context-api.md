# `react-doctor/no-legacy-context-api`

Replace `childContextTypes` + `getChildContext` with `const MyContext = createContext(...)` + `<MyContext.Provider value={...}>`; replace `contextTypes` with `static contextType = MyContext` (single context) or `useContext()` / `use()` from a function component. The provider and every consumer must migrate together — partial migrations leave consumers reading the wrong context.

- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on class members or top-level UppercaseIdentifier.childContextTypes / contextTypes / getChildContext = {...} assignments — the legacy context API removed in React 19. Both the provider (childContextTypes + getChildContext) and consumer (contextTypes) shapes are flagged. Migration is cross-file, so confirm you are not viewing a partial migration where the modern createContext already coexists with the legacy form.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace childContextTypes + getChildContext with a module-level const MyContext = createContext(defaultValue) and wrap children in <MyContext.Provider value={...}>. Replace consumer contextTypes with static contextType = MyContext (single context) or useContext(MyContext) / use(MyContext) inside function components. Migrate the provider and every consumer in the same commit to avoid silent context mismatches. See https://react.dev/reference/react/createContext
