import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting for security event logging
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_EVENTS = 10; // Max 10 security events per minute per client

const checkRateLimit = (clientFingerprint: string): boolean => {
  const now = Date.now();
  const current = rateLimitStore.get(clientFingerprint);
  
  if (!current || now - current.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(clientFingerprint, { count: 1, timestamp: now });
    return true;
  }
  
  if (current.count >= RATE_LIMIT_MAX_EVENTS) {
    return false;
  }
  
  current.count++;
  return true;
};

interface SecurityEventData {
  event_type: 'form_submission_failed' | 'unusual_activity' | 'rate_limit_exceeded' | 'suspicious_request' | 'repeated_failures';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, any>;
  user_agent: string;
  url: string;
  client_fingerprint: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const eventData: SecurityEventData = await req.json();

    // Validate required fields
    if (!eventData.event_type || !eventData.client_fingerprint) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Rate limiting based on client fingerprint
    if (!checkRateLimit(eventData.client_fingerprint)) {
      console.warn(`Rate limit exceeded for client: ${eventData.client_fingerprint}`);
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Hash the client fingerprint for privacy
    const { data: hashedFingerprint } = await supabase.rpc('hash_ip', { 
      ip_address: eventData.client_fingerprint 
    });

    // Hash user agent for privacy (keep only first 50 chars)
    const userAgentHash = eventData.user_agent ? 
      btoa(eventData.user_agent.substring(0, 50)).substring(0, 20) : null;

    // Insert security event
    const { error } = await supabase
      .from('security_events')
      .insert({
        event_type: eventData.event_type,
        severity: eventData.severity,
        details: eventData.details,
        ip_hash: hashedFingerprint,
        user_agent_hash: userAgentHash,
        url: eventData.url
      });

    if (error) {
      console.error('Error inserting security event:', error);
      return new Response(JSON.stringify({ error: 'Failed to log security event' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Log critical events for immediate attention
    if (eventData.severity === 'critical') {
      console.error(`CRITICAL SECURITY EVENT: ${eventData.event_type}`, {
        fingerprint: hashedFingerprint,
        details: eventData.details,
        url: eventData.url
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in track-security-event function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
