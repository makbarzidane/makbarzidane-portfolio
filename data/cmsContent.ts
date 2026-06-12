export interface EditableProject {
  name: string;
  category: string;
  description: string;
  categoryEn?: string;
  descriptionEn?: string;
  stack: string[];
  features: string[];
  featuresEn?: string[];
  demoUrl: string;
  githubUrl: string;
  previewImage?: string;
}

export interface EditableAgent {
  name: string;
  description: string;
  descriptionEn?: string;
  output: string;
  outputEn?: string;
}

export interface EditableContent {
  hero: {
    name: string;
    role: string;
    roleEn?: string;
    bio: string;
    bioEn?: string;
    photoUrl: string;
    cvUrl: string;
    location: string;
    locationEn?: string;
    study: string;
    studyEn?: string;
    availability: string;
    availabilityEn?: string;
  };
  contacts: {
    whatsapp: string;
    github: string;
    email: string;
    instagram: string;
  };
  projects: EditableProject[];
  agents: EditableAgent[];
}

export const cmsStorageKey = "m-akbar-zidane-cms-content";
export const legacyCmsStorageKey = "zimeira-tech-cms-content";

const previewFrom = (url: string) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280`;

export const defaultCmsContent: EditableContent = {
  hero: {
    name: "M. Akbar Zidane",
    role: "Full-Stack Developer & AI Agent Builder",
    roleEn: "Full-Stack Developer & AI Agent Builder",
    bio:
      "Mahasiswa Informatika dan developer yang membangun website, sistem digital, dashboard admin, e-commerce, QR ordering, serta workflow AI agent untuk membantu bisnis bekerja lebih cepat.",
    bioEn:
      "Informatics student and developer building websites, digital systems, admin dashboards, e-commerce, QR ordering, and AI agent workflows to help businesses work faster.",
    photoUrl: "",
    cvUrl: "/cv",
    location: "Pagar Alam, Sumatera Selatan",
    locationEn: "Pagar Alam, South Sumatra",
    study: "Mahasiswa Informatika",
    studyEn: "Informatics Student",
    availability: "Open freelance project",
    availabilityEn: "Open for freelance projects"
  },
  contacts: {
    whatsapp: "https://wa.me/628xxxxxxxxxx",
    github: "https://github.com/makbarzidane",
    email: "mailto:akbarzidane12@gmail.com",
    instagram: "#"
  },
  projects: [
    {
      name: "M. Akbar Zidane Portfolio",
      category: "Personal Portfolio Website",
      categoryEn: "Personal Portfolio Website",
      description:
        "Website portfolio pribadi untuk menampilkan profil, data diri, project pilihan, paket AI agent, CV, kontak, bilingual mode, animasi motion, dan CMS sederhana.",
      descriptionEn:
        "Personal portfolio website for profile, selected projects, AI agent packages, CV, contacts, bilingual mode, motion animation, and a simple CMS.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      features: ["Hero profile visual", "Portfolio preview", "ID/EN language switcher", "CMS login", "Vercel deployment"],
      featuresEn: ["Visual profile hero", "Portfolio preview", "ID/EN language switcher", "CMS login", "Vercel deployment"],
      demoUrl: "https://m-akbar-zidane-portfolio.vercel.app",
      githubUrl: "https://github.com/makbarzidane/makbarzidane-portfolio",
      previewImage: previewFrom("https://m-akbar-zidane-portfolio.vercel.app")
    },
    {
      name: "Zimeira Agent Online",
      category: "AI Agent Workflow",
      categoryEn: "AI Agent Workflow",
      description:
        "Aplikasi agent berbasis Streamlit untuk menghasilkan paket layanan lengkap seperti sales script, brief, proposal, presentasi, caption, checklist, catatan teknis, dan reviewer.",
      descriptionEn:
        "Streamlit-based agent app for generating complete service packages such as sales scripts, briefs, proposals, presentations, captions, checklists, technical notes, and review output.",
      stack: ["Python", "Streamlit", "Prompt Engineering", "AI Workflow"],
      features: ["Generate paket layanan", "Sales Agent", "Brief Agent", "Proposal Agent", "Reviewer Agent"],
      featuresEn: ["Service package generator", "Sales Agent", "Brief Agent", "Proposal Agent", "Reviewer Agent"],
      demoUrl: "https://zimeira-agent-online.streamlit.app/",
      githubUrl: "https://github.com/makbarzidane/zimeira-agent-online",
      previewImage: previewFrom("https://zimeira-agent-online.streamlit.app/")
    },
    {
      name: "2Z Reklame & Cutting Sticker Company Profile",
      category: "Company Profile Website",
      categoryEn: "Company Profile Website",
      description:
        "Website company profile untuk usaha reklame dan cutting sticker di Pagar Alam. Website ini menampilkan profil usaha, layanan, portfolio, galeri, kontak WhatsApp, dan panel admin untuk mengelola konten.",
      descriptionEn:
        "Company profile website for an advertising and cutting sticker business in Pagar Alam, featuring business profile, services, portfolio, gallery, WhatsApp contact, and admin panel.",
      stack: ["CodeIgniter 4", "PHP", "MySQL", "Bootstrap", "JavaScript", "cPanel"],
      features: ["Landing page company profile", "CRUD layanan", "CRUD portfolio", "CRUD galeri", "Slider hero dinamis"],
      featuresEn: ["Company profile landing page", "Services CRUD", "Portfolio CRUD", "Gallery CRUD", "Dynamic hero slider"],
      demoUrl: "https://github.com/makbarzidane/PemrogramanWeb_A2_M.Akbar-Zidane",
      githubUrl: "https://github.com/makbarzidane/PemrogramanWeb_A2_M.Akbar-Zidane",
      previewImage: previewFrom("https://github.com/makbarzidane/PemrogramanWeb_A2_M.Akbar-Zidane")
    },
    {
      name: "Zimeira Tech Website",
      category: "Service Landing Page",
      categoryEn: "Service Landing Page",
      description:
        "Website landing page untuk menampilkan layanan digital seperti pembuatan website, sistem bisnis, dan solusi IT untuk UMKM.",
      descriptionEn:
        "Landing page website to present digital services such as website development, business systems, and IT solutions for SMEs.",
      stack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
      features: ["Landing page jasa", "Section layanan", "CTA WhatsApp", "Portfolio preview", "Responsive design"],
      featuresEn: ["Service landing page", "Service sections", "WhatsApp CTA", "Portfolio preview", "Responsive design"],
      demoUrl: "https://github.com/makbarzidane/zimeira-tech-website-portfolio",
      githubUrl: "https://github.com/makbarzidane/zimeira-tech-website-portfolio",
      previewImage: previewFrom("https://github.com/makbarzidane/zimeira-tech-website-portfolio")
    },
    {
      name: "E-Commerce Hijab Website",
      category: "E-Commerce Website",
      categoryEn: "E-Commerce Website",
      description:
        "Website e-commerce bertema hijab untuk menampilkan produk, kategori, harga, keranjang, checkout, dan fitur pendukung toko online.",
      descriptionEn:
        "Hijab-themed e-commerce website featuring products, categories, prices, cart, checkout, and supporting online store features.",
      stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "GitHub", "Vercel"],
      features: ["Product catalog", "Product detail", "Cart", "Checkout flow", "Payment integration planned"],
      featuresEn: ["Product catalog", "Product detail", "Cart", "Checkout flow", "Payment integration planned"],
      demoUrl: "https://e-commerce-portfolio.vercel.app/",
      githubUrl: "https://github.com/makbarzidane/e-commerce-portfolio",
      previewImage: previewFrom("https://e-commerce-portfolio.vercel.app/")
    },
    {
      name: "Besemah Coffee",
      category: "UMKM Coffee Website",
      categoryEn: "SME Coffee Website",
      description:
        "Website demo untuk brand kopi lokal Pagar Alam yang membantu UMKM kopi terlihat lebih profesional dan mudah menerima pemesanan.",
      descriptionEn:
        "Demo website for a local Pagar Alam coffee brand, helping the SME look more professional and receive orders more easily.",
      stack: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vercel"],
      features: ["Landing page kopi", "Menu produk", "Paket promo", "CTA WhatsApp order", "Galeri produk"],
      featuresEn: ["Coffee landing page", "Product menu", "Promo packages", "WhatsApp order CTA", "Product gallery"],
      demoUrl: "https://github.com/makbarzidane/besemah-coffee-cms-portfolio",
      githubUrl: "https://github.com/makbarzidane/besemah-coffee-cms-portfolio",
      previewImage: previewFrom("https://github.com/makbarzidane/besemah-coffee-cms-portfolio")
    },
    {
      name: "Homestay Bukit Dempo",
      category: "Homestay Landing Page",
      categoryEn: "Homestay Landing Page",
      description:
        "Website landing page untuk homestay yang menampilkan informasi penginapan, fasilitas, galeri, lokasi, dan pemesanan melalui WhatsApp.",
      descriptionEn:
        "Landing page for a homestay featuring accommodation information, facilities, gallery, location, and WhatsApp booking.",
      stack: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vercel"],
      features: ["Informasi homestay", "Galeri kamar", "Fasilitas", "CTA booking WhatsApp", "Lokasi"],
      featuresEn: ["Homestay information", "Room gallery", "Facilities", "WhatsApp booking CTA", "Location"],
      demoUrl: "https://github.com/makbarzidane/homestay-bukit-dempo-portfolio",
      githubUrl: "https://github.com/makbarzidane/homestay-bukit-dempo-portfolio",
      previewImage: previewFrom("https://github.com/makbarzidane/homestay-bukit-dempo-portfolio")
    },
    {
      name: "QR Ordering System Cafe",
      category: "Cafe Ordering System",
      categoryEn: "Cafe Ordering System",
      description:
        "Sistem pemesanan makanan dan minuman berbasis QR Code untuk cafe. Pelanggan dapat scan QR dari meja, melihat menu, melakukan pemesanan, dan pesanan masuk ke dashboard admin.",
      descriptionEn:
        "QR Code-based food and beverage ordering system for cafes. Customers scan table QR codes, view menus, order, and orders appear in the admin dashboard.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "API Route"],
      features: ["QR menu", "Customer ordering page", "Admin order dashboard", "Menu management", "Order status"],
      featuresEn: ["QR menu", "Customer ordering page", "Admin order dashboard", "Menu management", "Order status"],
      demoUrl: "https://github.com/makbarzidane/Tugas-Web-CRUD_RHYZ",
      githubUrl: "https://github.com/makbarzidane/Tugas-Web-CRUD_RHYZ",
      previewImage: previewFrom("https://github.com/makbarzidane/Tugas-Web-CRUD_RHYZ")
    },
    {
      name: "Apex Legends Sentiment Analysis",
      category: "Data Analyst / AI Project",
      categoryEn: "Data Analyst / AI Project",
      description:
        "Project analisis sentimen review game Apex Legends dari platform Steam menggunakan pendekatan machine learning untuk mengetahui opini positif dan negatif dari pemain.",
      descriptionEn:
        "Sentiment analysis project for Apex Legends Steam reviews using machine learning to identify positive and negative player opinions.",
      stack: ["Python", "Pandas", "Naive Bayes", "Data Cleaning", "Sentiment Analysis"],
      features: ["Dataset review Steam", "Preprocessing text", "Klasifikasi sentimen", "Insight bisnis", "Visualisasi hasil"],
      featuresEn: ["Steam review dataset", "Text preprocessing", "Sentiment classification", "Business insight", "Result visualization"],
      demoUrl: "https://github.com/makbarzidane/Dashboard-Review-Game-Apex-Legends-Steam",
      githubUrl: "https://github.com/makbarzidane/analisis_sentimen_revew_apex_legends_dashboard",
      previewImage: previewFrom("https://github.com/makbarzidane/Dashboard-Review-Game-Apex-Legends-Steam")
    }
  ],
  agents: [
    {
      name: "Sales Agent",
      description: "Membantu menyusun angle penjualan, benefit layanan, dan arah komunikasi untuk calon client.",
      descriptionEn: "Helps structure sales angles, service benefits, and communication direction for potential clients.",
      output: "Script sales, value proposition, dan poin follow-up."
      ,outputEn: "Sales script, value proposition, and follow-up points."
    },
    {
      name: "Brief Agent",
      description: "Mengubah kebutuhan mentah client menjadi brief project yang lebih jelas dan siap dikerjakan.",
      descriptionEn: "Turns raw client needs into a clearer project brief that is ready to execute.",
      output: "Ringkasan kebutuhan, target user, fitur, dan scope."
      ,outputEn: "Needs summary, target users, features, and scope."
    },
    {
      name: "Penawaran/Proposal Agent",
      description: "Menyusun penawaran layanan yang rapi berdasarkan kebutuhan, scope, dan paket pekerjaan.",
      descriptionEn: "Creates a structured service offer based on needs, scope, and work packages.",
      output: "Draft penawaran, estimasi pekerjaan, dan struktur paket."
      ,outputEn: "Offer draft, work estimate, and package structure."
    },
    {
      name: "Proposal Resmi",
      description: "Membuat proposal formal untuk kebutuhan presentasi ke client atau pihak bisnis.",
      descriptionEn: "Creates formal proposals for client or business presentations.",
      output: "Dokumen proposal siap rapikan."
      ,outputEn: "Proposal document ready for refinement."
    },
    {
      name: "Presentasi PPTX",
      description: "Membantu menyusun struktur slide presentasi untuk menjelaskan solusi, timeline, dan harga.",
      descriptionEn: "Helps structure presentation slides to explain solution, timeline, and pricing.",
      output: "Outline slide dan narasi presentasi."
      ,outputEn: "Slide outline and presentation narrative."
    },
    {
      name: "Caption Agent",
      description: "Membuat caption promosi untuk social media, produk, jasa, dan campaign UMKM.",
      descriptionEn: "Creates promotional captions for social media, products, services, and SME campaigns.",
      output: "Caption, hook, CTA, dan variasi gaya bahasa."
      ,outputEn: "Captions, hooks, CTAs, and tone variations."
    },
    {
      name: "Checklist Agent",
      description: "Membuat checklist eksekusi agar project, konten, atau campaign tidak melewatkan hal penting.",
      descriptionEn: "Creates execution checklists so projects, content, or campaigns do not miss important steps.",
      output: "Checklist tahap kerja dan prioritas."
      ,outputEn: "Workflow checklist and priorities."
    },
    {
      name: "Codex Prompt / Catatan Teknis Agent",
      description: "Menyusun prompt teknis dan catatan implementasi untuk mempercepat kerja dengan AI coding agent.",
      descriptionEn: "Creates technical prompts and implementation notes to speed up work with AI coding agents.",
      output: "Prompt Codex, struktur task, dan catatan teknis."
      ,outputEn: "Codex prompts, task structure, and technical notes."
    },
    {
      name: "Reviewer Agent",
      description: "Mengecek ulang hasil brief, proposal, caption, atau prompt agar lebih rapi dan konsisten.",
      descriptionEn: "Reviews briefs, proposals, captions, or prompts to make them cleaner and more consistent.",
      output: "Review, revisi, dan rekomendasi perbaikan."
      ,outputEn: "Review, revisions, and improvement recommendations."
    }
  ]
};
