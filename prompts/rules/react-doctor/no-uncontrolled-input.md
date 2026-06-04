# `react-doctor/no-uncontrolled-input`

Pass an explicit initial value to `useState` (e.g. `useState("")` instead of `useState()`), add `onChange` (or `readOnly` to opt out) when you supply `value`, and drop `defaultValue` on controlled inputs — React ignores it

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule walks component bodies for <input>, <textarea>, and <select> with a value attribute, then reports three shapes: (1) value with neither onChange nor readOnly, (2) value AND defaultValue together, or (3) value={state} where state was initialized as useState() with no argument or useState(undefined). The rule bails when any {...spread} attribute is present, so react-hook-form, Radix, and Headless UI are safe.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Initialize useState with a concrete value (useState(''), useState(false)) and pair value with onChange (controlled) or readOnly (intentionally non-editable). Drop defaultValue when value is also set — React ignores it on controlled inputs. Use checked rather than value for checkboxes and radios. See https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
