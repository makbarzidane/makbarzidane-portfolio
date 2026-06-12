"use client";

import Link from "next/link";
import { ArrowLeft, Download, Github, Mail, MapPin, Sparkles } from "lucide-react";
import { defaultCmsContent } from "@/data/cmsContent";
import { useLanguage, type Language } from "@/components/useLanguage";

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "PHP", "CodeIgniter 4", "MySQL", "Python", "Streamlit", "Vercel"];

export default function CvPage() {
  const { hero, contacts, projects, agents } = defaultCmsContent;
  const { language, setLanguage, t } = useLanguage();
  const role = language === "en" ? hero.roleEn || hero.role : hero.role;
  const bio = language === "en" ? hero.bioEn || hero.bio : hero.bio;
  const location = language === "en" ? hero.locationEn || hero.location : hero.location;

  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-slate-200 sm:px-6 lg:px-8">
      <div className="cv-print mx-auto max-w-5xl">
        <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
            <ArrowLeft size={16} />
            {t.cv.back}
          </Link>

          <div className="flex flex-wrap gap-2">
            <div className="inline-flex rounded-lg border border-white/12 p-1">
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              type="button"
            >
              <Download size={16} />
              {t.cv.download}
            </button>
          </div>
        </div>

        <p className="no-print mt-3 text-right text-xs text-slate-500">{t.cv.printHint}</p>

        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-card md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">{t.cv.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">{hero.name}</h1>
              <p className="mt-4 text-xl font-semibold text-violet-100">{role}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{bio}</p>
            </div>

            <div className="rounded-2xl border border-cyan-300/18 bg-cyan-300/8 p-5">
              <h2 className="mb-4 text-lg font-semibold text-white">{t.cv.contact}</h2>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin size={17} className="text-cyan-200" />
                {location}
              </div>
              <a href={contacts.github} className="mt-4 flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-100">
                <Github size={17} className="text-cyan-200" />
                github.com/makbarzidane
              </a>
              <a href={contacts.email} className="mt-4 flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-100">
                <Mail size={17} className="text-cyan-200" />
                {contacts.email.replace("mailto:", "")}
              </a>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-xl font-semibold text-white">{t.cv.focus}</h2>
            <div className="mt-5 grid gap-3">
              {t.cv.highlights.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <Sparkles size={16} className="mt-1 shrink-0 text-emerald-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-xl font-semibold text-white">{t.cv.stack}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="rounded-md bg-white/8 px-3 py-1.5 text-sm text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-semibold text-white">{t.cv.selected}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {projects.slice(0, 6).map((project) => {
              const description = language === "en" ? project.descriptionEn || project.description : project.description;
              const category = language === "en" ? project.categoryEn || project.category : project.category;

              return (
                <a key={project.name} href={project.demoUrl || project.githubUrl} className="rounded-xl border border-white/10 bg-slate-950/35 p-4 transition hover:border-cyan-300/35">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">{category}</p>
                  <p className="mt-2 font-semibold text-white">{project.name}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{description}</p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-semibold text-white">{t.cv.agents}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {agents.map((agent) => (
              <span key={agent.name} className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-sm text-violet-100">
                {agent.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
