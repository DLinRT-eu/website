-- Fix the security definer view issue by recreating the analytics_summary view without SECURITY DEFINER
DROP VIEW IF EXISTS public.analytics_summary;

CREATE VIEW public.analytics_summary AS
SELECT 
    ad.date,
    ad.total_visits,
    ad.unique_visitors,
    ad.created_at,
    ad.updated_at
FROM analytics_daily ad
ORDER BY ad.date DESC;