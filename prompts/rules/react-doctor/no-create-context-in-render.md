# `react-doctor/no-create-context-in-render`

Move createContext to module scope so its Context identity stays stable across renders

- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react.dev/reference/react/createContext>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a CallExpression to createContext when the nearest enclosing function is itself a React component (PascalCase, including memo()/forwardRef()-wrapped arrows like const App = memo(() => ...)) or a hook (use*) — the callee must be an Identifier that resolves (through renamed imports such as createContext as makeCtx) to a createContext export from one of CONTEXT_MODULES (exactly react, use-context-selector, react-tracked), or a non-computed MemberExpression like React.createContext via the canonical React namespace or one of those imported modules. Because attribution stops at the first function boundary, calling it inside an effect/memo/event-handler callback (e.g. const onClick = () => createContext(null) inside App) is NOT flagged — those bodies do not run on every render. False positive: createContext called at module scope, inside a plain non-component helper (function makeContextFactory() { return createContext(null) }), a locally-defined function named createContext, or createContext imported from any module outside CONTEXT_MODULES (e.g. my-custom-context-lib) — none of these recreate React's identity-keyed Context on render.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Lift the createContext(...) call out of the component/hook body to module scope so the same Context object is reused every render: replace function App() { const Ctx = createContext(null); ... } with const Ctx = createContext(null); function App() { ... }, exporting the Context if other modules consume it. Leaving it inside render produces a fresh Context each render, so every Provider/Consumer pair disconnects and consumers silently fall back to the default value while the subtree re-renders. If the default value must be derived per-instance, keep the Context at module scope and pass that value through the Provider's value prop instead. See https://react.dev/reference/react/createContext
