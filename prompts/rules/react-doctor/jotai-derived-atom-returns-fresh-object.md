# `react-doctor/jotai-derived-atom-returns-fresh-object`

Split the derivation into per-field primitive derived atoms, or wrap with selectAtom(source, fn, shallow) from jotai/utils when a wrapper object is required.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only on a CallExpression to jotai's imported `atom` (verified via the import binding, local-name aliasing allowed) whose FIRST argument is a function with EXACTLY one Identifier parameter (the get param), where that body both (a) references the get parameter as a call somewhere not nested in an inner function, and (b) returns a fresh structure: a bare ObjectExpression/ArrayExpression literal (including spread `{ ...get(x) }`), or a method chain whose OUTERMOST call is an array-producing instance method (filter, map, flatMap, slice, concat, flat, toSorted, toReversed, toSpliced, with, sort, reverse — note sort/reverse mutate-and-return their receiver rather than allocate) or a static Object.{keys,values,entries,fromEntries,assign,create} / Array.{from,of} call. For block bodies every reachable top-level return must be fresh. The detector never inspects the atom() call's second argument. False positives a reviewer would suppress: a reader function that takes more than one parameter (e.g. `(get, set) => ...`) or zero params, skipped because only single-Identifier-param readers are inspected — this is why the read-write fixture is also quiet, since its reader `(get) => get(baseAtom)` additionally returns a reference-stable `get(x)` member value; chains whose outermost terminator returns a primitive or stable value (`.filter(...).reduce(...)`, `.find()`, `.some()`, `.includes()`, `.join()`, `.items.length`); a plain `get(x).user` member access (reference-stable); a constant atom whose body never calls get; an `atom` imported from a non-jotai module; and block bodies that mix one fresh return with one reference-stable return.

## Fix prompt

Use this once validation confirms the diagnostic is real.

jotai propagates derived values with Object.is and has no shallow compare on a plain atom, so a fresh object/array every read re-renders every consumer on every upstream notify even when fields are unchanged. Either split the wrapper into one primitive derived atom per field (e.g. `const countAtom = atom((get) => get(cartAtom).items.length)` and a separate `totalAtom`), each of which dedupes via Object.is, or if a single wrapper object is genuinely required wrap it with `selectAtom(sourceAtom, (s) => ({ ... }), shallow)` from `jotai/utils` (importing `shallow`) so equal shapes are deduped. For array chains, memoize the source or move the allocation to the consumer.
