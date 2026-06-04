# `react-doctor/redux-useselector-inline-derivation`

Select the raw slice in useSelector and derive with useMemo, or hoist into a memoised createSelector from reselect.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react-redux.js.org/api/hooks#useselector>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a react-redux useSelector call (or a same-file typed-wrapper rebinding like `const useAppSelector: TypedUseSelectorHook<RootState> = useSelector`) with NO second argument, whose selector RETURNS a freshly-allocated collection: a `.filter/.map/.flatMap/.slice/.concat/.toSorted/.toReversed/.toSpliced/.with` method call, or `Object.keys/values/entries/fromEntries/assign` / `Array.from/of`, as the returned value (concise-arrow body, a block-body ReturnStatement argument, or the final branch of a conditional/logical/sequence expression). False positive boundary, reflecting the valid fixtures: do NOT flag when the result is a stable primitive even though an array is transiently built — `state.users.filter(u => u.active).length` or `Object.keys(state.byId).length` return a number, and `state.tags.map(t => t.id).join(",")` returns a string, so `===` succeeds; nor `.reduce`/`.reduceRight` (any/primitive aggregation), a plain slice (`s => s.users`), a hoisted named selector (`useSelector(selectActiveUsers)`), an allocation inside a nested callback (`() => state.users.filter(...)`) or assigned to an unreturned local in a block body, a useSelector imported from a non-`react-redux` module, or any selector already given a second equality arg such as `shallowEqual`.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Stop deriving inside the selector. Select the raw slice — `const users = useSelector(s => s.users)` — and compute the derived array with `useMemo(() => users.filter(...), [users])` so the new reference is only created when the input changes; or hoist the derivation into a memoised `createSelector([s => s.users], users => users.filter(...))` from reselect and call that. If you must keep deriving inline, pass `shallowEqual` (or a custom equality fn) as the second useSelector argument so the fresh allocation no longer fails the default `===` check. See https://react-redux.js.org/api/hooks#useselector
