# `react-doctor/no-render-prop-children`

Replace `renderXxx` props with compound subcomponents (e.g. `<Modal.Header>`) or `children` so the parent doesn't dictate every customization point

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a single JSX opening element receives 3 or more attributes whose names match render followed by an uppercase letter (e.g. renderHeader, renderFooter, renderActions on one component). A single render prop is intentionally ignored (MUI Autocomplete's renderInput, FlatList's renderItem, react-hook-form Controller's render). Confirm the element owns this surface area rather than transparently forwarding a library API.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the renderXxx slots with compound subcomponents that consumers freely compose (<Modal><Modal.Header>...</Modal.Header><Modal.Body>...</Modal.Body></Modal>), or accept structured children and discover slots via React.Children. Consumers no longer need to know every customization point ahead of time, and slot ordering becomes their concern. See https://kentcdodds.com/blog/compound-components-with-react-hooks
