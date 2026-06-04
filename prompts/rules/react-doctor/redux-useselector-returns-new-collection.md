# `react-doctor/redux-useselector-returns-new-collection`

useSelector that returns a fresh object/array literal re-renders on every action; return a primitive, split into multiple useSelector calls, or pass shallowEqual.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react-redux.js.org/api/hooks#equality-comparisons-and-updates>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a CallExpression whose callee resolves to react-redux useSelector — either the imported name (or a renamed import of `useSelector`) or a same-file rebinding chain like `const useAppSelector = useSelector` / `export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector` — when called with exactly ONE inline arrow/function-expression selector whose result is an ObjectExpression or ArrayExpression: a concise body that is (after stripping parens) `{...}` or `[...]` (including spread forms like `({ ...state.user, fullName: state.user.name })`), or a block body whose LAST statement is `return { ... }` / `return [ ... ]`. False positives a reviewer would suppress: selectors returning a primitive/scalar like `(state) => state.count` or `(state) => state.user.name` (NOT flagged); any call that already passes a second equality argument such as `shallowEqual` or a custom `(a, b) => a.x === b.x` (NOT flagged); a hoisted selector passed by reference like `useSelector(selectActiveUsers)`, which usually pairs with a memoized createSelector and is intentionally skipped; `useSelector` imported from a non-react-redux module or a local helper function of the same name; and a react-redux import renamed to something that is NOT useSelector (e.g. `import { useDispatch as useAppSelector }`). Cross-file typed wrappers (useAppSelector defined in a separate hooks.ts) are out of scope and will not be detected here.

## Fix prompt

Use this once validation confirms the diagnostic is real.

useSelector compares the selector result to the previous one with `===` (Object.is) by default, so a freshly allocated literal always differs and the component re-renders on every dispatched action, not just when the data changed. Pick one: return a primitive and split the collection into separate calls, e.g. replace `const { name, email } = useSelector(s => ({ name: s.user.name, email: s.user.email }))` with `const name = useSelector(s => s.user.name); const email = useSelector(s => s.user.email)`; OR pass an equality fn as the second arg, `useSelector(s => ({ name: s.user.name, email: s.user.email }), shallowEqual)` importing shallowEqual from react-redux; OR for derived/aggregated shapes, memoize the selector with createSelector from reselect so it returns a stable reference. See https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
