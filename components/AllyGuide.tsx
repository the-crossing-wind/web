"use client";

import { CheckCircle2, ChevronRight, Info } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";

export default function AllyGuide() {
  const { t } = useLanguage();
  return (
    <section id="allies" className="py-24 bg-bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="relative md:sticky top-0 md:top-32 md:w-1/3">
            <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
              <Info className="text-white w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 leading-tight text-text-main">
              {t.allies.title} <br />
              <span className="text-brand-accent italic">{t.allies.titleAccent}</span>
            </h2>
            <p className="text-text-dim text-base sm:text-lg leading-relaxed">
              {t.allies.description}
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 gap-4">
            {t.allies.guidelines.map((guide: any, i: number) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-bg-base p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-border-main group"
              >
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-serif text-brand-accent/20 group-hover:text-brand-accent transition-colors">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-text-main">
                      {guide.title}
                      <CheckCircle2 className="w-4 h-4 text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-text-dim leading-relaxed font-serif text-lg italic">
                      &quot;{guide.content}&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-8 p-8 bg-bg-base text-text-main rounded-3xl relative overflow-hidden group shadow-2xl border border-border-main">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">{t.allies.readyTitle}</h4>
                <p className="text-text-dim mb-6">{t.allies.readyDesc}</p>
                <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest bg-brand-accent px-6 py-3 rounded-full hover:opacity-90 transition-all text-white">
                  <span>{t.allies.readyBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
