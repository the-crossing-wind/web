"use client";

import { useState, useEffect } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { Heart, LogIn, LogOut, Globe, Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/ThemeContext";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    const currentIndex = availableLanguages.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    setLanguage(availableLanguages[nextIndex].code);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      // Gracefully handle case where user closes the popup
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        return;
      }
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-bg-base/80 backdrop-blur-md border-b border-border-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
            <Heart className="text-white w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-xl font-serif font-bold tracking-tight text-text-main leading-none truncate pr-2">
              The Passing Wind
            </span>
            <span className="hidden sm:block text-xs font-serif italic text-text-dim">渡风</span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-text-main">
          <Link
            href="#stories"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-brand transition-colors"
          >
            {t.nav.stories}
          </Link>
          <Link
            href="#resources"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-brand transition-colors"
          >
            {t.nav.resources}
          </Link>
          <Link
            href="#allies"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-brand transition-colors"
          >
            {t.nav.allies}
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-border-main rounded-full text-text-main hover:bg-bg-surface transition-all"
            aria-label={t.common.toggleTheme}
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-border-main rounded-full text-[10px] font-black uppercase tracking-widest text-text-main hover:bg-bg-surface transition-all"
          >
            <Globe className="w-3 h-3" />
            {availableLanguages.find((l) => l.code !== language)?.label || "LANG"}
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-3 sm:gap-4">
              <span className="text-xs font-mono text-text-dim hidden xl:block">
                {user.email === "idadwind@gmail.com"
                  ? "ADMIN"
                  : user.email?.split("@")[0].toUpperCase()}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border border-border-main text-text-main rounded-full hover:bg-bg-surface transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t.nav.signOut}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="hidden sm:flex items-center gap-2 px-3 sm:px-6 py-2 bg-text-main text-bg-base rounded-full text-[10px] sm:text-sm font-medium hover:opacity-90 transition-all shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.nav.signIn}</span>
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-border-main rounded-full text-text-main hover:bg-bg-surface transition-all"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 sm:top-20 left-0 w-full bg-bg-base border-b border-border-main p-6 space-y-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-text-main">
            <Link
              href="#stories"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-brand transition-colors flex items-center justify-between"
            >
              {t.nav.stories}
              <Heart className="w-4 h-4 text-brand" />
            </Link>
            <Link
              href="#resources"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-brand transition-colors"
            >
              {t.nav.resources}
            </Link>
            <Link
              href="#allies"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-brand transition-colors"
            >
              {t.nav.allies}
            </Link>
          </div>
          <div className="pt-6 border-t border-border-main flex flex-col gap-4">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-4 border border-border-main rounded-full text-sm font-bold text-text-main hover:bg-bg-surface transition-all"
              >
                <LogOut className="w-5 h-5" />
                {t.nav.signOut}
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-4 bg-text-main text-bg-base rounded-full text-sm font-bold shadow-lg"
              >
                <LogIn className="w-5 h-5" />
                {t.nav.signIn}
              </button>
            )}

            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-4 border border-border-main rounded-full text-xs font-black uppercase tracking-widest text-text-main"
            >
              <Globe className="w-4 h-4" />
              {availableLanguages.find((l) => l.code === language)?.label} →{" "}
              {availableLanguages.find((l) => l.code !== language)?.label}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
