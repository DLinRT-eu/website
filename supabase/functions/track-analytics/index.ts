// Supabase Edge Function: track-analytics
// Handles analytics writes using the service role to satisfy restrictive RLS
// Endpoint: POST /functions/v1/track-analytics

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Rate limiting store (in-memory for this instance)
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // Max 30 requests per minute per IP

// Allowed origins for security
const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173", // Local development
  "http://localhost:3000"  // Alternative local port
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const key = `track_analytics_${clientIp}`;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, []);
  }
  
  const requests = rateLimitStore.get(key)!;
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return false;
  }
  
  validRequests.push(now);
  rateLimitStore.set(key, validRequests);
  return true;
}

type DailyVisitData = {
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  pageVisits: Record<string, { count: number; totalDuration: number }>;
};

type RequestBody =
  | { action: "save_analytics"; date: string; data: DailyVisitData }
  | { action: "record_unique_visitor"; date: string; visitorId: string };

function jsonResponse(body: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
  }

  // Rate limiting by IP
  const clientIp = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(clientIp)) {
    return jsonResponse({ error: "Rate limit exceeded" }, 429, corsHeaders);
  }

  let body: RequestBody;
  try {
    const text = await req.text();
    if (text.length > 10000) { // Cap payload size
      return jsonResponse({ error: "Payload too large" }, 413, corsHeaders);
    }
    body = JSON.parse(text);
  } catch (_e) {
    return jsonResponse({ error: "Invalid JSON" }, 400, corsHeaders);
  }

  try {
    if (body.action === "record_unique_visitor") {
      const { date, visitorId } = body;
      if (!date || !visitorId || typeof date !== 'string' || typeof visitorId !== 'string') {
        return jsonResponse({ error: "Missing or invalid fields" }, 400, corsHeaders);
      }
      if (date.length > 50 || visitorId.length > 200) { // Reasonable limits
        return jsonResponse({ error: "Field values too long" }, 400, corsHeaders);
      }

      const { data: existing, error: selectErr } = await supabase
        .from("analytics_visitors")
        .select("id")
        .eq("date", date)
        .eq("visitor_id", visitorId)
        .maybeSingle();
      if (selectErr) throw selectErr;

      if (existing) return jsonResponse({ isNew: false }, 200, corsHeaders);

      const { error: insertErr } = await supabase
        .from("analytics_visitors")
        .insert({ date, visitor_id: visitorId });
      if (insertErr) {
        if (insertErr.code === "23505") return jsonResponse({ isNew: false }, 200, corsHeaders);
        throw insertErr;
      }

      return jsonResponse({ isNew: true }, 200, corsHeaders);
    }

    if (body.action === "save_analytics") {
      const { date, data } = body;
      if (!date || !data || typeof date !== 'string' || typeof data !== 'object') {
        return jsonResponse({ error: "Missing or invalid fields" }, 400, corsHeaders);
      }

      const { error: dailyErr } = await supabase
        .from("analytics_daily")
        .upsert(
          {
            date,
            total_visits: data.totalVisits,
            unique_visitors: data.uniqueVisitors,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "date" }
        );
      if (dailyErr) throw dailyErr;

      const pageRows = Object.entries(data.pageVisits).map(([path, v]) => ({
        date,
        path,
        title: path,
        visit_count: v.count,
        total_duration: v.totalDuration,
        updated_at: new Date().toISOString(),
      }));

      if (pageRows.length) {
        const { error: pageErr } = await supabase
          .from("analytics_page_visits")
          .upsert(pageRows, { onConflict: "date,path" });
        if (pageErr) throw pageErr;
      }

      return jsonResponse({ ok: true }, 200, corsHeaders);
    }

    return jsonResponse({ error: "Unknown action" }, 400, corsHeaders);
  } catch (e) {
    console.error("track-analytics error", e);
    return jsonResponse({ error: "Internal error" }, 500, corsHeaders);
  }
});
