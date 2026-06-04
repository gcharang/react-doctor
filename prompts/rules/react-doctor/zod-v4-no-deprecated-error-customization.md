# `react-doctor/zod-v4-no-deprecated-error-customization`

Replace deprecated Zod error customization with the v4 unified { error } API: z.string({ error: "Required" })

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://zod.dev/error-customization>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a CallExpression in two shapes. (1) Factory path: the callee resolves through a zod import binding to a factory in ZOD_FACTORIES_WITH_ERROR_PARAMS (z.string, aliased string as zString, zod.number, etc.) AND either the factory is one of bigint/boolean/date/number/string with a string-literal FIRST argument (z.string("Required")), or ANY argument is an object literal containing a property named errorMap, invalid_type_error, or required_error (z.number({ invalid_type_error: "..." }), z.enum(["admin"], { errorMap: () => ... })). (2) Parse path: a .parse/.safeParse/.parseAsync/.safeParseAsync call whose receiver is itself a direct zod factory call, passing a second-arg object with an errorMap property (z.string().safeParseAsync(value, { errorMap })). False positives a reviewer suppresses: already-migrated z.string({ error: "Required" }); string literals that are schema VALUES not messages, e.g. z.literal("draft"), z.enum(["pro","scale"]), z.literal inside a union; first string args on non-message factories like z.record(z.string(), z.unknown()), z.map, z.set; non-zod lookalikes where z is not a zod import (const z = createValidator()); and a parse errorMap on a variable-aliased schema (const schema = z.string(); schema.parse(value, { errorMap })) because the receiver is an identifier, not a direct factory call.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Migrate to Zod 4's unified error customization. Replace a legacy first-arg message string with the error key: z.string("Required") becomes z.string({ error: "Required" }). Replace invalid_type_error/required_error with a single error callback that branches on issue.input: z.string({ error: (issue) => issue.input === undefined ? "Required" : "Must be a string" }). Replace an errorMap option (on a factory or in a parse/safeParse second argument) with the same error key, returning a string or { message }: z.enum(["admin"], { error: () => "Role" }) and schema.parse(value, { error: () => "Bad" }). See https://zod.dev/error-customization
