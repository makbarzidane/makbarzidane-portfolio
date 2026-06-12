"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download, Lock, LogIn, LogOut, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { cmsStorageKey, defaultCmsContent, legacyCmsStorageKey, type EditableAgent, type EditableContent, type EditableProject } from "@/data/cmsContent";

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

export default function AdminPage() {
  const [content, setContent] = useState<EditableContent>(defaultCmsContent);
  const [status, setStatus] = useState("Belum ada perubahan disimpan.");
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setAuthenticated(window.localStorage.getItem(cmsSessionKey) === "true");
    const stored = window.localStorage.getItem(cmsStorageKey) || window.localStorage.getItem(legacyCmsStorageKey);
    if (stored) {
      const merged = mergeContent(JSON.parse(stored) as Partial<EditableContent>);
      window.localStorage.setItem(cmsStorageKey, JSON.stringify(merged));
      setContent(merged);
    }
  }, []);

  const jsonPreview = useMemo(() => JSON.stringify(content, null, 2), [content]);

  function saveContent() {
    window.localStorage.setItem(cmsStorageKey, JSON.stringify(content));
    setStatus("Konten tersimpan di browser. Buka halaman utama untuk melihat perubahan.");
  }

  async function login() {
    setStatus("Memeriksa akses CMS...");
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
        setStatus("Login berhasil.");
        return;
      }

      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      setStatus(result?.message || "Username atau password salah.");
    } catch {
      setStatus("Login gagal. Periksa koneksi atau konfigurasi server.");
    }
  }

  function logout() {
    window.localStorage.removeItem(cmsSessionKey);
    setAuthenticated(false);
    setPassword("");
    setStatus("Logout berhasil.");
  }

  function resetContent() {
    window.localStorage.removeItem(cmsStorageKey);
    setContent(defaultCmsContent);
    setStatus("Konten dikembalikan ke default.");
  }

  function exportContent() {
    const blob = new Blob([jsonPreview], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "m-akbar-zidane-content.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importContent(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setContent(JSON.parse(String(reader.result)) as EditableContent);
        setStatus("File JSON berhasil dimuat. Klik Simpan untuk menerapkan.");
      } catch {
        setStatus("File JSON tidak valid.");
      }
    };
    reader.readAsText(file);
  }

  function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setContent((current) => ({
        ...current,
        hero: { ...current.hero, photoUrl: String(reader.result) }
      }));
      setStatus("Foto dimuat. Klik Simpan untuk menerapkan.");
    };
    reader.readAsDataURL(file);
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
            <button onClick={login} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950">
              <LogIn size={16} />
              Login
            </button>
          </div>
          <p className="mt-3 text-sm text-emerald-100">{status}</p>
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
              Edit bagian penting website dari browser. Data tersimpan di localStorage dan bisa export/import JSON.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={saveContent} className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
              <Save size={16} />
              Simpan
            </button>
            <button onClick={exportContent} className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-4 py-2 text-sm font-semibold text-white">
              <Download size={16} />
              Export
            </button>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/12 px-4 py-2 text-sm font-semibold text-white">
              <Upload size={16} />
              Import
              <input type="file" accept="application/json" onChange={importContent} className="hidden" />
            </label>
            <button onClick={resetContent} className="inline-flex items-center gap-2 rounded-lg border border-red-300/30 px-4 py-2 text-sm font-semibold text-red-100">
              <RotateCcw size={16} />
              Reset
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-4 py-2 text-sm font-semibold text-white">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <p className="mt-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">{status}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-xl font-semibold text-white">Hero, Foto, dan Kontak</h2>
            <div className="mt-5 grid gap-4">
              <Field label="Nama" value={content.hero.name} onChange={(value) => setContent({ ...content, hero: { ...content.hero, name: value } })} />
              <Field label="Role" value={content.hero.role} onChange={(value) => setContent({ ...content, hero: { ...content.hero, role: value } })} />
              <Field label="Role EN" value={content.hero.roleEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, roleEn: value } })} />
              <Textarea label="Bio Singkat" value={content.hero.bio} onChange={(value) => setContent({ ...content, hero: { ...content.hero, bio: value } })} />
              <Textarea label="Bio EN" value={content.hero.bioEn || ""} onChange={(value) => setContent({ ...content, hero: { ...content.hero, bioEn: value } })} />
              <Field label="Foto URL / Base64" value={content.hero.photoUrl} onChange={(value) => setContent({ ...content, hero: { ...content.hero, photoUrl: value } })} />
              <Field label="CV URL" value={content.hero.cvUrl} onChange={(value) => setContent({ ...content, hero: { ...content.hero, cvUrl: value } })} />
              <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-cyan-300/30 px-4 py-2 text-sm font-semibold text-cyan-100">
                <Upload size={16} />
                Upload Foto
                <input type="file" accept="image/*" onChange={uploadPhoto} className="hidden" />
              </label>
              <div className="grid gap-4 sm:grid-cols-3">
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

          <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">Portfolio Project</h2>
              <button
                onClick={() => setContent({ ...content, projects: [emptyProject, ...content.projects] })}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950"
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
                  onRemove={() => setContent({ ...content, projects: content.projects.filter((_, itemIndex) => itemIndex !== index) })}
                />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Agent Package</h2>
            <button
              onClick={() => setContent({ ...content, agents: [...content.agents, emptyAgent] })}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950"
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
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-white/10 bg-slate-950/55 px-3 py-2 text-white outline-none transition focus:border-cyan-300/60"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="rounded-lg border border-white/10 bg-slate-950/55 px-3 py-2 text-white outline-none transition focus:border-cyan-300/60"
      />
    </label>
  );
}

