# `react-doctor/style-prop-object`

Pass the `style` prop as an object literal like `{{ color: 'red' }}`, never a string or other primitive.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/style-prop-object>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a `style` prop resolves to a non-object: a string/number/boolean/regex literal, a template literal, an identifier whose initializer is one of those, or a no-initializer binding whose TS type is a primitive (including a union like `string | undefined`). In JSX this only checks intrinsic lowercase HTML/SVG tags — custom (capitalized) components in JSX, plus any name in the `allow` list, are left alone. But the `React.createElement(...)` path checks the `style` key regardless of capitalization, so `React.createElement('div', { style: 'x' })` AND `React.createElement(MyComp, { style: 'x' })` both fire unless `MyComp` is allow-listed; object literals, `null`/`undefined`, member access (`props.styles`), `Object.assign(...)`, imports, spread props, and any unresolvable expression are always left alone.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pass `style` as an object whose keys are camelCased CSS properties, not a CSS string: change `<div style="color: red" />` to `<div style={{ color: 'red' }} />`, and `const s = 'color: red'` to `const s = { color: 'red' }`. If the value comes from a typed variable, widen or correct its type so it can only hold an object (or `null`/`undefined`). For a genuinely custom component that accepts string styles — whether rendered via JSX or `React.createElement(StatusBar, { style: 'auto' })` — add its name to the rule's `allow` setting rather than reshaping the value, since the createElement path checks capitalized components too. See https://oxc.rs/docs/guide/usage/linter/rules/react/style-prop-object
