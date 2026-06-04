# `react-doctor/async-parallel`

Use `const [a, b] = await Promise.all([fetchA(), fetchB()])` to run independent operations concurrently

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on three or more consecutive await statements (variable declarations or bare expression statements) in the same block where no later await references an identifier declared by an earlier one. Confirm independence holistically — even if a result isn't read, sequential side effects may matter (DB write ordering, transaction state, rate-limited APIs). Skipped in .test/.spec/.stories files.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Combine into Promise.all: const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]). All three start immediately; total time is max(...) instead of sum(...). If one failure shouldn't abort the others, use Promise.allSettled and inspect each result's status. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
