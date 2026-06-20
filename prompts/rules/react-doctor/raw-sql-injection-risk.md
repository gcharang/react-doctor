# `react-doctor/raw-sql-injection-risk`

Building a SQL query by string concatenation or an unsafe raw helper lets an attacker inject SQL and read or modify your database.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production script source files (.js/.ts/.jsx/.tsx/.py/.php); test/scripts/docs/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a query is built outside parameter binding: `$queryRawUnsafe(`/`$executeRawUnsafe(`, `Prisma.raw(`/`sql.raw|unsafe(` with a non-literal argument, a `conn.query("SELECT … ${…}")` interpolation, `.query("…" + …)` concatenation, `.where|orderBy|havingRaw(` non-literal, or Python/PHP equivalents (`cursor.execute(f"…")`, `engine/session.execute(...)`, `$x->query("…".$…)`, `mysqli_query(...)`). It skips parameterized usage — a pure string literal, or an interpolation wrapped in `sanitize`/`escape`/`quote`. FALSE POSITIVE: the interpolated segment is a hard-coded allowlisted identifier rather than user data.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move dynamic values into driver parameters or ORM bind variables: `$queryRaw` tagged templates (not the `*Unsafe` helpers), `db.query("… WHERE id = $1", [id])`, or the ORM builder. Validate any unavoidable dynamic identifier (table or column name) against a fixed allowlist. In Python use parameterized `cursor.execute(sql, params)`; in PHP use prepared statements with bound parameters.
