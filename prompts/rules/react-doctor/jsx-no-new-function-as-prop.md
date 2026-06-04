# `react-doctor/jsx-no-new-function-as-prop`

Memoize the callback (useCallback) or hoist it outside the component to keep a stable reference across renders.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-function-as-prop>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSX prop on a custom component receives a freshly-allocated function each render — an inline arrow/function expression, `new Function`/`Function()`, a `.bind()` call, a logical/ternary that produces one, or a render-local identifier bound to such — but ONLY when same-file analysis PROVES the consumer is wrapped in React.memo/memo/forwardRef/observer. Intrinsic HTML elements, one-shot lifecycle/render-prop names (onMount, fallback, render*, *Renderer), parameter-binding wrappers like `(e) => fn(arg, e)`, hook-returned handlers (`const h = useFoo()`), and test files are all skipped by design. False positive: a wrapper the rule misclassified as fixable when it actually closes over unstable outer values — useCallback can't stabilize it, so the only "fix" would be a data-flow refactor with no measurable gain unless the consumer is truly memoised. Also note the whole rule is disabled under react-compiler, which auto-memoizes inline callbacks.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Give the prop a stable reference: wrap the handler in `useCallback(fn, [deps])`, or hoist a closure-free function above the component (`const handleClick = () => {...}` at module scope). When the wrapper must capture per-render args (`onClick={(e) => fn(id, e)}`), pass the data down instead (`<Child id={id} onClick={fn} />`) rather than forcing a callback. Only worth doing because the consumer here is memoised, so a fresh reference defeats its memo bailout. See https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-function-as-prop
