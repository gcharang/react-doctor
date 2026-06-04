# `react-doctor/no-many-boolean-props`

Split into compound components or named variants: `<Button.Primary />`, `<DialogConfirm />` instead of stacking `isPrimary`, `isConfirm` flags

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a component accepts 4 or more props whose names match is|has|should|can|show|hide|enable|disable|with followed by an uppercase letter (e.g. isPrimary, hasIcon, showHeader, canEdit). Both destructured ({ isPrimary }) and props.isPrimary member-access forms are detected. The name-based heuristic can catch non-boolean props using those prefixes (e.g. withIconSize: number), so confirm they really are mutually-exclusive booleans.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the flags with a discriminated variant prop (variant: "primary" | "danger") or split into compound subcomponents (<Button.Primary />, <DialogConfirm />) so consumers select one explicit shape rather than juggling mutually-exclusive booleans. Compound components fit best when variants share most internals but differ in slot composition. See https://kentcdodds.com/blog/compound-components-with-react-hooks
