"use client";

/* eslint-disable @next/next/no-img-element */

import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/components/useLanguage";
import type { EditableProject } from "@/data/cmsContent";

interface ProjectCardProps {
  project: EditableProject;
}

function isLiveUrl(value: string) {
  return /^https?:\/\//.test(value);
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasLivePreview = isLiveUrl(project.demoUrl);
  const previewSrc = project.previewImage || (hasLivePreview ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.demoUrl)}?w=1280` : "");
  const stack = project.stack.slice(0, 4);
  const { language, t } = useLanguage();
  const category = language === "en" ? project.categoryEn || project.category : project.category;
  const description = language === "en" ? project.descriptionEn || project.description : project.description;

  return (
    <article className="portfolio-card group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-card transition hover:-translate-y-1 hover:border-violet-300/45 hover:bg-white/[0.07]">
      <div className="portfolio-live-preview relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#061423]">
        {previewSrc ? (
          <img
            src={previewSrc}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full p-4">
            <div className="flex h-full gap-4 rounded-xl border border-white/10 bg-slate-950/35 p-4">
              <div className="hidden w-1/4 rounded-lg bg-violet-300/12 sm:block" />
              <div className="grid flex-1 gap-3">
                <div className="h-5 w-2/3 rounded bg-cyan-300/25" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded bg-white/10" />
                  <div className="rounded bg-white/10" />
                  <div className="rounded bg-emerald-300/20" />
                </div>
                <div className="rounded bg-white/8" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-medium text-violet-100">
            {category}
          </span>
          <span className="text-xs text-slate-500">{t.portfolio.selected}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-snug text-white">{project.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span key={item} className="rounded-md bg-white/8 px-2.5 py-1 text-xs text-slate-300">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <a
            href={project.demoUrl}
            target={hasLivePreview ? "_blank" : undefined}
            rel={hasLivePreview ? "noreferrer" : undefined}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            <ExternalLink size={16} />
            {t.portfolio.live}
          </a>
          <a
            href={project.githubUrl}
            target={isLiveUrl(project.githubUrl) ? "_blank" : undefined}
            rel={isLiveUrl(project.githubUrl) ? "noreferrer" : undefined}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/12 px-4 text-sm font-semibold text-white transition hover:border-violet-300/50 hover:bg-violet-300/10"
          >
            <Github size={16} />
            {t.portfolio.github}
          </a>
        </div>
      </div>
    </article>
  );
}
