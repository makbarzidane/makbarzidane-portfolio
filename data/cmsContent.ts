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
  nameEn?: string;
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

export const cmsStorageKey = "m-akbar-zidane-cms-content-v3";
export const legacyCmsStorageKey = "zimeira-tech-cms-content";

export const defaultCmsContent: EditableContent = {
  hero: {
    name: "M. Akbar Zidane",
    role: "Pengembang Full-Stack & Pembuat Agen AI",
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
      category: "Website & Landing Page Portofolio",
      categoryEn: "Portfolio Website & Landing Page",
      description:
        "Website landing page dan portofolio pribadi untuk menampilkan profil profesional, proyek pilihan, katalog layanan AI Agent, serta dilengkapi panel CMS dengan integrasi database cloud.",
      descriptionEn:
        "Personal portfolio website and landing page presenting professional profile, selected projects, AI Agent service catalog, and an integrated cloud-database CMS panel.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Blob"],
      features: ["Landing Page Eksklusif", "Katalog Proyek Portofolio", "ID/EN Language Switcher", "Panel Admin CMS", "Cloud Blob Database Sync"],
      featuresEn: ["Exclusive Landing Page", "Portfolio Project Catalog", "ID/EN Language Switcher", "CMS Admin Panel", "Cloud Blob Database Sync"],
      demoUrl: "https://m-akbar-zidane-portfolio.vercel.app",
      githubUrl: "https://github.com/makbarzidane/makbarzidane-portfolio",
      previewImage: "/portfolio/m-akbar-zidane-portfolio.png"
    },
    {
      name: "Zimeira Agent Online",
      category: "Aplikasi Web & Workflow AI",
      categoryEn: "Web Application & AI Workflow",
      description:
        "Aplikasi web interaktif berbasis AI untuk memproses kebutuhan bisnis dan menghasilkan paket layanan lengkap, mulai dari sales script, project brief, proposal, presentasi, hingga catatan teknis.",
      descriptionEn:
        "Interactive AI-powered web application designed to process business needs and generate complete service packages, including sales scripts, project briefs, proposals, presentations, and technical notes.",
      stack: ["Python", "Streamlit", "Prompt Engineering", "AI Workflow"],
      features: ["Generator Paket Layanan AI", "Sales & Brief Agent", "Proposal & PPTX Generator", "Reviewer & Codex Assistant", "Ekspor Output Otomatis"],
      featuresEn: ["AI Service Package Generator", "Sales & Brief Agent", "Proposal & PPTX Generator", "Reviewer & Codex Assistant", "Automated Output Export"],
      demoUrl: "https://zimeira-agent-online.streamlit.app/",
      githubUrl: "https://github.com/makbarzidane/zimeira-agent-online",
      previewImage: "/portfolio/zimeira-agent-online.png"
    },
    {
      name: "2Z Reklame & Cutting Sticker Company Profile",
      category: "Website Company Profile & Sistem Admin",
      categoryEn: "Company Profile Website & Admin System",
      description:
        "Website company profile dinamis untuk bisnis reklame dan cutting sticker di Pagar Alam. Dilengkapi dengan panel admin (CRUD) untuk mengelola katalog layanan, portofolio karya, galeri, dan slider promo secara real-time.",
      descriptionEn:
        "Dynamic company profile website for an advertising and cutting sticker business in Pagar Alam. Features an integrated admin panel (CRUD) to manage services, portfolios, galleries, and promotional sliders in real-time.",
      stack: ["CodeIgniter 4", "PHP", "MySQL", "Bootstrap", "JavaScript", "cPanel"],
      features: ["Profil Perusahaan Dinamis", "Panel Admin (CRUD Layanan & Portofolio)", "Manajemen Galeri & Slider", "Integrasi Kontak WhatsApp", "Database MySQL & cPanel"],
      featuresEn: ["Dynamic Company Profile", "Admin Panel (Services & Portfolio CRUD)", "Gallery & Slider Management", "WhatsApp Contact Integration", "MySQL Database & cPanel"],
      demoUrl: "",
      githubUrl: "https://github.com/makbarzidane/PemrogramanWeb_A2_M.Akbar-Zidane",
      previewImage: "/portfolio/2z-reklame.png"
    },
    {
      name: "Zimeira Tech Website",
      category: "Website Portal Layanan Digital",
      categoryEn: "Digital Services Portal Website",
      description:
        "Website portal layanan digital untuk menampilkan solusi teknologi, pembuatan sistem bisnis, serta konsultasi IT bagi UMKM dan perusahaan, dengan alur interaksi klien yang terstruktur.",
      descriptionEn:
        "Digital services portal website presenting technology solutions, business system development, and IT consulting for SMEs and enterprises, featuring structured client interaction flows.",
      stack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
      features: ["Portal Katalog Layanan", "Showcase Solusi Bisnis", "Alur Konsultasi WhatsApp", "Desain Responsif & Modern", "Optimasi SEO & Performa"],
      featuresEn: ["Service Catalog Portal", "Business Solution Showcase", "WhatsApp Consultation Flow", "Modern & Responsive Design", "SEO & Performance Optimization"],
      demoUrl: "",
      githubUrl: "https://github.com/makbarzidane/zimeira-tech-website-portfolio",
      previewImage: "/portfolio/zimeira-tech-website.png"
    },
    {
      name: "E-Commerce Hijab Website",
      category: "Website E-Commerce & Toko Online",
      categoryEn: "E-Commerce Website & Online Store",
      description:
        "Website toko online bergaya modern untuk katalog produk hijab dan fashion muslim. Menyediakan fitur navigasi kategori, detail produk, keranjang belanja (cart), dan alur checkout yang mulus.",
      descriptionEn:
        "Modern online store website for hijab and modest fashion catalogs. Features category navigation, detailed product pages, shopping cart functionality, and a seamless checkout experience.",
      stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "GitHub", "Vercel"],
      features: ["Katalog Produk & Kategori", "Halaman Detail Produk Dinamis", "Keranjang Belanja (Cart)", "Simulasi Alur Checkout", "Antarmuka UI/UX Elegan"],
      featuresEn: ["Product & Category Catalog", "Dynamic Product Detail Pages", "Shopping Cart Functionality", "Checkout Flow Simulation", "Elegant UI/UX Interface"],
      demoUrl: "https://e-commerce-portfolio.vercel.app/",
      githubUrl: "https://github.com/makbarzidane/e-commerce-portfolio",
      previewImage: "/portfolio/ecommerce-hijab.png"
    },
    {
      name: "Besemah Coffee",
      category: "Website Brand & Katalog UMKM",
      categoryEn: "Brand Website & SME Catalog",
      description:
        "Website resmi dan katalog digital untuk brand kopi lokal Pagar Alam. Membantu UMKM mempresentasikan kualitas biji kopi, varian menu, paket promo, dan mempermudah pesanan langsung via WhatsApp.",
      descriptionEn:
        "Official brand website and digital catalog for a local Pagar Alam coffee producer. Helps the SME showcase coffee bean quality, menu variants, and promotional packages with direct WhatsApp ordering.",
      stack: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vercel"],
      features: ["Katalog Varian Kopi", "Informasi Brand & Kualitas", "Paket Penawaran & Promo", "Pemesanan Cepat WhatsApp", "Galeri Visual Produk"],
      featuresEn: ["Coffee Variant Catalog", "Brand & Quality Story", "Promo & Bundle Packages", "Quick WhatsApp Ordering", "Product Visual Gallery"],
      demoUrl: "",
      githubUrl: "https://github.com/makbarzidane/besemah-coffee-cms-portfolio",
      previewImage: "/portfolio/besemah-coffee.png"
    },
    {
      name: "Homestay Bukit Dempo",
      category: "Website Profil & Reservasi Penginapan",
      categoryEn: "Accommodation Profile & Booking Website",
      description:
        "Website profil penginapan dan portal reservasi untuk Homestay Bukit Dempo. Menampilkan tipe kamar, fasilitas lengkap, panduan wisata sekitar, serta sistem pemesanan kamar langsung terintegrasi WhatsApp.",
      descriptionEn:
        "Accommodation profile and booking portal website for Homestay Bukit Dempo. Showcases room types, full amenities, local tourism guides, and an integrated direct WhatsApp room reservation flow.",
      stack: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vercel"],
      features: ["Katalog Tipe Kamar & Harga", "Daftar Fasilitas Penginapan", "Galeri Foto & Lingkungan", "Panduan Lokasi & Peta", "Reservasi Langsung via WhatsApp"],
      featuresEn: ["Room Types & Pricing Catalog", "Accommodation Amenities", "Photo & Surroundings Gallery", "Location & Map Guide", "Direct WhatsApp Booking"],
      demoUrl: "",
      githubUrl: "https://github.com/makbarzidane/homestay-bukit-dempo-portfolio",
      previewImage: "/portfolio/homestay-bukit-dempo.png"
    },
    {
      name: "QR Ordering System Cafe",
      category: "Aplikasi Web & Sistem Pemesanan Cafe",
      categoryEn: "Web Application & Cafe Ordering System",
      description:
        "Sistem pemesanan F&B berbasis web dan QR Code untuk otomatisasi kafe. Pelanggan dapat memindai QR dari meja untuk memesan, sementara pesanan masuk secara real-time ke dashboard admin dapur/kasir.",
      descriptionEn:
        "Web-based QR Code F&B ordering system for cafe automation. Customers scan table QR codes to order, while orders are received in real-time on the kitchen/cashier admin dashboard.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "API Route"],
      features: ["Menu Digital QR Code", "Halaman Order Pelanggan", "Dashboard Admin & Kasir", "Manajemen Status Pesanan", "CRUD Menu & Kategori"],
      featuresEn: ["QR Code Digital Menu", "Customer Ordering Page", "Admin & Cashier Dashboard", "Order Status Management", "Menu & Category CRUD"],
      demoUrl: "",
      githubUrl: "https://github.com/makbarzidane/Tugas-Web-CRUD_RHYZ",
      previewImage: "/portfolio/qr-ordering-cafe.png"
    },
    {
      name: "Apex Legends Sentiment Analysis",
      category: "Proyek Data Science & Machine Learning",
      categoryEn: "Data Science & Machine Learning Project",
      description:
        "Proyek analisis data dan pemrosesan bahasa alami (NLP) untuk membedah sentimen ulasan pemain game Apex Legends di Steam, menghasilkan wawasan berbasis data tentang kepuasan pemain.",
      descriptionEn:
        "Data analysis and Natural Language Processing (NLP) project analyzing Apex Legends player reviews on Steam, delivering data-driven insights into player satisfaction.",
      stack: ["Python", "Pandas", "Naive Bayes", "Data Cleaning", "Sentiment Analysis"],
      features: ["Pengumpulan Dataset Steam", "Preprocessing & Cleaning Teks", "Klasifikasi Sentimen Naive Bayes", "Visualisasi Wawasan Bisnis", "Laporan Evaluasi Model"],
      featuresEn: ["Steam Dataset Collection", "Text Preprocessing & Cleaning", "Naive Bayes Sentiment Classification", "Business Insight Visualization", "Model Evaluation Report"],
      demoUrl: "",
      githubUrl: "https://github.com/makbarzidane/analisis_sentimen_revew_apex_legends_dashboard",
      previewImage: "/portfolio/apex-sentiment.png"
    }
  ],
  agents: [
    {
      name: "Sales Agent",
      nameEn: "Sales Agent",
      description: "Membantu menyusun angle penjualan, benefit layanan, dan arah komunikasi untuk calon client.",
      descriptionEn: "Helps structure sales angles, service benefits, and communication direction for potential clients.",
      output: "Script sales, value proposition, dan poin follow-up."
      ,outputEn: "Sales script, value proposition, and follow-up points."
    },
    {
      name: "Agen Brief",
      nameEn: "Brief Agent",
      description: "Mengubah kebutuhan mentah client menjadi brief project yang lebih jelas dan siap dikerjakan.",
      descriptionEn: "Turns raw client needs into a clearer project brief that is ready to execute.",
      output: "Ringkasan kebutuhan, target user, fitur, dan scope."
      ,outputEn: "Needs summary, target users, features, and scope."
    },
    {
      name: "Agen Penawaran/Proposal",
      nameEn: "Offer/Proposal Agent",
      description: "Menyusun penawaran layanan yang rapi berdasarkan kebutuhan, scope, dan paket pekerjaan.",
      descriptionEn: "Creates a structured service offer based on needs, scope, and work packages.",
      output: "Draft penawaran, estimasi pekerjaan, dan struktur paket."
      ,outputEn: "Offer draft, work estimate, and package structure."
    },
    {
      name: "Proposal Resmi",
      nameEn: "Formal Proposal",
      description: "Membuat proposal formal untuk kebutuhan presentasi ke client atau pihak bisnis.",
      descriptionEn: "Creates formal proposals for client or business presentations.",
      output: "Dokumen proposal siap rapikan."
      ,outputEn: "Proposal document ready for refinement."
    },
    {
      name: "Presentasi PPTX",
      nameEn: "PPTX Presentation",
      description: "Membantu menyusun struktur slide presentasi untuk menjelaskan solusi, timeline, dan harga.",
      descriptionEn: "Helps structure presentation slides to explain solution, timeline, and pricing.",
      output: "Outline slide dan narasi presentasi."
      ,outputEn: "Slide outline and presentation narrative."
    },
    {
      name: "Agen Caption",
      nameEn: "Caption Agent",
      description: "Membuat caption promosi untuk social media, produk, jasa, dan campaign UMKM.",
      descriptionEn: "Creates promotional captions for social media, products, services, and SME campaigns.",
      output: "Caption, hook, CTA, dan variasi gaya bahasa."
      ,outputEn: "Captions, hooks, CTAs, and tone variations."
    },
    {
      name: "Agen Checklist",
      nameEn: "Checklist Agent",
      description: "Membuat checklist eksekusi agar project, konten, atau campaign tidak melewatkan hal penting.",
      descriptionEn: "Creates execution checklists so projects, content, or campaigns do not miss important steps.",
      output: "Checklist tahap kerja dan prioritas."
      ,outputEn: "Workflow checklist and priorities."
    },
    {
      name: "Agen Prompt Codex / Catatan Teknis",
      nameEn: "Codex Prompt / Technical Notes Agent",
      description: "Menyusun prompt teknis dan catatan implementasi untuk mempercepat kerja dengan AI coding agent.",
      descriptionEn: "Creates technical prompts and implementation notes to speed up work with AI coding agents.",
      output: "Prompt Codex, struktur task, dan catatan teknis."
      ,outputEn: "Codex prompts, task structure, and technical notes."
    },
    {
      name: "Agen Reviewer",
      nameEn: "Reviewer Agent",
      description: "Mengecek ulang hasil brief, proposal, caption, atau prompt agar lebih rapi dan konsisten.",
      descriptionEn: "Reviews briefs, proposals, captions, or prompts to make them cleaner and more consistent.",
      output: "Review, revisi, dan rekomendasi perbaikan."
      ,outputEn: "Review, revisions, and improvement recommendations."
    }
  ]
};
