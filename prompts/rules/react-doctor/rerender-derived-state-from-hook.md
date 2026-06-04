# `react-doctor/rerender-derived-state-from-hook`

Use a threshold/media-query hook (e.g. `useMediaQuery("(max-width: 767px)")`) — the component re-renders only when the threshold flips, not every pixel

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a continuous-value hook (useWindowWidth, useWindowHeight, useWindowDimensions, useScrollPosition / useScrollY / useScrollX, useMousePosition, useResizeObserver, useIntersectionObserver) whose returned binding is then ONLY used in a threshold binary comparison (x < 768, x >= 100) in a following statement. The component re-renders on every pixel.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Swap to a threshold hook that re-renders only when the boundary flips: const isMobile = useMediaQuery('(max-width: 767px)'). For scroll thresholds, use an IntersectionObserver-based hook. Continuous-value hooks are correct only when the UI needs the live numeric value (e.g. drawing it on screen). See https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
