# `react-doctor/rendering-usetransition-loading`

Replace with `const [isPending, startTransition] = useTransition()` — avoids a re-render for the loading state

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a const [isLoading | isPending, setX] = useState(false) declaration — the first destructured name must match /^(?:isLoading|isPending)$/ exactly and the initializer must be the literal false. False positive: the state genuinely tracks async network loading (fetch lifecycle) where useTransition does not apply.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For pending state of a synchronous update or a Server Action, replace with const [isPending, startTransition] = useTransition(); and wrap the update: startTransition(() => setX(...)). The pending flag is provided for free, no manual setIsLoading(true) / setIsLoading(false) calls. See https://react.dev/reference/react/useTransition
