"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { upload } from "@vercel/blob/client";
import {
  ArrowLeft,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code,
  Database,
  Download,
  FileText,
  Github,
  ImageIcon,
  Info,
  Instagram,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  Share2,
  Sparkles,
  Trash2,
  Upload,
  User,
  XCircle
} from "lucide-react";
import { cmsStorageKey, defaultCmsContent, legacyCmsStorageKey, type EditableAgent, type EditableContent, type EditableProject } from "@/data/cmsContent";
import { getBrowserAsset, isBrowserAssetRef, useBrowserAssetUrl } from "@/components/browserAssets";

const cmsSessionKey = "m-akbar-zidane-cms-session";
const directUploadThreshold = 4 * 1024 * 1024;

const emptyProject: EditableProject = {
  name: "Project Baru",
  category: "Website",
  description: "Deskripsi singkat project.",
  stack: ["Next.js", "Tailwind CSS"],
  features: ["Fitur utama"],
  demoUrl: "",
  githubUrl: "",
  previewImage: ""
};

const emptyAgent: EditableAgent = {
  name: "Agent Baru",
  nameEn: "New Agent",
  description: "Deskripsi fungsi agent.",
  output: "Output yang dihasilkan agent."
};

function mergeContent(value: Partial<EditableContent>): EditableContent {
  return {
    hero: { ...defaultCmsContent.hero, ...value.hero },
    contacts: { ...defaultCmsContent.contacts, ...value.contacts },
    projects: Array.isArray(value.projects) && value.projects.length > 0 ? value.projects : defaultCmsContent.projects,
    agents: Array.isArray(value.agents) && value.agents.length > 0 ? value.agents : defaultCmsContent.agents
  };
}

function toLines(items: string[]) {
  return items.join("\n");
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getExtension(name: string, type: string) {
  const extension = name.includes(".") ? name.split(".").pop()?.toLowerCase() : "";
  if (extension) return extension;

  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  if (type === "application/pdf") return "pdf";
  return "bin";
}

function createUploadPath(name: string, type: string) {
  const extension = getExtension(name, type);
  const safeBase = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 56) || "asset";

  return `cms-uploads/${Date.now()}-${safeBase}.${extension}`;
}

type StatusType = "success" | "error" | "info";
type CmsTab = "hero" | "contacts" | "projects" | "agents" | "settings";

const buttonStyles = {
  primary: "group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_0_rgba(34,211,238,0)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(34,211,238,0.22)] active:translate-y-0 active:scale-[0.98]",
  neutral: "group inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.08] active:translate-y-0 active:scale-[0.98]",
  danger: "group inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition duration-200 hover:-translate-y-0.5 hover:bg-red-400/20 active:translate-y-0 active:scale-[0.98]",
  ghost: "group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/5 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-300/15 active:translate-y-0 active:scale-[0.98]"
};

