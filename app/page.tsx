"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StoryFeed from "@/components/StoryFeed";
import ResourceSection from "@/components/ResourceSection";
import AllyGuide from "@/components/AllyGuide";
import { Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <StoryFeed maxStories={5} showComments={false} truncate={true} interactive={true} />
      <ResourceSection />
      <AllyGuide />

      {/* Footer */}
      <footer className="py-20 bg-bg-base border-t border-border-main">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center mb-8 shadow-xl">
            <Heart className="text-white w-6 h-6 fill-current" />
          </div>
          <div className="flex flex-col mb-4">
            <h3 className="text-2xl font-serif font-bold leading-none text-text-main">
              The Passing Wind
            </h3>
            <span className="text-sm font-serif italic text-text-dim">渡风</span>
          </div>
          <p className="text-text-dim max-w-md mb-8 leading-relaxed italic text-lg opacity-60">
            {t.footer.quote}
          </p>
          <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-text-main">
            <a href="#" className="hover:text-brand transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              {t.footer.contact}
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              {t.footer.emergency}
            </a>
          </div>
          <p className="mt-12 text-[10px] font-mono text-text-dim uppercase">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </main>
  );
}
