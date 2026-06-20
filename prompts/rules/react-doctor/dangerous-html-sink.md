# `react-doctor/dangerous-html-sink`

Passing user- or request-derived data into an HTML sink like `dangerouslySetInnerHTML` or `innerHTML` without sanitizing it allows cross-site scripting.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.tsx) only; generated/minified bundles, tests/build/docs/generated paths, and email templates (emails/, *Email.tsx, RawHtml) skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an HTML-injection sink — JSX `dangerouslySetInnerHTML`, a `.innerHTML`/`.outerHTML =` (or `+=`) assignment, `.insertAdjacentHTML(`, `document.write(ln)(`, `Range.createContextualFragment(`, or `Element.setHTMLUnsafe(` — whose VALUE looks dynamic/tainted: it matches `searchParams`/`query`/`params`/`req.`/`request`/`props.`/`children`/`content`/`html`/`body`/`text`/`message`/`location`/`document.cookie`/`referrer`/`localStorage`/`sessionStorage`/`URLSearchParams`/`window.name`/`await`/`fetch`/`data.`/`result.`. Only the value expression handed to the sink is judged, not the surrounding code. FALSE POSITIVE to suppress: heavily pre-exempted — a pure string literal or ALL-CAPS module constant, a value run through a sanitizer (`DOMPurify`/`sanitize*`/`escapeHtml`/`encode*Html`) at the sink or its definition, output of an escaping serializer/highlighter (`renderToString`/`toHtml`/`codeToHtml`/Shiki/Prism/KaTeX, or a `highlighted*`-named value), `process.env` or i18n (`t()`, `intl`) values, DOM re-serialization (`a.innerHTML = b.innerHTML` without a `+`), inert parse targets (`<template>`, `createHTMLDocument`, a detached `createElement` read back as text), `<style dangerouslySetInnerHTML>`, and email templates — so a confirmed finding is HTML built from genuinely user/request-derived data with no sanitization on the path to the sink. The sanitizing `setHTML` API is intentionally not a sink.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Prefer rendering structured React nodes or setting `textContent` over injecting raw HTML. When HTML is unavoidable, sanitize the value at the trust boundary (for example `DOMPurify.sanitize(html)`) and pass only the sanitized result to the sink, on every code path that reaches it. For code or markdown, use a library that escapes its output (a syntax highlighter, or a markdown renderer with safe defaults). Never pass `location`, `document.cookie`, query params, or `props` straight into `innerHTML`/`dangerouslySetInnerHTML`.
