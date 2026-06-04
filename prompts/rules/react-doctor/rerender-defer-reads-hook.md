# `react-doctor/rerender-defer-reads-hook`

Read the URL state inside the handler (e.g. `new URL(window.location.href).searchParams`) so the component doesn't subscribe and re-render on every URL change

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a binding from useSearchParams, useParams, or usePathname (router hooks shared by Next.js App Router and react-router-dom) is referenced ONLY from inside event handlers — never from render-time code or JSX. The subscription causes the component to re-render on every URL change just to read the value at click time.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Drop the hook and read the URL inside the handler: const params = new URL(window.location.href).searchParams, or window.location.pathname for the pathname case. For repeated reads expose the underlying API behind a small custom hook that returns a getter rather than subscribing. See https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
