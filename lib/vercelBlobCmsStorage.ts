import { list, put } from "@vercel/blob";
import { defaultCmsContent, type EditableContent } from "@/data/cmsContent";

const contentPath = "cms/content.json";

function ensureBlobConfigured() {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL_OIDC_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN belum dikonfigurasi di Vercel.");
  }
}

function createSafeFileName(name: string) {
  const extension = name.includes(".") ? name.split(".").pop()?.toLowerCase() : "";
  const safeBase = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 56) || "asset";

  return `${Date.now()}-${safeBase}${extension ? `.${extension}` : ""}`;
}

export async function readBlobContent(): Promise<EditableContent> {
  ensureBlobConfigured();

  const { blobs } = await list({
    prefix: contentPath,
    limit: 1
  });
  const contentBlob = blobs.find((blob) => blob.pathname === contentPath);

  if (!contentBlob) {
    return defaultCmsContent;
  }

  const response = await fetch(`${contentBlob.url}?v=${Date.now()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Gagal membaca konten dari Vercel Blob: ${response.status}`);
  }

  return (await response.json()) as EditableContent;
}

export async function writeBlobContent(content: EditableContent) {
  ensureBlobConfigured();

  await put(contentPath, `${JSON.stringify(content, null, 2)}\n`, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60
  });
}

export async function writeBlobAsset(file: File) {
  ensureBlobConfigured();

  const fileName = createSafeFileName(file.name);
  const pathname = `cms-uploads/${fileName}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || "application/octet-stream",
    cacheControlMaxAge: 60 * 60 * 24 * 30
  });

  return blob.url;
}
