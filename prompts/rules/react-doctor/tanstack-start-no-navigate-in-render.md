# `react-doctor/tanstack-start-no-navigate-in-render`

Use `throw redirect({ to: '/path' })` in `beforeLoad` or `loader` instead — navigate() during render causes hydration issues

- **Category:** TanStack Start
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on navigate(...) calls in /routes/ files that are NOT lexically inside useEffect/useLayoutEffect/useInsertionEffect, useCallback, useMemo, or a JSX onXxx event handler attribute. Synchronous-iteration callbacks like array.forEach are deliberately still treated as render-time. False positive: a local identifier coincidentally named navigate that is unrelated to the router hook.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For route-level redirects use throw redirect({ to: '/path' }) inside beforeLoad or loader — the router awaits it before rendering. For interactive navigation, move the navigate() call into an event handler or a useEffect. See https://tanstack.com/router/latest/docs/framework/react/guide/navigation
