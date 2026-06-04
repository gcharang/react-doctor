# `react-doctor/no-barrel-import`

Import from the direct path: `import { Button } from './components/Button'` instead of `./components`

- **Category:** Bundle Size
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the import source is a relative path (starts with ".") that resolves to an index.{js,ts,jsx,tsx,mjs,cjs} file containing only re-export declarations — the rule's resolver inspects the file and only fires when isBarrel is true, and it reports at most once per importing file. False positive: bundlers like Vite or Next.js with optimizePackageImports already tree-shake barrels well in production.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the barrel import with a direct path to each source module (e.g. import { Button } from "./components/Button" instead of from "./components"); the lint message already lists the resolved direct sources to copy. For third-party barrels in Next.js, prefer configuring optimizePackageImports over rewriting imports. See https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports
