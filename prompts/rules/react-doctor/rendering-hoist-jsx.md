# `react-doctor/rendering-hoist-jsx`

Move the static JSX to module scope: `const ICON = <svg>...</svg>` outside the component so it isn't recreated each render

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a const X = <jsx>...</jsx> (element or fragment) declared inside a PascalCase component body, where the JSX contains NO {expression} interpolations and NO {...spread} attributes — meaning it references no prop, state, or local binding. React creates a new element object on every render.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the declaration outside the component to module scope: const ICON = <svg>...</svg>. The element is created once at module load and reused across every render. If you later need props, lift it into its own component instead of inlining state. See https://react.dev/learn/keeping-components-pure
