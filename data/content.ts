import {
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Coffee,
  Database,
  Globe2,
  Home,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Rocket,
  Server,
  ShoppingBag,
  Sparkles,
  Store,
  TerminalSquare,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Project {
  name: string;
  category: string;
  description: string;
  stack: string[];
  features: string[];
  demoUrl: string;
  githubUrl: string;
  icon: LucideIcon;
}

export interface AiProject {
  name: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Data Diri", href: "#tentang" },
  { label: "AI Agent", href: "#ai-project" },
  { label: "Kontak", href: "#kontak" }
];

export const techGroups = [
  {
    title: "Frontend",
    icon: Code2,
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"]
  },
  {
    title: "Backend",
    icon: Server,
    items: ["PHP", "CodeIgniter 4", "Node.js", "API Integration"]
  },
  {
    title: "Database",
    icon: Database,
    items: ["MySQL", "Firebase Firestore", "SQLite"]
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["GitHub", "Vercel", "cPanel", "XAMPP", "VS Code", "Codex / AI Coding Agent"]
  },
  {
    title: "Data & AI",
    icon: BrainCircuit,
    items: ["Python", "Pandas", "Naive Bayes", "Sentiment Analysis", "AI Agent Workflow", "Automation System"]
  }
];

export const projects: Project[] = [
  {
    name: "2Z Reklame & Cutting Sticker Company Profile",
    category: "Company Profile Website",
    description:
      "Website company profile untuk usaha reklame dan cutting sticker di Pagar Alam. Website ini menampilkan profil usaha, layanan, portfolio, galeri, kontak WhatsApp, dan panel admin untuk mengelola konten.",
    stack: ["CodeIgniter 4", "PHP", "MySQL", "Bootstrap", "JavaScript", "cPanel"],
    features: [
      "Landing page company profile",
      "CRUD layanan",
      "CRUD portfolio",
      "CRUD galeri",
      "Slider hero dinamis",
      "Admin dashboard",
      "Kontak WhatsApp",
      "Deployment cPanel"
    ],
    demoUrl: "#",
    githubUrl: "#",
    icon: BriefcaseBusiness
  },
  {
    name: "Zimeira Tech Website",
    category: "Service Landing Page",
    description:
      "Website landing page untuk menampilkan layanan digital seperti pembuatan website, sistem bisnis, dan solusi IT untuk UMKM.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    features: ["Landing page jasa", "Section layanan", "CTA WhatsApp", "Portfolio preview", "Responsive design"],
    demoUrl: "#",
    githubUrl: "#",
    icon: Globe2
  },
  {
    name: "E-Commerce Hijab Website",
    category: "E-Commerce Website",
    description:
      "Website e-commerce bertema hijab untuk menampilkan produk, kategori, harga, keranjang, checkout, dan fitur pendukung toko online.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "GitHub", "Vercel"],
    features: [
      "Product catalog",
      "Product detail",
      "Cart",
      "Checkout flow",
      "Payment integration planned",
      "Ongkir integration planned",
      "Responsive e-commerce UI"
    ],
    demoUrl: "#",
    githubUrl: "#",
    icon: ShoppingBag
  },
  {
    name: "Besemah Coffee",
    category: "UMKM Coffee Website",
    description:
      "Website demo untuk brand kopi lokal Pagar Alam yang membantu UMKM kopi terlihat lebih profesional dan mudah menerima pemesanan.",
    stack: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vercel"],
    features: ["Landing page kopi", "Menu produk", "Paket promo", "CTA WhatsApp order", "Galeri produk", "Desain UMKM profesional"],
    demoUrl: "#",
    githubUrl: "#",
    icon: Coffee
  },
  {
    name: "Homestay Bukit Dempo",
    category: "Homestay Landing Page",
    description:
      "Website landing page untuk homestay yang menampilkan informasi penginapan, fasilitas, galeri, lokasi, dan pemesanan melalui WhatsApp.",
    stack: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vercel"],
    features: ["Informasi homestay", "Galeri kamar", "Fasilitas", "CTA booking WhatsApp", "Lokasi", "Responsive layout"],
    demoUrl: "#",
    githubUrl: "#",
    icon: Home
  },
  {
    name: "QR Ordering System Cafe",
    category: "Cafe Ordering System",
    description:
      "Sistem pemesanan makanan dan minuman berbasis QR Code untuk cafe. Pelanggan dapat scan QR dari meja, melihat menu, melakukan pemesanan, dan pesanan masuk ke dashboard admin.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "API Route", "Local Network Testing"],
    features: [
      "QR menu",
      "Customer ordering page",
      "Admin order dashboard",
      "Menu management",
      "Order status",
      "Payment integration planned",
      "Cocok untuk cafe dan restoran"
    ],
    demoUrl: "#",
    githubUrl: "#",
    icon: LayoutDashboard
  },
  {
    name: "Apex Legends Sentiment Analysis",
    category: "Data Analyst / AI Project",
    description:
      "Project analisis sentimen review game Apex Legends dari platform Steam menggunakan pendekatan machine learning untuk mengetahui opini positif dan negatif dari pemain.",
    stack: ["Python", "Pandas", "Naive Bayes", "Data Cleaning", "Sentiment Analysis"],
    features: ["Dataset review Steam", "Preprocessing text", "Klasifikasi sentimen", "Insight bisnis", "Visualisasi hasil analisis"],
    demoUrl: "#",
    githubUrl: "#",
    icon: LineChart
  }
];

export const aiProjects: AiProject[] = [
  {
    name: "Zimeira Agent Online",
    description:
      "Konsep AI agent bisnis yang dirancang untuk membantu proses kerja seperti pembuatan konten, caption promosi, pencarian ide produk, workflow affiliate, dan otomatisasi pekerjaan digital.",
    features: [
      "AI business assistant",
      "Content idea generator",
      "Caption generator",
      "Product research workflow",
      "Social media workflow",
      "Automation planning"
    ],
    icon: Bot
  },
  {
    name: "Shopee Affiliate AI Workflow",
    description:
      "Workflow AI agent untuk membantu affiliator mencari produk, membuat konsep video, membuat caption, dan menyiapkan konten promosi agar proses affiliate lebih efisien.",
    features: ["Product research", "Video idea generation", "Caption generation", "Affiliate content workflow", "Social media distribution planning"],
    icon: Sparkles
  },
  {
    name: "AI Website Builder Workflow",
    description:
      "Workflow penggunaan AI coding agent seperti Codex untuk membantu membuat website dari tahap ide, struktur halaman, desain UI, komponen frontend, backend, database, hingga deployment.",
    features: ["Prompt engineering", "Project planning", "UI generation", "Code generation", "Debugging assistance", "Deployment support"],
    icon: TerminalSquare
  }
];

export const services: Service[] = [
  { title: "Website Company Profile", description: "Profil bisnis profesional untuk menampilkan layanan, galeri, kontak, dan kredibilitas usaha.", icon: BriefcaseBusiness },
  { title: "Landing Page Bisnis", description: "Halaman promosi ringkas dengan CTA kuat untuk campaign, jasa, produk, atau brand personal.", icon: Rocket },
  { title: "Website UMKM", description: "Website cepat dan rapi untuk cafe, toko, jasa lokal, homestay, dan bisnis kecil-menengah.", icon: Store },
  { title: "Website Cafe / Restaurant QR Menu", description: "Menu digital dan sistem order berbasis QR yang dapat dikembangkan dengan dashboard admin.", icon: Coffee },
  { title: "Website Homestay", description: "Landing page penginapan lengkap dengan fasilitas, galeri, lokasi, dan CTA booking WhatsApp.", icon: Home },
  { title: "E-Commerce Website", description: "Katalog produk, detail produk, keranjang, checkout, dan fondasi integrasi pembayaran.", icon: ShoppingBag },
  { title: "Sistem Admin Dashboard", description: "Panel admin custom untuk mengelola konten, layanan, portfolio, pesanan, atau data bisnis.", icon: LayoutDashboard },
  { title: "AI Agent Workflow", description: "Rancangan workflow AI untuk mempercepat riset, konten, ide produk, dan pekerjaan digital.", icon: Bot },
  { title: "Automation System untuk Bisnis", description: "Otomatisasi proses sederhana agar aktivitas operasional lebih cepat dan konsisten.", icon: BrainCircuit }
];

export const whyChooseMe = [
  "Desain modern dan responsive",
  "Bisa custom sesuai kebutuhan bisnis",
  "Cocok untuk UMKM dan bisnis lokal",
  "Bisa integrasi WhatsApp",
  "Bisa dibuat dengan admin panel",
  "Bisa dibantu sampai deploy",
  "Bisa dikembangkan menjadi sistem lebih lengkap",
  "Mengikuti perkembangan AI dan automation"
];

export const contacts = {
  whatsapp: "https://wa.me/628xxxxxxxxxx",
  github: "https://github.com/makbarzidane",
  email: "mailto:akbarzidane12@gmail.com",
  instagram: "#"
};

export const serviceStack = ["Web Development", "AI Agent", "Business Automation", "UMKM Digital Solution"];
