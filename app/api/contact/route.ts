import { NextResponse } from 'next/server';

// Simple in-memory rate limiter cache
const ipCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // max 5 submissions per minute per IP

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const now = Date.now();
    const clientData = ipCache.get(ip);

    // Rate limiting check
    if (clientData) {
      if (now > clientData.resetTime) {
        // Reset window
        ipCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else {
        clientData.count++;
        if (clientData.count > MAX_REQUESTS) {
          console.warn(`[contact] Rate limit exceeded for IP: ${ip}`);
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
      }
    } else {
      ipCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    const body = await request.json();
    const { name, email, message, projectType, timeline, websiteUrl } = body;

    // Honeypot check: If the hidden honeypot field is filled, silently return success (200 OK)
    // to trick spam bots without processing or saving the submission.
    if (websiteUrl) {
      console.warn('[contact] Honeypot triggered. Silent success returned.');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Server-side validation
    if (!name?.trim())                               return NextResponse.json({ error: 'Name required' },  { status: 400 });
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                                     return NextResponse.json({ error: 'Invalid email' },  { status: 400 });
    if (!projectType)                                return NextResponse.json({ error: 'Project type required' }, { status: 400 });
    if (!timeline)                                   return NextResponse.json({ error: 'Timeline required' },     { status: 400 });

    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'hello@fkstudio.sk';

    if (!resendApiKey) {
      console.error('[contact] Missing RESEND_API_KEY env variable.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }


    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FK STUDIO <noreply@fkstudio.sk>',
        to: receiverEmail,
        subject: `New Project Inquiry: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; color: #1a1a1a;">
            <h2 style="color: #F85F1E; font-size: 24px; font-weight: 800; border-bottom: 2px solid #F85F1E; padding-bottom: 12px; margin-top: 0; text-transform: uppercase; letter-spacing: 0.05em;">New Project Inquiry</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #666; border-bottom: 1px solid #eaeaea;">Client Name:</td>
                <td style="padding: 10px 0; font-size: 16px; font-weight: 600; border-bottom: 1px solid #eaeaea;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666; border-bottom: 1px solid #eaeaea;">Client Email:</td>
                <td style="padding: 10px 0; font-size: 16px; border-bottom: 1px solid #eaeaea;"><a href="mailto:${email}" style="color: #F85F1E; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666; border-bottom: 1px solid #eaeaea;">Project Type:</td>
                <td style="padding: 10px 0; font-size: 16px; text-transform: capitalize; border-bottom: 1px solid #eaeaea;">${projectType}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666; border-bottom: 1px solid #eaeaea;">Timeline:</td>
                <td style="padding: 10px 0; font-size: 16px; border-bottom: 1px solid #eaeaea;">${timeline}</td>
              </tr>
            </table>
            
            <div style="margin-top: 35px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border-left: 4px solid #F85F1E;">
              <h4 style="margin-top: 0; margin-bottom: 12px; color: #1a1a1a; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em;">Message details:</h4>
              <p style="margin: 0; line-height: 1.6; color: #333333; font-size: 15px; white-space: pre-wrap;">${message || '(No message content provided)'}</p>
            </div>
            
            <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eaeaea; padding-top: 20px;">
              © ${new Date().getFullYear()} FK STUDIO. Sent via Resend secure backend API.
            </div>
          </div>
        `,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('[contact] Resend API error:', resendData);
      return NextResponse.json(
        { error: resendData.message || 'Failed to send email via Resend' },
        { status: 502 }
      );
    }


    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Error in route:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
