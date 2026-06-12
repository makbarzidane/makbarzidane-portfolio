"use client";

/* eslint-disable @next/next/no-img-element */

import { BriefcaseBusiness, Download, Github, GraduationCap, Layers3, MapPin, MessageCircle } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Motion";
import { useSiteContent } from "@/components/useSiteContent";
import { useLanguage } from "@/components/useLanguage";
import { isBrowserAssetRef, useBrowserAssetUrl } from "@/components/browserAssets";

export function Hero() {
  const content = useSiteContent();
  const { language, t } = useLanguage();
  const featured = content.projects.slice(0, 3);
  const role = language === "en" ? content.hero.roleEn || content.hero.role : content.hero.role;
  const bio = language === "en" ? content.hero.bioEn || content.hero.bio : content.hero.bio;
  const photoUrl = useBrowserAssetUrl(content.hero.photoUrl);
  const cvUrl = useBrowserAssetUrl(content.hero.cvUrl);
  const cvHref = cvUrl || (isBrowserAssetRef(content.hero.cvUrl) ? "/cv" : content.hero.cvUrl);

  const facts = [
    { label: t.hero.location, value: language === "en" ? content.hero.locationEn || content.hero.location : content.hero.location, icon: MapPin },
    { label: t.hero.status, value: language === "en" ? content.hero.studyEn || content.hero.study : content.hero.study, icon: GraduationCap },
    { label: t.hero.project, value: language === "en" ? content.hero.availabilityEn || content.hero.availability : content.hero.availability, icon: BriefcaseBusiness }
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_28%,rgba(139,92,246,0.20),transparent_30%),radial-gradient(circle_at_78%_22%,rgba(34,211,238,0.14),transparent_27%),linear-gradient(135deg,#090319_0%,#020617_46%,#071827_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="hero-ornament hero-ornament-a" />
      <div className="hero-ornament hero-ornament-b" />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.9fr)] lg:px-8">
        <Reveal className="min-w-0">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-sm font-medium text-violet-200 shadow-[0_0_36px_rgba(139,92,246,0.24)]">
              <Layers3 size={16} className="text-cyan-200" />
              {t.hero.badge}
            </div>

            <h1 className="hero-name mt-7 text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              {content.hero.name.split(" ").slice(0, 2).join(" ")}
              <span className="block bg-gradient-to-r from-cyan-200 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                {content.hero.name.split(" ").slice(2).join(" ") || "Zidane"}
              </span>
            </h1>

            <h2 className="hero-role mt-5 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-4xl">
              {role}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
              {bio}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="#portfolio" icon={<Layers3 size={18} />}>{t.hero.portfolio}</CtaButton>
              <CtaButton href={cvHref} variant="secondary" icon={<Download size={18} />}>{t.hero.cv}</CtaButton>
              <CtaButton href={content.contacts.github} variant="ghost" icon={<Github size={18} />}>GitHub</CtaButton>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                    <Icon size={18} className="text-cyan-200" />
                    <p className="mt-3 text-xs text-slate-400">{fact.label}</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-white">{fact.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal className="min-w-0" delay={0.12}>
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="profile-frame profile-frame-large relative mx-auto w-full max-w-[360px]">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-violet-300/28 bg-violet-300/8 p-2 shadow-[0_26px_80px_rgba(139,92,246,0.22)]">
                {photoUrl ? (
                  <img src={photoUrl} alt={content.hero.name} className="h-full w-full rounded-xl object-cover" />
                ) : (
                  <div className="grid h-full place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(139,92,246,0.22),rgba(34,211,238,0.12)),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_30px)]">
                    <div className="text-center">
                      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-slate-950/50 px-4 text-center text-sm font-semibold leading-5 text-cyan-100">
                        M. Akbar Zidane
                      </div>
                      <p className="mt-5 text-sm font-medium text-slate-300">{t.hero.photo}</p>
                      <p className="mt-1 text-xs text-slate-500">{t.hero.photoHint}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute -left-2 bottom-8 w-[230px] rounded-2xl border border-white/10 bg-slate-950/84 p-4 shadow-card backdrop-blur md:-left-8">
              <p className="text-sm font-semibold text-white">{t.hero.data}</p>
              <div className="mt-3 grid gap-2 text-xs text-slate-300">
                <span>{language === "en" ? content.hero.studyEn || content.hero.study : content.hero.study}</span>
                <span>{language === "en" ? content.hero.locationEn || content.hero.location : content.hero.location}</span>
                <span>{language === "en" ? content.hero.availabilityEn || content.hero.availability : content.hero.availability}</span>
              </div>
            </div>

            <div className="absolute -right-2 top-8 hidden w-[250px] rounded-2xl border border-white/10 bg-slate-950/84 p-4 shadow-card backdrop-blur sm:block md:-right-8">
              <p className="text-sm font-semibold text-white">{t.hero.selected}</p>
              <div className="mt-3 grid gap-2">
                {featured.map((project, index) => (
                  <a key={project.name} href="#portfolio" className="flex items-center gap-3 rounded-lg bg-white/[0.055] px-3 py-2 text-xs text-slate-300 transition hover:bg-violet-300/12 hover:text-white">
                    <span className="font-mono text-cyan-200">0{index + 1}</span>
                    <span className="truncate">{project.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#kontak"
              className="absolute bottom-[-34px] right-10 inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/12 px-4 py-3 text-sm font-semibold text-cyan-100 backdrop-blur transition hover:bg-cyan-300/18"
            >
              <MessageCircle size={17} />
              {t.hero.available}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
