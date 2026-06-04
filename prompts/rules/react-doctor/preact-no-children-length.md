# `react-doctor/preact-no-children-length`

Wrap with toChildArray(children) from preact before reading .length or calling array methods on props.children.

- **Category:** Preact
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** preact
- **Enabled when:** framework=preact and capabilities=preact
- **Documentation:** <https://preactjs.com/guide/v10/api-reference/#tochildarray>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a non-computed MemberExpression whose property identifier is one of length, map, forEach, filter, find, reduce, some, every, flat, flatMap, indexOf, includes, slice, concat, or join (ARRAY_READ_METHOD_NAMES), AND whose object is the children tail of props.children, this.props.children, or a bare children identifier that destructures from the first param of the enclosing function as ({ children }) — e.g. props.children.length, props.children.map(...), this.props.children.forEach(...), or children.filter(...) inside function Wrapper({ children }). False positive boundary: already-normalized toChildArray(props.children).length or toChildArray(children).map(...); computed access props.children[method] or index access props.children[0]; React.Children.map(props.children, ...); .length on an unrelated prop like items.length; a local const children = fetchChildNodes() that is NOT a destructured prop; and a plain (children) => children.length helper where children is a positional (non-destructured) param of a non-component function — none of these fire.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Import toChildArray from preact and wrap the children value before any array access: change props.children.map(fn) to toChildArray(props.children).map(fn), props.children.length to toChildArray(props.children).length, and destructured children.forEach(fn) to toChildArray(children).forEach(fn). In Preact props.children is a single VNode (not an array) when there is exactly one child, so .map/.length/.forEach throw at runtime; toChildArray normalizes it to a flat array for zero, one, or many children. See https://preactjs.com/guide/v10/api-reference/#tochildarray
