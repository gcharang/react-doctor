# `react-doctor/nextjs-image-missing-sizes`

Add sizes for responsive behavior: `sizes="(max-width: 768px) 100vw, 50vw"` matching your layout breakpoints

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Flags a JSX element named Image with the fill prop but no sizes prop. False positive if Image is a custom component rather than next/image — check the import. Also low-impact when the image renders at a fixed pixel size since the browser still picks a sensible source.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add a sizes prop matching your layout breakpoints, e.g. sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw". Without it Next.js falls back to 100vw and the browser downloads the largest source from the generated srcset. https://nextjs.org/docs/app/api-reference/components/image#sizes
