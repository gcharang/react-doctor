# `react-doctor/role-supports-aria-props`

Use only aria-* props that are supported by the element's explicit or implicit ARIA role.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-supports-aria-props>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSX element carries an aria-* prop that is a real ARIA property but is not in the supported-props set for that element's effective role. An explicit role="..." wins; otherwise an implicit role is inferred from the tag plus a few static attributes (e.g. <a href>/<area href>/<link href>→link, <ul>/<ol>→list, <details>→group, <aside>→complementary, <input type="radio">→radio). Elements with no resolvable role are skipped — e.g. <a>/<area>/<link> without href, or an unknown/invalid role string. False positive: the role is computed only from statically-visible markup, so an aria prop or a role/href/type that arrives via a spread like {...props} is invisible — <div role="presentation" {...props} /> passes, and a spread-supplied aria prop on a roled element is not seen either; custom components only get an implicit role when mapped via the jsx-a11y components setting.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Drop or replace the unsupported aria-* prop with one the role allows, or change the element/role so the attribute is valid. For example, <li role="radio" aria-required /> should use a radio-supported state like aria-checked instead (aria-checked={selected}), since the radio role allows aria-checked but not aria-required. Likewise aria-expanded on <ul>/<ol> (implicit role=list) or <details> (implicit role=group) is unsupported, so move it to an element/role that allows it such as a button or combobox. Check the role's allowed states and properties in the ARIA spec before keeping the attribute. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-supports-aria-props
