import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms-auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // "contact" | "quote" | null (all)

  const contactLeads = type !== "quote" ? await prisma.contactLead.findMany({ orderBy: { createdAt: "desc" } }) : [];
  const quoteLeads = type !== "contact" ? await prisma.quoteLead.findMany({ orderBy: { createdAt: "desc" } }) : [];

  return NextResponse.json({
    contact: contactLeads,
    quote: quoteLeads,
  });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, type, status } = await req.json();
    if (type === "contact") {
      const lead = await prisma.contactLead.update({ where: { id }, data: { status } });
      return NextResponse.json(lead);
    } else {
      const lead = await prisma.quoteLead.update({ where: { id }, data: { status } });
      return NextResponse.json(lead);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
