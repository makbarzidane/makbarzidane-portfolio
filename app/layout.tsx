import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "M. Akbar Zidane - Portfolio",
  description:
    "Portfolio M. Akbar Zidane untuk layanan website, sistem digital, e-commerce, QR ordering, dan AI agent workflow untuk UMKM.",
  keywords: ["M. Akbar Zidane", "Web Developer", "Full Stack Developer", "AI Agent", "UMKM", "Next.js"]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
