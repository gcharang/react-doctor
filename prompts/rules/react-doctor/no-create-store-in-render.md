# `react-doctor/no-create-store-in-render`

Hoist the store/atom/observable construction to module scope: const store = create(...) outside the component.

- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a CallExpression's callee resolves to a known external-store factory export AND enclosingComponentOrHookName is non-null (the call sits directly in the body of a PascalCase component or use* hook, including memo()-wrapped named/arrow components). The matched factories are zustand create/createStore, redux createStore, @reduxjs/toolkit configureStore/createSlice, jotai atom/createStore, valtio proxy, mobx observable/makeAutoObservable/makeObservable, nanostores atom/map, and @xstate/store createStore — matched only by named import (including renamed `create as makeStore`) or member call `zustand.create(...)`/`mobx.makeAutoObservable(...)` on a namespace/default import resolving to that exact module. By design the detector stays silent (does NOT fire) on: factories created inside an event handler `const onNew = () => create(...)` (re-run on click, not render) or inside a useMemo callback (memoized, not per render), since enclosingComponentOrHookName stops at the first inner function boundary; a locally-defined or shadowed `create`/`atom` that is not the imported factory; a same-named export from an unsupported module (`create` or `random.create()` from some-other-lib); subscription hooks useStore/useAtom (deliberately omitted from the factory list); and calls already at module scope or inside plain non-component helpers like `makeStore()` — these are correct exclusions, not false positives. False positive / blind spot (the rule's v2 out-of-scope gap): because this is a single-file scan it cannot follow cross-file resolution, so it MISSES a real violation when the factory is wrapped in a user-defined helper named like a hook/component (`function useMakeStore() { return create(...) }`, called once but re-detected per call) or when a store is constructed in and re-exported through another module; conversely, before confirming, verify the matched call truly re-runs on every render of the enclosing component/hook rather than being a one-shot wrapper.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist the factory call out of the component/hook to module scope so the store is allocated exactly once: replace `function App() { const useStore = create((set) => ({ count: 0 })); ... }` with `export const useStore = create((set) => ({ count: 0 }))` at the top of the file and reference it from the component. If the store genuinely must be per-instance (rare), construct it once with a stable ref or lazy init (`const storeRef = useRef(); if (!storeRef.current) storeRef.current = create(...)`) or inside a useMemo with a stable dependency list — never bare in the render body, since a fresh store every render disconnects subscribers, churns action-creator/reducer/store identities, and resets persisted state.
