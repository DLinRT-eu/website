# Supabase Migration Cleanup Guide

## What We Found

After comprehensive audit of all 96 migration files, we identified:

1. **Duplicate table schemas** (same tables created twice)
2. **Duplicate function definitions** (2-3 copies of same functions)
3. **Repeated policy fixes** (same policies dropped/recreated multiple times)
4. **Manual scripts in migrations folder** (troubleshooting files that shouldn't be there)

**Full details:** See `SUPABASE_MIGRATION_AUDIT.md`

---

## Recommended Actions

### Phase 1: Immediate (Safe, No Risk)

#### Move Manual Scripts

These files are troubleshooting scripts, not migrations:

```powershell
# Create directories
mkdir scripts\manual-migrations -Force
mkdir scripts\verification -Force

# Move files (DON'T DELETE from migrations yet - just copy)
cp supabase\migrations\APPLY_ALL_MIGRATIONS.sql scripts\manual-migrations\
cp supabase\migrations\VERIFY_USER_ROLES_RLS.sql scripts\verification\

# After verifying they're in new location, you can delete from migrations:
# rm supabase\migrations\APPLY_ALL_MIGRATIONS.sql
# rm supabase\migrations\VERIFY_USER_ROLES_RLS.sql
```

**Why:** Automated migration tools might accidentally run these manual scripts.

---

### Phase 2: Optional Cleanup (Test First!)

#### Option A: Do Nothing

- **Risk:** Zero
- **Benefit:** None
- **Reason:** Everything currently works. The duplicate migrations don't cause errors, they just add confusion.

**Choose this if:** You're short on time or want to avoid any risk.

#### Option B: Create Consolidation Migration (Recommended)

Create a single migration that consolidates all policy fixes:

**File:** `supabase/migrations/20251118000000_consolidate_all_policies.sql`

This migration would:
1. Drop ALL policies on tables with conflicts (profiles, role_requests, etc.)
2. Recreate clean policies using proven patterns from latest fixes
3. Add comprehensive comments explaining what was consolidated

**Benefit:** Clean slate for future development, easier debugging

**Risk:** Low (uses same pattern as 20251117000000 and 20251117000001 which work)

#### Option C: Full Migration Squash (Most Thorough)

Supabase CLI can "squash" old migrations into a single base schema:

```powershell
# Squash migrations 1-50 into single file
supabase db reset
supabase db dump --schema public > base-schema.sql
# Create new migration from dump
```

**Benefit:** Clean history, faster fresh installs

**Risk:** Medium (requires careful testing)

---

## Prevention Guidelines

### For Future Migrations

1. **One change per migration**
   - ✅ Good: `20251118_add_notifications_table.sql`
   - ❌ Bad: `20251118_fix_everything.sql`

2. **Test locally before applying**
   ```powershell
   # Always test migration locally first
   supabase db reset
   supabase migration up
   # Verify no errors
   ```

3. **If a migration fails, fix it properly**
   - ❌ Don't: Create new migration that drops and recreates
   - ✅ Do: Edit the failed migration or use `ALTER` statements

4. **Never put troubleshooting scripts in migrations/**
   - Use `scripts/verification/` or `scripts/manual-migrations/`

5. **Review before committing**
   - Check if similar migration already exists
   - Verify no duplicate function definitions
   - Ensure policies don't conflict with existing ones

---

## Testing Any Changes

Before applying cleanup migrations to production:

```powershell
# 1. Backup database
supabase db dump > backup-$(Get-Date -Format "yyyyMMdd-HHmmss").sql

# 2. Apply migration locally
supabase migration up

# 3. Test critical functionality
# - User login/registration
# - Admin panel access
# - Product/company CRUD
# - Review system

# 4. Check for errors
supabase logs --severity ERROR

# 5. If everything works, apply to production
# supabase db push
```

---

## Quick Reference: What's Safe to Remove

| File | Safe to Delete? | Notes |
|------|----------------|-------|
| `APPLY_ALL_MIGRATIONS.sql` | ✅ Yes (move first) | Manual script |
| `VERIFY_USER_ROLES_RLS.sql` | ✅ Yes (move first) | Manual script |
| `20251022200204_29f44043...sql` | ⚠️ Test first | Duplicate schema, but may have been applied |
| Other migrations | ❌ No | Keep all timestamped migrations |

---

## Current Status

- ✅ Audit completed (see `SUPABASE_MIGRATION_AUDIT.md`)
- ✅ Manual scripts identified
- ✅ Duplicate migrations catalogued
- ⏳ Awaiting decision on Phase 2 cleanup
- ⏳ Manual scripts still in migrations/ folder

**Next action:** Move manual scripts to `scripts/` (Phase 1)

---

## Questions?

- See full audit: `docs/SUPABASE_MIGRATION_AUDIT.md`
- Check fix examples: `supabase/migrations/20251117000000_*.sql` and `20251117000001_*.sql`
- Documentation: `docs/FIX_USER_REGISTRATION_NOTIFICATIONS.md`
