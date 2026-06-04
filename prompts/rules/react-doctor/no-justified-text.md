# `react-doctor/no-justified-text`

Use `text-align: left` for body text, or add `hyphens: auto` and `overflow-wrap: break-word` if you must justify

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the inline style sets textAlign: 'justify' WITHOUT a sibling hyphens: 'auto' or WebkitHyphens: 'auto' on the same object. False positive: print, PDF, or eBook renderers that ship their own hyphenation engine — not a concern for typical web body copy.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Switch textAlign to 'left' (or 'start' for RTL-aware i18n). If justification is required, add hyphens: 'auto', overflowWrap: 'break-word', and set the element's lang attribute so the browser hyphenates correctly. See https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
