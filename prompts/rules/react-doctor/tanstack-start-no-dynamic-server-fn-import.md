# `react-doctor/tanstack-start-no-dynamic-server-fn-import`

Use `import { myFn } from '~/utils/my.functions'` — the bundler replaces server code with RPC stubs only for static imports

- **Category:** TanStack Start
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires (error severity) on a dynamic import('...') whose statically analyzable path string ends in .functions or .functions.{ts,tsx,js,jsx}. The bundler only replaces server function bodies with RPC stubs for static imports, so dynamic-importing this file would ship the raw server source to the client.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Convert to a top-level static import: import { myFn } from '~/utils/my.functions'. If you genuinely need code-splitting, dynamic-import a regular client wrapper module that internally calls the (statically-imported) server function. See https://tanstack.com/start/latest/docs/framework/react/server-functions
