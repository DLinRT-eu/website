-- Fix database function security warnings by adding proper search_path configuration

-- Update the cleanup_old_analytics_data function to include proper search_path security
CREATE OR REPLACE FUNCTION public.cleanup_old_analytics_data()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    -- Calculate date 1 year ago
    DECLARE
        cutoff_date date := CURRENT_DATE - INTERVAL '1 year';
    BEGIN
        -- Delete old analytics visitors data
        DELETE FROM public.analytics_visitors 
        WHERE date < cutoff_date;
        
        -- Delete old page visits data
        DELETE FROM public.analytics_page_visits 
        WHERE date < cutoff_date;
        
        -- Delete old daily analytics data
        DELETE FROM public.analytics_daily 
        WHERE date < cutoff_date;
        
        -- Log the cleanup action
        RAISE NOTICE 'Cleaned up analytics data older than %', cutoff_date;
    END;
END;
$function$;

-- Update the schedule_analytics_cleanup function to include proper search_path security
CREATE OR REPLACE FUNCTION public.schedule_analytics_cleanup()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    -- This function can be called by a cron job or scheduled task
    PERFORM public.cleanup_old_analytics_data();
END;
$function$;