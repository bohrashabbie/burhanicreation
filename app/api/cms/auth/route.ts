import { NextResponse } from "next/server";
import { createSession, buildSessionCookie } from "@/lib/cms-auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.CMS_ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: "CMS not configured." }, { status: 500 });
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = await createSession();
    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", buildSessionCookie(token));
    return res;
  } catch (error) {
    console.error("CMS login error:", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
