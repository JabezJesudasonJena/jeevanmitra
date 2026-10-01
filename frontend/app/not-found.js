/*
 * app/not-found.js — 404 page for JeevanMitra
 * Feature: Error boundary / fallback
 * Dependencies: components/Navbar, Footer, next/link
 */
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <p className="text-7xl font-extrabold text-brand-primary mb-4">404</p>
          <h1 className="text-2xl font-extrabold text-brand-text mb-3">Page Not Found</h1>
          <p className="text-sm text-brand-subtext mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back to a working page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold bg-brand-primary text-white text-sm hover:bg-brand-hover transition-colors cursor-pointer">
                Go Home
              </button>
            </Link>
            <Link href="/schemes">
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold border-2 border-brand-subtle text-brand-text text-sm hover:bg-white transition-colors cursor-pointer">
                Browse Schemes
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
