/*
 * app/privacy/page.js — Privacy Policy placeholder
 * Feature: Info pages (footer links)
 * Future: replace with full legal privacy policy content
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — JeevanMitra",
  description: "JeevanMitra's privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center">
              <Lock size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-text">Privacy Policy</h1>
          </div>

          <div className="bg-white rounded-2xl border border-brand-subtle p-6 sm:p-8 space-y-5 text-sm text-brand-subtext leading-relaxed">
            <p>Last updated: October 2026</p>

            <section>
              <h2 className="text-base font-bold text-brand-text mb-2">What data we collect</h2>
              <p>
                In this prototype, all user inputs (occupation, age, income, state) are stored exclusively in your
                browser's <code>localStorage</code>. Nothing is transmitted to any external server.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brand-text mb-2">Document uploads</h2>
              <p>
                Documents uploaded to the verification demo are processed entirely client-side. No file content
                leaves your device. When a real verification API is integrated, files will be transmitted over
                HTTPS and deleted immediately after processing.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brand-text mb-2">Cookies</h2>
              <p>We do not use tracking cookies or third-party analytics in this prototype.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brand-text mb-2">Contact</h2>
              <p>For privacy questions, visit our <a href="/contact" className="text-brand-primary hover:underline">Contact page</a>.</p>
            </section>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800">
              <strong>Note:</strong> This is a placeholder privacy policy for a demo prototype. It is not a legally
              binding document.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
