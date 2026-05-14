"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  serverTimestamp,
  addDoc,
  doc,
  getDocFromServer,
  where,
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Quote,
  User as UserIcon,
  Send,
  Sparkles,
  AlertCircle,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useLanguage } from "@/lib/i18n";
import CommentSection from "./CommentSection";
import Link from "next/link";

interface Story {
  id: string;
  content: string;
  alias?: string;
  category: "Experience" | "Encouragement" | "Observation";
  createdAt: any;
}

export default function StoryFeed({
  maxStories,
  showComments = true,
  truncate = false,
  interactive = false,
}: {
  maxStories?: number;
  showComments?: boolean;
  truncate?: boolean;
  interactive?: boolean;
}) {
  const { t, language } = useLanguage();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newStory, setNewStory] = useState<{
    content: string;
    alias: string;
    category: "Experience" | "Encouragement" | "Observation";
  }>({ content: "", alias: "", category: "Experience" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "stories"),
      where("isApproved", "==", true),
      orderBy("createdAt", "desc"),
      limit(maxStories || 50),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Story[];
        setStories(docs);
        setLoading(false);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, "stories");
      },
    );

    return () => unsubscribe();
  }, [maxStories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.content.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, "stories"), {
        ...newStory,
        createdAt: serverTimestamp(),
        isApproved: false,
      });
      setNewStory({ content: "", alias: "", category: "Experience" });
      setShowForm(false);
    } catch (err) {
      setError(t.common.submitError);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStoryContent = (content: string, id: string) => {
    const isLong = content.length > 300;
    if (truncate && isLong) {
      return (
        <>
          &quot;{content.substring(0, 300)}...&quot;
          <Link
            href={`/stories/${id}`}
            className="block mt-4 text-sm font-bold text-brand hover:underline"
          >
            {t.stories.readFull} →
          </Link>
        </>
      );
    }
    return `"${content}"`;
  };

  return (
    <section id="stories" className="py-24 max-w-5xl mx-auto px-6">
      {!maxStories && (
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-dim hover:text-brand transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.stories.backToHome}
          </Link>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-widest mb-4">
            <Quote className="w-4 h-4 fill-current" />
            <span>{t.stories.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-main">
            {t.stories.title} <span className="italic text-text-dim">{t.stories.titleAccent}</span>
          </h2>
          <p className="mt-4 text-text-dim max-w-xl text-base sm:text-lg">
            {t.stories.description}
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-3 px-8 py-4 bg-brand text-bg-base rounded-2xl font-bold shadow-xl hover:opacity-90 hover:-translate-y-1 transition-all active:translate-y-0"
        >
          <MessageSquare className="w-5 h-5" />
          <span>{showForm ? t.stories.cancelBtn : t.stories.shareBtn}</span>
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-16 overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-bg-base border-2 border-text-main rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(26,26,26,0.05)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-text-dim mb-2">
                    {t.stories.category}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(["Experience", "Encouragement", "Observation"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewStory({ ...newStory, category: cat })}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          newStory.category === cat
                            ? "bg-text-main text-bg-base border-text-main"
                            : "bg-bg-base text-text-dim border-border-main hover:border-text-main"
                        }`}
                      >
                        {t.stories.categories[cat]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-text-dim mb-2">
                    {t.stories.alias}
                  </label>
                  <input
                    type="text"
                    value={newStory.alias}
                    onChange={(e) => setNewStory({ ...newStory, alias: e.target.value })}
                    placeholder={t.stories.placeholderAlias}
                    className="w-full px-4 py-2 rounded-xl border border-border-main bg-transparent focus:border-brand transition-colors outline-none font-medium text-text-main"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-mono uppercase tracking-widest text-text-dim mb-2">
                  {t.stories.formLabelContent}
                </label>
                <textarea
                  required
                  value={newStory.content}
                  onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                  placeholder={t.stories.placeholderContent}
                  className="w-full h-48 px-4 py-4 rounded-2xl border border-border-main bg-transparent focus:border-brand transition-colors outline-none font-serif text-lg resize-none text-text-main"
                  maxLength={5000}
                />
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-text-dim">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.stories.anonymousNote}</span>
                </div>
                <button
                  disabled={submitting}
                  type="submit"
                  className={`flex items-center gap-2 px-8 py-3 bg-text-main text-bg-base rounded-xl font-bold shadow-md hover:opacity-90 transition-all disabled:opacity-50`}
                >
                  {submitting ? (
                    t.stories.submittingBtn
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {t.stories.submitBtn}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-8">
        {loading ? (
          <div className="flex flex-col gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-bg-surface rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : stories.length > 0 ? (
          stories.map((story) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-bg-base border border-border-main rounded-3xl p-8 transition-all group ${
                interactive ? "hover:border-brand/30 hover:shadow-xl cursor-default" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bg-surface rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-text-dim opacity-50" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text-main">
                      {story.alias || t.common.anonymousAgent}
                    </h3>
                    <p className="text-[10px] font-mono text-text-dim uppercase tracking-tighter">
                      {story.createdAt?.toDate
                        ? formatDistanceToNow(story.createdAt.toDate(), {
                            addSuffix: true,
                            locale: language === "zh" ? zhCN : undefined,
                          })
                        : t.common.justNow}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-bg-surface rounded-full text-[10px] font-black uppercase tracking-tighter text-text-dim">
                  {t.stories.categories[story.category]}
                </span>
              </div>

              <div className="font-serif text-xl leading-relaxed text-text-main opacity-80 whitespace-pre-wrap italic">
                {renderStoryContent(story.content, story.id)}
              </div>

              {showComments && <CommentSection storyId={story.id} />}

              <div className="mt-8 pt-6 border-t border-border-main flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-xs font-bold text-text-dim hover:text-brand transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{t.stories.witnessed}</span>
                  </button>
                  <span className="w-1 h-1 bg-border-main rounded-full"></span>
                  <p className="text-[10px] font-mono text-text-dim uppercase">
                    {t.stories.securityNote}
                  </p>
                </div>
                {interactive && (
                  <Link
                    href={`/stories/${story.id}`}
                    className="text-xs font-bold text-brand hover:underline"
                  >
                    {t.stories.viewDetails} →
                  </Link>
                )}
              </div>
            </motion.article>
          ))
        ) : (
          <div className="text-center py-20 bg-bg-surface rounded-3xl border-2 border-dashed border-border-main">
            <p className="text-text-dim font-serif italic text-lg">{t.stories.noStories}</p>
          </div>
        )}

        {maxStories && stories.length >= maxStories && (
          <div className="mt-16 text-center">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-text-main text-text-main rounded-xl font-bold hover:bg-text-main hover:text-bg-base transition-all"
            >
              {t.stories.viewAll}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
