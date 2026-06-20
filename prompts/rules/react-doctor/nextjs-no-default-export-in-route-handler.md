# `react-doctor/nextjs-no-default-export-in-route-handler`

Remove the default export from this route.ts and export the handler as a named HTTP method instead: export async function GET(request: Request) { ... }

- **Category:** Next.js
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs
- **Documentation:** <https://nextjs.org/docs/app/api-reference/file-conventions/route>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only when the file path matches both APP_DIRECTORY_PATTERN (/app/) and ROUTE_HANDLER_FILE_PATTERN (/route.{ts,tsx,js,jsx,mts,mjs}), and the file has either an ExportDefaultDeclaration (export default ...) or an ExportNamedDeclaration whose specifier is exported as default (export { handler as default }) — AND the program does NOT already export a named HTTP method. The suppressing check programHasNamedHttpMethodExport scans for any export named GET/POST/PUT/PATCH/DELETE/OPTIONS/HEAD via a named function declaration, a variable declaration, or an export specifier, so a default export coexisting with a real named method export will not fire. False positive: confirm only if no named HTTP method export exists in the SAME file — if the route already exports e.g. GET or POST as a named symbol the default export is dead but harmless and is correctly not flagged; also suppress for any file not actually named route.* under app/ (a pages/ API route, a non-route module, or a barrel/re-export file that is not itself the route handler), since the gate is purely the filename and never the file's location relative to a route.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Next.js App Router only invokes named HTTP method exports from route.ts and silently ignores the default export, so the endpoint never runs. Delete the default export and re-export the handler under the HTTP verb it serves: replace export default async function handler(request: Request) {...} with export async function GET(request: Request) {...} (or POST/PUT/PATCH/DELETE/OPTIONS/HEAD as appropriate); if the function handles multiple verbs, split it into one named export per method. See https://nextjs.org/docs/app/api-reference/file-conventions/route
