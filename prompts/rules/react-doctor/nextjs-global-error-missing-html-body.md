# `react-doctor/nextjs-global-error-missing-html-body`

Wrap the global-error UI in `<html><body>...</body></html>` because the root layout unmounts when global-error renders

- **Category:** Next.js
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs
- **Documentation:** <https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only on files whose normalized path matches /app/ AND ends in global-error.{tsx,jsx,ts,js,mts,mjs} when the file's JSX is missing an <html> and/or <body> tag — fileContainsJsxElements walks the whole Program for JSXOpeningElements whose JSXIdentifier name is the lowercase literal "html" or "body", and the report names whichever of the two is absent. global-error replaces the unmounted root layout, so it must render its own <html><body>. False positive: the tags exist but the walker missed them because they are not literal lowercase JSX identifiers — e.g. <body> is produced by a wrapper/layout component, spread, or a styled/aliased element (Html from a constant, an uppercase styled-components Body) rather than written inline; also a file that merely re-exports a global-error component defined elsewhere where the JSX lives in the imported module.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Render your own document shell inside the GlobalError component since the root layout is unmounted on a global error: return <html><body><h2>Something went wrong</h2><button onClick={() => reset()}>Try again</button></body></html>, accepting ({ error, reset }) props and keeping the file a Client Component with 'use client' at the top. Both <html> and <body> must be present as literal lowercase tags — inline them rather than relying on a shared layout component. See https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
