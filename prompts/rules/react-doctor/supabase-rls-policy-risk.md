# `react-doctor/supabase-rls-policy-risk`

A Supabase policy that disables row-level security, exposes the service role, or uses a `(true)` write predicate lets clients read or modify data that is not theirs.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** SQL files only — *.sql and supabase/migrations/ or supabase/schemas/ paths

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on Supabase/Postgres SQL (`.sql` files, or `supabase/migrations`/`supabase/schemas` paths) in four shapes: an `ALTER TABLE … DISABLE ROW LEVEL SECURITY`; a `CREATE POLICY … auth.role() = 'service_role'` (a service-role bypass exposed to client roles); a `CREATE POLICY … FOR ALL|INSERT|UPDATE|DELETE … USING|WITH CHECK (true)` (an unconditional write policy); or any non-`FOR SELECT` `CREATE POLICY … USING|WITH CHECK (true)` (an implicit open policy). An explicit `FOR SELECT … (true)` public-read policy is intentionally NOT flagged. FALSE POSITIVE: a deliberately public table where even writes are meant to be open (rare), or a migration that loosens then re-tightens the policy in a later statement — check the table's final policy state.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace `(true)` write predicates with ownership or membership checks: `USING (auth.uid() = user_id)` plus a matching `WITH CHECK`, and for multi-tenant data join a trusted membership table instead of trusting a client-supplied column. Never `DISABLE ROW LEVEL SECURITY` on a client-reachable table, and keep the `service_role` key on the server, because it already bypasses RLS. Scope public reads with an explicit `FOR SELECT` policy so writes stay locked.
