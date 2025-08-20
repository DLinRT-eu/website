// Supabase Edge Function: track-analytics
// Handles analytics writes using the service role to satisfy restrictive RLS
// Endpoint: POST /functions/v1/track-analytics

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type DailyVisitData = {
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  pageVisits: Record<string, { count: number; totalDuration: number }>;
};

type RequestBody =
  | { action: "save_analytics"; date: string; data: DailyVisitData }
  | { action: "record_unique_visitor"; date: string; visitorId: string };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch (_e) {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  try {
    if (body.action === "record_unique_visitor") {
      const { date, visitorId } = body;
      if (!date || !visitorId) return jsonResponse({ error: "Missing fields" }, 400);

      const { data: existing, error: selectErr } = await supabase
        .from("analytics_visitors")
        .select("id")
        .eq("date", date)
        .eq("visitor_id", visitorId)
        .maybeSingle();
      if (selectErr) throw selectErr;

      if (existing) return jsonResponse({ isNew: false });

      const { error: insertErr } = await supabase
        .from("analytics_visitors")
        .insert({ date, visitor_id: visitorId });
      if (insertErr) {
        if (insertErr.code === "23505") return jsonResponse({ isNew: false });
        throw insertErr;
      }

      return jsonResponse({ isNew: true });
    }

    if (body.action === "save_analytics") {
      const { date, data } = body;
      if (!date || !data) return jsonResponse({ error: "Missing fields" }, 400);

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

      return jsonResponse({ ok: true });
    }

    return jsonResponse({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("track-analytics error", e);
    return jsonResponse({ error: "Internal error" }, 500);
  }
});
