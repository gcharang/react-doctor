# `react-doctor/hooks-no-nan-in-deps`

Remove the literal NaN from the dependency array, or normalise it (Number.isNaN(x) ? 0 : x) before passing it in.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a CallExpression whose callee is one of useEffect, useLayoutEffect, useInsertionEffect, useCallback, useMemo, or useImperativeHandle (matched by isHookCall, so React.useEffect-style member calls count too) when the dependency-array argument — index 1, or index 2 for useImperativeHandle(ref, factory, deps) — is an ArrayExpression containing an element that is either the bare Identifier NaN or the non-computed MemberExpression Number.NaN; it reports each such element separately. False positive boundary derived from the valid fixtures: it does NOT fire on useSignalEffect (Preact signals, single-arg auto-tracking API with no deps array — intentionally excluded), on normal dep arrays like [id, name], on empty [] deps, on a hook with the deps argument omitted entirely, or on non-hook calls such as createThing("foo", [NaN]). Note the rule only matches the static NaN and Number.NaN literal shapes; a dynamically computed NaN, such as a value that becomes NaN via Number(input), is not detected here, so a clean dep array that holds a normal identifier is correctly left alone even if that identifier could be NaN at runtime.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the NaN (or Number.NaN) entry from the dependency array — it is almost always a leftover placeholder or the result of an unchecked coercion like Number(input) returning NaN. Because React compares deps with Object.is and Object.is(NaN, NaN) is true, a poisoned NaN makes the hook treat the dep as unchanged so it stops re-running on real changes, and any later transition between NaN and a real number can wedge dependency tracking. If the real value can become NaN at runtime, depend on a normalised version instead: const safe = Number.isNaN(x) ? 0 : x; useEffect(fn, [safe]). Never list a raw NaN literal in deps.
