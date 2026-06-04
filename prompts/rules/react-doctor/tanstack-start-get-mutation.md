# `react-doctor/tanstack-start-get-mutation`

Use `createServerFn({ method: 'POST' })` for data modifications — GET requests can be triggered by prefetching and are vulnerable to CSRF

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a createServerFn().handler(fn) chain whose method option is missing or not POST/PUT/DELETE/PATCH, when the handler body contains a detected side effect — mutating array/Map operations, assignments to outer bindings, or calls in MUTATION_METHOD_NAMES like create/update/delete. False positive: locally-scoped Headers/FormData/Map mutations are already excluded, but novel mutation aliases can still slip through.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pass { method: 'POST' } (or PUT/DELETE/PATCH) to createServerFn: createServerFn({ method: 'POST' }).handler(fn). GET server functions are eligible for router prefetching on link hover, so any side effect can fire from a CSRF probe or accidental preload. See https://tanstack.com/start/latest/docs/framework/react/server-functions
