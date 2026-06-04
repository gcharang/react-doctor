# `react-doctor/preact-prefer-ondblclick`

Rename onDoubleClick to onDblClick on host elements: <li onDblClick={openInline}> — Preact uses DOM event names

- **Category:** Preact
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** preact
- **Enabled when:** framework=preact and capabilities=preact
- **Documentation:** <https://preactjs.com/guide/v10/differences-to-react/>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose name is a JSXIdentifier starting with a lowercase letter (a host/DOM element like li, button, div) that has a JSX attribute named exactly onDoubleClick — found via findJsxAttribute(node.attributes, "onDoubleClick"). Preact registers listeners under browser-spec DOM event names (dblclick), so a React-style onDoubleClick handler attaches to a non-existent doubleclick event and silently never fires. False positive: onDoubleClick on a capitalised custom component such as <Item onDoubleClick={openInline}> — there it is just a user-defined prop, not a DOM event, so the rule skips non-lowercase tag names; also onDblClick (already correct) is not flagged. The engine already gates on pure-preact (Preact in deps and no react package), so projects on preact/compat that mirror React event names will not reach this rule.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rename the JSX attribute from onDoubleClick to onDblClick so it matches Preact's DOM event name (the dblclick event), keeping the same handler value: change <li onDoubleClick={openInline}> to <li onDblClick={openInline}>. Apply only on lowercase host elements; leave onDoubleClick on capitalised custom components untouched since that is an ordinary prop. See https://preactjs.com/guide/v10/differences-to-react/
