-- Ensure authenticated role has table privileges; RLS will enforce access
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_roles TO authenticated;

-- Also grant usage on enum type to avoid permission issues
GRANT USAGE ON TYPE public.app_role TO authenticated;