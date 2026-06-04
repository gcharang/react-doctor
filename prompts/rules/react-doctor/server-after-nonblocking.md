# `react-doctor/server-after-nonblocking`

`import { after } from 'next/server'` then wrap: `after(() => analytics.track(...))` — response isn't blocked

- **Category:** Server
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule only fires inside files with a top-level 'use server' directive or functions carrying their own 'use server'. It flags console.log/info/warn(...) and member calls of the form receiver.method(...) where the receiver is analytics, posthog, mixpanel, segment, amplitude, datadog, or sentry, and the method is one of track, identify, page, capture, captureMessage, captureException, or log. Skip if the return value is awaited or drives downstream control flow.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap the deferrable side effect in Next.js's after() so it runs after the response is flushed: import { after } from 'next/server' then after(() => analytics.track(...)). The user-visible response goes out immediately, and the call still executes inside the same request context. See https://nextjs.org/docs/app/api-reference/functions/after
