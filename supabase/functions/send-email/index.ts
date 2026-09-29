import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import nodemailer from "npm:nodemailer@6.9.13";

console.log("send-email function started");

Deno.serve(async (req) => {
  // CORS headers for browser requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const data = await req.json();

    const host = Deno.env.get("SMTP_HOST") || "smtp.hostinger.com";
    const port = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const user = Deno.env.get("SMTP_USER");
    const pass = Deno.env.get("SMTP_PASS");

    if (!user || !pass) {
      throw new Error("SMTP credentials not configured.");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, 
      auth: { user, pass }
    });

    // 1. Email to the admin
    const adminMailOptions = {
      from: `Balvan Seeds Website <${user}>`,
      to: user, 
      replyTo: data.email || undefined,
      subject: `New Website Enquiry: ${data.subject || data.enquiry_type}`,
      text: `You have received a new enquiry from the Balvan Seeds website.\n\n` +
            `Name: ${data.name || 'N/A'}\n` +
            `Mobile: ${data.phone || 'N/A'}\n` +
            `Email: ${data.email || 'N/A'}\n` +
            `Location: ${data.state || ''}, ${data.district || ''}\n` +
            `Enquiry Type: ${data.enquiry_type || 'N/A'}\n\n` +
            `Message:\n${data.message || 'No message provided.'}`
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Thank you email to the user (if email is provided)
    if (data.email) {
      const userMailOptions = {
        from: `Balvan Seeds <${user}>`,
        to: data.email,
        subject: `Thank You for Contacting Balvan Seeds`,
        text: `Dear ${data.name},\n\n` +
              `Thank you for reaching out to Balvan Seeds! We have received your enquiry regarding "${data.subject || data.enquiry_type}".\n\n` +
              `Our team will review your message and get back to you shortly.\n\n` +
              `Best regards,\nBalvan Seeds Team`
      };
      await transporter.sendMail(userMailOptions);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
