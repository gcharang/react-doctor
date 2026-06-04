# `react-doctor/nextjs-no-img-element`

`import Image from 'next/image'` — provides automatic WebP/AVIF, lazy loading, and responsive srcset

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Flags every native <img> JSX element except those inside an OG image route (path matches /og). False positive when the <img> is required inside an MDX/markdown renderer, sanitized email template, or third-party embed where next/image's loader cannot resolve runtime URLs.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace with <Image src={src} alt={alt} width={W} height={H} /> from next/image. For unknown dimensions use the fill prop with a positioned parent and a sizes attribute. Whitelist external hosts via images.remotePatterns in next.config.js. https://nextjs.org/docs/app/api-reference/components/image
