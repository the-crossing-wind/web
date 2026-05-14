"use client";

import Navbar from "@/components/Navbar";
import StoryFeed from "@/components/StoryFeed";
import { useLanguage } from "@/lib/i18n";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function StoriesArchive() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      {/* Mini Hero */}
      <div className="pt-32 pb-12 border-b border-border-main bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-dim hover:text-brand transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.stories.backToHome}
          </Link>
          <h1 className="text-5xl md:text-7xl font-serif text-text-main mb-4">
            {t.stories.archiveTitle}{" "}
            <span className="text-brand italic">{t.stories.archiveTitleAccent}</span>
          </h1>
          <p className="text-text-dim max-w-2xl font-serif text-xl italic">
            {t.stories.archiveSubtitle}
          </p>
        </div>
      </div>

      <StoryFeed showComments={true} interactive={true} />

      {/* Footer-like closer */}
      <div className="mt-20 flex flex-col items-center text-center px-6">
        <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center mb-8 shadow-xl">
          <Heart className="text-white w-6 h-6 fill-current" />
        </div>
        <p className="text-text-dim max-w-md mb-8 leading-relaxed italic text-lg opacity-60">
          {t.footer.quote}
        </p>
      </div>
    </main>
  );
}
