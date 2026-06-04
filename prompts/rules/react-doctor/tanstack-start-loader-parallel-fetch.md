# `react-doctor/tanstack-start-loader-parallel-fetch`

Use `const [a, b] = await Promise.all([fetchA(), fetchB()])` to avoid request waterfalls in route loaders

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a route's loader function body contains 2 or more top-level await statements, counted across VariableDeclaration, ExpressionStatement, ReturnStatement, and for-await-of forms. Awaits nested inside if/try/loops do not count. False positive: the second await genuinely depends on data resolved by the first, in which case sequencing is required.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap independent fetches in Promise.all: const [user, posts] = await Promise.all([fetchUser(id), fetchPosts(id)]). Keep awaits sequential only when the next call's arguments depend on the prior result. For multi-step graphs, consider batching upstream rather than chaining in the loader. See https://tanstack.com/router/latest/docs/framework/react/guide/data-loading
