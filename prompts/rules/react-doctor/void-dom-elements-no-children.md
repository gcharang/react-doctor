# `react-doctor/void-dom-elements-no-children`

Remove children from the void element, or use a non-void element if children are needed.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/void-dom-elements-no-children>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a void DOM element (area, base, br, col, embed, hr, img, input, keygen, link, menuitem, meta, param, source, track, wbr) is given content it cannot render: JSX children between tags, a `children` prop, or a `dangerouslySetInnerHTML` prop — and the same via React.createElement('br', props, ...children) where the props object carries children/dangerouslySetInnerHTML or extra child arguments are passed. The tag and props must be statically visible, so detection keys off the literal element name and explicit attribute keys. False positive: a spread alone (`<img {...props} />`) is NOT flagged because the static check can't see forwarded children — but adding an explicit `children` attr beside the spread (`<img {...props} children='Foo' />`) still fires regardless of what the spread contains.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the children from the void element — they are silently dropped by the DOM, so the content almost always belongs elsewhere: drop the stray text/`children`/`dangerouslySetInnerHTML`, or move the content into a real container (`<span>{label}</span><br />` instead of `<br>{label}</br>`). If the element was meant to hold content, swap it for a non-void element (e.g. use `<div>` or `<span>` rather than `<img>`/`<br>`). See https://oxc.rs/docs/guide/usage/linter/rules/react/void-dom-elements-no-children