export default function AdminPage() {
  const [content, setContent] = useState<EditableContent>(defaultCmsContent);
  const [status, setStatus] = useState<{ message: string; type: StatusType } | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<CmsTab>("hero");
  const [projectSearch, setProjectSearch] = useState("");

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/cms-session", {
          cache: "no-store",
          credentials: "same-origin"
        });
        const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;

        setAuthenticated(Boolean(result?.ok));
        if (result?.ok) {
          window.localStorage.setItem(cmsSessionKey, "true");
        } else {
          window.localStorage.removeItem(cmsSessionKey);
        }
      } catch {
        setAuthenticated(false);
        window.localStorage.removeItem(cmsSessionKey);
      } finally {
        setCheckingAuth(false);
      }
    }

    async function loadInitialContent() {
      const stored = window.localStorage.getItem(cmsStorageKey) || window.localStorage.getItem(legacyCmsStorageKey);
      let localDraft: EditableContent | null = null;

      if (stored) {
        try {
          localDraft = mergeContent(JSON.parse(stored) as Partial<EditableContent>);
        } catch {
          localDraft = null;
        }
      }

      try {
        const response = await fetch(`/api/cms-content?t=${Date.now()}`, {
          cache: "no-store",
          credentials: "same-origin"
        });
        const result = (await response.json()) as { content?: Partial<EditableContent>; source?: string; message?: string };
        if (result.content) {
          const merged = mergeContent(result.content);
          setContent(merged);
          window.localStorage.setItem(cmsStorageKey, JSON.stringify(merged));
          if (result.source === "default" && result.message) {
            notify("Konten online belum aktif. Simpan membutuhkan BLOB_READ_WRITE_TOKEN di Vercel.", "info");
          }
          return;
        }
      } catch {
        notify("Gagal mengambil konten online. Memakai cache browser sementara.", "error");
      }

      if (localDraft) {
        window.localStorage.setItem(cmsStorageKey, JSON.stringify(localDraft));
        setContent(localDraft);
      }
    }

    void checkSession();
    void loadInitialContent();
  }, []);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(null), status.type === "error" ? 5200 : 3200);
    return () => window.clearTimeout(timer);
  }, [status]);

  const jsonPreview = useMemo(() => JSON.stringify(content, null, 2), [content]);

  function notify(message: string, type: StatusType = "success") {
    setStatus({ message, type });
  }

  async function uploadBlobOnline(blob: Blob, name: string) {
    const uploaded = await upload(createUploadPath(name, blob.type), blob, {
      access: "public",
      handleUploadUrl: "/api/cms-assets",
      contentType: blob.type || "application/octet-stream",
      multipart: blob.size > directUploadThreshold
    });

    return uploaded.url;
  }

  async function normalizeUploadedAssets(nextContent: EditableContent) {
    const normalizeValue = async (value: string, name: string) => {
      if (value.startsWith("data:")) {
        const response = await fetch(value);
        const blob = await response.blob();
        return uploadBlobOnline(blob, name);
      }

      if (isBrowserAssetRef(value)) {
        const asset = await getBrowserAsset(value);
        if (!asset) throw new Error("File lokal tidak ditemukan. Upload ulang file tersebut.");
        return uploadBlobOnline(asset.blob, asset.name || name);
      }

      return value;
    };

    const projects = await Promise.all(
      nextContent.projects.map(async (project, index) => ({
        ...project,
        previewImage: project.previewImage ? await normalizeValue(project.previewImage, `project-preview-${index}.png`) : project.previewImage
      }))
    );

    return {
      ...nextContent,
      hero: {
        ...nextContent.hero,
        photoUrl: nextContent.hero.photoUrl ? await normalizeValue(nextContent.hero.photoUrl, "profile-photo") : "",
        cvUrl: nextContent.hero.cvUrl ? await normalizeValue(nextContent.hero.cvUrl, "cv-file") : "/cv"
      },
      projects
    };
  }

  async function saveContent() {
    setSaving(true);
    try {
      const normalizedContent = await normalizeUploadedAssets(content);
      const payload = JSON.stringify(normalizedContent);
      const response = await fetch("/api/cms-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: normalizedContent }),
        credentials: "same-origin"
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || "Gagal menyimpan konten online.");
      }

      window.localStorage.setItem(cmsStorageKey, payload);
      setContent(normalizedContent);
      window.dispatchEvent(new Event("m-akbar-content-updated"));
      notify("Perubahan berhasil disimpan & disinkronkan ke Vercel Blob.");
    } catch (error) {
      const isQuotaError = error instanceof DOMException && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED");
      const message = error instanceof Error ? error.message : "Gagal menyimpan perubahan online.";
      notify(isQuotaError ? "Storage browser penuh. Coba hapus cache lama atau gunakan file yang lebih kecil." : message, "error");
    } finally {
      window.setTimeout(() => setSaving(false), 450);
    }
  }

  async function login() {
    notify("Memeriksa akses CMS...", "info");
    try {
      const response = await fetch("/api/cms-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "same-origin"
      });

      if (response.ok) {
        setPassword("");
        setUsername("");
        window.localStorage.setItem(cmsSessionKey, "true");
        setAuthenticated(true);
        notify("Login berhasil.");
        return;
      }

      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      notify(result?.message || "Username atau password salah.", "error");
    } catch {
      notify("Login gagal. Periksa koneksi atau konfigurasi server.", "error");
    }
  }

  function logout() {
    window.localStorage.removeItem(cmsSessionKey);
    void fetch("/api/cms-logout", { method: "POST", credentials: "same-origin" });
    setAuthenticated(false);
    setPassword("");
    notify("Logout berhasil.");
  }

  function resetContent() {
    window.localStorage.removeItem(cmsStorageKey);
    setContent(defaultCmsContent);
    window.dispatchEvent(new Event("m-akbar-content-updated"));
    notify("Konten dikembalikan ke default.");
  }

  function exportContent() {
    const blob = new Blob([jsonPreview], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "m-akbar-zidane-content.json";
    link.click();
    URL.revokeObjectURL(url);
    notify("File JSON berhasil diexport.");
  }

  function importContent(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setContent(JSON.parse(String(reader.result)) as EditableContent);
        notify("File JSON berhasil dimuat. Klik Simpan untuk menerapkan.", "info");
      } catch {
        notify("File JSON tidak valid.", "error");
      }
    };
    reader.readAsText(file);
  }

  async function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const value = await uploadBlobOnline(file, file.name);
      setContent((current) => ({
        ...current,
        hero: { ...current.hero, photoUrl: value }
      }));
      notify("Foto berhasil diupload online. Klik Simpan untuk menerapkan.", "info");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Gagal upload foto online.", "error");
    } finally {
      event.target.value = "";
    }
  }

  async function uploadCv(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const value = await uploadBlobOnline(file, file.name);
      setContent((current) => ({
        ...current,
        hero: { ...current.hero, cvUrl: value }
      }));
      notify("File CV berhasil diupload online. Klik Simpan untuk menerapkan.", "info");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Gagal upload CV online.", "error");
    } finally {
      event.target.value = "";
    }
  }

  const filteredProjects = useMemo(() => {
    if (!projectSearch.trim()) return content.projects;
    const query = projectSearch.toLowerCase();
    return content.projects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.stack.some((s) => s.toLowerCase().includes(query))
    );
  }, [content.projects, projectSearch]);

  if (checkingAuth) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-4 py-8 text-slate-200">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.045] p-6 text-center shadow-card">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200 animate-pulse">
            <Lock size={22} />
          </div>
          <p className="mt-5 text-sm font-semibold text-white">Memeriksa sesi CMS...</p>
        </section>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-4 py-8 text-slate-200">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-card backdrop-blur-xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100 transition">
            <ArrowLeft size={16} />
            Kembali ke Website
          </Link>
          <div className="mt-8 grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
            <Lock size={22} />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-white">Login CMS Portfolio</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">Masuk untuk mengedit konten portfolio M. Akbar Zidane.</p>
          <div className="mt-6 grid gap-4">
            <Field label="Username" value={username} onChange={setUsername} placeholder="admin" />
            <label className="grid gap-2 text-sm">
              <span className="font-medium text-slate-300">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") login();
                }}
                placeholder="••••••••"
                className="rounded-xl border border-white/10 bg-slate-950/55 px-3.5 py-2.5 text-white outline-none transition focus:border-cyan-300/60 focus:bg-slate-950/80"
              />
            </label>
            <button onClick={login} className={buttonStyles.primary}>
              <LogIn size={16} />
              Login ke CMS
            </button>
          </div>
          <StatusToast status={status} onClose={() => setStatus(null)} />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition">
              <ArrowLeft size={16} />
              Kembali ke Website
            </Link>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">CMS Portfolio M. Akbar Zidane</h1>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Kelola konten secara modular. Klik <strong className="text-cyan-300">Simpan Online</strong> untuk mensinkronkan perubahan ke Vercel Blob tanpa menghapus data existing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={saveContent}
              disabled={saving}
              className={`${buttonStyles.primary} disabled:pointer-events-none disabled:opacity-70`}
            >
              <Save size={16} className={saving ? "animate-pulse" : ""} />
              {saving ? "Menyimpan & Sinkronisasi..." : "Simpan Online"}
            </button>
            <button onClick={logout} className={buttonStyles.neutral}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <StatusToast status={status} onClose={() => setStatus(null)} />

        {/* Modular Category Navigation */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="flex flex-col gap-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Kategori Konten</p>
            <button
              onClick={() => setActiveTab("hero")}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeTab === "hero" ? "bg-cyan-300/15 text-cyan-300 border border-cyan-300/30 shadow-card" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <User size={18} />
              Profil & Hero
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeTab === "contacts" ? "bg-cyan-300/15 text-cyan-300 border border-cyan-300/30 shadow-card" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Phone size={18} />
              Kontak & Sosial
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeTab === "projects" ? "bg-cyan-300/15 text-cyan-300 border border-cyan-300/30 shadow-card" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Briefcase size={18} />
                Proyek Portofolio
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-300">{content.projects.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("agents")}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeTab === "agents" ? "bg-cyan-300/15 text-cyan-300 border border-cyan-300/30 shadow-card" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Bot size={18} />
                Paket AI Agent
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-300">{content.agents.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeTab === "settings" ? "bg-cyan-300/15 text-cyan-300 border border-cyan-300/30 shadow-card" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Settings size={18} />
              Data & Sinkronisasi
            </button>
          </aside>

          {/* Tab Content Panels */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "hero" && (
                <motion.section
                  key="tab-hero"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-card backdrop-blur-xl"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white">Profil & Hero Section</h2>
                    <p className="mt-1 text-sm text-slate-400">Atur informasi utama, biografi bilingual, foto profil, dan dokumen CV yang tampil di halaman beranda.</p>
                  </div>
                  <div className="mt-6 grid gap-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Nama Lengkap" value={content.hero.name} onChange={(value) => setContent({ ...content, hero: { ...content.hero, name: value } })} />
                      <Field label="Lokasi (ID)" value={content.hero.location} onChange={(value) => setContent({ ...content, hero: { ...content.hero, location: value } })} />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Role Utama (ID)" value={content.hero.role} onChange={(value) => setContent({ ...content, hero: { ...content.hero, role: value } })} />
                      <Field label="Role (English)" value={content.hero.roleEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, roleEn: value } })} />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Textarea label="Bio Singkat (ID)" value={content.hero.bio} onChange={(value) => setContent({ ...content, hero: { ...content.hero, bio: value } })} />
                      <Textarea label="Bio Singkat (English)" value={content.hero.bioEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, bioEn: value } })} />
                    </div>
                    <div className="grid gap-6 border-t border-white/10 pt-6 md:grid-cols-2">
                      <FileUploadField
                        label="Foto Profil"
                        description="Upload gambar profil (PNG/JPG/WebP)."
                        accept="image/*"
                        icon="image"
                        value={content.hero.photoUrl}
                        onUpload={uploadPhoto}
                        onClear={() => setContent({ ...content, hero: { ...content.hero, photoUrl: "" } })}
                      />
                      <FileUploadField
                        label="File CV / Resume"
                        description="Upload PDF atau gambar resume Anda."
                        accept=".pdf,image/*"
                        icon="file"
                        value={content.hero.cvUrl}
                        onUpload={uploadCv}
                        onClear={() => setContent({ ...content, hero: { ...content.hero, cvUrl: "/cv" } })}
                      />
                    </div>
                    <div className="grid gap-4 border-t border-white/10 pt-6 md:grid-cols-2 xl:grid-cols-3">
                      <Field label="Status Pendidikan (ID)" value={content.hero.study} onChange={(value) => setContent({ ...content, hero: { ...content.hero, study: value } })} />
                      <Field label="Study Status (EN)" value={content.hero.studyEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, studyEn: value } })} />
                      <Field label="Location (EN)" value={content.hero.locationEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, locationEn: value } })} />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Ketersediaan (ID)" value={content.hero.availability} onChange={(value) => setContent({ ...content, hero: { ...content.hero, availability: value } })} />
                      <Field label="Availability (EN)" value={content.hero.availabilityEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, availabilityEn: value } })} />
                    </div>
                  </div>
                </motion.section>
              )}

              {activeTab === "contacts" && (
                <motion.section
                  key="tab-contacts"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-card backdrop-blur-xl"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white">Kontak & Sosial Media</h2>
                    <p className="mt-1 text-sm text-slate-400">Atur tautan komunikasi dan media sosial yang terhubung dengan tombol CTA portfolio.</p>
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <ContactCard
                      label="WhatsApp"
                      icon={MessageSquare}
                      value={content.contacts.whatsapp}
                      placeholder="https://wa.me/628xxxxxxxxxx"
                      onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, whatsapp: value } })}
                    />
                    <ContactCard
                      label="GitHub"
                      icon={Github}
                      value={content.contacts.github}
                      placeholder="https://github.com/username"
                      onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, github: value } })}
                    />
                    <ContactCard
                      label="Email"
                      icon={Mail}
                      value={content.contacts.email}
                      placeholder="mailto:email@domain.com"
                      onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, email: value } })}
                    />
                    <ContactCard
                      label="Instagram"
                      icon={Instagram}
                      value={content.contacts.instagram}
                      placeholder="https://instagram.com/username"
                      onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, instagram: value } })}
                    />
                  </div>
                </motion.section>
              )}

              {activeTab === "projects" && (
                <motion.section
                  key="tab-projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-card backdrop-blur-xl"
                >
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Proyek Portofolio ({content.projects.length})</h2>
                      <p className="mt-1 text-sm text-slate-400">Kelola daftar karya dan aplikasi. Klik pada kartu proyek untuk melihat atau mengubah detailnya.</p>
                    </div>
                    <button
                      onClick={() => setContent({ ...content, projects: [emptyProject, ...content.projects] })}
                      className={buttonStyles.primary}
                    >
                      <Plus size={16} />
                      Tambah Project
                    </button>
                  </div>

                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-3.5 py-2.5">
                    <Search size={18} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Cari proyek berdasarkan nama, kategori, atau tech stack..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                    {projectSearch && (
                      <button onClick={() => setProjectSearch("")} className="text-xs text-slate-400 hover:text-white">
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="mt-6 grid gap-4">
                    {filteredProjects.length === 0 ? (
                      <p className="py-8 text-center text-sm text-slate-500">Tidak ada proyek yang sesuai pencarian.</p>
                    ) : (
                      content.projects.map((project, index) => {
                        // Cek apakah project ini ada di filteredProjects
                        if (projectSearch && !filteredProjects.includes(project)) return null;
                        return (
                          <ProjectAccordionCard
                            key={`project-${index}`}
                            project={project}
                            index={index}
                            onChange={(next) => {
                              const projects = [...content.projects];
                              projects[index] = next;
                              setContent({ ...content, projects });
                            }}
                            notify={notify}
                            uploadBlobOnline={uploadBlobOnline}
                            onRemove={() => setContent({ ...content, projects: content.projects.filter((_, itemIndex) => itemIndex !== index) })}
                          />
                        );
                      })
                    )}
                  </div>
                </motion.section>
              )}

              {activeTab === "agents" && (
                <motion.section
                  key="tab-agents"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-card backdrop-blur-xl"
                >
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Paket AI Agent ({content.agents.length})</h2>
                      <p className="mt-1 text-sm text-slate-400">Atur daftar kapabilitas dan workflow AI Agent yang tawarkan kepada client.</p>
                    </div>
                    <button
                      onClick={() => setContent({ ...content, agents: [emptyAgent, ...content.agents] })}
                      className={buttonStyles.primary}
                    >
                      <Plus size={16} />
                      Tambah Agent
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {content.agents.map((agent, index) => (
                      <AgentAccordionCard
                        key={`agent-${index}`}
                        agent={agent}
                        index={index}
                        onChange={(next) => {
                          const agents = [...content.agents];
                          agents[index] = next;
                          setContent({ ...content, agents });
                        }}
                        onRemove={() => setContent({ ...content, agents: content.agents.filter((_, itemIndex) => itemIndex !== index) })}
                      />
                    ))}
                  </div>
                </motion.section>
              )}

              {activeTab === "settings" && (
                <motion.section
                  key="tab-settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-card backdrop-blur-xl"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white">Data & Sinkronisasi Database</h2>
                    <p className="mt-1 text-sm text-slate-400">Kelola cadangan data, export/import JSON, dan pemulihan ke pengaturan default.</p>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
                      <div className="flex items-center gap-3 text-cyan-300">
                        <Database size={20} />
                        <h3 className="font-semibold text-white">Status Database (Vercel Blob)</h3>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        Sistem kini menggunakan mekanisme <strong className="text-white">Safe Sync (Read-Before-Write)</strong>. Saat Anda klik Simpan Online, data baru akan di-merge dengan database online tanpa menghapus item existing yang tidak ter-edit.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-xs font-medium text-emerald-300">Connected & Safe Merge Active</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-white">Backup & Restore Draft</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          Export seluruh data ke file JSON sebagai cadangan lokal di komputer Anda, atau muat kembali file JSON yang sudah ada.
                        </p>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button onClick={exportContent} className={buttonStyles.neutral}>
                          <Download size={16} />
                          Export JSON
                        </button>
                        <label className={`${buttonStyles.neutral} cursor-pointer`}>
                          <Upload size={16} />
                          Import JSON
                          <input type="file" accept="application/json" onChange={importContent} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 p-5">
                    <h3 className="font-semibold text-red-200">Zona Bahaya / Reset Konten</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Mengembalikan seluruh teks, proyek, dan agen ke pengaturan awal bawaan template. Tindakan ini akan menghapus draft lokal browser saat ini.
                    </p>
                    <div className="mt-4">
                      <button onClick={resetContent} className={buttonStyles.danger}>
                        <RotateCcw size={16} />
                        Reset ke Default
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 rounded-xl border border-white/10 bg-slate-950/55 px-3.5 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:bg-slate-950/80"
      />
    </label>
  );
}

function Textarea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="min-w-0 resize-y rounded-xl border border-white/10 bg-slate-950/55 px-3.5 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:bg-slate-950/80"
      />
    </label>
  );
}

