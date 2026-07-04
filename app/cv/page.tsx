"use client";

import Link from "next/link";
import { ArrowLeft, Download, Github, Mail, MapPin, Sparkles, Code, Bot, ExternalLink, CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/components/useSiteContent";
import { useLanguage, type Language } from "@/components/useLanguage";

export default function CvPage() {
  const { hero, contacts, projects, agents } = useSiteContent();
  const { language, setLanguage, t } = useLanguage();
  const role = language === "en" ? hero.roleEn || hero.role : hero.role;
  const bio = language === "en" ? hero.bioEn || hero.bio : hero.bio;
  const location = language === "en" ? hero.locationEn || hero.location : hero.location;

  // Dynamically collect all unique technologies from core skills + all project stacks
  const coreStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "PHP", "CodeIgniter 4", "MySQL", "Python", "Streamlit", "Vercel", "Git"];
  const allProjectStacks = projects.flatMap((p) => p.stack || []);
  const dynamicStack = Array.from(new Set([...coreStack, ...allProjectStacks]));

  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-slate-200 sm:px-6 lg:px-8">
      <div className="cv-print mx-auto max-w-5xl">
        {/* Navigation & Controls */}
        <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100 transition">
            <ArrowLeft size={16} />
            {t.cv.back}
          </Link>

          <div className="flex flex-wrap gap-2">
            <div className="inline-flex rounded-lg border border-white/12 p-1 bg-white/[0.03]">
              {(["id", "en"] as Language[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setLanguage(item)}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition ${language === item ? "bg-white text-slate-950" : "text-slate-300 hover:text-white"}`}
                  type="button"
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:scale-[1.02] active:scale-[0.98]"
              type="button"
            >
              <Download size={16} />
              {t.cv.download}
            </button>
          </div>
        </div>

        <p className="no-print mt-3 text-right text-xs text-slate-500">{t.cv.printHint}</p>

        {/* Header / Bio Section */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-card backdrop-blur-xl md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{t.cv.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">{hero.name}</h1>
              <p className="mt-4 text-xl font-semibold text-violet-200">{role}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{bio}</p>
            </div>

            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6 shadow-inner">
              <h2 className="mb-4 text-lg font-semibold text-white">{t.cv.contact}</h2>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <MapPin size={18} className="text-cyan-300 shrink-0" />
                <span>{location}</span>
              </div>
              <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-3 text-sm text-slate-200 hover:text-cyan-200 transition">
                <Github size={18} className="text-cyan-300 shrink-0" />
                <span>github.com/makbarzidane</span>
              </a>
              <a href={contacts.email} className="mt-4 flex items-center gap-3 text-sm text-slate-200 hover:text-cyan-200 transition">
                <Mail size={18} className="text-cyan-300 shrink-0" />
                <span>{contacts.email.replace("mailto:", "")}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Core Focus & Tech Stack */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Sparkles className="text-cyan-300" size={20} />
              {t.cv.focus}
            </h2>
            <div className="mt-5 grid gap-3.5">
              {t.cv.highlights.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Code className="text-cyan-300" size={20} />
              {t.cv.stack} ({dynamicStack.length} Skills)
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {dynamicStack.map((item) => (
                <span key={item} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-slate-200 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* All Portfolio Projects */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white">{t.cv.selected}</h2>
            <span className="text-sm font-medium text-cyan-300">Total: {projects.length} Proyek Terverifikasi</span>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {projects.map((project) => {
              const description = language === "en" ? project.descriptionEn || project.description : project.description;
              const category = language === "en" ? project.categoryEn || project.category : project.category;
              const features = language === "en" ? project.featuresEn || project.features : project.features;

              return (
                <div key={project.name} className="flex flex-col justify-between rounded-xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-cyan-300/40 hover:bg-slate-950/60">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block rounded-full bg-cyan-300/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 border border-cyan-300/20">
                        {category}
                      </span>
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="no-print inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-200 transition">
                          <span>Demo</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white">{project.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>

                    {features && features.length > 0 && (
                      <ul className="mt-3 space-y-1 border-t border-white/5 pt-3">
                        {features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="mt-1 h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {project.stack && project.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                      {project.stack.map((tech) => (
                        <span key={tech} className="rounded bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* AI Agents & Automated Workflows */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b border-white/10 pb-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <Bot className="text-violet-300" size={24} />
              {t.cv.agents}
            </h2>
            <span className="text-sm font-medium text-violet-300">Total: {agents.length} Spesialis AI</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {agents.map((agent) => {
              const name = language === "en" ? agent.nameEn || agent.name : agent.name;
              const desc = language === "en" ? agent.descriptionEn || agent.description : agent.description;
              const out = language === "en" ? agent.outputEn || agent.output : agent.output;

              return (
                <div key={agent.name} className="rounded-xl border border-violet-300/20 bg-violet-950/20 p-4 transition hover:border-violet-300/40">
                  <h3 className="font-bold text-violet-100">{name}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{desc}</p>
                  {out && (
                    <div className="mt-3 rounded-lg border border-violet-300/10 bg-violet-950/40 p-2.5 text-xs text-violet-200">
                      <strong className="text-violet-300">Output:</strong> {out}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
