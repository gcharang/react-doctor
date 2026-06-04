# `react-doctor/no-array-index-key`

Use a stable, data-derived key instead of the array iteration index.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-array-index-key>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX key={...} (or a key prop inside React.cloneElement(el, {...})) whose value resolves to the iteration index — the index param of .map/.filter/.forEach/.find/.findIndex/.flatMap/.some/.every, .reduce/.reduceRight, or Array.from(src, cb) — used directly, in a template literal (`abc${index}`), via index.toString() or String(index), or in a string-literal + index concat. Already excluded: positionally-stable sources (Array.from({length}), Array(N), [...Array(N)], .split(), .fill()/.flat() chains, all-literal arrays), composite keys mixing real identity (`${item.id}-${index}`, outerVar + '-' + i), and Fragments, pure SVG primitives, and stateless HTML leaf elements with no stateful descendants. False positive: an append-only, never-reordered/filtered list whose rows carry no per-item identity — the index is effectively stable there, so suppress on that specific line.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the index with a stable per-item identifier from the data: key={thing.id} or key={thing.slug} instead of key={index}. If items genuinely lack an id, derive a stable one (content hash, or crypto.randomUUID() cached on the item when it's created) rather than the position, since reordering an index-keyed list reassigns React state and DOM nodes to the wrong items. Inside React.cloneElement, pass the stable id the same way: React.cloneElement(thing, { key: thing.id }). See https://oxc.rs/docs/guide/usage/linter/rules/react/no-array-index-key
