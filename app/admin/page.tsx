"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Download, FileText, ImageIcon, Info, Lock, LogIn, LogOut, Plus, RotateCcw, Save, Trash2, Upload, XCircle } from "lucide-react";
import { cmsStorageKey, defaultCmsContent, legacyCmsStorageKey, type EditableAgent, type EditableContent, type EditableProject } from "@/data/cmsContent";
import { getBrowserAsset, isBrowserAssetRef, useBrowserAssetUrl } from "@/components/browserAssets";

const cmsSessionKey = "m-akbar-zidane-cms-session";

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

type StatusType = "success" | "error" | "info";

const buttonStyles = {
  primary: "group inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_0_rgba(34,211,238,0)] transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_14px_32px_rgba(34,211,238,0.18)] active:translate-y-0 active:scale-[0.98]",
  neutral: "group inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.07] active:translate-y-0 active:scale-[0.98]",
  danger: "group inline-flex items-center justify-center gap-2 rounded-lg border border-red-300/30 bg-red-300/5 px-4 py-2.5 text-sm font-semibold text-red-100 transition duration-200 hover:-translate-y-0.5 hover:bg-red-300/10 active:translate-y-0 active:scale-[0.98]",
  ghost: "group inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300/5 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-300/10 active:translate-y-0 active:scale-[0.98]"
};

