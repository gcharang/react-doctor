# `react-doctor/async-await-in-loop`

Collect the items and use `await Promise.all(items.map(...))` to run independent operations concurrently

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the awaits in the loop body call independent operations. The rule already skips sleep-like calls (sleep, delay, setTimeout, throttle), for await (...of) iterators, and loop-carried dependencies where one iteration assigns a variable the next iteration's await argument reads. False positive only if iterations must complete in order for correctness — ordered DB writes, cumulative state, rate-limited APIs, or retries that depend on the prior outcome.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Collect the items, then await Promise.all(items.map(async (item) => doWork(item))) to fan them out concurrently. If you need bounded concurrency, use a small p-limit-style queue. .forEach(async ...) is especially broken — return values are dropped so awaits don't actually wait; switch to a for...of loop or Promise.all over .map. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
