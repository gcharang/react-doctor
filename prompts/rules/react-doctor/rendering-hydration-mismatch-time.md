# `react-doctor/rendering-hydration-mismatch-time`

Wrap dynamic time/random values in useEffect+useState (client-only) or add suppressHydrationWarning to the parent if intentional

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a JSX {...} expression contains new Date(), Date.now(), Math.random(), performance.now(), or crypto.randomUUID() (directly or via a method chain like new Date().toLocaleString()), and the enclosing JSX element does NOT already carry suppressHydrationWarning. Server-rendered HTML diverges from the first client render.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Render the value only after mount: const [now, setNow] = useState<Date | null>(null); useEffect(() => setNow(new Date()), []); then render {now?.toLocaleString()}. If the divergence is intentional (a timestamp, random ID), add suppressHydrationWarning to the parent element. See https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
