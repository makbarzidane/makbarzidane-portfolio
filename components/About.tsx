"use client";

import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SectionTitle } from "@/components/SectionTitle";
import { useLanguage } from "@/components/useLanguage";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="tentang" className="border-y border-white/8 bg-white/[0.025] py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            description={t.about.description}
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-2xl border border-white/10 bg-slateGlass p-6 shadow-card backdrop-blur md:p-8">
            <p className="text-base leading-8 text-slate-300">
              {t.about.body}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {t.about.capabilities.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/6 p-3 text-sm font-medium text-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
