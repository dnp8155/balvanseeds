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
    const origin = req.headers.get("origin") || "https://balvanseeds.com";
    const logoUrl = "https://files.catbox.moe/tcg1ki.png"; // Publicly hosted logo

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

    const getAdminHtml = (d) => `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; color: #333; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
      .header { background-color: #ffffff; padding: 20px 20px; text-align: center; border-bottom: 3px solid #1a4f2c; }
      .header img { max-height: 70px; width: auto; }
      .content { padding: 40px 30px; }
      .content h2 { color: #1a4f2c; margin-top: 0; font-size: 22px; border-bottom: 2px solid #eef2f0; padding-bottom: 10px; }
      .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      .details-table td { padding: 12px 15px; border-bottom: 1px solid #eef2f0; }
      .details-table td:first-child { font-weight: 600; color: #555; width: 35%; }
      .message-box { background-color: #f9fbf9; border-left: 4px solid #1a4f2c; padding: 20px; margin-top: 30px; border-radius: 4px; }
      .footer { background-color: #1a1a1a; color: #aaa; text-align: center; padding: 20px; font-size: 12px; }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Balvan Agro Seeds" />
        </div>
        <div class="content">
          <h2>New Enquiry Received</h2>
          <table class="details-table">
            <tr><td>Name</td><td>${d.name || 'N/A'}</td></tr>
            <tr><td>Mobile</td><td>${d.phone || 'N/A'}</td></tr>
            <tr><td>Email</td><td>${d.email || 'N/A'}</td></tr>
            <tr><td>Location</td><td>${d.state || ''}, ${d.district || ''}</td></tr>
            <tr><td>Enquiry Type</td><td>${d.enquiry_type || 'N/A'}</td></tr>
          </table>
          
          <div class="message-box">
            <h4 style="margin-top:0; color: #1a4f2c;">Message:</h4>
            <p style="line-height: 1.6; margin-bottom: 0;">${d.message ? d.message.replace(/\n/g, '<br/>') : 'No message provided.'}</p>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Balvan Seeds. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `;

    // 1. Email to the admin
    const adminMailOptions = {
      from: `Balvan Seeds Website <${user}>`,
      to: user, 
      replyTo: data.email || undefined,
      subject: `New Website Enquiry: ${data.subject || data.enquiry_type}`,
      html: getAdminHtml(data)
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Thank you email to the user (if email is provided)
    if (data.email) {
      const getUserHtml = (d) => `
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background-color: #ffffff; padding: 20px 20px; text-align: center; border-bottom: 3px solid #1a4f2c; }
        .header img { max-height: 70px; width: auto; }
        .hero { background-color: #e8f3ec; padding: 40px 20px; text-align: center; }
        .hero h2 { color: #1a4f2c; margin: 0 0 15px 0; font-size: 26px; }
        .hero p { font-size: 16px; color: #555; line-height: 1.6; margin: 0; max-width: 90%; margin: 0 auto; }
        .content { padding: 40px 30px; line-height: 1.8; color: #444; }
        .btn-container { text-align: center; margin-top: 30px; margin-bottom: 10px; }
        .btn { display: inline-block; background-color: #1a4f2c; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 30px; font-weight: bold; letter-spacing: 0.5px; }
        .footer { background-color: #1a1a1a; color: #aaa; text-align: center; padding: 25px 20px; font-size: 13px; line-height: 1.6; }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="Balvan Agro Seeds" />
          </div>
          <div class="hero">
            <h2>Thank You for Reaching Out!</h2>
            <p>We appreciate your interest in Balvan Seeds' high-quality agricultural products.</p>
          </div>
          <div class="content">
            <p>Dear <strong>${d.name || 'Customer'}</strong>,</p>
            <p>We have successfully received your enquiry regarding <strong>"${d.subject || d.enquiry_type || 'our products'}"</strong>. Our agronomy and sales team will review your message and get back to you within 1-2 business days.</p>
            <p>At Balvan Seeds, we are committed to providing top-quality seeds and dedicated support to ensure your farming success.</p>
            
            <div class="btn-container">
              <a href="https://balvanseeds.com" class="btn">Explore Our Products</a>
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Balvan Seeds. All rights reserved.<br>
            Contact us: info@balvanseeds.com
          </div>
        </div>
      </body>
      </html>
      `;

      const userMailOptions = {
        from: `Balvan Seeds <${user}>`,
        to: data.email,
        subject: `Thank You for Contacting Balvan Seeds`,
        html: getUserHtml(data)
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
