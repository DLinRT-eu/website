# Supabase Migration Audit Report

**Date:** 2025-11-17  
**Total Migrations:** 96 files  
**Status:** Critical duplications and conflicts identified

---

## Executive Summary

The Supabase migrations folder contains **significant duplications and conflicts** that need consolidation. Multiple migrations attempt to fix the same issues, creating layered policies that cause internal errors.

### Critical Issues Found

1. **Duplicate Table Schemas** - Same tables created twice
2. **Duplicate Function Definitions** - Same functions created 2-3 times
3. **Repeated Policy Fixes** - Same policies dropped and recreated multiple times
4. **Manual Scripts in Migrations Folder** - Non-timestamped files that shouldn't be there

---

## 1. Duplicate Table Schemas

### Problem
Two migrations create identical base schema with `profiles`, `user_roles`, and `company_representatives` tables:

| Migration | Date | Size | Status |
|-----------|------|------|--------|
| `20251022200013_b504441d-15f9-4ecd-8002-cce58854da73.sql` | Oct 22 | 363 lines | ✅ Original |
| `20251022200204_29f44043-d9d9-4bfd-9f4d-1b5c35d642ef.sql` | Oct 22 | 451 lines | ⚠️ Duplicate |

### Details
- Second migration wraps everything in `CREATE TABLE IF NOT EXISTS`
- Both define `has_role()` function identically
- Second migration is **redundant** - adds no new functionality
- Causes potential confusion about which is the "real" schema

### Recommendation
**Remove** `20251022200204` entirely - it serves no purpose beyond what `20251022200013` already provides.

---

## 2. Duplicate Function Definitions

### is_admin_secure() - Defined 3 Times

| Migration | Lines | Identical? |
|-----------|-------|-----------|
| `20251106120506_1eb7326a-afa8-4eea-9f80-eb35ed8ae60f.sql` | 5-18 | ✅ First definition |
| `20251106122140_34ac164e-dd9c-49de-81c1-c0b34a6f6cb5.sql` | 5-18 | ✅ Exact copy |
| `20251117000001_fix_user_registration_notifications.sql` | 45-59 | ✅ Exact copy with IF NOT EXISTS guard |

**Impact:** Uses `CREATE OR REPLACE`, so no direct conflict, but creates confusion. Third instance (in 20251117000001) is acceptable as it's a safety check.

### is_admin() - Defined 2 Times

