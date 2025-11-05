-- Grant usage on public schema to authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant full CRUD privileges on reviewer_expertise table to authenticated role
-- RLS policies will still control row-level access
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.reviewer_expertise TO authenticated;

-- Grant read/update/delete privileges on notifications table to authenticated role
-- Insert is reserved for service role via functions
GRANT SELECT, UPDATE, DELETE ON TABLE public.notifications TO authenticated;

-- Optional: Set default privileges for future tables to avoid this issue
-- This ensures any new tables created will automatically grant privileges to authenticated
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;