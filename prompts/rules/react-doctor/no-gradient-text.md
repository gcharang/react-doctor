# `react-doctor/no-gradient-text`

Use solid text colors for readability. If you need emphasis, use font weight, size, or a distinct color instead of gradients

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the element either sets backgroundClip (or WebkitBackgroundClip) to 'text' AND has background or backgroundImage containing a gradient() function, or uses both bg-clip-text and bg-gradient-to-* Tailwind utilities together. Loading-skeleton shimmer elements that contain no readable text are an acceptable exception.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace with a solid color value. For emphasis, prefer increased font-weight, larger size, or a brand accent color over a gradient fill. Reserve gradient text for at most one display headline per page; never apply it to body copy, links, or anything users need to read carefully. See https://web.dev/learn/design/typography
