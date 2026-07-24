import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms-auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await prisma.siteSetting.findMany();
  // Convert array to key-value map
  const result: Record<string, unknown> = {};
  for (const s of settings) result[s.key] = s.value;
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    // body should be { key: string, value: unknown }
    const { key, value } = body;
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    return NextResponse.json(setting);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}
