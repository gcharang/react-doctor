# `react-doctor/no-find-dom-node`

Use refs (useRef/createRef) to access DOM nodes instead of the removed findDOMNode API.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-find-dom-node>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any call expression whose callee is a bare findDOMNode(...) identifier or a member call <NS>.findDOMNode(...) where <NS> is exactly React, ReactDOM, or ReactDom — findDOMNode was deprecated in 2018 and removed entirely in React 19. Calls through any other object (SomeModule.findDOMNode(this)) do not fire, and merely referencing it without calling (this.fn = React.findDOMNode) is also ignored. False positive: a locally defined helper coincidentally named findDOMNode that has nothing to do with React still trips the bare-identifier check, since the rule keys only on the callee name.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Attach a ref to the element you need and read the node from it instead of locating it after render: const ref = useRef(null) (or createRef() in a class), pass ref={ref} to the JSX, then use ref.current. If you only needed it to scroll or measure, call ref.current.scrollIntoView() / getBoundingClientRect() directly — there is no replacement for findDOMNode in React 19, so the call must be removed. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-find-dom-node
