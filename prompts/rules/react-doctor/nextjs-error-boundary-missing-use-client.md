# `react-doctor/nextjs-error-boundary-missing-use-client`

Add `'use client'` as the first statement of error.tsx / global-error.tsx so the error boundary becomes a Client Component.

- **Category:** Next.js
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs
- **Documentation:** <https://nextjs.org/docs/app/api-reference/file-conventions/error>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on the Program node when the normalized filename matches BOTH APP_DIRECTORY_PATTERN (contains the substring /app/) and ERROR_BOUNDARY_FILE_PATTERN (/(error|global-error)\.(?:tsx?|jsx?|mts|mjs)$ — leading slash plus the exact basename error or global-error, anchored at end) AND hasDirective is false, i.e. no top-level ExpressionStatement in the Program body is a string Literal whose value is exactly 'use client'. Without that directive the App Router boundary is a Server Component and silently fails to catch errors or render fallback UI, so confirm. False positive: the path contains the substrings app and error but the basename is NOT exactly error/global-error, so ERROR_BOUNDARY_FILE_PATTERN never matches and the rule does NOT fire — e.g. /app/error-utils.ts, /app/app-error.tsx, /app/app-errors.tsx, or /app/components/error/index.tsx (the slug error appears as a directory, not the basename); these need no directive and must be suppressed if ever surfaced. Note the rule has NO pages-router exclusion logic: a real Pages Router /pages/error.tsx escapes only because it lacks the /app/ substring, while /app/pages/error.tsx WOULD fire and is a true positive, not an FP.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add the directive as the very first statement of the file, before any imports: a standalone string statement 'use client' on its own line at the top of error.tsx / global-error.tsx. Keep the default-exported boundary component (which receives { error, reset }) as-is; the directive alone makes it a Client Component so it can hold the error state and render the reset fallback. For global-error.tsx remember it must also render its own <html> and <body>. See https://nextjs.org/docs/app/api-reference/file-conventions/error
