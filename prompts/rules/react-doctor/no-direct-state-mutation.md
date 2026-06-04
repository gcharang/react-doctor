# `react-doctor/no-direct-state-mutation`

Replace the mutation with a setter call that produces a new reference: `setItems([...items, newItem])`, `setItems(items.filter(x => x !== target))`, `setItems(items.toSorted(...))`. React only re-renders on a new reference, so in-place updates are silently dropped

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires inside an uppercase-named function component when a useState value is the root of either an AssignmentExpression with a MemberExpression LHS (items.x = y, items[0] = y) or a CallExpression on a MUTATING_ARRAY_METHODS method (push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin). Lexical shadowing by function params and inner var/let/const declarations is respected. False positive: the state binding name is reused in some outer scope the lightweight shadow tracker can't see (rare).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace each mutation with a setter call that produces a new reference: setItems([...items, newItem]) instead of items.push, setItems(items.filter(x => x !== target)) instead of splice, and the immutable methods toSorted / toReversed / toSpliced / with (or [...items].sort()) instead of in-place sort/reverse. React compares with Object.is and silently bails on a same-reference update. See https://react.dev/learn/updating-arrays-in-state
