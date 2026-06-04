# `react-doctor/html-no-nested-interactive`

Hoist the inner interactive element out, or make the outer one a non-interactive wrapper: change <a><a/></a> to <a/> next to <a/>, or wrap with <div>/<span>

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#interactive_content>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose name is the JSXIdentifier "a" or "button" (only those two tags) when findEnclosingSameTag walks up from the opening element's grandparent and finds any JSXElement ancestor with the SAME tag name — so <a href><a/></a> and <button><span><button/></span></button> both fire, since the walk recurses through arbitrary intermediate elements AND straight through user-component boundaries (e.g. <a><Wrapper><a/></Wrapper></a> where Wrapper passes children through). False positive boundary, derived from the valid fixtures: a lone <a> with no same-tag ancestor; a <button> nested inside an <a> (different interactive types never cross-trigger — the inner tag must match the outer); and adjacent same-tag siblings like two <a> elements under a shared <div> (siblings are not ancestors). Also note the rule only sees in-component JSX ancestry, so an <a> rendered by a child component that is itself wrapped in an outer <a> is not caught here (preact/debug catches that cross-component case at runtime instead).

## Fix prompt

Use this once validation confirms the diagnostic is real.

The HTML parser auto-closes the outer interactive element when it hits a same-type nested one, so the rendered DOM splits apart from the JSX and breaks event delegation, focus order, and screen-reader landmarks. Fix by removing the nesting: hoist the inner <a>/<button> to be a sibling of the outer one rather than its descendant, or replace the OUTER interactive element with a non-interactive wrapper — turn <a href><a/></a> into a <div>/<span> wrapper containing the single real <a>, and split a <button> wrapping a <button> into two independent buttons or a button beside a non-button container. See https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#interactive_content
