# `react-doctor/no-create-ref-in-function-component`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** createRef in function component
- **Severity:** warn
- **Category:** Bugs
- **Framework:** global

## Recommendation

Replace `createRef()` with the `useRef()` hook inside function components and hooks. `createRef` is only for class components.
