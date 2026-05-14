"use client";

import { useState, useEffect } from "react";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useLanguage } from "@/lib/i18n";
import { MessageSquare, Send, User } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  alias?: string;
  createdAt: Timestamp;
}

interface CommentSectionProps {
  storyId: string;
}

export default function CommentSection({ storyId }: CommentSectionProps) {
  const { t, language } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [alias, setAlias] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!storyId) return;

    const path = `stories/${storyId}/comments`;
    const q = query(collection(db, path), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        setComments(docs);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      },
    );

    return () => unsubscribe();
  }, [storyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    const path = `stories/${storyId}/comments`;
    try {
      await addDoc(collection(db, path), {
        content: newComment.trim(),
        alias: alias.trim() || null,
        createdAt: serverTimestamp(),
      });
      setNewComment("");
      setAlias("");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-bold text-text-dim hover:text-brand transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        <span>
          {comments.length} {t.stories.comments.title}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.stories.alias}
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="flex-1 px-4 py-2 bg-bg-surface border border-border-main rounded-xl text-xs outline-none focus:border-brand-accent transition-colors"
                maxLength={50}
              />
            </div>
            <div className="flex gap-2">
              <textarea
                placeholder={t.stories.comments.placeholder}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
                className="flex-1 px-4 py-2 bg-bg-surface border border-border-main rounded-xl text-sm outline-none focus:border-brand transition-colors resize-none h-20"
                maxLength={1000}
              />
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="self-end p-3 bg-brand text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-bg-surface rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-text-dim opacity-50" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-text-main">
                      {comment.alias || t.stories.comments.anonymous}
                    </span>
                    <span className="text-[9px] font-mono text-text-dim uppercase">
                      {comment.createdAt?.toDate
                        ? formatDistanceToNow(comment.createdAt.toDate(), {
                            addSuffix: true,
                            locale: language === "zh" ? zhCN : undefined,
                          })
                        : "..."}
                    </span>
                  </div>
                  <p className="text-xs text-text-main opacity-80 leading-relaxed bg-bg-surface p-3 rounded-2xl rounded-tl-none">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
