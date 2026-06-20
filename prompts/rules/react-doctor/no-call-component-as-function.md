# `react-doctor/no-call-component-as-function`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Component called as a function
- **Severity:** warn
- **Category:** Bugs
- **Framework:** global

## Recommendation

Render components as JSX (`<Component />`), never call them like functions (`Component(props)`). A direct call runs the component outside React and breaks hooks, state, and memoization.
