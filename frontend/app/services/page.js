/*
 * app/services/page.js — Citizen Services listing page
 * Feature: Services directory for citizen-facing tools
 * Dependencies: components/Navbar, Footer, SectionHeading, ServiceCard
 *               data/services.js, lucide-react
 * Future: fetch live service catalog from API; add search/filter
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import SERVICES from "@/data/services";
import {
  FileText, CheckCircle2, ShieldCheck, Users, Sparkles, UserCircle,
} from "lucide-react";

const ICON_MAP = { FileText, CheckCircle2, ShieldCheck, Users, Sparkles, UserCircle };

export const metadata = {
  title: "Citizen Services — JeevanMitra",
  description: "Browse all citizen services available on JeevanMitra including scheme discovery, eligibility checks, document verification, and more.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Citizen Services"
            title="All services at a glance"
            subtitle="JeevanMitra brings together scheme discovery, eligibility checking, document verification, and more — designed for India's unorganised workforce."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc) => {
              const Icon = ICON_MAP[svc.iconName];
              return (
                <ServiceCard
                  key={svc.id}
                  title={svc.title}
                  description={svc.description}
                  Icon={Icon}
                  href={svc.href}
                  accent={svc.accent}
                />
              );
            })}
          </div>

          {/* Info callout */}
          <div className="mt-12 bg-white rounded-2xl border border-brand-subtle p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-brand-text mb-1">More services coming soon</h2>
              <p className="text-sm text-brand-subtext leading-relaxed">
                We are continuously expanding JeevanMitra to cover ration card applications, e-Shram
                registration guidance, MGNREGA access, and state-specific welfare portals. All services
                will remain free for every worker.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
