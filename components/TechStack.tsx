import { Reveal } from "@/components/Motion";
import { SectionTitle } from "@/components/SectionTitle";
import { techGroups } from "@/data/content";

export function TechStack() {
  return (
    <section id="skill" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Skill & Tech Stack"
            title="Teknologi yang saya gunakan untuk membangun project digital."
            description="Stack yang fleksibel untuk landing page cepat, website bisnis, dashboard admin, e-commerce, data analysis, dan workflow AI."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {techGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-white/[0.07]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-300/10 text-cyan-200">
                      <Icon size={19} />
                    </span>
                    <h3 className="font-semibold text-white">{group.title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-md border border-white/10 bg-white/7 px-3 py-1.5 text-xs font-medium text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
