# `react-doctor/nextjs-async-client-component`

Fetch data in a parent Server Component and pass it as props, or use useQuery/useSWR in the client component

- **Category:** Next.js
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Triggers when the file has a top-level 'use client' directive AND contains an async function or arrow function with a PascalCase (uppercase) name. Confirm the async keyword is on the exported component itself (not on an inner helper or a non-component utility) and that the file is actually a client module rather than a misclassified server file.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the async keyword from the client component. Move data fetching to a parent Server Component and pass the resolved data via props, or fetch inside the client component with TanStack Query, SWR, or React's use() hook. Pages Router uses getServerSideProps/getStaticProps instead. https://nextjs.org/docs/app/getting-started/fetching-data
