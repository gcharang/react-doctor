# `react-doctor/zod-v4-no-deprecated-error-apis`

Replace deprecated ZodError helpers with Zod 4 functions: z.treeifyError(), z.flattenError(), z.prettifyError(), or read error.issues directly

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://zod.dev/error-formatting>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in two cases: (a) on a standalone `ZodError.create(...)` call even with NO member access — the CallExpression handler reports unconditionally for any isZodErrorCreateCall, so `const error = z.ZodError.create([]);` alone produces a diagnostic; or (b) when a member named addIssue, addIssues, errors, flatten, formErrors, or format is accessed DIRECTLY off a freshly-constructed ZodError value, i.e. `new ZodError(...).<member>` or `ZodError.create(...).<member>` (computed access like `new ZodError([])["flatten"]()` and `["errors"]` also counts). Note the asymmetry: there is NO NewExpression visitor, so a bare `new ZodError([])` with no member access does NOT fire, while a bare `ZodError.create([])` DOES. The ZodError identifier/namespace member must resolve to an import from the "zod" module (covers `import { ZodError }`, `import { ZodError as ValidationError }`, and `new zod.ZodError(...)`/`zod.ZodError.create(...)`). False positives to suppress: it does NOT and should NOT fire on a ZodError held in a variable, including a caught `catch (error)` narrowed by `error instanceof ZodError` then calling `error.flatten()`/`error.errors` (no flow analysis in v1), on any error-like value of unknown origin (`getError().flatten()`), or on a `ZodError` imported from a non-zod path such as `import { ZodError } from "./errors"` — so do not flag deprecated-looking member names unless the receiver is a direct `new ZodError`/`ZodError.create` whose binding traces to "zod".

## Fix prompt

Use this once validation confirms the diagnostic is real.

Migrate to the Zod 4 top-level error helpers instead of the removed/deprecated ZodError instance members: replace `err.flatten()` with `z.flattenError(err)`, `err.format()` with `z.treeifyError(err)`, `err.formErrors` with `z.flattenError(err)` and read `.formErrors`, and read validation problems via `err.issues` rather than the old `.errors`; drop `addIssue`/`addIssues` mutation in favor of constructing the issues array up front. Capture the error in a variable first (`const err = ...; z.flattenError(err)`) rather than chaining the helper off the constructor. See https://zod.dev/error-formatting
