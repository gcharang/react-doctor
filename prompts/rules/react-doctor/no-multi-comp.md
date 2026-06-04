# `react-doctor/no-multi-comp`

Move secondary components into their own files.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/no-multi-comp>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a single non-test file declares 3 or more React components — counting ES6 classes, named functions returning JSX, const arrows/functions returning JSX or null, memo/forwardRef HoC wrappers (including React.* and scope-aliased names), createReactClass, PascalCase object-method values, and exports.Foo assignments — reporting every component after the first. Files with 2 or fewer components never fire, and thin passthrough wrappers (a single `return <Foo {...props} ref={ref} />` with up to 6 attrs), test/story/cypress files, shadcn-style barrels (4+ comps, ~70%+ exported), and feature modules with a small exported surface plus private helpers are all exempted. False positive: a cohesive feature file whose private helper components don't quite match the barrel/feature-module heuristics but are genuinely implementation details of the one exported component.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move each secondary component into its own file and import it, keeping one component per file (e.g. extract `HelloAgain` from `Hello.tsx` into `HelloAgain.tsx`). If the extra components are tightly-coupled private helpers of a single exported component, co-locate them but keep the public surface to one component, or group them as a barrel/feature module so the heuristic recognizes the intent. For thin trampolines, collapse them to a single-return passthrough (`(props, ref) => <Foo {...props} ref={ref} />`) so they aren't counted. See https://oxc.rs/docs/guide/usage/linter/rules/react/no-multi-comp
