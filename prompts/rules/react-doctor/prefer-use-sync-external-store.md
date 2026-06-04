# `react-doctor/prefer-use-sync-external-store`

Replace the `useState(getSnapshot())` + `useEffect(() => store.subscribe(() => setSnapshot(getSnapshot())))` pair with `useSyncExternalStore(store.subscribe, getSnapshot)`. The hook handles tearing during concurrent renders and SSR snapshots; the manual subscribe pattern doesn't

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Requires a 4-vertex match: useState(getSnapshot()) paired with useEffect(() => { const u = store.subscribe(() => setX(getSnapshot())); return u; }, []) where the setter's argument is structurally identical to the useState initializer and the cleanup releases the subscription. The combined match is so specific that real-world false positives are essentially impossible.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace both the useState and the useEffect with one call: const value = useSyncExternalStore(store.subscribe, getSnapshot). Pass a third getServerSnapshot argument when the value is read during SSR hydration. The hook prevents tearing during concurrent renders and transitions, which the manual subscribe + setState pattern cannot. See https://react.dev/reference/react/useSyncExternalStore
