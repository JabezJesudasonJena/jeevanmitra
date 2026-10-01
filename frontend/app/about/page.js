/*
 * app/about/page.js — About JeevanMitra placeholder page
 * Feature: Info pages (footer links)
 * Future: replace with full team/mission content
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Info } from "lucide-react";

export const metadata = {
  title: "About — JeevanMitra",
  description: "Learn about JeevanMitra's mission to connect India's unorganised workers with government welfare schemes.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center">
              <Info size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-text">About JeevanMitra</h1>
          </div>

          <div className="bg-white rounded-2xl border border-brand-subtle p-6 sm:p-8 prose prose-sm max-w-none text-brand-text">
            <p className="text-brand-subtext leading-relaxed mb-4">
              <strong className="text-brand-text">JeevanMitra</strong> is a citizen-assistance platform built to help
              India's unorganised workforce — delivery workers, drivers, construction labourers, domestic helpers,
              street vendors, and daily wage earners — discover, understand, and access government welfare schemes.
            </p>
            <p className="text-brand-subtext leading-relaxed mb-4">
              We simplify the discovery process: tell us your occupation, age, income, and state, and we surface
              every scheme you may be entitled to — along with what you need to apply.
            </p>
            <p className="text-brand-subtext leading-relaxed mb-4">
              JeevanMitra is <strong className="text-brand-text">not affiliated with or endorsed by</strong> any
              government ministry or department. It is an independent demonstration project.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mt-6">
              <strong>Demo Prototype:</strong> This application is a prototype. No real eligibility determination,
              document verification, or scheme application is processed through this platform.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
