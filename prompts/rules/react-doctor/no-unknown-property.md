# `react-doctor/no-unknown-property`



- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-unknown-property.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a lowercase JSX tag (treated as a DOM element) carries an attribute that isn't a recognized HTML/SVG property, uses the HTML spelling instead of React's camelCased form (class vs className, for vs htmlFor, tabindex vs tabIndex), or is an invalid aria-* typo. Hyphenated custom web components and uppercase React components are ignored. False positive: library-injected props such as emotion's css or framer-motion's animation props — allowlist them via the rule's ignore option.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rename to React's camelCased equivalent: class to className, for to htmlFor, tabindex to tabIndex, contenteditable to contentEditable, spellcheck to spellCheck, autofocus to autoFocus. Fix typos in aria-* against the ARIA spec. For library props like emotion's css or framer-motion's transition, allowlist via { ignore: ['css', 'transition'] } in the rule config. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-unknown-property.html and https://react.dev/reference/react-dom/components/common
