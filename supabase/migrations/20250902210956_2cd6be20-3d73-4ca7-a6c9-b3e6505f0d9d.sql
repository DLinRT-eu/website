-- Enable RLS and add policies for analytics_summary
ALTER TABLE public.analytics_summary ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access for analytics_summary"
ON public.analytics_summary
FOR SELECT
USING (true);

-- Restrict writes to service role
CREATE POLICY "Allow service role write access for analytics_summary"
ON public.analytics_summary
FOR INSERT
WITH CHECK (current_setting('role'::text) = 'service_role'::text);

CREATE POLICY "Allow service role update access for analytics_summary"
ON public.analytics_summary
FOR UPDATE
USING (current_setting('role'::text) = 'service_role'::text);
