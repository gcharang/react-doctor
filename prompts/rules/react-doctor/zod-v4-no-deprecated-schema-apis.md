# `react-doctor/zod-v4-no-deprecated-schema-apis`

Migrate deprecated Zod 4 schema APIs: z.object().strict() to z.strictObject(), z.nativeEnum to z.enum, z.record(value) to z.record(key, value), z.function().args().returns() to z.function({ input, output }).

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://zod.dev/v4/changelog>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only when an import binding resolves to zod (named, aliased, default, or namespace import) and the call/member matches one of: a deprecated top-level factory call z.nativeEnum/promise/ostring/onumber/oboolean/oarray; a .create() call on a dropped factory like z.string.create() or z.object.create(); a single-argument z.record(value); z.literal(Symbol(...)) or z.literal(Symbol.iterator); a z.function().args(...)/.returns(...) chain; z.object().strict()/strip()/passthrough()/nonstrict()/merge()/deepPartial() (including computed form z.object({})["strict"]()); z.number().safe(); .refine() whose SECOND argument is a function/arrow; or .Enum/.Values accessed off a z.enum() call. The detector requires a DIRECT method call on the factory call expression and resolves the import binding, so it does NOT fire on: z.strictObject({}), z.enum(Role), two-argument z.record(key, value), or z.function({ input, output }) (already Zod 4 forms); .strict()/.safe() called on a stored variable rather than inline on the factory call (e.g. const s = z.object({}); s.strict()); identically-named methods on non-zod objects (createValidator().object({}).strict()); dynamic bracket access with a variable key (schema.object({})[method]()); refine with an options object second arg ({ error: "..." }) or single-arg refine; and retained chains like z.number().int().min(0).max(100).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the deprecated form with its Zod 4 equivalent: z.object({...}).strict() becomes z.strictObject({...}) (and .passthrough() to z.looseObject, .merge(b) to a.extend(b.shape) or spread); z.nativeEnum(X) and z.enum(["a"]).Enum/.Values become z.enum(X) reading members off the schema directly; z.string.create()/factory.create() drops .create() to just z.string(); single-arg z.record(valueSchema) gains an explicit key schema z.record(z.string(), valueSchema); z.function().args(z.string()).returns(z.number()) becomes z.function({ input: [z.string()], output: z.number() }); z.number().safe() uses .int() or explicit .min/.max bounds; z.literal(Symbol(...)) uses a dedicated symbol schema; and a function passed as refine's second argument moves to an options object z.string().refine(fn, { error: "..." }). See https://zod.dev/v4/changelog
