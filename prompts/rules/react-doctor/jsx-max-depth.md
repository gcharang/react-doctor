# `react-doctor/jsx-max-depth`

Extract deeply nested JSX into smaller components to keep render trees readable.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-max-depth>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a leaf JSX element/fragment whose total nesting exceeds the configured max (default 14, far higher than OXC's strict 2): the count sums its JSX ancestor depth plus the depth of any JSX it pulls in through expression containers like {child} or {<subtree/>}, resolving identifiers through their variable bindings (cycles broken by name). False positive: idiomatic deep composition — Provider stacks, design-system wrapper chains (a shadcn Card already nests several levels), and layout shells — can legitimately hit depth 10-13 without being unreadable, so depth alone is not a defect.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pull the deepest subtree into its own named component so each render function stays shallow — e.g. lift the inner <Modal>…</Modal> body into <ModalBody> and render <ModalBody /> in place. Hoisting a nested JSX expression into a separate component (rather than just a local variable, which the rule still counts through its binding) flattens the measured depth and improves readability. If the nesting is intentional and unavoidable for your design system, raise the threshold via the react-doctor.jsxMaxDepth.max setting instead of restructuring. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-max-depth
