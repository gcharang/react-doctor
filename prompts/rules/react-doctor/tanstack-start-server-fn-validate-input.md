# `react-doctor/tanstack-start-server-fn-validate-input`

Add `.inputValidator(schema)` before `.handler()` — data crosses a network boundary and must be validated at runtime

- **Category:** TanStack Start
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a createServerFn().handler(fn) chain when the handler reads ctx.data (via MemberExpression .data or ObjectPattern destructure of { data }) but the chain has no upstream .inputValidator(schema) call. False positive: the handler destructures or accesses an unrelated local property literally named data that the rule mistakes for the input payload.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add .inputValidator(schema) before .handler() — a zod, valibot, or arktype schema all work, as does a hand-rolled (input: unknown) => ParsedInput function. The parsed value is exposed as ctx.data with the schema's TypeScript type, and unvalidated requests are rejected at the network boundary. See https://tanstack.com/start/latest/docs/framework/react/server-functions#input-validation
