# `react-doctor/nextjs-no-css-link`

Import CSS directly: `import './styles.css'` or use CSS Modules: `import styles from './Button.module.css'`

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Flags <link rel="stylesheet" href="..."> JSX elements with a string-literal href and rel="stylesheet". Google Fonts URLs are explicitly excluded (covered by nextjs-no-font-link). Preload, preconnect, and dns-prefetch <link> tags are not flagged.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Import the CSS directly so Next.js bundles, minifies, and code-splits it: import './styles.css' for globals (root layout only) or import styles from './Button.module.css' for scoped CSS Modules. Tailwind/PostCSS pipelines also work via the entry CSS import. https://nextjs.org/docs/app/getting-started/css
