"use client";

import { useEffect, useState } from "react";

export type Language = "id" | "en";

const languageStorageKey = "m-akbar-zidane-language";

export const copy = {
  id: {
    nav: {
      home: "Beranda",
      portfolio: "Portofolio",
      profile: "Data Diri",
      agent: "Agen AI",
      contact: "Kontak",
      viewWork: "Lihat Karya",
      openMenu: "Buka menu"
    },
    hero: {
      badge: "Portofolio Pengembang",
      portfolio: "Lihat Portofolio",
      cv: "Unduh CV",
      location: "Lokasi",
      status: "Status",
      project: "Proyek",
      photo: "Foto portofolio",
      photoHint: "Perbarui lewat /admin",
      data: "Data Diri",
      selected: "Hasil Pilihan",
      available: "Siap untuk proyek"
    },
    portfolio: {
      eyebrow: "Portofolio",
      title: "Hasil proyek yang bisa langsung dilihat.",
      description: "Preview memakai screenshot tampilan website atau mockup hasil proyek. Ringkas, visual, dan fokus ke hasil.",
      selected: "Karya Pilihan",
      live: "Lihat Website",
      details: "Detail",
      github: "GitHub"
    },
    agent: {
      eyebrow: "Proyek AI & Otomasi",
      title: "Generate Paket Layanan Lengkap",
      description:
        "Agen untuk membantu sales, brief, proposal, materi presentasi, caption, checklist, prompt teknis, sampai review akhir.",
      output: "Hasil"
    },
    about: {
      eyebrow: "Tentang Saya",
      title: "Profil developer.",
      description:
        "Mahasiswa Informatika yang fokus membangun website, sistem digital, dan workflow AI untuk kebutuhan portofolio bisnis dan UMKM.",
      body:
        "Saya biasa mengerjakan alur dari konsep, desain UI, frontend, backend, database, deployment, hingga optimasi dasar. Fokus saya adalah hasil yang rapi, cepat, dan mudah dikembangkan.",
      capabilities: ["Konsep", "Desain UI", "Frontend", "Backend", "Database", "Deployment", "Optimasi SEO Dasar"]
    },
    contact: {
      title: "Punya Proyek Website, Sistem, atau Workflow AI?",
      description:
        "Konsultasikan ide proyek Anda, mulai dari landing page portofolio bisnis, QR ordering, e-commerce, dashboard admin, sampai workflow otomasi.",
      whatsapp: "Hubungi via WhatsApp",
      github: "Lihat GitHub",
      portfolio: "Lihat Portofolio"
    },
    footer: {
      tagline: "Portofolio Pribadi - Pengembangan Web & Agen AI",
      copyright: "Hak cipta",
      rights: "Seluruh hak cipta dilindungi."
    },
    preloader: {
      label: "Portofolio M. Akbar Zidane",
      title: "Menyiapkan ruang portofolio",
      loading: "memuat.portofolio",
      steps: ["Profil", "Portofolio", "Agen AI"]
    },
    cv: {
      back: "Kembali ke Portofolio",
      eyebrow: "Curriculum Vitae",
      download: "Unduh CV PDF",
      printHint: "Gunakan dialog cetak untuk menyimpan sebagai PDF.",
      contact: "Kontak",
      focus: "Fokus Keahlian",
      stack: "Stack Teknologi",
      selected: "Portofolio Pilihan",
      agents: "Paket Agen AI",
      highlights: [
        "Pengembangan web full-stack",
        "Dashboard admin dan CMS sederhana",
        "E-commerce, QR ordering, dan landing page UMKM",
        "Workflow agen AI untuk sales, brief, proposal, caption, checklist, dan review"
      ]
    }
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      profile: "Profile",
      agent: "AI Agent",
      contact: "Contact",
      viewWork: "View Work",
      openMenu: "Open menu"
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
      details: "Details",
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
        "I usually work from concept, UI design, frontend, backend, database, deployment, to basic optimization. My focus is clean, fast, and scalable output.",
      capabilities: ["Concept", "UI Design", "Frontend", "Backend", "Database", "Deployment", "Basic SEO Optimization"]
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
      copyright: "Copyright",
      rights: "All rights reserved."
    },
    preloader: {
      label: "M. Akbar Zidane Portfolio",
      title: "Preparing portfolio workspace",
      loading: "loading.portfolio",
      steps: ["Profile", "Portfolio", "AI Agent"]
    },
    cv: {
      back: "Back to Portfolio",
      eyebrow: "Curriculum Vitae",
      download: "Download CV PDF",
      printHint: "Use the print dialog to save as PDF.",
      contact: "Contact",
      focus: "Skill Focus",
      stack: "Technology Stack",
      selected: "Selected Portfolio",
      agents: "AI Agent Package",
      highlights: [
        "Full-stack web development",
        "Admin dashboard and simple CMS",
        "E-commerce, QR ordering, and SME landing pages",
        "AI agent workflows for sales, briefs, proposals, captions, checklists, and review"
      ]
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
