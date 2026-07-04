import { list, put } from "@vercel/blob";
import { defaultCmsContent, type EditableContent } from "@/data/cmsContent";

const contentPath = "cms/content.json";

function ensureBlobConfigured() {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL_OIDC_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN belum dikonfigurasi di Vercel.");
  }
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
