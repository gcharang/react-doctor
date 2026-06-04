# `react-doctor/jsx-no-new-object-as-prop`

Memoize the object (useMemo) or hoist it outside the component.

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-object-as-prop>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSX prop receives a freshly-allocated object every render — an object literal, new Object()/Object(), Object.assign/create/fromEntries/groupBy/freeze/seal, or those wrapped in ?? / || / ternary (an empty-object fallback like cfg ?? {} is unwrapped to its other branch), plus render-local variables initialized to such an expression. It only fires when same-file analysis PROVES the receiving component is React.memo-wrapped; intrinsic HTML elements, test files, the style and dangerouslySetInnerHTML props, and config-shape prop names (options, config, theme, sx, and *Props/*Config/*Options/*Style suffixes, etc.) are all skipped. False positive: a memoized child that intentionally takes per-render config — though most of those land on an allow-listed prop name and won't be flagged.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Stabilize the object's identity so the memoized child stops re-rendering. If it never depends on render state, hoist it to a module-level const (const STYLE = { display: 'none' }); if it derives from props/state, wrap it in useMemo: const cfg = useMemo(() => ({ id, mode }), [id, mode]). Pass the stable reference to the prop instead of the inline literal. See https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-object-as-prop
