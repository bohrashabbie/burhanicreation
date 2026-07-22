import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, countryCode, phone, email, service, details } = body;

    // Validate required fields
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    // Process & log request (Stub for Resend/Nodemailer integration)
    console.log("--> New Quotation Request Received:", {
      fullName,
      phone: `${countryCode} ${phone}`,
      email: email || "N/A",
      service: service || "General Inquiry",
      details: details || "No details provided",
      timestamp: new Date().toISOString(),
    });

    // Simulated email delivery success response
    return NextResponse.json(
      {
        success: true,
        message: "Your quotation request has been received by Burhani Creation. We will reach out shortly.",
      },
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
