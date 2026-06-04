# `react-doctor/prefer-dynamic-import`

Use `const Component = dynamic(() => import('library'), { ssr: false })` from next/dynamic or React.lazy()

- **Category:** Bundle Size
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a static ImportDeclaration whose source is one of the rule's tracked heavy libraries: @monaco-editor/react, monaco-editor, recharts, @react-pdf/renderer, react-quill, @codemirror/view, @codemirror/state, chart.js, react-chartjs-2, @toast-ui/editor, or draft-js. False positive: type-only imports (the rule does not currently skip importKind === "type") or critical above-the-fold UI that must SSR.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the static import with next/dynamic — const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false }) — or React.lazy(() => import("recharts")) wrapped in a <Suspense> boundary. Disable SSR for browser-only libraries like Monaco and CodeMirror that touch window during evaluation. See https://nextjs.org/docs/app/guides/lazy-loading
