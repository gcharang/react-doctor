# `react-doctor/no-noninteractive-element-to-interactive-role`

Use a semantic interactive element instead of role-promoting a non-interactive one.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-to-interactive-role>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX element with a static string role= whose first space-separated token is an interactive role (button, link, checkbox, menuitem, etc.) when the element resolves to a non-interactive HTML tag — e.g. <li role="button">, <h2 role="menuitem">, <table role="button">. Element/role pairs in the allow table are exempt: ul/ol may take menu, menubar, radiogroup, tablist, tree, treegrid; li may take menuitem, menuitemcheckbox, menuitemradio, row, tab, treeitem; fieldset may take radiogroup or presentation. False positive / non-trigger: only literal-string roles are inspected — a dynamic role={expr}, a forwarded {...props}, or a custom (non-HTML-tag) component is silently skipped, so anything reported here has a hardcoded interactive role string and is almost always a genuine semantic mismatch.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the non-interactive element with the semantic interactive element the role implies, dropping the role entirely: <h2 role="button">Save</h2> becomes <button type="button">Save</button>, and <li role="menuitem"> belongs inside a <ul role="menu"> using the allowed li roles. If the markup must stay a container, remove the interactive role and move the control into a real <button>/<a> child instead of promoting the wrapper. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-to-interactive-role
