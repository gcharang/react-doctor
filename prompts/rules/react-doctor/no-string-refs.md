# `react-doctor/no-string-refs`



- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-string-refs.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on string-literal ref attributes (<div ref="hello" />) and on this.refs.<name> member reads — the legacy string-ref API removed in React 19. With noTemplateLiterals: true it also flags template-literal refs like ref={`hello`}. False positive: an uppercase custom component <Foo ref="hello" /> where the consumer treats ref as a plain string identifier rather than a React ref — rare but possible since the rule does not distinguish DOM elements from components.

## Fix prompt

Use this once validation confirms the diagnostic is real.

In class components, store the ref via createRef: this.helloRef = createRef() in the constructor, ref={this.helloRef} on the JSX, this.helloRef.current to read. In function components use useRef(null) and accept ref as a normal prop (React 19+) or wrap with forwardRef (React 16-18). Callback refs (ref={(el) => { this.hello = el }}) also work. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-string-refs.html and https://react.dev/reference/react/createRef
