# `react-doctor/webhook-signature-risk`

An inbound webhook handler that acts on the request body without verifying the provider's signature will process forged requests from anyone.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files that look like an inbound webhook handler (path or de-commented content mentions "webhook"); outbound/sender webhook files excluded

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a production file identified as an INBOUND webhook handler (its path, or its content with comments/strings stripped, mentions `webhook`) that exposes an entrypoint — `export [async] function POST`, `export const POST|handler|webhook`, `webhookHandler`, or `webhookRoute` — and reads the request (`req`/`request`), yet shows NO signature-verification evidence anywhere in the file. Evidence that suppresses it: `verifySignature`/`verify*signature`/`verify*(Webhook|Auth)`, Stripe `constructEvent`/`stripe.webhooks`, `createHmac` + `timingSafeEqual`, `svix`, `webhookSecret`, or reading a `*signature*` header. Outbound senders are excluded (`process.env.*WEBHOOK_URL`, `send/post/dispatch/publish/notify*Webhook`, and bare `webhookUrl` mentions are stripped before judging). FALSE POSITIVE: verification done in shared middleware or a wrapper in another module (this file has no textual evidence), or a re-export like `export const POST = stripeWebhookHandler;` whose body lives elsewhere.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Verify the provider's signature before parsing or acting on the body: use the SDK helper (Stripe `webhooks.constructEvent`, `svix` for Clerk) or compute an HMAC over the raw request body with the shared secret and compare with `crypto.timingSafeEqual`. Use the raw body, not parsed JSON, for the comparison, and reject with 400/401 on mismatch. Keep the webhook secret in server-only env, and if verification lives in shared middleware, confirm it runs for this route.
