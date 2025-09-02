-- Harden Analytics Data Access
-- Replace broad public read access with SECURITY DEFINER functions for aggregated analytics only

-- 1) Remove existing broad public read policies
DROP POLICY IF EXISTS "Allow public read access for analytics_daily" ON public.analytics_daily;
DROP POLICY IF EXISTS "Allow public read access for analytics_page_visits" ON public.analytics_page_visits;

-- 2) Remove public read for analytics_public view (keep as read-only aggregated view)
DROP POLICY IF EXISTS "Allow public read access for analytics_public" ON public.analytics_public;

-- 3) Create SECURITY DEFINER functions for controlled public access to analytics
CREATE OR REPLACE FUNCTION public.get_analytics_daily(start_date date DEFAULT NULL, end_date date DEFAULT NULL)
RETURNS TABLE(
  id uuid,
  date date,
  unique_visitors integer,
  total_visits integer,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT ad.id, ad.date, ad.unique_visitors, ad.total_visits, ad.created_at, ad.updated_at
  FROM analytics_daily ad
  WHERE (start_date IS NULL OR ad.date >= start_date)
    AND (end_date IS NULL OR ad.date <= end_date)
  ORDER BY ad.date;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_analytics_page_visits(start_date date DEFAULT NULL, end_date date DEFAULT NULL)
RETURNS TABLE(
  id uuid,
  date date,
  path text,
  title text,
  visit_count integer,
  total_duration integer,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT apv.id, apv.date, apv.path, apv.title, apv.visit_count, apv.total_duration, apv.created_at, apv.updated_at
  FROM analytics_page_visits apv
  WHERE (start_date IS NULL OR apv.date >= start_date)
    AND (end_date IS NULL OR apv.date <= end_date)
  ORDER BY apv.date, apv.path;
END;
$$;

-- 4) Create new restrictive RLS policies for service role only
CREATE POLICY "Service role full access analytics_daily"
ON public.analytics_daily
FOR ALL
TO public
USING (current_setting('role'::text) = 'service_role'::text)
WITH CHECK (current_setting('role'::text) = 'service_role'::text);

CREATE POLICY "Service role full access analytics_page_visits"
ON public.analytics_page_visits
FOR ALL
TO public
USING (current_setting('role'::text) = 'service_role'::text)
WITH CHECK (current_setting('role'::text) = 'service_role'::text);

-- 5) Grant execute permissions on the SECURITY DEFINER functions to public
GRANT EXECUTE ON FUNCTION public.get_analytics_daily(date, date) TO public;
GRANT EXECUTE ON FUNCTION public.get_analytics_page_visits(date, date) TO public;