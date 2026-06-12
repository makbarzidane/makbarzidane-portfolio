import { NextResponse } from "next/server";
import { isCmsSessionValid } from "@/lib/cmsAuth";
import { writeBlobAsset } from "@/lib/vercelBlobCmsStorage";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf"]);
const maxFileSize = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!isCmsSessionValid()) {
    return NextResponse.json({ message: "Session CMS tidak valid. Silakan login ulang." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "File upload tidak ditemukan." }, { status: 400 });
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ message: "Format file tidak didukung. Gunakan gambar atau PDF." }, { status: 400 });
    }

    if (file.size > maxFileSize) {
      return NextResponse.json({ message: "Ukuran file maksimal 8 MB." }, { status: 400 });
    }

    const url = await writeBlobAsset(file);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal upload file online.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
