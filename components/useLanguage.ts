"use client";

import { useEffect, useState } from "react";

export type Language = "id" | "en";

const languageStorageKey = "m-akbar-zidane-language";

export const copy = {
  id: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      profile: "Data Diri",
      agent: "AI Agent",
      contact: "Kontak",
      viewWork: "Lihat Karya"
    },
    hero: {
      badge: "Portfolio Developer",
      portfolio: "Lihat Portfolio",
      cv: "Download CV",
      location: "Lokasi",
      status: "Status",
      project: "Project",
      photo: "Foto portfolio",
      photoHint: "Update lewat /admin",
      data: "Data Diri",
      selected: "Selected Result",
      available: "Available for project"
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Hasil project yang bisa langsung dilihat.",
      description: "Preview memakai screenshot dari link live project. Ringkas, visual, dan fokus ke hasil.",
      selected: "Selected Work",
      live: "Live",
      github: "GitHub"
    },
    agent: {
      eyebrow: "AI & Automation Project",
      title: "Generate Paket Layanan Lengkap",
      description:
        "Agent untuk membantu sales, brief, proposal, materi presentasi, caption, checklist, prompt teknis, sampai review akhir.",
      output: "Output"
    },
    about: {
      eyebrow: "Tentang Saya",
      title: "Developer profile.",
      description:
        "Mahasiswa Informatika yang fokus membangun website, sistem digital, dan AI workflow untuk kebutuhan portfolio bisnis dan UMKM.",
      body:
        "Saya biasa mengerjakan alur dari konsep, UI, frontend, backend, database, deployment, hingga optimasi dasar. Fokus saya adalah hasil yang rapi, cepat, dan mudah dikembangkan."
    },
    contact: {
      title: "Punya Project Website, Sistem, atau AI Workflow?",
      description:
        "Konsultasikan ide project Anda, mulai dari landing page portfolio bisnis, QR ordering, e-commerce, dashboard admin, sampai automation workflow.",
      whatsapp: "Hubungi via WhatsApp",
      github: "Lihat GitHub",
      portfolio: "Lihat Portfolio"
    },
    footer: {
      tagline: "Personal Portfolio - Web Development & AI Agent",
      rights: "All rights reserved."
    },
    preloader: {
      label: "M. Akbar Zidane Portfolio",
      title: "Preparing portfolio workspace",
      steps: ["Profile", "Portfolio", "AI Agent"]
    }
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      profile: "Profile",
      agent: "AI Agent",
      contact: "Contact",
      viewWork: "View Work"
    },
    hero: {
      badge: "Developer Portfolio",
      portfolio: "View Portfolio",
      cv: "Download CV",
      location: "Location",
      status: "Status",
      project: "Project",
      photo: "Portfolio photo",
      photoHint: "Update from /admin",
      data: "Profile",
      selected: "Selected Result",
      available: "Available for project"
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Selected projects you can preview.",
      description: "Preview images are generated from live project links. Concise, visual, and focused on results.",
      selected: "Selected Work",
      live: "Live",
      github: "GitHub"
    },
    agent: {
      eyebrow: "AI & Automation Project",
      title: "Complete Service Package Generator",
      description:
        "Agents for sales, briefs, proposals, presentations, captions, checklists, technical prompts, and final review.",
      output: "Output"
    },
    about: {
      eyebrow: "About Me",
      title: "Developer profile.",
      description:
        "Informatics student focused on building websites, digital systems, and AI workflows for business portfolios and SMEs.",
      body:
        "I usually work from concept, UI, frontend, backend, database, deployment, to basic optimization. My focus is clean, fast, and scalable output."
    },
    contact: {
      title: "Have a website, system, or AI workflow idea?",
      description:
        "Discuss your project idea, from business portfolio landing pages, QR ordering, e-commerce, admin dashboards, to automation workflows.",
      whatsapp: "Contact via WhatsApp",
      github: "View GitHub",
      portfolio: "View Portfolio"
    },
    footer: {
      tagline: "Personal Portfolio - Web Development & AI Agent",
      rights: "All rights reserved."
    },
    preloader: {
      label: "M. Akbar Zidane Portfolio",
      title: "Preparing portfolio workspace",
      steps: ["Profile", "Portfolio", "AI Agent"]
    }
  }
};

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (stored === "id" || stored === "en") {
      setLanguageState(stored);
    }

    const syncLanguage = () => {
      const next = window.localStorage.getItem(languageStorageKey);
      if (next === "id" || next === "en") {
        setLanguageState(next);
      }
    };

    window.addEventListener("m-akbar-language-change", syncLanguage);
    return () => window.removeEventListener("m-akbar-language-change", syncLanguage);
  }, []);

  function setLanguage(next: Language) {
    window.localStorage.setItem(languageStorageKey, next);
    setLanguageState(next);
    window.dispatchEvent(new Event("m-akbar-language-change"));
  }

  return { language, setLanguage, t: copy[language] };
}
