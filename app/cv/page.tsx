import Link from "next/link";
import { ArrowLeft, Github, Mail, MapPin, Sparkles } from "lucide-react";
import { defaultCmsContent } from "@/data/cmsContent";

const highlights = [
  "Full-stack web development",
  "Dashboard admin dan CMS sederhana",
  "E-commerce, QR ordering, dan landing page UMKM",
  "AI agent workflow untuk sales, brief, proposal, caption, checklist, dan review"
];

export default function CvPage() {
  const { hero, contacts, projects, agents } = defaultCmsContent;

  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
          <ArrowLeft size={16} />
          Kembali ke Portfolio
        </Link>

        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-card md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Curriculum Vitae</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">{hero.name}</h1>
              <p className="mt-4 text-xl font-semibold text-violet-100">{hero.role}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{hero.bio}</p>
            </div>

            <div className="rounded-2xl border border-cyan-300/18 bg-cyan-300/8 p-5">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin size={17} className="text-cyan-200" />
                {hero.location}
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
            <h2 className="text-xl font-semibold text-white">Fokus Keahlian</h2>
            <div className="mt-5 grid gap-3">
              {highlights.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <Sparkles size={16} className="mt-1 shrink-0 text-emerald-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-xl font-semibold text-white">Stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "PHP", "CodeIgniter 4", "MySQL", "Python", "Streamlit", "Vercel"].map((item) => (
                <span key={item} className="rounded-md bg-white/8 px-3 py-1.5 text-sm text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-semibold text-white">Selected Portfolio</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {projects.slice(0, 6).map((project) => (
              <a key={project.name} href={project.demoUrl} className="rounded-xl border border-white/10 bg-slate-950/35 p-4 transition hover:border-cyan-300/35">
                <p className="font-semibold text-white">{project.name}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{project.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-semibold text-white">AI Agent Package</h2>
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