function ContactCard({ label, icon: Icon, value, onChange, placeholder }: { label: string; icon: typeof Github; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-cyan-300/25">
      <div className="flex items-center gap-3 mb-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-300/10 text-cyan-300">
          <Icon size={18} />
        </span>
        <span className="font-semibold text-white text-sm">{label}</span>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
      />
    </div>
  );
}

function FileUploadField({
  label,
  description,
  accept,
  value,
  icon,
  onUpload,
  onClear
}: {
  label: string;
  description: string;
  accept: string;
  value?: string;
  icon: "image" | "file";
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  const Icon = icon === "image" ? ImageIcon : FileText;
  const resolvedValue = useBrowserAssetUrl(value);
  const isImage = icon === "image" && Boolean(resolvedValue?.startsWith("blob:") || value?.startsWith("data:image") || value?.startsWith("/") && /\.(png|jpg|jpeg|webp)$/i.test(value));
  const hasCustomFile = Boolean(value && value !== "/cv");

  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-slate-950/35 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-slate-950/50">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-cyan-200">
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <p className="font-medium text-white">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
        </div>
      </div>

      {isImage && value ? (
        <div className="mt-4 aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-slate-950/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resolvedValue || value} alt={`${label} preview`} className="h-full w-full object-cover object-top" />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <label className={`${buttonStyles.ghost} cursor-pointer`}>
          <Upload size={16} />
          Pilih File
          <input type="file" accept={accept} onChange={onUpload} className="hidden" />
        </label>
        {hasCustomFile ? (
          <button onClick={onClear} className={buttonStyles.neutral} type="button">
            Hapus
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ProjectAccordionCard({
  project,
  index,
  onChange,
  onRemove,
  notify,
  uploadBlobOnline
}: {
  project: EditableProject;
  index: number;
  onChange: (project: EditableProject) => void;
  onRemove: () => void;
  notify: (message: string, type?: StatusType) => void;
  uploadBlobOnline: (blob: Blob, name: string) => Promise<string>;
}) {
  const [expanded, setExpanded] = useState(false);

  async function uploadPreview(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const value = await uploadBlobOnline(file, file.name);
      onChange({ ...project, previewImage: value });
      notify("Preview project berhasil diupload online. Klik Simpan untuk menerapkan.", "info");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Gagal upload preview project online.", "error");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 overflow-hidden transition duration-200 hover:border-cyan-300/30">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between gap-4 p-4 cursor-pointer select-none bg-white/[0.02] hover:bg-white/[0.05] transition"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-cyan-300 font-bold text-sm">
            #{index + 1}
          </span>
          <div className="min-w-0">
            <p className="font-bold text-white truncate">{project.name || "Project Tanpa Nama"}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-block rounded-md bg-cyan-300/10 px-2 py-0.5 text-[11px] font-medium text-cyan-300">
                {project.category || "General"}
              </span>
              <span className="text-xs text-slate-500 truncate hidden sm:inline">{project.stack.slice(0, 3).join(", ")}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
          >
            {expanded ? "Tutup" : "Edit"}
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button onClick={onRemove} className="rounded-lg p-2 text-red-300/80 transition hover:bg-red-400/15 hover:text-red-200" aria-label="Hapus project">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="p-5 border-t border-white/10 grid gap-4 bg-slate-950/60">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nama Project (ID)" value={project.name} onChange={(value) => onChange({ ...project, name: value })} />
                <Field label="Kategori (ID)" value={project.category} onChange={(value) => onChange({ ...project, category: value })} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Category (EN)" value={project.categoryEn || ""} onChange={(value) => onChange({ ...project, categoryEn: value })} />
                <Field label="Demo URL" value={project.demoUrl} onChange={(value) => onChange({ ...project, demoUrl: value })} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Textarea label="Deskripsi (ID)" value={project.description} onChange={(value) => onChange({ ...project, description: value })} />
                <Textarea label="Description (EN)" value={project.descriptionEn || ""} onChange={(value) => onChange({ ...project, descriptionEn: value })} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Textarea label="Tech Stack (per baris)" value={toLines(project.stack)} onChange={(value) => onChange({ ...project, stack: fromLines(value) })} />
                <Textarea label="Fitur Utama (ID per baris)" value={toLines(project.features)} onChange={(value) => onChange({ ...project, features: fromLines(value) })} />
                <Textarea label="Features (EN per baris)" value={toLines(project.featuresEn || [])} onChange={(value) => onChange({ ...project, featuresEn: fromLines(value) })} />
              </div>
              <div className="grid gap-4 md:grid-cols-2 items-start">
                <Field label="GitHub URL" value={project.githubUrl} onChange={(value) => onChange({ ...project, githubUrl: value })} />
                <FileUploadField
                  label="Preview Image"
                  description="Upload screenshot proyek (PNG/JPG)."
                  accept="image/*"
                  icon="image"
                  value={project.previewImage || ""}
                  onUpload={uploadPreview}
                  onClear={() => onChange({ ...project, previewImage: "" })}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AgentAccordionCard({ agent, index, onChange, onRemove }: { agent: EditableAgent; index: number; onChange: (agent: EditableAgent) => void; onRemove: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 overflow-hidden transition duration-200 hover:border-emerald-300/30">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between gap-4 p-4 cursor-pointer select-none bg-white/[0.02] hover:bg-white/[0.05] transition"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-300/10 text-emerald-300 font-bold text-sm">
            <Bot size={18} />
          </span>
          <div className="min-w-0">
            <p className="font-bold text-white truncate">{agent.name || "Agent Tanpa Nama"}</p>
            <p className="text-xs text-slate-400 truncate mt-0.5">{agent.description || "Tidak ada deskripsi"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
          >
            {expanded ? "Tutup" : "Edit"}
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button onClick={onRemove} className="rounded-lg p-2 text-red-300/80 transition hover:bg-red-400/15 hover:text-red-200" aria-label="Hapus agent">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="p-5 border-t border-white/10 grid gap-4 bg-slate-950/60">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nama Agent (ID)" value={agent.name} onChange={(value) => onChange({ ...agent, name: value })} />
                <Field label="Agent Name (EN)" value={agent.nameEn || ""} onChange={(value) => onChange({ ...agent, nameEn: value })} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Textarea label="Deskripsi Fungsi (ID)" value={agent.description} onChange={(value) => onChange({ ...agent, description: value })} />
                <Textarea label="Function Description (EN)" value={agent.descriptionEn || ""} onChange={(value) => onChange({ ...agent, descriptionEn: value })} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Textarea label="Output yang Dihasilkan (ID)" value={agent.output} onChange={(value) => onChange({ ...agent, output: value })} />
                <Textarea label="Expected Output (EN)" value={agent.outputEn || ""} onChange={(value) => onChange({ ...agent, outputEn: value })} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusToast({ status, onClose }: { status: { message: string; type: StatusType } | null; onClose: () => void }) {
  const palette = {
    success: {
      icon: CheckCircle2,
      className: "border-emerald-300/25 bg-emerald-300/12 text-emerald-50"
    },
    error: {
      icon: XCircle,
      className: "border-red-300/25 bg-red-300/12 text-red-50"
    },
    info: {
      icon: Info,
      className: "border-cyan-300/25 bg-cyan-300/12 text-cyan-50"
    }
  } satisfies Record<StatusType, { icon: typeof CheckCircle2; className: string }>;

  return (
    <AnimatePresence>
      {status ? (
        <motion.div
          className="fixed bottom-6 right-6 z-[120] w-[min(92vw,420px)]"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-card backdrop-blur-xl ${palette[status.type].className}`}>
            {(() => {
              const Icon = palette[status.type].icon;
              return <Icon size={18} className="mt-0.5 shrink-0" />;
            })()}
            <p className="min-w-0 flex-1 text-sm font-medium leading-6">{status.message}</p>
            <button onClick={onClose} className="rounded-md px-2 text-lg leading-none opacity-70 transition hover:bg-white/10 hover:opacity-100" aria-label="Tutup notifikasi" type="button">
              x
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
