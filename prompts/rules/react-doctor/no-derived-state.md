# `react-doctor/no-derived-state`

Disallow storing derived state in an effect.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** eslint-plugin-react-you-might-not-need-an-effect
- **Framework:** global
- **Enabled when:** eslint-plugin-react-you-might-not-need-an-effect installed in project
- **Documentation:** <https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a cleanup-less useEffect where a setState's arguments derive from state or props (avoidDerivedState message), OR where the setter is only ever called from this one spot and its inputs exactly match the effect's deps (avoidSingleSetter — the value is always in sync with deps). False positive: the derived computation is expensive enough you want caching — but useMemo is the right tool, not useState + useEffect.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the useState and useEffect and compute inline during render: const fullName = firstName + ' ' + lastName. For genuinely expensive transforms wrap in useMemo(() => transform(input), [input]). Mirroring derived values into state guarantees a wasted second render every time the source changes, and risks the two falling out of sync if a future code path forgets to call the setter. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state
