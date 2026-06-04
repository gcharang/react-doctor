# `react-doctor/tanstack-start-server-fn-method-order`

Chain methods in order: .middleware() → .inputValidator() → .client() → .server() → .handler() — types depend on this sequence

- **Category:** TanStack Start
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires (error severity) when the method chain rooted at createServerFn(...) has order-sensitive methods out of the sequence middleware → inputValidator → client → server → handler. Builder chains not rooted at createServerFn are ignored, and only that fixed set of methods is compared. The first inversion is reported.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Reorder the chain: createServerFn().middleware([...]).inputValidator(schema).server(fn).handler(fn). Each step's return type is the input to the next, so chaining .handler() before .inputValidator() strips the typed ctx.data; running .server() after .handler() detaches the server boundary. See https://tanstack.com/start/latest/docs/framework/react/server-functions
