# `react-doctor/html-no-invalid-table-nesting`

Author each table element under its required host parent: thead/tbody/tfoot in <table>, tr in a row group, td/th in <tr>

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a lowercase-host JSXElement whose tag is in {table,thead,tbody,tfoot,tr,td,th} when its nearest JSXElement ancestor is a lowercase host element that violates HTML table nesting: thead/tbody/tfoot whose nearest host ancestor is not table; tr whose nearest host ancestor is neither a row group nor table; td/th whose nearest host ancestor is not tr; or a nested table whose enclosing host is another table element with no intervening td/th cell. The ancestor walk (findClosestHostAncestor) skips non-element wrappers — JSX fragments, {…} expression containers, ternary/logical/arrow-body wrappers — and stops at the FIRST JSXElement ancestor; a lowercase tag is that element's host parent, while a capitalized custom component, a member-expression name (<Table.Body>), or a namespaced name is opaque — the structural check bails and SUPPRESSES the moment such a non-host element is the first JSXElement encountered, rather than continuing up to find a real host. False positive boundary: SUPPRESS when the first JSXElement ancestor is a capitalized custom component (<TableBody>) or a member-expression name (<Table.Body>) — runtime DOM under those is opaque; a namespaced JSX name (e.g. <svg:circle>) hits the same opaque branch though it has no dedicated test. Also SUPPRESS when there is no JSXElement ancestor at all (a top-level <td> fragment returned by a component, composed into a real <tr> elsewhere); on a bare <table><tr> with no row group (browsers auto-insert tbody, so it is valid); and on a <table> nested inside a <td> OR <th> cell (legal HTML — both are valid containers for a nested table).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Author the markup to the HTML table contract so the runtime DOM matches the JSX: put <thead>/<tbody>/<tfoot> as direct children of <table>, wrap <tr> in a row group (or directly in <table>), and wrap every <td>/<th> in a <tr> — e.g. rewrite <table><td>x</td></table> to <table><tbody><tr><td>x</td></tr></tbody></table>. For a table inside a table, place the inner <table> within a <td> or <th> cell of the outer one. If the offending element's first JSXElement ancestor is a wrapper component (<TableBody>, <Table.Body>), confirm the composed runtime parent is correct rather than restructuring the literal JSX. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
