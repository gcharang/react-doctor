# `react-doctor/nextjs-inline-script-missing-id`

Add `id="descriptive-name"` so Next.js can track, deduplicate, and re-execute the script correctly

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX <Script> opening tag that has no src attribute (so the script is inline) and no id attribute. False positive if Script is a non-Next component with the same name — verify the import is from next/script.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add a stable, descriptive id like id="google-analytics" to the <Script> tag. Next.js uses the id to deduplicate inline scripts across navigations and ensure they execute exactly once during hydration. https://nextjs.org/docs/app/api-reference/components/script#inline-scripts
