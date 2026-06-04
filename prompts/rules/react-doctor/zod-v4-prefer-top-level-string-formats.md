# `react-doctor/zod-v4-prefer-top-level-string-formats`

Replace z.string().<format>() with the Zod 4 top-level format API, e.g. z.email() or z.uuid()

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://zod.dev/v4/changelog>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a CallExpression that is a direct method call on a z.string() factory call where the method is one of the deprecated string-format names base64, base64url, cidr, cidrv4, cidrv6, cuid, cuid2, date, datetime, duration, email, emoji, ip, ipv4, ipv6, jwt, nanoid, time, ulid, url, or uuid — isDirectMethodCallOnZodFactory requires the receiver to itself be a CallExpression to the zod string factory, resolved through the actual import binding: z.string().email(), zod.string().ip(), schema.string().uuid() (aliased import), string().ulid() (named string import), z.string().url() (default import), and static computed access z.string()['email'](). Parens and TS as-casts are stripped, so ((z as typeof z)).string().uuid() still fires. False positive: a same-named non-Zod builder where z is not imported from zod, e.g. const z = createValidator(); z.string().email() — must NOT fire because the binding does not resolve to a zod import. Also do not flag a parameter or local that shadows the zod import (function build(z){ return z.string().email() }), a dynamic computed method name (z.string()[method]() where method is a variable), or a format method invoked on a stored intermediate schema rather than the inline factory call (const s = z.string(); s.email()) — the rule only matches when .format() is chained directly on z.string().

## Fix prompt

Use this once validation confirms the diagnostic is real.

Collapse the chained format call onto the Zod 4 top-level factory: rewrite z.string().email() as z.email(), z.string().uuid() as z.uuid(), z.string().datetime() as z.iso.datetime(), z.string().date() as z.iso.date(), and z.string().time() as z.iso.time(); the removed z.string().ip() and z.string().cidr() helpers split by version, so pick z.ipv4()/z.ipv6() (or z.ipv4().or(z.ipv6())) and z.cidrv4()/z.cidrv6() to match the data. Carry over any chained refinements/messages by passing options to the new factory, e.g. z.email({ message: '...' }), and keep the named import shape you already use. See https://zod.dev/v4/changelog
