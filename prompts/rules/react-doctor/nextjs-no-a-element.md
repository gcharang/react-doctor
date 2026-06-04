# `react-doctor/nextjs-no-a-element`

`import Link from 'next/link'` — enables client-side navigation, prefetching, and preserves scroll position

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Only flags <a> tags whose href is a string literal starting with / (internal app routes). External URLs, hash anchors (#section), mailto:/tel: links, and dynamic href expressions are intentionally ignored. Confirm the link is in-app navigation rather than a download link or a target="_blank" doc reference.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace with <Link href="/path"> imported from next/link. It prefetches the destination route on viewport entry, performs client-side navigation without a full reload, and preserves scroll position by default. https://nextjs.org/docs/app/api-reference/components/link
