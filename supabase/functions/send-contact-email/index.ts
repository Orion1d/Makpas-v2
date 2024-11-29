import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RECEIVER_EMAIL = "sandbox.smtp.mailtrap.io";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name?: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log the RESEND_API_KEY presence (not the actual value)
    console.log("RESEND_API_KEY present:", !!RESEND_API_KEY);

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const contactRequest: ContactRequest = await req.json();
    console.log("Received contact request:", contactRequest);
    
    // Store in database
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: contactRequest.name,
        email: contactRequest.email,
        message: contactRequest.message,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store contact submission");
    }

    // Send email using the user's email as the from address
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `${contactRequest.name || 'Contact Form'} <${contactRequest.email}>`,
        to: [RECEIVER_EMAIL],
        subject: `New Contact Form Submission from ${contactRequest.name || 'Anonymous'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactRequest.name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${contactRequest.email}</p>
          <p><strong>Message:</strong></p>
          <p>${contactRequest.message}</p>
        `,
      }),
    });

    console.log("Resend API response status:", emailResponse.status);

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in contact form submission:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);