# `react-doctor/tanstack-start-no-anchor-element`

`import { Link } from '@tanstack/react-router'` — enables type-safe routes, preloading via `preload="intent"`, and client-side navigation

- **Category:** TanStack Start
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX <a> element in a file whose path matches /routes/ when its href is a string literal starting with /. Dynamic href expressions, external URLs, mailto:/tel:, and hash links are not flagged. False positive: an intentional full-page reload such as a logout link or OAuth handoff that must escape client-side routing.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace with <Link to="/path"> from @tanstack/react-router and add preload="intent" to prefetch on hover. Link gives type-checked params, search params, and to values, and avoids the full document reload that <a> triggers. See https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
