# `react-doctor/nextjs-no-script-in-head`

Move <Script> out of <Head>: next/script ignores head placement, so a Script nested in Head silently never loads

- **Category:** Next.js
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs
- **Documentation:** <https://nextjs.org/docs/app/api-reference/components/script>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose name is the JSXIdentifier "Script" while insideHeadDepth > 0; that depth is a single flat counter incremented by every non-self-closing <Head> opening element and decremented on every </Head> closing element (clamped at 0 via Math.max(0, insideHeadDepth - 1), not stack-based tag pairing), so any <Script> appearing anywhere between an open <Head> and a </Head> is flagged regardless of nesting depth. Matching is purely by the literal identifier names Head and Script — the import source is never checked. False positive: a locally-defined or aliased component that happens to be named Script (or a Head that is not next/head, e.g. a styled-components Head or a custom layout Head wrapper) — confirm both resolve to next/script and next/head before reporting; a self-closing <Head /> never opens a head scope so a sibling <Script> after it is correctly not flagged.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Lift the <Script> out of the <Head> block: next/script manages its own DOM placement and ignores head context, so a Script nested in Head silently never loads. Render it as a sibling of <Head> in the page/component body, e.g. change <Head><title>...</title><Script src="..." /></Head> to <><Head><title>...</title></Head><Script src="..." strategy="afterInteractive" /></>, choosing the appropriate strategy. See https://nextjs.org/docs/app/api-reference/components/script
