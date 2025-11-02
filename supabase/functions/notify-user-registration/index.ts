import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Common free email providers to block (only institutional emails allowed)
const BLOCKED_EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", 
  "live.com", "msn.com", "aol.com", "icloud.com", 
  "protonmail.com", "mail.com", "zoho.com", "yandex.com",
  "gmx.com", "inbox.com", "fastmail.com", "hushmail.com"
];

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isInstitutionalEmail(email: string): boolean {
  const domain = email.toLowerCase().split('@')[1];
  if (!domain) return false;
  
  // Block common free email providers
  if (BLOCKED_EMAIL_DOMAINS.includes(domain)) {
    return false;
  }
  
  // Additional checks for institutional emails
  // Institutional emails typically have domains ending in .edu, .gov, .ac.*, .org, or company domains
  const institutionalPatterns = [
    /\.edu$/,           // Educational institutions
    /\.gov$/,           // Government
    /\.ac\.[a-z]{2}$/,  // Academic institutions (e.g., .ac.uk, .ac.jp)
    /\.org$/,           // Organizations
    /\.(com|net|eu|co\.[a-z]{2})$/ // Company domains (allow but will be manually verified)
  ];
  
  return institutionalPatterns.some(pattern => pattern.test(domain));
}

interface UserRegistrationData {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Verify the request is from Supabase (check for service role key)
    const authHeader = req.headers.get("authorization");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!authHeader || !serviceRoleKey || !authHeader.includes(serviceRoleKey)) {
      console.error("Unauthorized request to notify-user-registration");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { userId, email, firstName, lastName, createdAt }: UserRegistrationData = await req.json();

    // Validate email is institutional
    if (!isInstitutionalEmail(email)) {
      console.warn(`Non-institutional email registration blocked: ${email}`);
      return new Response(
        JSON.stringify({ 
          error: "Only institutional email addresses are allowed. Please use your organization or university email.",
          blocked: true
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare user display name
    const userName = firstName && lastName 
      ? `${escapeHtml(firstName)} ${escapeHtml(lastName)}` 
      : "Not provided";
    
    const emailDomain = email.split('@')[1];

    // Send notification email to admin
    const emailResponse = await resend.emails.send({
      from: "DLinRT.eu User Registration <noreply@dlinrt.eu>",
      to: ["info@dlinrt.eu"],
      subject: `🔔 New User Registration - Verification Required`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🔔 New User Registration</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Action Required: User Verification</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
              <p style="margin: 0; color: #92400e; font-weight: 600;">
                ⚠️ This user requires manual verification before their account can be fully activated.
              </p>
            </div>

            <h2 style="color: #1f2937; margin-top: 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              User Information
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${userName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(email)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Domain:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(emailDomain)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">User ID:</td>
                  <td style="padding: 8px 0; color: #4b5563; font-family: monospace; font-size: 12px;">${escapeHtml(userId)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Registered:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${new Date(createdAt).toLocaleString('en-US', { 
                    dateStyle: 'full', 
                    timeStyle: 'long',
                    timeZone: 'Europe/Brussels'
                  })}</td>
                </tr>
              </table>
            </div>

            <h2 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              Verification Steps
            </h2>
            
            <ol style="color: #4b5563; line-height: 1.8; padding-left: 20px;">
              <li style="margin-bottom: 10px;">
                <strong>Verify Email Domain:</strong> Confirm that <code style="background-color: #f3f4f6; padding: 2px 6px; border-radius: 3px;">${escapeHtml(emailDomain)}</code> belongs to a legitimate institution
              </li>
              <li style="margin-bottom: 10px;">
                <strong>Check User Identity:</strong> Verify the user's identity and affiliation with their institution
              </li>
              <li style="margin-bottom: 10px;">
                <strong>Validate Email:</strong> Ensure the user has verified their email address (check Supabase Auth dashboard)
              </li>
              <li style="margin-bottom: 10px;">
                <strong>Approve or Reject:</strong> Log into the DLinRT.eu admin dashboard to approve or reject this user
              </li>
            </ol>

            <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; border-radius: 4px; margin: 25px 0;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>🔒 Security Note:</strong> Only institutional email addresses are allowed. Free email providers (Gmail, Yahoo, etc.) are automatically blocked.
              </p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="https://dlinrt.eu/admin/users" 
                 style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Open Admin Dashboard
              </a>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">This is an automated notification from DLinRT.eu User Registration System</p>
            <p style="margin: 5px 0 0 0;">If you have questions, please contact the technical team</p>
          </div>
        </div>
      `,
    });

    console.log(`User registration notification sent successfully for user ${userId}, email ID: ${emailResponse.data?.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Registration notification sent",
        emailId: emailResponse.data?.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-user-registration function:", error.message);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send registration notification",
        details: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
