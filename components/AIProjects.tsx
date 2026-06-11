"use client";

import { Bot, CheckCircle2, FileText, Presentation, ScrollText, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SectionTitle } from "@/components/SectionTitle";
import { useSiteContent } from "@/components/useSiteContent";
import { useLanguage } from "@/components/useLanguage";

const iconSet = [Bot, ScrollText, FileText, FileText, Presentation, Sparkles, CheckCircle2, ScrollText, Bot];

export function AIProjects() {
  const { agents } = useSiteContent();
  const { language, t } = useLanguage();

  return (
    <section id="ai-project" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow={t.agent.eyebrow}
            title={t.agent.title}
            description={t.agent.description}
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent, index) => {
            const Icon = iconSet[index % iconSet.length];
            return (
              <Reveal key={agent.name} delay={(index % 3) * 0.05}>
                <article className="agent-card h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.075] to-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-emerald-300/45">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-300/12 text-emerald-200">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-white">{agent.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{language === "en" ? agent.descriptionEn || agent.description : agent.description}</p>
                  <div className="mt-5 rounded-lg border border-cyan-300/15 bg-cyan-300/8 px-3 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{t.agent.output}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{language === "en" ? agent.outputEn || agent.output : agent.output}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
