# `react-doctor/js-batch-dom-css`

Batch DOM/CSS reads and writes — interleaving them inside a loop causes layout thrashing. Read first, then write

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires when two or more adjacent ExpressionStatements each assign to a .style.<prop> chain (e.g. el.style.color = '...'; el.style.fontSize = '...';). It does not actually detect interleaved read/write layout thrashing — just adjacent style writes. False positive if the writes target different elements or are intentionally split around conditional logic that has to sit between them.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Batch into a single write: el.style.cssText = 'color: red; font-size: 12px' or el.setAttribute('style', '...'). Better, define a class in CSS and toggle with el.classList.add('active') to keep styling out of JS. If inside a loop with reads, do all reads first then all writes in a second pass to avoid forced synchronous layout. https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
