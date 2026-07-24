import { NextResponse } from "next/server";
import { getMailer, NOTIFY_TO, FROM } from "@/lib/mailer";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, countryCode, phone, email, service, details } = body;

    // Validate required fields
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }

    // Send email via Resend
    const { error: emailError } = await getMailer().emails.send({
      from: FROM,
      to: NOTIFY_TO,
      ...(email && typeof email === "string" && email.trim()
        ? { replyTo: `${fullName.trim()} <${email.trim()}>` }
        : {}),
      subject: `🚀 New Quotation Request from ${fullName.trim()} — ${service ?? "General Inquiry"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #111827; margin-top: 0;">New Quotation Request</h2>
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
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${email ? `<a href="mailto:${email.trim()}" style="color: #2563eb;">${email.trim()}</a>` : "<em>Not provided</em>"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Service</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;"><strong>${service ?? "General Inquiry"}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Details</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${details ? details.trim().replace(/\n/g, "<br>") : "<em>No details provided</em>"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Submitted at</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${new Date().toUTCString()}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend email error (quote):", emailError);
      return NextResponse.json(
        { error: "Failed to send your request. Please try again." },
        { status: 502 }
      );
    }

    console.log("--> Resend email sent (quote):", fullName, service);

    // Save lead to database
    await prisma.quoteLead.create({
      data: {
        fullName: fullName.trim(),
        countryCode: countryCode ?? null,
        phone: phone.trim(),
        email: email ? email.trim() : null,
        service: service ?? null,
        details: details ? details.trim() : null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Your quotation request has been received by Burhani Creation. We will reach out shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing quote request:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
