# `react-doctor/tanstack-start-redirect-in-try-catch`

TanStack Router's `redirect()` and `notFound()` throw special errors caught by the router. Move them outside the try block or re-throw in the catch

- **Category:** TanStack Start
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on throw redirect(...) or throw notFound(...) located lexically inside a try block but not inside a catch clause. The rule does NOT verify whether the surrounding catch re-throws router errors. False positive: a catch that already isolates and re-throws redirect/notFound — the throw inside try is still flagged for visibility.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the throw outside the try, or in the catch re-throw router errors first: catch (err) { if (isRedirect(err) || err instanceof Response) throw err; ... }. Otherwise a broad catch swallows the special error TanStack Router uses internally to perform the navigation. See https://tanstack.com/router/latest/docs/framework/react/guide/navigation
