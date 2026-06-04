# `react-doctor/rules-of-hooks`



- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/rules-of-hooks.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a use-prefixed call (or 'Namespace.useFoo') runs somewhere a hook is illegal: (a) the enclosing function's name is neither PascalCase nor use-prefixed ('non-component/hook' message), or (b) inside a real component/'use*' hook it sits in an if/loop/try/catch/'&&'/ternary/after an early return/inside an async fn ('called conditionally|in a loop|inside try|async' message). CONFIRM only case (b) where the callee is a genuine React hook and the file ships to production. SUPPRESS case (a) when the enclosing function actually renders as a component despite its name: a Storybook 'render:'/'decorators:'/'play:' callback or any '*.stories.*' file, a JSX render-prop ('placeholder: () => <.../>'), or a component whose identifier merely isn't uppercase ('function _Chat()'). SUPPRESS any callee that is not a real React hook but only borrows the 'use' prefix — a store/atom/util factory ('useAuthQuery' returning a nanostores atom, 'useWizard', a renamed helper) called from a plain non-render function; rename it to drop the collision. Also suppress when the diagnostic targets test/story/playground/example code (test-noise).

## Fix prompt

Use this once validation confirms the diagnostic is real.

First confirm the callee is a real React hook AND the site is a real render path; the principle is 'every render must hit the same hook calls in the same order'. For genuine violations: (A) Conditional/early-return — hoist the hook above all branches and move the condition inside it: 'const ctx = useContext(C); if (!ctx) return {};' not 'if(!id) return; const ctx=useContext(C);'; for effects, 'useEffect(()=>{ if(cond) run(); },[cond])'. (B) Per-item hook in a loop/.map — extract a child component so each item owns its own state, never call hooks in the loop body. (C) Branching dispatcher (e.g. overload picking 'useXImpl(a)' vs 'useXImpl(b)') — call the hook once unconditionally, branch only its arguments. For the common FALSE alarms, the fix is NOT to restructure: if the function already renders (Storybook render/decorator, render-prop) leave it; if the name is just non-uppercase, rename to PascalCase ('_Chat'->'ChatBody'); if the callee isn't a React hook, rename it off the 'use' prefix ('useAuthQuery'->'createAuthQuery'). Do NOT mechanically wrap the hook in a new 'useX' wrapper or hoist a non-hook call. See https://oxc.rs/docs/guide/usage/linter/rules/react/rules-of-hooks and https://react.dev/reference/rules/rules-of-hooks
