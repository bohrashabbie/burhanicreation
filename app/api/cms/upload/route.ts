import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms-auth";
import { writeFile, readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const MEDIA_DIR = path.join(process.cwd(), "public", "media");

async function ensureMediaDir() {
  if (!existsSync(MEDIA_DIR)) {
    await mkdir(MEDIA_DIR, { recursive: true });
  }
}

// GET /api/cms/upload - list all uploaded media files
export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await ensureMediaDir();
    const files = await readdir(MEDIA_DIR);
    const imageFiles = files.filter((f) =>
      /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f)
    );
    const mediaList = imageFiles.map((file) => ({
      name: file,
      url: `/media/${file}`,
    }));
    return NextResponse.json(mediaList);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

// POST /api/cms/upload - upload a new image file
export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate image type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    await ensureMediaDir();

    // Generate clean unique filename
    const ext = path.extname(file.name) || ".jpg";
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${Date.now()}_${baseName}${ext}`;
    const filePath = path.join(MEDIA_DIR, filename);

    // Convert file to Buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const publicUrl = `/media/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
