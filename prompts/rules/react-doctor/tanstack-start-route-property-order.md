# `react-doctor/tanstack-start-route-property-order`

Follow the order: params/validateSearch → loaderDeps → context → beforeLoad → loader → head. See https://tanstack.com/router/latest/docs/eslint/create-route-property-order

- **Category:** TanStack Start
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires (error severity) when properties on a createFileRoute/createRoute/createRootRoute options object appear out of the canonical order: params, validateSearch, loaderDeps, search.middlewares, ssr, context, beforeLoad, loader, onEnter, onStay, onLeave, head, scripts, headers, remountDeps. Only those keys are compared; spreads, computed keys, and unknown keys are skipped. The first out-of-order key is reported.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Reorder the options object so each property appears in canonical sequence (params → loaderDeps → context → beforeLoad → loader → head). Each step contributes to the inferred context/loader-data type that later steps consume, so wrong order breaks type inference downstream. See https://tanstack.com/router/latest/docs/eslint/create-route-property-order
