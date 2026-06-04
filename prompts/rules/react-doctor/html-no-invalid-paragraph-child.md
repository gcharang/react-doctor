# `react-doctor/html-no-invalid-paragraph-child`

Replace the wrapping <p> with a <div>, or hoist the block-level child out of the paragraph

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose JSXIdentifier name is one of the 31 block-level tags in BLOCK_LEVEL_ELEMENTS (address, article, aside, blockquote, details, div, dl, fieldset, figcaption, figure, footer, form, h1-h6, header, hgroup, hr, main, menu, nav, ol, p, pre, search, section, table, ul) AND findEnclosingParagraph finds a <p> ancestor anywhere up the chain, where isParagraphElement requires a JSXElement whose opening name is a literal lowercase JSXIdentifier named exactly "p". The walk starts at the grandparent (openingElement.parent.parent) so a <p> never matches its own opening tag, and it deliberately walks straight through user-component boundaries, so <p><Wrapper><div/></Wrapper></p> and arbitrarily deep nesting like <p><span><strong><ul/></strong></span></p> still fire. Suppress ONLY when no literal lowercase <p> JSXIdentifier wraps the element anywhere up the ancestor chain — e.g. the paragraph is an aliased/styled <P> or a member-expression component (styled.p), which isParagraphElement does not match; inline phrasing children like <em>, <strong>, or <a> are valid inside <p> and are never flagged. Do NOT suppress the case where an intervening component discards its children or renders them into a portal so no real <p> exists at runtime: the source knowingly tolerates this as a narrow, accepted false positive and still fires, because bailing on components would silence almost every real bug.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Stop nesting a block-level element inside <p>: either swap the offending <p> for a <div> (e.g. <p><div>…</div></p> becomes <div><div>…</div></div>) or move the block child out so it is a sibling of the paragraph rather than a descendant. A <p> permits phrasing content only, so the browser parser implicitly closes the paragraph at the start of the block child, producing a DOM that differs from your JSX and causing hydration mismatches, broken descendant CSS selectors, and a corrupted accessibility tree. If you only need block-like spacing, keep phrasing content and style the <p> instead of introducing a nested block element. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