function ProjectEditor({ project, onChange, onRemove }: { project: EditableProject; onChange: (project: EditableProject) => void; onRemove: () => void }) {
  function uploadPreview(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ ...project, previewImage: String(reader.result) });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/35 p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="font-semibold text-white">{project.name}</p>
        <button onClick={onRemove} className="text-red-200 hover:text-red-100" aria-label="Hapus project">
          <Trash2 size={17} />
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        <Field label="Nama Project" value={project.name} onChange={(value) => onChange({ ...project, name: value })} />
        <Field label="Kategori" value={project.category} onChange={(value) => onChange({ ...project, category: value })} />
        <Field label="Category EN" value={project.categoryEn || ""} onChange={(value) => onChange({ ...project, categoryEn: value })} />
        <Textarea label="Deskripsi" value={project.description} onChange={(value) => onChange({ ...project, description: value })} />
        <Textarea label="Description EN" value={project.descriptionEn || ""} onChange={(value) => onChange({ ...project, descriptionEn: value })} />
        <Textarea label="Tech Stack per baris" value={toLines(project.stack)} onChange={(value) => onChange({ ...project, stack: fromLines(value) })} />
        <Textarea label="Fitur per baris" value={toLines(project.features)} onChange={(value) => onChange({ ...project, features: fromLines(value) })} />
        <Textarea label="Features EN per baris" value={toLines(project.featuresEn || [])} onChange={(value) => onChange({ ...project, featuresEn: fromLines(value) })} />
        <Field label="Preview Image URL / Base64" value={project.previewImage || ""} onChange={(value) => onChange({ ...project, previewImage: value })} />
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-cyan-300/30 px-4 py-2 text-sm font-semibold text-cyan-100">
          <Upload size={16} />
          Upload Preview
          <input type="file" accept="image/*" onChange={uploadPreview} className="hidden" />
        </label>
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
    <div className="rounded-xl border border-white/10 bg-slate-950/35 p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="font-semibold text-white">{agent.name}</p>
        <button onClick={onRemove} className="text-red-200 hover:text-red-100" aria-label="Hapus agent">
          <Trash2 size={17} />
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        <Field label="Nama Agent" value={agent.name} onChange={(value) => onChange({ ...agent, name: value })} />
        <Textarea label="Deskripsi" value={agent.description} onChange={(value) => onChange({ ...agent, description: value })} />
        <Textarea label="Description EN" value={agent.descriptionEn || ""} onChange={(value) => onChange({ ...agent, descriptionEn: value })} />
        <Textarea label="Output" value={agent.output} onChange={(value) => onChange({ ...agent, output: value })} />
        <Textarea label="Output EN" value={agent.outputEn || ""} onChange={(value) => onChange({ ...agent, outputEn: value })} />
      </div>
    </div>
  );
}
