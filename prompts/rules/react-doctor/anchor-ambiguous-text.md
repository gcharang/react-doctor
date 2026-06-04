# `react-doctor/anchor-ambiguous-text`

Describe a link's destination — avoid bare 'click here' / 'learn more' / 'link' as the only link text.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-ambiguous-text>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when an element resolving to tag `a` has an accessible name that, after lowercasing, stripping `,.?¿!‽¡;:`, and collapsing whitespace, EXACTLY equals one of the ambiguous phrases — by default "click here", "here", "link", "a link", "learn more" (configurable via the `words` setting). The accessible name is the anchor's `aria-label` if present, else the alt of a child `img`, else the concatenated text of visible (non-aria-hidden) children. False positive / non-trigger: an ambiguous-looking link is fine when a descriptive `aria-label` supplies the real name (e.g. `<a aria-label="View Q3 pricing">click here</a>` does NOT fire); matching is exact, so "click here for details" never fires.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the bare phrase with text that names the destination, e.g. `<a href="/pricing">View pricing details</a>` instead of `<a href="/pricing">click here</a>`. If product/design requires keeping generic visible text, give the link a descriptive accessible name via `aria-label` (`<a aria-label="Read the setup guide">learn more</a>`), or move the phrase into a fuller sentence so the normalized text no longer matches an ambiguous word exactly. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-ambiguous-text
