# `react-doctor/preact-prefer-oninput`

Replace onChange with onInput on text-like inputs: onInput={(e) => setQuery(e.currentTarget.value)}

- **Category:** Preact
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** preact
- **Enabled when:** framework=preact and capabilities=preact
- **Documentation:** <https://preactjs.com/guide/v10/differences-to-react/#use-oninput-instead-of-onchange>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement that is a <textarea>, or an <input> with no type attribute, or an <input> whose type string is not one of checkbox/radio/file (COMPAT_EXEMPT_INPUT_TYPES) — when that element also carries an onChange JSX attribute (so type="text", "password", "email", "number", and a dynamic type={expr} that the rule assumes is text-like all match). False positive: an element already using onInput rather than onChange, a <select> (only input and textarea match), and type="checkbox"/"radio"/"file" inputs whose native change event already fires correctly. Also suppress if preact/compat is loaded anywhere in the project — its renderer-level remap makes core onChange behave like onInput — though the engine already gates this via pure-preact (react present in deps means the rule sits out), so do not suppress merely because a given file imports only from preact/hooks.

## Fix prompt

Use this once validation confirms the diagnostic is real.

In Preact core, onChange on text-like inputs only fires on blur, not per keystroke, so controlled inputs lag. Rename the attribute to onInput, keeping the same handler: change onChange={(e) => setQuery(e.currentTarget.value)} to onInput={(e) => setQuery(e.currentTarget.value)} on the <input>/<textarea>. Alternatively, if the project can adopt preact/compat, importing it remaps onChange automatically and no per-element change is needed. See https://preactjs.com/guide/v10/differences-to-react/#use-oninput-instead-of-onchange
