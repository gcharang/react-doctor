# `react-doctor/tanstack-start-no-useeffect-fetch`

Fetch data in the route `loader` instead — the router coordinates loading before rendering to avoid waterfalls

- **Category:** TanStack Start
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when useEffect, useLayoutEffect, or useInsertionEffect inside a /routes/ file contains a bare fetch(...) call anywhere in its callback. Wrapped clients like axios.get are not detected. False positive: a client-only subscription bootstrap (SSE, WebSocket handshake) that genuinely must run after mount and cannot move to a loader.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the request into the route loader (or a createServerFn called from the loader) so the router resolves data before rendering and avoids the mount-then-fetch waterfall. For client-driven, cache-aware data, prefer TanStack Query's useQuery. See https://tanstack.com/router/latest/docs/framework/react/guide/data-loading
