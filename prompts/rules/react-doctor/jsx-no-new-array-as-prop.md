# `react-doctor/jsx-no-new-array-as-prop`

Memoize the array (useMemo) or hoist it outside the component instead of allocating a new one each render.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-array-as-prop>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX prop whose value freshly allocates an array every render — an array literal [], new Array()/Array(), arr.concat(...), single-arg arr.map(fn)/arr.filter(fn), or those wrapped in a ternary or ??/|| logical, or a render-local identifier bound to one of those. A ternary fires when EITHER branch produces an array (so cond ? value : [] fires because the [] alternate counts as array-producing), whereas a ??/|| with an empty-array literal on one side treats that side as a skipped fallback and only checks the other. It only fires when the consumer component is PROVEN memoised in the same file, the prop is NOT a data-collection slot (items/data/list/options/tabs/*Items/*Options, etc.), and the element is a custom component (not an intrinsic HTML tag) outside test files. False positive: an empty-array fallback in a logical short-circuit (value ?? [] or value || []) where the other side is non-array-producing — the [] only allocates on the rare null/undefined path, so it isn't a per-render footgun. This exemption does NOT extend to ternaries: cond ? value : [] still fires because the [] branch is treated as array-producing.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist a truly constant array to module scope (const EMPTY: Item[] = []) so its identity never changes, or memoize a derived one: const rows = useMemo(() => items.map(toRow), [items]) and pass list={rows}. For .concat/.filter/.map chains, compute them inside a useMemo keyed on their inputs rather than inline in JSX, keeping the prop a stable reference across renders. If the warning is on a ternary like cond ? value : [], pull the empty fallback out so it isn't reallocated each render — e.g. const EMPTY: Item[] = [] at module scope, then list={cond ? value : EMPTY}. See https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-array-as-prop
