# `react-doctor/tanstack-start-no-direct-fetch-in-loader`

Use `createServerFn()` from @tanstack/react-start — provides type-safe RPC, input validation, and proper server/client code splitting

- **Category:** TanStack Start
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any bare fetch(...) call (Identifier callee) anywhere inside a route options object's loader property. Wrapped HTTP clients like axios.get or ofetch are not detected by this rule. False positive: deliberately calling a third-party public API client-side to bypass a serverless round-trip, or hitting a fully public CDN endpoint with no auth.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the request into a createServerFn().handler(...) and invoke that from the loader. You gain RPC-style code-splitting (no fetch code in the client bundle), access to server-only credentials, and an inputValidator boundary. See https://tanstack.com/start/latest/docs/framework/react/server-functions
