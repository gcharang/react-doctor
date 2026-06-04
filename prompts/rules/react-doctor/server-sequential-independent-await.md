# `react-doctor/server-sequential-independent-await`

Wrap independent awaits in `Promise.all([...])` so they race instead of waterfalling — second call doesn't depend on the first

- **Category:** Server
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule scans the top-level statements of every async function (declaration, expression, arrow) for two consecutive VariableDeclaration statements where each starts with an await expression and the second declaration reads no identifier introduced by the first. The two calls are independent and waterfall today. Confirm no hidden ordering constraint exists — rate limits, transactional ordering, or side effects on a shared resource can break parallelization.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Race the calls with Promise.all: const [user, posts] = await Promise.all([fetchUser(id), fetchPosts(id)]). Use Promise.allSettled when you need partial failure tolerance instead of fail-fast. Latency drops from the sum of both calls to the max. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
