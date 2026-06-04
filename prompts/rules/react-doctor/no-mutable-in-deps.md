# `react-doctor/no-mutable-in-deps`

Read mutable values (`location.pathname`, `ref.current`) inside the effect body instead of in the deps array, or subscribe with `useSyncExternalStore`. Mutations to these don't trigger re-renders, so listing them in deps doesn't make the effect react to changes

- **Category:** State & Effects
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a deps array element of useEffect/useLayoutEffect/useMemo/useCallback that is EITHER (a) '<x>.current' where 'x' is a 'useRef(...)' binding declared in the same component, OR (b) any MemberExpression whose ROOT identifier name is one of 'location','window','document','navigator','history','screen','performance' — e.g. 'location.pathname', 'window.innerWidth'. Crucially, branch (b) matches on the NAME ALONE; it never checks what that root actually resolves to. CONFIRM branch (a) ref.current always — refs are mutable and never re-trigger an effect. CONFIRM branch (b) ONLY when the root is the genuine browser global (no in-scope binding shadows it; the file reads it implicitly off 'window'). SUPPRESS branch (b) when the root is a LOCAL reactive binding that merely shares the global's name — most commonly 'const location = useLocation()' (react-router), 'const location = useLiveData(...location$)', or any hook return / prop / state / context value named 'location','history', etc. Those values are reactive: React re-runs the effect when they change, so 'location.pathname' in deps is correct and intended. Tell: an import or 'const <name> = ...' for that root inside (or above) the component means it is NOT the global — suppress.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Principle: list in deps only values React can compare across renders; mutable refs and live browser globals can't drive re-runs, so move the READ into the effect and let a real reactive value (or a subscription) trigger it. (A) ref.current — delete '<ref>.current' from the deps array and read it inside the effect body: 'useEffect(() => { const el = ref.current; if (!el) return; observe(el) }, [])'. The effect already re-reads the latest '.current' on every run; if you need to re-run when a DOM node attaches, use a ref CALLBACK ('<div ref={node => ...}>') instead. (B) Genuine browser global ('window.innerWidth','location.pathname' off the real window) — remove it from deps and read it inside the body; when you truly must re-render on its changes, subscribe via 'useSyncExternalStore' (e.g. a resize/popstate listener) rather than listing the mutable read. Anti-pattern: do NOT 'just add an eslint-disable' or duplicate the value into useState only to mirror it — that re-introduces stale state. NOTE the common false alarm: if the root is a LOCAL binding like 'const location = useLocation()' it is already reactive — keep 'location.pathname' in deps unchanged; no fix needed. See https://react.dev/learn/lifecycle-of-reactive-effects#all-variables-declared-in-the-component-body-are-reactive
