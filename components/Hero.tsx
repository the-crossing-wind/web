"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowDown, HeartPulse } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-brand/5 -skew-x-[20deg] translate-x-[20%] -z-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-accent/5 rounded-full -z-10 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-base border border-border-main rounded-full text-xs font-bold uppercase tracking-widest text-text-dim mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif leading-[0.9] text-text-main mb-8">
              {t.hero.title} <br />
              <span className="text-brand italic">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-lg md:text-2xl text-text-dim font-serif leading-relaxed italic max-w-xl mb-12">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#stories"
                className="flex-1 sm:flex-none text-center px-10 py-5 bg-text-main text-bg-base rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl hover:opacity-90 hover:-translate-y-1 transition-all"
              >
                {t.hero.ctaRead}
                <ArrowDown className="w-5 h-5" />
              </a>
              <a
                href="#allies"
                className="flex-1 sm:flex-none text-center px-10 py-5 bg-bg-base border-2 border-text-main text-text-main rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-bg-surface transition-all"
              >
                {t.hero.ctaLearn}
                <div className="w-6 h-6 bg-text-main flex items-center justify-center rounded-full">
                  <ArrowDown className="w-4 h-4 text-bg-base" />
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-bg-base border-2 border-text-main p-10 rounded-[4rem] shadow-[24px_24px_0px_0px_var(--color-brand)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-bg-surface rounded-full border border-border-main" />
                <div className="h-4 w-32 bg-bg-surface rounded-full" />
                <div className="ml-auto h-4 w-12 bg-brand/20 rounded-full" />
              </div>
              <div className="space-y-4 mb-10">
                <div className="h-4 w-full bg-bg-surface rounded-full opacity-50" />
                <div className="h-4 w-[90%] bg-bg-surface rounded-full opacity-50" />
                <div className="h-4 w-[95%] bg-bg-surface rounded-full opacity-50" />
                <div className="h-4 w-[40%] bg-bg-surface rounded-full opacity-50" />
              </div>
              <div className="flex items-center gap-4 py-8 border-t border-border-main">
                <div className="w-10 h-10 border-2 border-border-main rounded-full flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-text-dim" />
                </div>
                <div className="h-4 w-24 bg-bg-surface rounded-full opacity-50" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-brand rounded-full flex items-center justify-center shadow-2xl"
              >
                <Quote className="text-white w-12 h-12 fill-current" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Quote = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10 11H6.5C5.12 11 4 9.88 4 8.5V4.5C4 3.12 5.12 2 6.5 2H10.5C11.88 2 13 3.12 13 4.5V11H10ZM10 11V15C10 17.76 7.76 20 5 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 11H17.5C16.12 11 15 9.88 15 8.5V4.5C15 3.12 16.12 2 17.5 2H21.5C22.88 2 24 3.12 24 4.5V11H21ZM21 11V15C21 17.76 18.76 20 16 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
