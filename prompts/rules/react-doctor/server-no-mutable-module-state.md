# `react-doctor/server-no-mutable-module-state`

Move per-request data into the action body, headers/cookies, or a request-scope (React.cache, AsyncLocalStorage). Module-scope `let`/`var` is shared across requests.

- **Category:** Server
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule only fires in files with a top-level 'use server' directive. It flags Program-scope VariableDeclaration nodes: let and var are always reported, and const is reported only when the initializer is [], {}, or new Map/Set/WeakMap/WeakSet(). Confirm the binding actually holds per-request data — process-wide singletons like a database pool, rate limiter, or LRU cache need an explicit suppression with justification.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move per-request state inside the action body, into cookies() / headers(), a database, or a request-scoped store like React.cache or AsyncLocalStorage. Process-wide singletons that must persist across requests (database clients, queues) belong in a separate module without the 'use server' directive and should be imported in. See https://nextjs.org/docs/app/building-your-application/caching#request-memoization
