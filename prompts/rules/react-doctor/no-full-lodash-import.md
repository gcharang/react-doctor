# `react-doctor/no-full-lodash-import`

Import the specific function: `import debounce from 'lodash/debounce'` — saves ~70kb

- **Category:** Bundle Size
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an ImportDeclaration whose source is exactly "lodash" or "lodash-es". The rule fires on both bare default (import _ from "lodash") and named (import { debounce } from "lodash") imports because most bundler setups cannot tree-shake CommonJS lodash; lodash-es is also flagged because misconfigured projects silently bundle the whole package.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Switch to per-method paths like import debounce from "lodash/debounce" (or "lodash-es/debounce") to drop roughly 70kb, or replace small helpers with native equivalents (Array.prototype.flat, structuredClone, Object.fromEntries) or the standalone lodash.debounce package. See https://lodash.com/per-method-packages
