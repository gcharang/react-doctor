# `react-doctor/no-render-in-render`

Extract to a named component: `const ListItem = ({ item }) => <div>{item.name}</div>`

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX expression {callee(...)} or {obj.method(...)} where the callee name matches render followed by an uppercase letter (renderItem, renderHeader, renderRow). The returned JSX is reconciled as part of the parent's output rather than as a stable component, breaking memoization and remounting children every render. Confirm the callee actually returns JSX and is not a helper that merely starts with render.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Extract the render function into a real named component (const ListItem = ({ item }) => <div>{item.name}</div>) and use it as JSX: <ListItem item={item} />. React can then reconcile by component identity, preserve internal state across renders, and surface it in the DevTools component tree. See https://react.dev/learn/your-first-component
