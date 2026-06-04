# `react-doctor/nextjs-no-use-search-params-without-suspense`

Wrap the component using useSearchParams: `<Suspense fallback={<Skeleton />}><SearchComponent /></Suspense>`

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Flags useSearchParams() calls in any file that doesn't also contain a <Suspense> JSX element or import Suspense from 'react'. This is a file-level heuristic mirroring Next's own ESLint rule — false negative if Suspense is imported in the file for an unrelated reason. Confirm no Suspense ancestor exists in any parent file before treating it as a true positive.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Extract the component calling useSearchParams() into its own file/component and wrap it: <Suspense fallback={<Skeleton />}><ChildUsingSearchParams /></Suspense>. Without the boundary, Next.js opts the entire route into client-side rendering, defeating static prerendering and streaming. https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering
