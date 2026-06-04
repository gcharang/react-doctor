# `react-doctor/js-async-reduce-without-awaited-acc`

Await the accumulator inside an async .reduce reducer: const acc = await previous; ...; return acc;

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a CallExpression whose callee is a MemberExpression named reduce or reduceRight (non-computed arr.reduce, or computed string-literal arr["reduce"]; dynamic arr[methodName] is NOT matched) when the first argument is an async arrow or function expression whose body contains a direct await, AND either (a) the first parameter is an Identifier (after unwrapping an AssignmentPattern default) that is never the direct argument of an AwaitExpression anywhere in the reducer's own async scope, or (b) the first parameter is a destructured ArrayPattern/ObjectPattern. Crucially, await-detection skips nested function/arrow bodies: an await of the accumulator inside a nested helper does NOT count, so a reducer that only awaits its accumulator inside a helper (yet does any other direct await) still FIRES — only a direct await of the accumulator in the reducer's own scope suppresses it. True suppressions: the reducer already awaits the accumulator directly at the top (const obj = await promise; ... or bare acc = await acc;) so iterations chain correctly; a sync reducer with no async keyword; an async reducer that does no awaits at all. Reviewer-judgment suppression: the detector does NOT distinguish Array.prototype.reduce from a custom stream/observable .reduce API, so any .reduce on a non-Array receiver whose Promise-chaining semantics genuinely differ from Array.prototype.reduce should be suppressed by the reviewer even though the detector would otherwise treat it identically.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Resolve the accumulator before touching it so each iteration receives the prior resolved value instead of a Promise: rename the parameter to previous and await it first, async (previous, item) => { const acc = await previous; acc[item.id] = await getItem(item); return acc; }, and seed the reduce with Promise.resolve(initial) (e.g. Promise.resolve({})) so iteration 1 also gets a Promise; if the accumulator parameter must keep its name, reassign in place with acc = await acc; (never const acc = await acc; which redeclares the param and is a SyntaxError). For a destructured accumulator (async ([sum, count], item) or async ({ totals }, item)), take a single previous param and destructure after awaiting: async (previous, item) => { const [sum, count] = await previous; ...; return [sum + v, count + 1]; } seeded with Promise.resolve([0, 0]). If the accumulator is currently awaited only inside a nested helper, lift that await into the reducer's own scope. When the work is independent per item, prefer await Promise.all(items.map(...)) over an async reduce entirely. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
