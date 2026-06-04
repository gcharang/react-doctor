# `react-doctor/no-random-key`

Replace the fresh-each-render key with a stable id from the item: key={item.id}

- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react.dev/learn/rendering-lists#where-to-get-your-key>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXAttribute named exactly `key` whose value is a JSXExpressionContainer wrapping a fresh-each-call expression: a direct call to one of nanoid/uuid/uuidv4/uuidV4/v4/cuid/cuid2/createId/ulid/objectid/ObjectId/shortid (ALWAYS_FRESH_DIRECT_CALLEES), a member call Math.random()/Date.now()/performance.now()/crypto.randomUUID()/crypto.getRandomValues()/crypto.randomBytes() (ALWAYS_FRESH_MEMBER_RECEIVERS), `new Date()`, or a counter mutation used as the key (++counter, counter++, +=, -=) via looksLikeFreshUpdateExpression. False positive boundary: it does NOT fire for stable keys like key={item.id}, template literals built from item props like key={`row-${item.id}`}, arbitrary user helpers like key={getKey(item)}, or a bare id-factory name that resolves to a same-file user-defined binding (a `function createId(item){return item.slug}` or `const v4 = (item) => item.slug`) — those return a stable id, not a fresh one, so suppress them. Known limitation (do NOT treat as a stability guarantee): the rule does not follow identifier bindings, so key={key} where `const key = nanoid()` will NOT fire even when that const is computed per-item inside the map — this is a false-negative the detector cannot catch without scope analysis, not evidence the key is stable; if you see a per-item const assigned a fresh-each-call value and then used as the key, that is still the bug.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Derive the key from the item itself instead of a fresh-each-render value: key={item.id}, a content hash, or the index when list order is stable (key={i}). If the data lacks a unique field, assign each item a persistent id once at creation (e.g. when fetching or pushing into state) rather than generating one in render. A random/timestamp/counter key changes every render, so React unmounts and remounts the whole subtree, resetting local state, focus, scroll, and controlled-input cursor and re-firing mount effects. See https://react.dev/learn/rendering-lists#where-to-get-your-key
