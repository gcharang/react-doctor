# `react-doctor/no-inline-exhaustive-style`

Move styles to a CSS class, CSS module, Tailwind utilities, or a styled component — inline objects with many properties hurt readability and create new references every render

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Count the literal Property nodes inside the JSX style={{...}} ObjectExpression — the rule fires at 8 or more (spread elements are not counted). If most properties are dynamic per-render values such as computed positions or chart coordinates, the inline object is justified and this is a false positive.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Extract the static properties to a CSS class, CSS Module, Tailwind utilities, or a styled component; leave only the dynamic ones inline. This stabilizes object identity across renders and centralizes styling for reuse and theming. See https://react.dev/reference/react-dom/components/common#applying-css-styles
