"use client";

import { Reveal } from "@/components/Motion";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { useSiteContent } from "@/components/useSiteContent";
import { useLanguage } from "@/components/useLanguage";

export function Portfolio() {
  const { projects } = useSiteContent();
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="relative border-y border-white/8 bg-white/[0.025] py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(139,92,246,0.12),transparent_25%),radial-gradient(circle_at_86%_30%,rgba(34,211,238,0.10),transparent_24%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t.portfolio.eyebrow}
            title={t.portfolio.title}
            description={t.portfolio.description}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={(index % 3) * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
