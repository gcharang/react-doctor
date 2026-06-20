# `react-doctor/insecure-crypto-risk`

Weak primitives (MD5, SHA-1, DES, RC4), non-timing-safe comparisons, or `Math.random()` for security values make signatures, tokens, and passwords easier to forge or guess.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx); test/build/doc/generated, example/demo/sample/playground dirs, and protocol-named files (gravatar/digest-auth/oauth1/etag/checksum/cache-key/fingerprint) skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on the first of: a weak hash `createHash('md5'|'sha1')` or `md5(` with a security word (password/token/secret/signature/auth/credential/session/cookie/csrf/api-key) within ~250 chars; a weak cipher (`createCipheriv('des'|'rc4'|'blowfish'|…)`, deprecated `createCipher`/`createDecipher`, or a `DES`/`RC4`/`Blowfish` name in a cipher context); a timing-unsafe `signature` comparison with `==`/`===` in a non-`.jsx`/`.tsx` file that lacks `timingSafeEqual`; or `Math.random()` on a line also naming token/secret/password/nonce/salt/csrf/credential/otp. FALSE POSITIVE: the hash/random is non-secret (cache key, `_id`/etag, a UI `focus-nonce`), the comparison is against an enum/status/boolean or a `signatureMethod`/`signatureType` metadata name (all explicitly excluded), or a protocol mandates md5/sha1 (Gravatar, HTTP Digest, OAuth 1.0) — those contexts are exempted by path and surrounding-text checks.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace MD5/SHA-1 with SHA-256 or stronger (and bcrypt/scrypt/argon2 for passwords); replace DES/RC4/Blowfish and `createCipher`/`createDecipher` with AES-256-GCM via `createCipheriv`. Compare signatures and MACs with `crypto.timingSafeEqual` on the server, and generate tokens, nonces, and salts with `crypto.randomBytes`/`crypto.getRandomValues`, never `Math.random()`. Where MD5/SHA-1 is genuinely non-security (checksums, cache keys), move it off the security path or rename it so the intent is clear.
