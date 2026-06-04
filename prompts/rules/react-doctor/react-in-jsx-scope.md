# `react-doctor/react-in-jsx-scope`

If on React 17+ with the new JSX transform, disable this rule; otherwise import React at the top of the file.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/react-in-jsx-scope>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires once per JSX usage (any JSXOpeningElement or JSXFragment) in a file where the identifier `React` is not bound anywhere in the module — relevant only to the classic JSX transform, which expands `<a/>` to `React.createElement('a')`. The check has no scope analysis: any module-level binding named `React` (import, var, function param, etc.) suppresses it for the whole file, matching OXC. False positive: projects on React 17+ using the automatic runtime (tsconfig `jsx: "react-jsx"` or Babel `runtime: "automatic"`) never need React in scope, so every finding here is a non-issue and the rule should simply be off.

## Fix prompt

Use this once validation confirms the diagnostic is real.

If the project targets the automatic JSX runtime (React 17+ with tsconfig `jsx: "react-jsx"` or Babel `runtime: "automatic"`), disable this rule rather than adding imports — React is injected for you. If you are genuinely on the classic transform, add `import React from 'react';` at the top of the file so `React.createElement` resolves. See https://oxc.rs/docs/guide/usage/linter/rules/react/react-in-jsx-scope
