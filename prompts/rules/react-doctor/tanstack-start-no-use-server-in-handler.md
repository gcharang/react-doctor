# `react-doctor/tanstack-start-no-use-server-in-handler`

TanStack Start handles server boundaries automatically via the Vite plugin — "use server" inside createServerFn causes compilation errors

- **Category:** TanStack Start
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires (error severity) when a .handler(() => { 'use server'; ... }) callback's first statement is a 'use server' directive — detected either via the parser's directive field or a top-level string-literal ExpressionStatement. False positive: essentially none in practice; a stray string-literal statement is the only realistic non-directive trigger.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the 'use server' line entirely. TanStack Start's Vite plugin already extracts the handler body into a server-only module and replaces the client-side reference with an RPC stub; the React 'use server' directive duplicates that transform and breaks the build. See https://tanstack.com/start/latest/docs/framework/react/server-functions
