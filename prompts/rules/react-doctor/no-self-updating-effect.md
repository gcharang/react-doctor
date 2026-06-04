# `react-doctor/no-self-updating-effect`

Break the self-updating-effect feedback loop: derive the value during render, move the write into an event handler, or guard the update so it provably converges.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react.dev/learn/you-might-not-need-an-effect>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a useEffect/useLayoutEffect callback (in an uppercase component or use* hook) lists a useState value in its dependency array AND, as a top-level unconditional synchronous statement, calls that state's matching setter with a non-settling argument: a functional updater ((prev) => ...), a freshly-constructed reference that never passes Object.is (setItems([]), setUser({...user}), new Map(), a regex literal), or a value computed from the same state read synchronously (setCount(count + 1), setItems(items.filter(...))). The detector only walks the effect's own synchronous statements and must prove the write is non-settling before flagging. The detector DELIBERATELY does NOT fire (true negatives, not findings to suppress) on: a stable scalar (setOpen(true), setTab(activeTab)), writing another local (setLeft(right)), writing the value straight back (setCount(count)), a member/object-key that only shares the name (setCount(source.count), setCount(lookup({count: x}))), state captured in a nested closure (setCount(registerCallback(() => count))), setters in setTimeout/.then/subscriptions, empty deps [], state not in the deps array, a setter that runs only inside an if-guard, or a write driving toward empty under a pre-write early-return guard that provably bails when empty (if (!queue.length) return; setQueue([])) — do not expect findings for these and do not waste a confirm/suppress decision on them. The genuine FALSE POSITIVES a reviewer should SUPPRESS are the rule's two accepted unprovable cases: a .map() functional updater and an equality-guarded grow-by-one write that converge at runtime but cannot be proven sound — suppress these when the loop demonstrably reaches a fixed point; otherwise CONFIRM, since any write with no provable settling guard is a real render loop.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Break the feedback loop by removing the write the effect reacts to. If the value is computable from the dependency, derive it during render instead: const next = count + 1 (no effect, no setter). If it must be set in response to a user action, move the setter into the event handler. If the effect genuinely must write the depended-on state, add a pre-write early-return guard that provably reaches a fixed point — guard equality before writing (if (count !== nextCount) setCount(nextCount)) or bail once the state is empty (if (!items.length) return; setItems([])) so the next commit short-circuits before re-writing. Do not just wrap the same diverging write (setCount(count + 1), [...prev, x]) in any guard the write moves away from. See https://react.dev/learn/you-might-not-need-an-effect
