# `react-doctor/no-mutating-reducer-state`

Return a new reducer state object/array/collection instead of mutating the current state and returning the same top-level reference.

- **Category:** State & Effects
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react.dev/learn/updating-objects-in-state>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only when a reducer is wired to React's own useReducer — resolved via isCallToImportedReactUseReducer, which matches `import { useReducer } from "react"` (including `useReducer as useReactReducer`) and `React.useReducer`/`React`-namespace-or-default calls — AND one control-flow path both (a) mutates the original state param or a value reachable from it, then (b) returns that same top-level reference. Mutations counted: member-target assignment/update/delete (`state.count++`, `state.x = y`, `delete state.x`), receiver-mutating array/collection methods on a state-derived receiver (`state.todos.push`, `state.set`, `state.add`), `Object.assign(state,...)`/`Reflect.set(state,...)`, mutating-lodash `_.set/set/merge(state,...)`, and logical assignments (`??=`). Identity is tracked per path: `const next = state` and single-level destructures (`const { items } = state`, `const [first] = state.items`) stay state-reachable; same-reference returns include `return state`, `return alias`, `return state.sort(...)`, `return Object.assign(state, patch)`, and either branch of `return cond ? state : {...state}`. The rule will NOT fire on (no reviewer action needed, all verified valid fixtures): clone-first code that returns the clone (`const next = {...state}` / `[...state.items]` / `new Map(state)` / `state.items.slice()`, mutate the clone, `return next`); nested mutation under a NEW top-level wrapper (`state.a.b = x; return {...state}`); Array.reduce callbacks; locally-shadowed or non-React useReducer; Immer `produce`/`useImmerReducer` wrappers; `lodash/fp` set or a custom non-lodash `set` import; and `Object.assign`/`Reflect.set` where `Object`/`Reflect` is shadowed by a local binding. The ONE genuine residual false positive a reviewer MUST suppress by hand: a state value backed by a persistent/immutable collection (Immutable.js Map, Mori) whose `.set`/`.add`/`.delete` return a NEW container — the rule cannot see types, so it flags this discard-the-result pattern as a same-reference mutation even though no real mutation occurs.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Stop mutating the incoming state on the path that returns it. Clone first, then mutate and return the clone: object writes become `const next = { ...state }; next.count += 1; return next;`; array mutators become `return { ...state, items: [...state.items, item] }` or copy with `state.items.slice()` / `Array.from(state.items)` before push/splice/sort; Map/Set become `const next = new Map(state); next.set(k, v); return next;`; replace `Object.assign(state, patch)` with `return { ...state, ...patch }` and `_.set(state, path, v)` with an immutable update. For a true no-op action return `state` unchanged WITHOUT mutating it first. See https://react.dev/learn/updating-objects-in-state
