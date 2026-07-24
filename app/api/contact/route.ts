import { NextResponse } from "next/server";
import { mg, MAILGUN_DOMAIN, NOTIFY_TO, FROM } from "@/lib/mailer";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, countryCode, phone, email, message } = body;

    // Validate required fields
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    // Send email via Mailgun
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: FROM,
      to: NOTIFY_TO,
      subject: `📩 New Contact Message from ${fullName.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #111827; margin-top: 0;">New Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 130px;">Name</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;"><strong>${fullName.trim()}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${countryCode ?? ""} ${phone.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;"><a href="mailto:${email.trim()}" style="color: #2563eb;">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${message ? message.trim().replace(/\n/g, "<br>") : "<em>No message provided</em>"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Submitted at</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${new Date().toUTCString()}</td>
            </tr>
          </table>
        </div>
      `,
    });

    console.log("--> Mailgun email sent (contact):", fullName, email);

    // Save lead to database
    await prisma.contactLead.create({
      data: {
        fullName: fullName.trim(),
        countryCode: countryCode ?? null,
        phone: phone.trim(),
        email: email.trim(),
        message: message ? message.trim() : null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Thank you for contacting Burhani Creation. We have received your message." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact request:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
