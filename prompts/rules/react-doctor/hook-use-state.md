# `react-doctor/hook-use-state`

Destructure useState as `const [thing, setThing] = useState(…)`.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/hook-use-state>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a useState() call that isn't destructured into exactly a two-element array `[value, setter]` whose setter is a plain identifier named `set<Value>` — flagging non-destructured `const x = useState()`, wrong arity `[a, b, c]`, an object/array pattern in the setter slot `[res, {}]`, a destructured value `[{ res }, setRes]` (unless settings `react-doctor.hookUseState.allowDestructuredState` is true), value names that don't start with a lowercase letter like `RGB` (no `set<X>` is derivable), and mismatched setters like `[color, updateColor]`. A bare `return useState(...)` is exempt. False positive: idiomatic patterns the convention deliberately breaks — the unused-marker `const [count, _setCount]` and the create-once `const [instance] = useState(() => new Foo())` where the setter is intentionally omitted.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rename the pair to the symmetric convention `const [thing, setThing] = useState(…)` so the setter is `set` + the capitalized value name (`[color, setColor]`, not `[color, updateColor]`). Use a value name starting with a lowercase letter so a `set<X>` form exists (`[rgb, setRgb]` rather than `[RGB, setRGB]`), and destructure into exactly two identifier elements — for an object/array initial value keep `[state, setState]` and read fields off `state`, or opt into `react-doctor.hookUseState.allowDestructuredState` if you genuinely want `[{ res }, setRes]`. See https://oxc.rs/docs/guide/usage/linter/rules/react/hook-use-state
