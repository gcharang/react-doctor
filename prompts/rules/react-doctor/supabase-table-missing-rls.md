# `react-doctor/supabase-table-missing-rls`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Supabase table created without Row Level Security
- **Severity:** error
- **Category:** Security
- **Framework:** global

## Recommendation

Enable RLS in the same migration (`alter table <name> enable row level security;`) and add `auth.uid()`-scoped policies for select/insert/update/delete. A public table without RLS is fully readable and writable with the public anon key.
