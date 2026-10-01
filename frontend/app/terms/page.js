/*
 * app/terms/page.js — Terms of Use placeholder
 * Feature: Info pages (footer links)
 * Future: replace with legally reviewed terms of use
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Use — JeevanMitra",
  description: "Terms and conditions for using the JeevanMitra platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center">
              <FileText size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-text">Terms of Use</h1>
          </div>

          <div className="bg-white rounded-2xl border border-brand-subtle p-6 sm:p-8 space-y-5 text-sm text-brand-subtext leading-relaxed">
            <p>Last updated: October 2026</p>

            <section>
              <h2 className="text-base font-bold text-brand-text mb-2">1. Nature of the Platform</h2>
              <p>
                JeevanMitra is a <strong className="text-brand-text">demonstration prototype</strong>. It is not
                an official government service and does not guarantee access to any government scheme or benefit.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brand-text mb-2">2. No Official Affiliation</h2>
              <p>
                JeevanMitra is not affiliated with, endorsed by, or connected to any government ministry,
                department, or the e-Shram portal. Always use official government portals for registrations.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brand-text mb-2">3. Accuracy of Information</h2>
              <p>
                Scheme information is provided for informational purposes only. Eligibility criteria, benefit
                amounts, and programme details may change. Verify with official government sources before applying.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brand-text mb-2">4. No Fees</h2>
              <p>
                JeevanMitra is completely free. We do not charge fees for any service. If anyone claiming to
                represent JeevanMitra asks for payment, do not pay.
              </p>
            </section>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800">
              <strong>Note:</strong> This is a placeholder terms document for a demo prototype.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
