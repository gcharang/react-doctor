# `react-doctor/no-generic-handler-names`

Rename to describe the action: e.g. `handleSubmit` → `saveUserProfile`, `handleClick` → `toggleSidebar`

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only when a JSX prop literally mirrors its handler on a generic DOM event: onClick={handleClick}, onChange={handleChange}, onInput={handleInput}, onBlur={handleBlur}, onFocus={handleFocus}. Anything else (onClick={openModal}, onSubmit={...}, custom event names, inline arrow functions) is ignored, so false positives are rare. Confirm the handler name carries zero semantic information about what the action actually does.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rename the handler at its definition and every call site to describe the action it performs, e.g. handleClick to toggleSidebar, handleChange to updateSearchQuery, handleSubmit to saveUserProfile. Use an IDE rename refactor so React DevTools traces and stack frames stay readable. See https://react.dev/learn/responding-to-events#naming-event-handler-props
