# `react-doctor/no-derived-state-effect`

For derived state, compute inline: `const x = fn(dep)`. For state resets on prop change, use a key prop: `<Component key={prop} />`. See https://react.dev/learn/you-might-not-need-an-effect

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a useEffect (non-empty deps) contains ONLY setter calls whose arguments derive entirely from identifiers in the deps. Three message variants branch on the setter argument shape: state reset (no dep referenced — suggests a key prop), wrap in useMemo (a user-defined function call appears), or compute during render. Math/Date/JSON-rooted calls and TRIVIAL_DERIVATION_CALLEE_NAMES are exempted. False positive: the function passed to the setter has hidden imperative side effects so it isn't really pure derivation.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For cheap derivation, drop the effect and compute inline: const value = transform(dep). For expensive computation, wrap in useMemo: const value = useMemo(() => transform(dep), [dep]). For resetting all child state on a prop change, pass the prop as a key — <Component key={prop} /> — rather than syncing via an effect. See https://react.dev/learn/you-might-not-need-an-effect