export default function AdminPage() {
  const [content, setContent] = useState<EditableContent>(defaultCmsContent);
  const [status, setStatus] = useState<{ message: string; type: StatusType } | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setAuthenticated(window.localStorage.getItem(cmsSessionKey) === "true");

    async function loadInitialContent() {
      try {
        const response = await fetch("/api/cms-content", { cache: "no-store" });
        const result = (await response.json()) as { content?: Partial<EditableContent>; source?: string; message?: string };
        if (result.content) {
          const merged = mergeContent(result.content);
          setContent(merged);
          window.localStorage.setItem(cmsStorageKey, JSON.stringify(merged));
          if (result.source === "default" && result.message) {
            notify("Konten online belum aktif. Simpan membutuhkan CMS_GITHUB_TOKEN di Vercel.", "info");
          }
          return;
        }
      } catch {
        notify("Gagal mengambil konten online. Memakai cache browser sementara.", "error");
      }

      const stored = window.localStorage.getItem(cmsStorageKey) || window.localStorage.getItem(legacyCmsStorageKey);
      if (stored) {
        const merged = mergeContent(JSON.parse(stored) as Partial<EditableContent>);
        window.localStorage.setItem(cmsStorageKey, JSON.stringify(merged));
        setContent(merged);
      }
    }

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
    const formData = new FormData();
    formData.append("file", blob, name);

    const response = await fetch("/api/cms-assets", {
      method: "POST",
      body: formData
    });

    const result = (await response.json().catch(() => null)) as { url?: string; message?: string } | null;
    if (!response.ok || !result?.url) {
      throw new Error(result?.message || "Gagal upload file online.");
    }

    return result.url;
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
        body: JSON.stringify({ content: normalizedContent })
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || "Gagal menyimpan konten online.");
      }

      window.localStorage.setItem(cmsStorageKey, payload);
      setContent(normalizedContent);
      window.dispatchEvent(new Event("m-akbar-content-updated"));
      notify("Perubahan berhasil disimpan online.");
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
        body: JSON.stringify({ username, password })
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
    void fetch("/api/cms-logout", { method: "POST" });
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

  if (!authenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-4 py-8 text-slate-200">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-card">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
            <ArrowLeft size={16} />
            Kembali ke Website
          </Link>
          <div className="mt-8 grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
            <Lock size={22} />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-white">Login CMS Portfolio</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">Masuk untuk mengedit konten portfolio M. Akbar Zidane.</p>
          <div className="mt-6 grid gap-4">
            <Field label="Username" value={username} onChange={setUsername} />
            <label className="grid gap-2 text-sm">
              <span className="font-medium text-slate-300">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") login();
                }}
                className="rounded-lg border border-white/10 bg-slate-950/55 px-3 py-2 text-white outline-none transition focus:border-cyan-300/60"
              />
            </label>
            <button onClick={login} className={buttonStyles.primary}>
              <LogIn size={16} />
              Login
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
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
              <ArrowLeft size={16} />
              Kembali ke Website
            </Link>
            <h1 className="mt-4 text-3xl font-semibold text-white">CMS Portfolio M. Akbar Zidane</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Edit bagian penting website dari browser. Setelah disimpan, konten dan file upload tersimpan online agar terbaca dari laptop maupun HP.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={saveContent} disabled={saving} className={`${buttonStyles.primary} disabled:pointer-events-none disabled:opacity-70`}>
              <Save size={16} className={saving ? "animate-pulse" : ""} />
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            <button onClick={exportContent} className={buttonStyles.neutral}>
              <Download size={16} />
              Export
            </button>
            <label className={`${buttonStyles.neutral} cursor-pointer`}>
              <Upload size={16} />
              Import
              <input type="file" accept="application/json" onChange={importContent} className="hidden" />
            </label>
            <button onClick={resetContent} className={buttonStyles.danger}>
              <RotateCcw size={16} />
              Reset
            </button>
            <button onClick={logout} className={buttonStyles.neutral}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <StatusToast status={status} onClose={() => setStatus(null)} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-200 hover:border-cyan-300/25 hover:bg-white/[0.055]">
            <h2 className="text-xl font-semibold text-white">Hero, Foto, dan Kontak</h2>
            <div className="mt-5 grid gap-4">
              <Field label="Nama" value={content.hero.name} onChange={(value) => setContent({ ...content, hero: { ...content.hero, name: value } })} />
              <Field label="Role" value={content.hero.role} onChange={(value) => setContent({ ...content, hero: { ...content.hero, role: value } })} />
              <Field label="Role EN" value={content.hero.roleEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, roleEn: value } })} />
              <Textarea label="Bio Singkat" value={content.hero.bio} onChange={(value) => setContent({ ...content, hero: { ...content.hero, bio: value } })} />
              <Textarea label="Bio EN" value={content.hero.bioEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, bioEn: value } })} />
              <div className="grid gap-4 md:grid-cols-2">
                <FileUploadField
                  label="Foto Profil"
                  description="Upload file gambar dari perangkat."
                  accept="image/*"
                  icon="image"
                  value={content.hero.photoUrl}
                  onUpload={uploadPhoto}
                  onClear={() => setContent({ ...content, hero: { ...content.hero, photoUrl: "" } })}
                />
                <FileUploadField
                  label="File CV"
                  description="Upload PDF atau gambar CV. Default tetap halaman /cv."
                  accept=".pdf,image/*"
                  icon="file"
                  value={content.hero.cvUrl}
                  onUpload={uploadCv}
                  onClear={() => setContent({ ...content, hero: { ...content.hero, cvUrl: "/cv" } })}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Field label="Lokasi" value={content.hero.location} onChange={(value) => setContent({ ...content, hero: { ...content.hero, location: value } })} />
                <Field label="Status Pendidikan" value={content.hero.study} onChange={(value) => setContent({ ...content, hero: { ...content.hero, study: value } })} />
                <Field label="Availability" value={content.hero.availability} onChange={(value) => setContent({ ...content, hero: { ...content.hero, availability: value } })} />
                <Field label="Location EN" value={content.hero.locationEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, locationEn: value } })} />
                <Field label="Study EN" value={content.hero.studyEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, studyEn: value } })} />
                <Field label="Availability EN" value={content.hero.availabilityEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, availabilityEn: value } })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="WhatsApp" value={content.contacts.whatsapp} onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, whatsapp: value } })} />
                <Field label="GitHub" value={content.contacts.github} onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, github: value } })} />
                <Field label="Email" value={content.contacts.email} onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, email: value } })} />
                <Field label="Instagram" value={content.contacts.instagram} onChange={(value) => setContent({ ...content, contacts: { ...content.contacts, instagram: value } })} />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-200 hover:border-cyan-300/25 hover:bg-white/[0.055]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">Portfolio Project</h2>
              <button
                onClick={() => setContent({ ...content, projects: [emptyProject, ...content.projects] })}
                className={buttonStyles.primary}
              >
                <Plus size={16} />
                Project
              </button>
            </div>
            <div className="mt-5 grid gap-4">
              {content.projects.map((project, index) => (
                <ProjectEditor
                  key={`${project.name}-${index}`}
                  project={project}
                  onChange={(next) => {
                    const projects = [...content.projects];
                    projects[index] = next;
                    setContent({ ...content, projects });
                  }}
                  notify={notify}
                  uploadBlobOnline={uploadBlobOnline}
                  onRemove={() => setContent({ ...content, projects: content.projects.filter((_, itemIndex) => itemIndex !== index) })}
                />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-200 hover:border-cyan-300/25 hover:bg-white/[0.055]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Agent Package</h2>
            <button
              onClick={() => setContent({ ...content, agents: [...content.agents, emptyAgent] })}
              className={buttonStyles.primary}
            >
              <Plus size={16} />
              Agent
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.agents.map((agent, index) => (
              <AgentEditor
                key={`${agent.name}-${index}`}
                agent={agent}
                onChange={(next) => {
                  const agents = [...content.agents];
                  agents[index] = next;
                  setContent({ ...content, agents });
                }}
                onRemove={() => setContent({ ...content, agents: content.agents.filter((_, itemIndex) => itemIndex !== index) })}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 rounded-lg border border-white/10 bg-slate-950/55 px-3 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="min-w-0 resize-y rounded-lg border border-white/10 bg-slate-950/55 px-3 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
      />
    </label>
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
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-cyan-100">
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

function ProjectEditor({
  project,
  onChange,
  onRemove,
  notify,
  uploadBlobOnline
}: {
  project: EditableProject;
  onChange: (project: EditableProject) => void;
  onRemove: () => void;
  notify: (message: string, type?: StatusType) => void;
  uploadBlobOnline: (blob: Blob, name: string) => Promise<string>;
}) {
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
    <div className="rounded-xl border border-white/10 bg-slate-950/35 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-slate-950/50">
      <div className="flex items-start justify-between gap-4">
        <p className="font-semibold text-white">{project.name}</p>
        <button onClick={onRemove} className="rounded-lg p-2 text-red-200 transition hover:bg-red-300/10 hover:text-red-100 active:scale-95" aria-label="Hapus project">
          <Trash2 size={17} />
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Nama Project" value={project.name} onChange={(value) => onChange({ ...project, name: value })} />
          <Field label="Kategori" value={project.category} onChange={(value) => onChange({ ...project, category: value })} />
          <Field label="Category EN" value={project.categoryEn || ""} onChange={(value) => onChange({ ...project, categoryEn: value })} />
        </div>
        <Textarea label="Deskripsi" value={project.description} onChange={(value) => onChange({ ...project, description: value })} />
        <Textarea label="Description EN" value={project.descriptionEn || ""} onChange={(value) => onChange({ ...project, descriptionEn: value })} />
        <div className="grid gap-3 md:grid-cols-2">
          <Textarea label="Tech Stack per baris" value={toLines(project.stack)} onChange={(value) => onChange({ ...project, stack: fromLines(value) })} />
          <Textarea label="Fitur per baris" value={toLines(project.features)} onChange={(value) => onChange({ ...project, features: fromLines(value) })} />
          <Textarea label="Features EN per baris" value={toLines(project.featuresEn || [])} onChange={(value) => onChange({ ...project, featuresEn: fromLines(value) })} />
        </div>
        <FileUploadField
          label="Preview Project"
          description="Upload screenshot project dari file gambar."
          accept="image/*"
          icon="image"
          value={project.previewImage || ""}
          onUpload={uploadPreview}
          onClear={() => onChange({ ...project, previewImage: "" })}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Demo URL" value={project.demoUrl} onChange={(value) => onChange({ ...project, demoUrl: value })} />
          <Field label="GitHub URL" value={project.githubUrl} onChange={(value) => onChange({ ...project, githubUrl: value })} />
        </div>
      </div>
    </div>
  );
}

function AgentEditor({ agent, onChange, onRemove }: { agent: EditableAgent; onChange: (agent: EditableAgent) => void; onRemove: () => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/35 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-slate-950/50">
      <div className="flex items-start justify-between gap-4">
        <p className="font-semibold text-white">{agent.name}</p>
        <button onClick={onRemove} className="rounded-lg p-2 text-red-200 transition hover:bg-red-300/10 hover:text-red-100 active:scale-95" aria-label="Hapus agent">
          <Trash2 size={17} />
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        <Field label="Nama Agent" value={agent.name} onChange={(value) => onChange({ ...agent, name: value })} />
        <Field label="Name EN" value={agent.nameEn || ""} onChange={(value) => onChange({ ...agent, nameEn: value })} />
        <Textarea label="Deskripsi" value={agent.description} onChange={(value) => onChange({ ...agent, description: value })} />
        <Textarea label="Description EN" value={agent.descriptionEn || ""} onChange={(value) => onChange({ ...agent, descriptionEn: value })} />
        <Textarea label="Output" value={agent.output} onChange={(value) => onChange({ ...agent, output: value })} />
        <Textarea label="Output EN" value={agent.outputEn || ""} onChange={(value) => onChange({ ...agent, outputEn: value })} />
      </div>
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
          className="fixed right-4 top-4 z-[120] w-[min(92vw,420px)]"
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
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
