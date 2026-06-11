"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Code2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/useLanguage";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#020617]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.8, repeat: 1, ease: "easeInOut" }}
          />

          <motion.div
            className="relative w-[min(92vw,620px)] rounded-2xl border border-white/12 bg-slate-950/72 p-5 shadow-glow backdrop-blur-xl"
            initial={{ y: 22, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -18, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Bot size={15} />
                loading.portfolio
              </div>
            </div>

            <div className="grid gap-5 py-8 md:grid-cols-[0.7fr_1fr] md:items-center">
              <motion.div
                className="mx-auto grid h-32 w-32 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 text-center text-sm font-semibold leading-5 text-cyan-100"
                animate={{ rotate: [0, -2, 2, 0], boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 42px rgba(34,211,238,0.26)", "0 0 0 rgba(34,211,238,0)"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                M. Akbar Zidane
              </motion.div>

              <div>
                <p className="text-sm font-medium text-cyan-200">
                  {t.preloader.label}
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
                  {t.preloader.title}
                </h2>
                <div className="mt-5 grid gap-2">
                  {t.preloader.steps.map((step, index) => (
                    <motion.div
                      key={step}
                      className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-slate-300"
                      initial={{ x: -8 }}
                      animate={{ x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {index === 0 ? <Code2 size={16} className="text-cyan-200" /> : <Sparkles size={16} className="text-emerald-200" />}
                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.05, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
