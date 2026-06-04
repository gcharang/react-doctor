# `react-doctor/js-cache-property-access`

Hoist the deep member access into a const at the top of the loop body: `const { x, y } = obj.deeply.nested`

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires when the same non-computed deep member chain (depth >= 2 dots, e.g. obj.a.b.c) is read 3 or more times inside one loop body, counting only the deepest reference per chain. False positive if any segment is a getter with intentional side effects, the nested object reference is reassigned mid-loop, or the chain crosses a Proxy you want to re-trigger.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist at the top of the loop body: const { x, y } = obj.deeply.nested; or const target = obj.deeply.nested; then reuse target.x / target.y. Skips re-walking the prototype chain and re-invoking any getters along the path on every iteration. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
