import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SectionTitle } from "@/components/SectionTitle";
import { services, whyChooseMe } from "@/data/content";

export function Services() {
  return (
    <section id="layanan" className="border-y border-white/8 bg-white/[0.025] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="Layanan"
            title="Yang bisa saya bantu setelah Anda melihat portfolio saya."
            description="Layanan ini berangkat dari pola project yang sudah saya kerjakan: landing page, website bisnis, sistem admin, QR ordering, e-commerce, dan workflow AI."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(index % 3) * 0.04}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:border-cyan-300/45 hover:bg-white/[0.07]">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-300/10 text-cyan-200">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-16 rounded-2xl border border-white/10 bg-slateGlass p-6 md:p-8">
            <SectionTitle title="Kenapa memilih Zimeira Tech?" description="Pendekatan kerja dibuat praktis untuk kebutuhan bisnis kecil-menengah: jelas, fleksibel, dan siap dikembangkan." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {whyChooseMe.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/7 p-3 text-sm text-slate-200">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
