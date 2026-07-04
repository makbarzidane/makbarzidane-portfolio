import { NextResponse } from "next/server";
import { defaultCmsContent, type EditableContent } from "@/data/cmsContent";
import { isCmsSessionValid } from "@/lib/cmsAuth";
import { readBlobContent, writeBlobContent } from "@/lib/vercelBlobCmsStorage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await readBlobContent();
    return NextResponse.json({ content, source: "vercel-blob" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Konten online belum tersedia.";
    return NextResponse.json({ content: defaultCmsContent, source: "default", message });
  }
}

export async function POST(request: Request) {
  if (!isCmsSessionValid()) {
    return NextResponse.json({ message: "Session CMS tidak valid. Silakan login ulang." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { content?: Partial<EditableContent> };
    if (!body.content) {
      return NextResponse.json({ message: "Data konten kosong." }, { status: 400 });
    }

    let existingContent: EditableContent;
    try {
      existingContent = await readBlobContent();
    } catch {
      existingContent = defaultCmsContent;
    }

    const mergedContent: EditableContent = {
      hero: { ...existingContent.hero, ...(body.content.hero || {}) },
      contacts: { ...existingContent.contacts, ...(body.content.contacts || {}) },
      projects: Array.isArray(body.content.projects) ? body.content.projects : existingContent.projects,
      agents: Array.isArray(body.content.agents) ? body.content.agents : existingContent.agents
    };

    await writeBlobContent(mergedContent);
    return NextResponse.json({ ok: true, content: mergedContent });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal menyimpan konten online.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

