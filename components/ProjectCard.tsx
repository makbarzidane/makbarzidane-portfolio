"use client";

/* eslint-disable @next/next/no-img-element */

import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/components/useLanguage";
import { isBrowserAssetRef, useBrowserAssetUrl } from "@/components/browserAssets";
import type { EditableProject } from "@/data/cmsContent";

interface ProjectCardProps {
  project: EditableProject;
}

function isLiveUrl(value: string) {
  return /^https?:\/\//.test(value);
}

function isGithubUrl(value: string) {
  return /^https?:\/\/(www\.)?github\.com\//.test(value);
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasDemoUrl = isLiveUrl(project.demoUrl);
  const hasGithubUrl = isLiveUrl(project.githubUrl);
  const demoIsGithub = isGithubUrl(project.demoUrl);
  const showGithub = hasGithubUrl && project.githubUrl !== project.demoUrl;
  const previewSrc = project.previewImage || (hasDemoUrl ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.demoUrl)}?w=1280` : "");
  const resolvedPreviewSrc = useBrowserAssetUrl(previewSrc);
  const visiblePreviewSrc = resolvedPreviewSrc || (isBrowserAssetRef(previewSrc) ? "" : previewSrc);
  const liveHref = hasDemoUrl ? project.demoUrl : visiblePreviewSrc;
  const stack = project.stack.slice(0, 4);
  const features = project.features.slice(0, 3);
  const { language, t } = useLanguage();
  const category = language === "en" ? project.categoryEn || project.category : project.category;
  const description = language === "en" ? project.descriptionEn || project.description : project.description;
  const demoLabel = demoIsGithub ? t.portfolio.details : t.portfolio.live;

  return (
    <article className="portfolio-card group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-card transition hover:-translate-y-1 hover:border-violet-300/45 hover:bg-white/[0.07]">
      <div className="portfolio-live-preview relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#061423]">
        {visiblePreviewSrc ? (
          <img
            src={visiblePreviewSrc}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.22),transparent_26%),linear-gradient(135deg,#07111f,#120826_55%,#061423)] p-4">
            <div className="flex h-full flex-col rounded-xl border border-white/10 bg-slate-950/45 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-200/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                </div>
                <span className="truncate text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-100/70">{category}</span>
              </div>
              <div className="grid flex-1 content-center gap-3">
                <p className="line-clamp-2 max-w-[78%] text-lg font-semibold leading-tight text-white">{project.name}</p>
                <div className="grid gap-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
                      <span className="h-2.5 flex-1 rounded-full bg-white/12" />
                    </div>
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {stack.slice(0, 3).map((item) => (
                    <span key={item} className="truncate rounded-md border border-white/10 bg-white/8 px-2 py-1 text-[10px] text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
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

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {liveHref ? (
            <a
              href={liveHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              <ExternalLink size={16} />
              {demoLabel}
            </a>
          ) : null}
          {showGithub ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/12 px-4 text-sm font-semibold text-white transition hover:border-violet-300/50 hover:bg-violet-300/10"
            >
              <Github size={16} />
              {t.portfolio.github}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
