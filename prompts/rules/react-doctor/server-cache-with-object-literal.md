# `react-doctor/server-cache-with-object-literal`

Pass primitives to React.cache()-wrapped functions — argument identity (not deep equality) is the dedup key, so a fresh `{}` per render bypasses the cache

- **Category:** Server
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule tracks any variable initialized as cache(...) or React.cache(...), then reports call sites of those names whose first argument is an inline object literal — for example getUser({ id: 1 }). React.cache keys deduplication on === argument identity, so a fresh literal per render always misses the cache. Confirm the call actually runs inside a render or Server Component pass where deduplication matters.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pass primitives so reference equality holds across calls (getUser(1, 'active')), or hoist the options object to module or route scope and reuse the same reference (const USER_QUERY = { id: 1 }; getUser(USER_QUERY)). Never build the argument object inline during render. See https://react.dev/reference/react/cache#caveats
