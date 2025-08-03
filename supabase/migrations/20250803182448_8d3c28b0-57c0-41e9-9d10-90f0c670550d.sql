-- Fix RLS policies for analytics tables to allow anonymous access
DROP POLICY IF EXISTS "Allow anonymous insert for analytics_daily" ON public.analytics_daily;
DROP POLICY IF EXISTS "Allow anonymous update for analytics_daily" ON public.analytics_daily;

CREATE POLICY "Allow anonymous access for analytics_daily" 
ON public.analytics_daily 
FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous insert for analytics_page_visits" ON public.analytics_page_visits;
DROP POLICY IF EXISTS "Allow anonymous update for analytics_page_visits" ON public.analytics_page_visits;

CREATE POLICY "Allow anonymous access for analytics_page_visits" 
ON public.analytics_page_visits 
FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous insert for analytics_visitors" ON public.analytics_visitors;

CREATE POLICY "Allow anonymous access for analytics_visitors" 
ON public.analytics_visitors 
FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);