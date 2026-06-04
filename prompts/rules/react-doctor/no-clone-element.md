# `react-doctor/no-clone-element`

Pass children, render props, or Children.map instead of cloning elements with React.cloneElement.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-clone-element>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a bare cloneElement(...) call when cloneElement was imported from "react", or on a member call NS.cloneElement(...) — including React["cloneElement"](...), React?.cloneElement(...), a parenthesized callee, and an aliased default import — when NS resolves to the "react" import. Calls to a cloneElement imported from another module, a locally declared cloneElement, or occurrences inside comments are not flagged. False positive: legitimate child-prop injection in HOCs and headless-UI libraries (Radix, Headless UI) where cloning a passed child to merge props is the intended, idiomatic pattern — this is a style opinion, not a bug, so confirm only when a simpler composition alternative clearly applies.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Restructure so the parent passes data down instead of mutating a cloned child: accept children, expose a render prop, or iterate with Children.map. For injecting props into a single child, prefer a render-prop callback — e.g. renderItem={(props) => <Row {...props} />} — or have the consumer spread the props directly, instead of cloneElement(child, extraProps). See https://oxc.rs/docs/guide/usage/linter/rules/react/no-clone-element
