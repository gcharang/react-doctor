# `react-doctor/no-initialize-state`

Disallow initializing state in an effect.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** eslint-plugin-react-you-might-not-need-an-effect
- **Framework:** global
- **Enabled when:** eslint-plugin-react-you-might-not-need-an-effect installed in project
- **Documentation:** <https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a useEffect with no non-setter deps (so it runs once on mount, or only after setState calls) that synchronously calls setState — the classic componentDidMount 'load initial value into state' pattern. False positive: SSR hydration where the value must differ between server and client (window-only APIs), but that has a dedicated fix via useSyncExternalStore rather than an effect.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the initializer into useState's lazy form: useState(() => computeInitial()) — it runs once on mount with no extra render. For values read from a browser-only source where SSR would mismatch, use useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) which exposes a separate server-side snapshot that hydrates cleanly. See https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store
