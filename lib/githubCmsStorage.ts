import { defaultCmsContent, type EditableContent } from "@/data/cmsContent";

const owner = process.env.CMS_GITHUB_OWNER || "makbarzidane";
const repo = process.env.CMS_GITHUB_REPO || "makbarzidane-portfolio";
const branch = process.env.CMS_GITHUB_BRANCH || "main";
const contentPath = process.env.CMS_GITHUB_CONTENT_PATH || "data/remoteContent.json";

interface GithubContentResponse {
  sha: string;
  content?: string;
  encoding?: string;
}

function getGithubToken() {
  return process.env.CMS_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
}

function githubHeaders() {
  const token = getGithubToken();
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

function ensureGithubConfigured() {
  if (!getGithubToken()) {
    throw new Error("CMS_GITHUB_TOKEN belum dikonfigurasi di Vercel.");
  }
}

function apiUrl(path: string) {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`;
}

export function getRawGithubUrl(path: string) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

async function getGithubFile(path: string) {
  ensureGithubConfigured();
  const response = await fetch(`${apiUrl(path)}?ref=${branch}`, {
    headers: githubHeaders(),
    cache: "no-store"
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Gagal membaca GitHub file: ${response.status}`);
  }

  return (await response.json()) as GithubContentResponse;
}

async function putGithubFile(path: string, content: Buffer, message: string) {
  ensureGithubConfigured();
  const current = await getGithubFile(path);
  const body: Record<string, string> = {
    message,
    branch,
    content: content.toString("base64")
  };

  if (current?.sha) {
    body.sha = current.sha;
  }

  const response = await fetch(apiUrl(path), {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Gagal menyimpan ke GitHub: ${response.status} ${details}`);
  }
}

export async function readRemoteContent(): Promise<EditableContent> {
  const remoteFile = await getGithubFile(contentPath);
  if (!remoteFile?.content) return defaultCmsContent;

  const normalized = remoteFile.content.replace(/\n/g, "");
  return JSON.parse(Buffer.from(normalized, "base64").toString("utf8")) as EditableContent;
}

export async function writeRemoteContent(content: EditableContent) {
  const payload = Buffer.from(`${JSON.stringify(content, null, 2)}\n`, "utf8");
  await putGithubFile(contentPath, payload, "Update portfolio CMS content");
}

export async function writeRemoteAsset(file: File) {
  const extension = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() : "";
  const safeBase = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "asset";
  const fileName = `${Date.now()}-${safeBase}${extension ? `.${extension}` : ""}`;
  const path = `public/cms-uploads/${fileName}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await putGithubFile(path, bytes, `Upload CMS asset ${fileName}`);
  return `${getRawGithubUrl(path)}?v=${Date.now()}`;
}