| Migration | Purpose |
|-----------|---------|
| `20251102023000_fix_user_roles_recursion.sql` | Initial definition to fix recursion |
| `VERIFY_USER_ROLES_RLS.sql` | ⚠️ Manual script (shouldn't be in migrations/) |

**Impact:** First definition is legitimate. Second is in a manual verification script that shouldn't be a migration.

### has_role() - Defined 2 Times

Both definitions are in the duplicate schema migrations (see section 1). Removing the duplicate migration resolves this.

### can_manage_reviews() - Defined 2 Times

| Migration | Identical? |
|-----------|-----------|
| `20251106120506_1eb7326a-afa8-4eea-9f80-eb35ed8ae60f.sql` | ✅ Original |
| `20251106122140_34ac164e-dd9c-49de-81c1-c0b34a6f6cb5.sql` | ✅ Copy |

Same pattern as `is_admin_secure()` - second is redundant.

### can_view_security_data() - Defined 2 Times

Same migrations as above - second is redundant.

### Recommendation
- **Keep:** `20251106120506` (first comprehensive security function set)
- **Remove redundant function definitions from:** `20251106122140` (keep only new logic)
- **Move:** `VERIFY_USER_ROLES_RLS.sql` out of migrations/ folder

---

## 3. Repeated Policy Fix Attempts

### Pattern Identified
Multiple migrations drop and recreate the same policies, indicating iterative debugging attempts that were never cleaned up.

### profiles Table Policies

| Migration | Policies Dropped | Times Fixed |
|-----------|------------------|-------------|
| `20251102021126_fix_profile_loading.sql` | 6 policies | First attempt |
| `20251102022500_fix_profiles_permissions.sql` | 8 policies | Second attempt |

**Impact:** Two migrations within ~14 minutes fixing the same table. Second one drops policies the first just created.

### company_representatives Table Policies

| Migration | Note |
|-----------|------|
| `20251102202931_441ed9a4-4b29-4643-85c7-cd1f3fa762ad.sql` | Drops and recreates policies |
| `20251117000000_fix_company_reps_policies.sql` | **Another fix** for same table |

### user_products Table Policies

Fixed in same migration as company_representatives:
- `20251117000000_fix_company_reps_policies.sql`

### user_registration_notifications Table Policies

| Migration | Date | Status |
|-----------|------|--------|
| `20251102040000` | Nov 2 | Initial creation |
| `20251106120545_bd424a73-4767-4f69-a971-003b60663807.sql` | Nov 6 | First fix attempt |
| `20251106122140_34ac164e-dd9c-49de-81c1-c0b34a6f6cb5.sql` | Nov 6 | Second fix attempt |
| `20251117000001_fix_user_registration_notifications.sql` | Nov 17 | **Final fix** (uses dynamic DROP loop) |

**Impact:** Four migrations touching the same table's policies. The last one (20251117000001) is the correct approach - it dynamically drops all policies before creating clean ones.

### role_requests Table Policies

| Migration | Policies |
|-----------|----------|
| `20251102021400_add_role_requests_rls.sql` | Initial policies |
| `20251106120545_bd424a73-4767-4f69-a971-003b60663807.sql` | Drops and recreates 2 policies |

---

## 4. Manual Scripts in Migrations Folder

These files **should not be in the migrations folder** - they're manual troubleshooting scripts:

| File | Purpose | Action |
|------|---------|--------|
| `APPLY_ALL_MIGRATIONS.sql` | Combined manual migration runner | ⚠️ Move to `scripts/` |
| `VERIFY_USER_ROLES_RLS.sql` | Verification and debugging script | ⚠️ Move to `scripts/` |

**Risk:** These files could be accidentally run by automated migration tools, causing unpredictable behavior.

---

## Root Cause Analysis

### Why Did This Happen?

1. **Iterative Debugging in Production**
   - Issues were fixed by creating new migrations on top of broken ones
   - Each fix attempt was left in place instead of being consolidated
   - No cleanup of failed approaches

2. **Lack of Migration Review Process**
   - Duplicate schema migration (20251022200204) should have been caught
   - Policy conflicts indicate testing wasn't done before applying

3. **Circular Dependency Confusion**
   - Multiple attempts to fix RLS circular dependencies (user_roles → has_role → user_roles)
   - Each attempt added layers without removing previous attempts

4. **Manual Intervention Without Cleanup**
   - Manual SQL scripts added to migrations folder for troubleshooting
   - Never moved to proper location after debugging

---

## Impact Assessment

### Current State
- ✅ **Local dev server runs without errors** (frontend is clean)
- ⚠️ **Database has layered policies** causing occasional "internal errors"
- ⚠️ **96 migrations** when ~75-80 would suffice with consolidation
- ⚠️ **Confusion about source of truth** for schema and policies

### Risk Level: **MEDIUM**

- No data loss or corruption
- Existing policies generally work (last fix wins in PostgreSQL)
- Main risk is **maintenance complexity** and **future debugging difficulty**

---

## Recommended Actions

### Phase 1: Immediate (Low Risk)

1. **Move manual scripts out of migrations/**
   ```powershell
   mv supabase/migrations/APPLY_ALL_MIGRATIONS.sql scripts/manual-migrations/
   mv supabase/migrations/VERIFY_USER_ROLES_RLS.sql scripts/verification/
   ```

2. **Document current migration sequence**
   - Create `MIGRATION_ORDER.md` listing all 96 files with purpose
   - Mark which are duplicates/obsolete

### Phase 2: Consolidation (Medium Risk)

3. **Create single cleanup migration** (`20251118000000_consolidate_policies.sql`)
   - Drop ALL policies on affected tables
   - Recreate clean policies (use 20251117000001 as template)
   - Add comments explaining consolidation

4. **Remove duplicate schema migration**
   - Delete `20251022200204_29f44043-d9d9-4bfd-9f4d-1b5c35d642ef.sql`
   - Test that database still initializes correctly

### Phase 3: Future Prevention (Best Practices)

5. **Establish migration guidelines**
   - One migration per logical change
   - Test migrations locally before applying
   - If a migration fails, fix it with `ALTER`, don't create duplicate
   - Never put manual scripts in migrations/

6. **Use Supabase migration squashing**
   - Consider squashing migrations 1-50 into single base schema
   - Keep recent migrations (51-96) as-is for history

---

## Detailed Migration Breakdown

### Duplicate/Redundant Migrations

| Migration | Reason | Keep/Remove |
|-----------|--------|-------------|
| `20251022200204_29f44043-d9d9-4bfd-9f4d-1b5c35d642ef.sql` | Duplicates 20251022200013 | ❌ Remove |
| `20251106122140_34ac164e-dd9c-49de-81c1-c0b34a6f6cb5.sql` | Duplicate functions from 20251106120506 | ⚠️ Keep only new logic |
| `APPLY_ALL_MIGRATIONS.sql` | Manual script | ↗️ Move to scripts/ |
| `VERIFY_USER_ROLES_RLS.sql` | Manual script | ↗️ Move to scripts/ |

### Policy Conflict Migrations (Need Consolidation)

| Table | Affected Migrations | Status |
|-------|---------------------|--------|
| `profiles` | 20251102021126, 20251102022500 | ✅ Working but redundant |
| `company_representatives` | 20251102202931, 20251117000000 | ✅ Latest fix applied |
| `user_products` | 20251117000000 | ✅ Fixed |
| `user_registration_notifications` | 20251102040000, 20251106120545, 20251106122140, 20251117000001 | ✅ Latest fix applied |
| `role_requests` | 20251102021400, 20251106120545 | ⚠️ Review needed |

---

## Next Steps

1. **Review this audit with the team**
2. **Decide on consolidation approach:**
   - Option A: Leave as-is (no immediate risk)
   - Option B: Create single cleanup migration (recommended)
   - Option C: Full migration squash (most thorough, higher effort)
3. **Move manual scripts immediately** (zero risk)
4. **Establish migration review process** going forward

---

## Appendix: Migration Timeline

```
2025-01-15: Initial schema migrations
2025-10-22: Duplicate schema created (20251022200204)
2025-11-02: Multiple policy fix attempts (profiles, user_roles, role_requests)
2025-11-06: Security function refactoring + more policy fixes
2025-11-17: Final policy fixes (company_representatives, user_products, user_registration_notifications)
```

**Total span:** ~10 months  
**Most active period:** Nov 2-6, 2025 (multiple rapid fixes)

---

**Audit completed:** 2025-11-17  
**Auditor:** GitHub Copilot  
**Next review:** After implementing Phase 1 recommendations
