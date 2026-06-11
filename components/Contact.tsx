"use client";

import { Github, Layers3, Mail, MessageCircle } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Motion";
import { useSiteContent } from "@/components/useSiteContent";
import { useLanguage } from "@/components/useLanguage";

export function Contact() {
  const { contacts } = useSiteContent();
  const { t } = useLanguage();
  const emailLabel = contacts.email.replace("mailto:", "");

  return (
    <section id="kontak" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(52,211,153,0.1)_45%,rgba(255,255,255,0.055))] p-6 shadow-glow md:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                {t.contact.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg">
                {t.contact.description}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <CtaButton href={contacts.whatsapp} icon={<MessageCircle size={18} />}>{t.contact.whatsapp}</CtaButton>
                <CtaButton href={contacts.github} variant="secondary" icon={<Github size={18} />}>{t.contact.github}</CtaButton>
                <CtaButton href="#portfolio" variant="ghost" icon={<Layers3 size={18} />}>{t.contact.portfolio}</CtaButton>
              </div>
              <a href={contacts.email} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-cyan-200">
                <Mail size={17} />
                {emailLabel}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
