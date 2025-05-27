
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSubscriptionRequest {
  firstName: string;
  lastName: string;
  email: string;
  consentGiven: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter subscription function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }

  try {
    const { firstName, lastName, email, consentGiven }: NewsletterSubscriptionRequest = await req.json();
    
    console.log("Received newsletter subscription from:", email);

    // Validate required fields
    if (!firstName || !lastName || !email || !consentGiven) {
      return new Response(
        JSON.stringify({ error: "All fields are required and consent must be given" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('email, unsubscribed_at')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      if (!existingSubscriber.unsubscribed_at) {
        return new Response(
          JSON.stringify({ error: "This email is already subscribed to our newsletter" }),
          { 
            status: 400, 
            headers: { "Content-Type": "application/json", ...corsHeaders } 
          }
        );
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            first_name: firstName,
            last_name: lastName,
            consent_given: consentGiven,
            unsubscribed_at: null,
            updated_at: new Date().toISOString()
          })
          .eq('email', email);

        if (updateError) {
          console.error('Error reactivating subscription:', updateError);
          throw new Error('Failed to reactivate subscription');
        }
      }
    } else {
      // Insert new subscriber
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: email,
          consent_given: consentGiven
        });

      if (insertError) {
        console.error('Error inserting subscriber:', insertError);
        throw new Error('Failed to subscribe to newsletter');
      }
    }

    // Send welcome email to subscriber
    const welcomeEmailResponse = await resend.emails.send({
      from: "DLinRT Newsletter <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to the DLinRT Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Welcome to DLinRT Newsletter, ${firstName}!
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #374151; line-height: 1.6;">
              Thank you for subscribing to our newsletter! You'll now receive the latest updates about 
              deep learning solutions in radiotherapy, new product listings, and important announcements 
              from the DLinRT community.
            </p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">What to expect:</h3>
            <ul style="color: #4b5563; line-height: 1.6;">
              <li>Monthly updates on new AI products and tools</li>
              <li>Industry news and research highlights</li>
              <li>Community announcements and events</li>
              <li>Expert insights from radiotherapy professionals</li>
            </ul>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              You can unsubscribe at any time by contacting us at info@dlinrt.eu
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>This email was sent from DLinRT.eu</p>
            <p>Visit us at <a href="https://dlinrt.eu" style="color: #2563eb;">DLinRT.eu</a></p>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "DLinRT Newsletter <onboarding@resend.dev>",
      to: ["info@dlinrt.eu"],
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Newsletter Subscription
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Subscriber Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Consent given:</strong> ${consentGiven ? 'Yes' : 'No'}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>This notification was sent from the DLinRT newsletter system</p>
          </div>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", welcomeEmailResponse);
    console.log("Admin notification sent successfully:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully subscribed to newsletter" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in subscribe-newsletter function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to subscribe to newsletter", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
