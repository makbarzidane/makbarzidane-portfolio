import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isCmsSessionValid } from "@/lib/cmsAuth";

const allowedTypes = ["image/*", "application/pdf"];
const maxFileSize = 50 * 1024 * 1024;

export async function POST(request: Request) {
  if (!isCmsSessionValid()) {
    return NextResponse.json({ message: "Session CMS tidak valid. Silakan login ulang." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: allowedTypes,
        maximumSizeInBytes: maxFileSize,
        addRandomSuffix: true,
        cacheControlMaxAge: 60 * 60 * 24 * 30
      })
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal upload file online.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
