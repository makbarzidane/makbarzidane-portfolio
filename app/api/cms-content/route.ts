import { NextResponse } from "next/server";
import { defaultCmsContent, type EditableContent } from "@/data/cmsContent";
import { isCmsSessionValid } from "@/lib/cmsAuth";
import { readRemoteContent, writeRemoteContent } from "@/lib/githubCmsStorage";

export async function GET() {
  try {
    const content = await readRemoteContent();
    return NextResponse.json({ content, source: "github" });
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
    const body = (await request.json()) as { content?: EditableContent };
    if (!body.content) {
      return NextResponse.json({ message: "Data konten kosong." }, { status: 400 });
    }

    await writeRemoteContent(body.content);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal menyimpan konten online.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
