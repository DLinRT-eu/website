import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  reviewerId: string;
  roundName: string;
  assignmentCount: number;
  deadline?: string;
  productNames: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reviewerId, roundName, assignmentCount, deadline, productNames }: NotificationRequest = await req.json();

    console.log("Processing notification for reviewer:", reviewerId);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get reviewer details
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, first_name, last_name")
      .eq("id", reviewerId)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching reviewer profile:", profileError);
      throw new Error("Reviewer not found");
    }

    console.log("Sending email to:", profile.email);

    // Create dashboard URL
    const dashboardUrl = `${supabaseUrl.replace('.supabase.co', '')}/review`;

    // Format deadline
    const deadlineText = deadline 
      ? new Date(deadline).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : "No deadline set";

    // Prepare product list (limit to first 5)
    const displayProducts = productNames.slice(0, 5);
    const hasMore = productNames.length > 5;

    const emailResponse = await resend.emails.send({
      from: "Review System <onboarding@resend.dev>",
      to: [profile.email],
      subject: `New Review Assignment: ${roundName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Review Assignment</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Review Assignment</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; margin-top: 0;">
                Hello ${profile.first_name} ${profile.last_name},
              </p>
              
              <p style="font-size: 16px;">
                You have been assigned <strong style="color: #667eea;">${assignmentCount} product${assignmentCount !== 1 ? 's' : ''}</strong> 
                to review as part of <strong>${roundName}</strong>.
              </p>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 2px solid #667eea;">
                <h2 style="margin-top: 0; color: #667eea; font-size: 18px;">Assignment Details</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Round:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600;">${roundName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Products:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600;">${assignmentCount}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Deadline:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600; ${!deadline ? 'color: #9ca3af;' : ''}">${deadlineText}</td>
                  </tr>
                </table>
              </div>

              ${displayProducts.length > 0 ? `
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e5e7eb;">
                <h3 style="margin-top: 0; color: #374151; font-size: 16px;">Products to Review:</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  ${displayProducts.map(name => `<li style="margin: 5px 0;">${name}</li>`).join('')}
                  ${hasMore ? `<li style="margin: 5px 0; color: #6b7280; font-style: italic;">...and ${productNames.length - 5} more</li>` : ''}
                </ul>
              </div>
              ` : ''}

              <div style="text-align: center; margin: 30px 0;">
                <a href="${dashboardUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.25);">
                  Go to Review Dashboard
                </a>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 5px 0;">
                  <strong>Need help?</strong> Contact your administrator if you have questions about your assignments.
                </p>
                <p style="margin: 5px 0; color: #9ca3af;">
                  This is an automated notification from the Review System.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-reviewer-assignment function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
