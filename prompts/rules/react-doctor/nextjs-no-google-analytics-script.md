# `react-doctor/nextjs-no-google-analytics-script`

Replace manual GA script with the optimized component: import { GoogleAnalytics } from '@next/third-parties/google'

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs
- **Documentation:** <https://nextjs.org/docs/app/guides/third-party-libraries>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose tag name is exactly the JSXIdentifier `script` or `Script` AND that has a `src` attribute whose value is a string Literal matching GOOGLE_ANALYTICS_SCRIPT_PATTERN = /google-analytics\.com|googletagmanager\.com\/gtag/ (so src must contain google-analytics.com OR the googletagmanager.com/gtag path). The src must be a plain string Literal: a dynamic src like src={gaUrl} or a template literal is not a Literal node and is skipped, and a googletagmanager.com URL without the /gtag path (e.g. a gtm.js container tag) does not match the regex and is never reported. The detector has no allowlist or exclusion logic and there are no valid/invalid test fixtures carving anything out, so any string-literal src matching the pattern fires. False positive (a judgment-call suppression, not a detector exclusion): a script whose src genuinely matches the GA/gtag pattern but that the team intentionally keeps hand-rolled — e.g. a consent-gated or otherwise custom-optimized GA loader, or a deliberate legacy GA integration the team has chosen not to migrate to @next/third-parties; suppress only when that intent is clear.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Drop the manual <Script src="...google-analytics.com or googletagmanager.com/gtag...">  tag and use Next.js' optimized third-party component: import { GoogleAnalytics } from '@next/third-parties/google' and render <GoogleAnalytics gaId="G-XXXXXXX" /> (place it in the root layout or the page where you need tracking). This lets Next.js apply its optimized loading strategy and ship a smaller bundle instead of blocking rendering with a hand-rolled script tag. See https://nextjs.org/docs/app/guides/third-party-libraries
