-- Remove public access from analytics tables and implement proper RLS policies

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow anonymous access for analytics_daily" ON public.analytics_daily;
DROP POLICY IF EXISTS "Allow anonymous access for analytics_page_visits" ON public.analytics_page_visits;
DROP POLICY IF EXISTS "Allow anonymous access for analytics_visitors" ON public.analytics_visitors;

-- Create restrictive policies for analytics_daily (aggregated data - can be public for display)
CREATE POLICY "Allow public read access for analytics_daily" 
ON public.analytics_daily 
FOR SELECT 
USING (true);

CREATE POLICY "Allow service role write access for analytics_daily" 
ON public.analytics_daily 
FOR INSERT 
WITH CHECK (current_setting('role') = 'service_role');

CREATE POLICY "Allow service role update access for analytics_daily" 
ON public.analytics_daily 
FOR UPDATE 
USING (current_setting('role') = 'service_role');

-- Create restrictive policies for analytics_page_visits (aggregated data - can be public for display)
CREATE POLICY "Allow public read access for analytics_page_visits" 
ON public.analytics_page_visits 
FOR SELECT 
USING (true);

CREATE POLICY "Allow service role write access for analytics_page_visits" 
ON public.analytics_page_visits 
FOR INSERT 
WITH CHECK (current_setting('role') = 'service_role');

CREATE POLICY "Allow service role update access for analytics_page_visits" 
ON public.analytics_page_visits 
FOR UPDATE 
USING (current_setting('role') = 'service_role');

-- Create restrictive policies for analytics_visitors (SENSITIVE DATA - service role only)
CREATE POLICY "Allow service role access for analytics_visitors" 
ON public.analytics_visitors 
FOR ALL 
USING (current_setting('role') = 'service_role')
WITH CHECK (current_setting('role') = 'service_role');

-- Create a view for public analytics data that doesn't expose visitor IDs
CREATE OR REPLACE VIEW public.analytics_summary AS
SELECT 
    ad.date,
    ad.total_visits,
    ad.unique_visitors,
    ad.created_at,
    ad.updated_at
FROM public.analytics_daily ad
ORDER BY ad.date DESC;

-- Grant public access to the view
GRANT SELECT ON public.analytics_summary TO anon, authenticated;