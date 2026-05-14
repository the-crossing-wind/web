"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { formatDistanceToNow } from "date-fns";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "idadwind@gmail.com";

interface Story {
  id: string;
  content: string;
  alias?: string;
  category: string;
  createdAt: any;
  isApproved: boolean;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [stories, setStories] = useState<Story[]>([]);
  const [tab, setTab] = useState<"pending" | "approved">("pending");
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  useEffect(() => {
    if (user === undefined) return;
    if (!user || user.email !== ADMIN_EMAIL) return;

    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setStories(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Story));
    });
  }, [user]);

  if (user === undefined) return null;

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-40 text-center">
          <p className="text-2xl font-serif text-text-main">Access Denied</p>
        </div>
      </main>
    );
  }

  const pending = stories.filter((s) => !s.isApproved);
  const approved = stories.filter((s) => s.isApproved);
  const displayed = tab === "pending" ? pending : approved;

  const approve = (id: string) => updateDoc(doc(db, "stories", id), { isApproved: true });
  const remove = (id: string) => deleteDoc(doc(db, "stories", id));

  return (
    <main className="min-h-screen pb-20">
      <Navbar />
      <div className="pt-32 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif text-text-main mb-8">Admin Panel</h1>

        <div className="flex gap-4 mb-10">
          {(["pending", "approved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
                tab === t
                  ? "bg-text-main text-bg-base border-text-main"
                  : "bg-bg-base text-text-dim border-border-main hover:border-text-main"
              }`}
            >
              {t === "pending" ? `Pending (${pending.length})` : `Approved (${approved.length})`}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {displayed.length === 0 ? (
            <div className="text-center py-20 bg-bg-surface rounded-3xl border-2 border-dashed border-border-main">
              <p className="text-text-dim font-serif italic">No stories here.</p>
            </div>
          ) : (
            displayed.map((story) => (
              <article
                key={story.id}
                className="bg-bg-base border border-border-main rounded-3xl p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-sm text-text-main">{story.alias || "Anonymous"}</p>
                    <p className="text-[10px] font-mono text-text-dim uppercase tracking-tighter">
                      {story.createdAt?.toDate
                        ? formatDistanceToNow(story.createdAt.toDate(), { addSuffix: true })
                        : "just now"}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-bg-surface rounded-full text-[10px] font-black uppercase tracking-tighter text-text-dim">
                    {story.category}
                  </span>
                </div>

                <p className="font-serif text-lg leading-relaxed text-text-main opacity-80 italic mb-6 whitespace-pre-wrap">
                  &quot;
                  {story.content.length > 300 ? story.content.slice(0, 300) + "..." : story.content}
                  &quot;
                </p>

                <div className="flex gap-3">
                  {!story.isApproved && (
                    <button
                      onClick={() => approve(story.id)}
                      className="px-5 py-2 bg-brand text-bg-base rounded-xl text-sm font-bold hover:opacity-90 transition-all"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => remove(story.id)}
                    className="px-5 py-2 bg-bg-surface text-red-500 border border-red-200 rounded-xl text-sm font-bold hover:bg-red-50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
