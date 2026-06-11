"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/useLanguage";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "portfolio", href: "#portfolio" },
  { key: "profile", href: "#tentang" },
  { key: "agent", href: "#ai-project" },
  { key: "contact", href: "#kontak" }
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="text-base font-semibold text-white">M. Akbar Zidane</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex rounded-lg border border-white/12 p-1">
            {(["id", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  language === item ? "bg-white text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <Link
            href="#portfolio"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            {t.nav.viewWork}
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Buka menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-ink/96 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            <div className="mb-2 flex w-fit rounded-lg border border-white/12 p-1">
              {(["id", "en"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    language === item ? "bg-white text-slate-950" : "text-slate-300"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/8"
                onClick={() => setOpen(false)}
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
