"use client";

import { Github, Instagram, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSiteContent } from "@/components/useSiteContent";
import { useLanguage } from "@/components/useLanguage";

export function Footer() {
  const year = new Date().getFullYear();
  const { contacts } = useSiteContent();
  const { t } = useLanguage();
  const links = [
    { label: "GitHub", href: contacts.github, icon: Github },
    { label: "Instagram", href: contacts.instagram, icon: Instagram },
    { label: "WhatsApp", href: contacts.whatsapp, icon: MessageCircle },
    { label: "Email", href: contacts.email, icon: Mail }
  ];

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-white">M. Akbar Zidane - {t.footer.tagline}</p>
          <p className="mt-1">{t.footer.copyright} {year}. {t.footer.rights}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.label} href={link.href} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 transition hover:border-cyan-300/50 hover:text-cyan-200">
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
