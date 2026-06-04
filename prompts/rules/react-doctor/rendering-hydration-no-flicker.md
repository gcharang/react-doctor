# `react-doctor/rendering-hydration-no-flicker`

Use `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` or add `suppressHydrationWarning` to the element

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a useEffect or useLayoutEffect with an empty [] deps array whose body is a single statement that calls a setter matching /^set[A-Z]/. This flips state once on mount, causing a visible server-vs-client flash. False positive: the setState is part of an unavoidable hydration workaround.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace with useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) so the server renders the placeholder and the client subscribes to the live value in a single commit — no post-mount re-render. Alternatively add suppressHydrationWarning to the affected element if a brief mismatch is acceptable. See https://react.dev/reference/react/useSyncExternalStore
