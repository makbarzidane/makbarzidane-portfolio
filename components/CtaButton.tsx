import Link from "next/link";
import type { ReactNode } from "react";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
}

const variants = {
  primary: "bg-cyan-300 text-slate-950 shadow-glow hover:bg-cyan-200",
  secondary: "border border-white/14 bg-white/8 text-white hover:border-cyan-300/60 hover:bg-cyan-300/10",
  ghost: "text-slate-200 hover:text-cyan-200"
};

export function CtaButton({ href, children, variant = "primary", icon }: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${variants[variant]}`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
