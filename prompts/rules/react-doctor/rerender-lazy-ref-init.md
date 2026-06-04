# `react-doctor/rerender-lazy-ref-init`

Lazy-init the ref: `const ref = useRef(null); if (ref.current === null) ref.current = expensiveCall()`

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react.dev/reference/react/useRef>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a useRef(...) call (isHookCall checks the callee is named useRef) whose FIRST argument is a CallExpression (e.g. useRef(buildExpensiveCache()), useRef(cache.build())) or a NewExpression (e.g. useRef(new AbortController()), useRef(new Map()), useRef(new Set())) — useRef has no lazy-initializer form, so that allocation runs every render and is discarded after the first. The callee name is the Identifier name, the member property name for x.y() calls, else "fn". Excluded and NOT flagged: useRef with no args, useRef(null/0/""/initial) (literal or bare identifier — only call/new shapes count), trivial wrappers in TRIVIAL_INITIALIZER_NAMES (Boolean, String, Number, Array, Object, parseInt, parseFloat — so useRef(Number("0")), useRef(String(value)), useRef(Array()) are exempt), and plain-call callees whose name is a React hook (useRef(useId()), useRef(useContext(ThemeContext)) — these are already stable and a conditional lazy-init would call a hook conditionally). False positive a reviewer would suppress: a cheap or pure-constant call that costs effectively nothing per render, or an initializer whose freshness-per-render is intentional, where the lazy-ref ceremony adds noise without measurable benefit.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Stop passing the call directly to useRef; initialize the ref lazily so the allocation happens once: const ref = useRef(null); if (ref.current === null) ref.current = buildExpensiveCache(); (for the new case write ref.current = new AbortController();). If the value can safely be recomputed on remount, use const value = useMemo(() => buildExpensiveCache(), []) instead. Keep the trivial/hook-capturing forms unchanged. See https://react.dev/reference/react/useRef
