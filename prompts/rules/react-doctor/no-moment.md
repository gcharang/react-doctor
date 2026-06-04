# `react-doctor/no-moment`

Replace with `import { format } from 'date-fns'` (tree-shakeable) or `import dayjs from 'dayjs'` (2kb)

- **Category:** Bundle Size
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an ImportDeclaration whose source is exactly "moment" — roughly 300kb of locales plus a mutable Moment object that defeats tree-shaking. The rule does not flag moment-timezone, moment-duration-format, or dayjs/plugin/moment; it targets only the core package import.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Migrate to a tree-shakeable alternative — date-fns for functional, immutable APIs (import { format } from "date-fns") or dayjs (~2kb gzipped) for a near-drop-in moment-compatible chainable API. Both expose locale and timezone packages on demand. See https://momentjs.com/docs/#/-project-status/
