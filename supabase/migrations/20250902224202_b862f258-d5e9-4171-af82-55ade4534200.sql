-- Secure analytics data: enable strict RLS and revoke public access to views and RPCs
-- This migration restricts reads of analytics data while preserving writes via Edge Functions (service role bypasses RLS)

begin;

-- 1) Enable RLS on analytics tables (deny by default)
alter table if exists public.analytics_daily enable row level security;
alter table if exists public.analytics_page_visits enable row level security;
alter table if exists public.analytics_visitors enable row level security;

-- Drop overly permissive policies if any existed (safety; ignore if none)
-- Note: Using IF EXISTS to avoid errors when policies are absent
drop policy if exists "Enable read access for all users" on public.analytics_daily;
drop policy if exists "Enable read access for all users" on public.analytics_page_visits;
drop policy if exists "Enable read access for all users" on public.analytics_visitors;

-- 2) Explicitly revoke all privileges from PUBLIC roles on analytics relations
-- Revoke on underlying tables
revoke all on table public.analytics_daily from public, anon, authenticated;
revoke all on table public.analytics_page_visits from public, anon, authenticated;
revoke all on table public.analytics_visitors from public, anon, authenticated;

-- Revoke on views exposing analytics aggregates
revoke all on table public.analytics_public from public, anon, authenticated;
revoke all on table public.analytics_summary from public, anon, authenticated;

-- 3) Revoke execute on RPC functions that expose analytics
revoke execute on function public.get_analytics_daily(date, date) from public, anon, authenticated;
revoke execute on function public.get_analytics_page_visits(date, date) from public, anon, authenticated;

-- 4) Optional: ensure future objects don’t default to PUBLIC access (for current owner)
alter default privileges in schema public revoke select, insert, update, delete on tables from public, anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;

commit;