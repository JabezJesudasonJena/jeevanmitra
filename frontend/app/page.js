/*
 * app/page.js — JeevanMitra Homepage
 * Feature: Hero, Services, Available Schemes, How It Works, Comparison, CTA
 * Dependencies: components/Navbar, Footer, SectionHeading, SchemeCard, ServiceCard
 *               data/services.js, data/schemesData.js, lucide-react
 * Future: fetch schemes from /api/schemes; add real auth check for hero CTA state
 */
"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import SchemeCard from "@/components/SchemeCard";
import ServiceCard from "@/components/ServiceCard";
import AnimatedBikeRider from "@/components/hero/AnimatedBikeRider";
import SERVICES from "@/data/services";
import SCHEMES_DATA from "@/data/schemesData";

import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Users,
  Sparkles,
  UserCircle,
  IdCard,
  PiggyBank,
  HeartPulse,
  Shield,
  Landmark,
  HelpCircle,
  ChevronRight,
  Check,
  Minus,
} from "lucide-react";

// ─── Icon map: resolves string names from data files to Lucide components ────
const ICON_MAP = {
  FileText,
  CheckCircle2,
  ShieldCheck,
  Users,
  Sparkles,
  UserCircle,
  IdCard,
  PiggyBank,
  HeartPulse,
  Shield,
  Landmark,
};

// ─── Comparison table data ────────────────────────────────────────────────────
const COMPARISON_ROWS = [
  { feature: "Scheme Discovery",         jm: true,    es: "partial", note: "" },
  { feature: "Eligibility Assistance",   jm: true,    es: false,     note: "" },
  { feature: "Document Verification",    jm: "proposed", es: false,  note: "Proposed in JeevanMitra" },
  { feature: "Unified Citizen Access",   jm: true,    es: "partial", note: "" },
  { feature: "Guided Application Help",  jm: true,    es: false,     note: "" },
  { feature: "Personalised Assistance",  jm: "proposed", es: false,  note: "Proposed in JeevanMitra" },
  { feature: "Multilingual Interface",   jm: true,    es: true,      note: "" },
  { feature: "Worker Registration",      jm: false,   es: true,      note: "Use official e-Shram portal" },
];

function CellIcon({ value }) {
  if (value === true)      return <Check size={18} className="text-emerald-600 mx-auto" />;
  if (value === false)     return <Minus size={18} className="text-slate-300 mx-auto" />;
  if (value === "partial") return <span className="text-amber-500 text-sm font-bold mx-auto block text-center">Partial</span>;
  if (value === "proposed") return <span className="text-blue-500 text-xs font-bold mx-auto block text-center">Proposed</span>;
  return null;
}

// ─── How It Works steps ───────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    num: "1",
    icon: HelpCircle,
    title: "Tell us about yourself",
    desc: "Share your occupation, age, income range, and state in under a minute — no documents needed upfront.",
  },
  {
    num: "2",
    icon: Sparkles,
    title: "See matching schemes",
    desc: "Our eligibility engine instantly identifies every central and state scheme you qualify for.",
  },
  {
    num: "3",
    icon: FileText,
    title: "Apply with guidance",
    desc: "Get a clear document checklist and direct links to official government portals — no agents, no fees.",
  },
];

// ─── Homepage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />

      <main id="main-content" className="flex-1 flex flex-col">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section
          className="bg-white border-b border-brand-subtle px-4 sm:px-6 pt-12 pb-16"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* Left: copy */}
              <div className="flex flex-col items-start animate-fade-up">
                {/* Trust badge */}
                <div className="inline-flex items-center gap-2 bg-brand-light rounded-full px-3.5 py-1.5 text-xs font-bold text-brand-primary border border-brand-muted mb-5">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  100% Free · Official Government Welfare · No Middlemen
                </div>

                <h1
                  id="hero-heading"
                  className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-brand-text leading-tight mb-4 tracking-tight"
                >
                  Discover schemes,<br className="hidden sm:block" />
                  check eligibility,<br className="hidden sm:block" />
                  verify documents.
                </h1>

                <p className="text-base sm:text-lg text-brand-subtext mb-8 leading-relaxed max-w-lg">
                  JeevanMitra helps delivery workers, drivers, daily wage earners, and all
                  unorganised workers find and access government welfare benefits they're
                  entitled to — simply and for free.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link href="/schemes" className="w-full sm:w-auto">
                    <button
                      id="hero-cta-schemes"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold bg-brand-primary text-white
                                 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/30 hover:bg-brand-hover transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                      Explore Schemes <ArrowRight size={18} />
                    </button>
                  </Link>
                  <Link href="/eligibility" className="w-full sm:w-auto">
                    <button
                      id="hero-cta-eligibility"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold bg-white text-brand-primary border-2 border-brand-primary
                                 hover:bg-brand-light hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                      Check Eligibility
                    </button>
                  </Link>
                  <Link href="/verify/doc" className="w-full sm:w-auto">
                    <button
                      id="hero-cta-verify"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold bg-white text-brand-text border border-brand-subtle
                                 hover:bg-surface-1 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                      Verify Documents
                    </button>
                  </Link>
                </div>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center gap-4 mt-7 text-xs text-brand-subtext font-medium">
                  {["8+ Schemes Available", "Completely Free", "No Registration Required"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-500" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: animated bike rider — no white card container */}
              <div className="flex justify-center items-end animate-fade-up delay-200 overflow-hidden">
                <AnimatedBikeRider />
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══════════════════════════════════════════════════════ */}
        <section
          className="px-4 sm:px-6 py-16"
          aria-labelledby="services-heading"
        >
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              label="What We Offer"
              title="Everything a citizen worker needs"
              subtitle="Six core services designed around how India's unorganised workforce actually interacts with government programmes."
            />
            <div id="services-heading" className="sr-only">Our Services</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </div>
        </section>

        {/* ══ AVAILABLE SCHEMES ═════════════════════════════════════════════ */}
        <section
          className="bg-white border-y border-brand-subtle px-4 sm:px-6 py-16"
          aria-labelledby="schemes-heading"
        >
          <div className="max-w-6xl mx-auto">
            <div id="schemes-heading" className="sr-only">Available Government Schemes</div>
            <SectionHeading
              label="Government Schemes"
              title="Schemes we help you access"
              subtitle="Central government welfare programmes with zero middlemen, zero charges. Eligibility verified by our checker."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SCHEMES_DATA.map((scheme) => {
                const Icon = ICON_MAP[scheme.iconName];
                return (
                  <SchemeCard key={scheme.id} scheme={scheme} Icon={Icon} />
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Link href="/schemes">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border-2 border-brand-primary text-brand-primary
                                   hover:bg-brand-primary hover:text-white transition-all duration-200 cursor-pointer">
                  View All Schemes <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 py-16" aria-labelledby="how-heading">
          <div className="max-w-6xl mx-auto">
            <div id="how-heading" className="sr-only">How It Works</div>
            <SectionHeading
              label="How It Works"
              title="Three steps to your benefits"
              subtitle="No complex forms, no agents. Just clear guidance from your profile to your entitlements."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_STEPS.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.num}
                    className={`bg-white rounded-2xl border border-brand-subtle p-6 animate-fade-up delay-${(i + 1) * 100}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-primary text-white text-sm font-extrabold flex items-center justify-center flex-shrink-0">
                        {step.num}
                      </span>
                      <StepIcon size={20} className="text-brand-primary" />
                    </div>
                    <h3 className="text-base font-bold text-brand-text mb-2">{step.title}</h3>
                    <p className="text-sm text-brand-subtext leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ COMPARISON: JeevanMitra vs e-Shram ════════════════════════════ */}
        <section
          className="bg-white border-y border-brand-subtle px-4 sm:px-6 py-16"
          aria-labelledby="comparison-heading"
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              label="How We Relate to e-Shram"
              title="JeevanMitra complements e-Shram"
              subtitle="We do not replace e-Shram. We guide you through discovering schemes and preparing to use government portals. Always register on the official e-Shram portal for your worker ID."
            />

            <div id="comparison-heading" className="sr-only">JeevanMitra vs e-Shram comparison</div>

            <div className="overflow-x-auto rounded-2xl border border-brand-subtle shadow-sm">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="bg-brand-light border-b border-brand-subtle">
                    <th className="text-left px-5 py-3.5 font-bold text-brand-text w-1/2" scope="col">Feature</th>
                    <th className="text-center px-5 py-3.5 font-bold text-brand-primary" scope="col">JeevanMitra</th>
                    <th className="text-center px-5 py-3.5 font-bold text-brand-subtext" scope="col">
                      <span className="flex items-center justify-center gap-1.5">
                        {/* e-Shram logo placeholder */}
                        <span className="px-2 py-0.5 rounded text-xs font-extrabold border-2 border-dashed border-slate-300 text-slate-500">e-Shram</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-brand-subtle last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-1"}`}
                    >
                      <td className="px-5 py-3.5 font-medium text-brand-text">
                        {row.feature}
                        {row.note && (
                          <span className="block text-[11px] text-brand-subtext font-normal mt-0.5">{row.note}</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <CellIcon value={row.jm} />
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <CellIcon value={row.es} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-brand-subtext text-center mt-4">
              JeevanMitra is an independent citizen-assistance tool. It is not affiliated with or endorsed by the
              Ministry of Labour &amp; Employment or the e-Shram portal.
            </p>
          </div>
        </section>

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 py-16" aria-label="Call to action">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-brand-primary rounded-3xl px-8 py-12 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Ready to check your benefits?
              </h2>
              <p className="text-blue-100 text-base mb-7 max-w-md mx-auto">
                It takes under a minute and is completely free for every worker in India.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/eligibility">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-white text-brand-primary text-base
                                     hover:bg-brand-light hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer">
                    Check My Eligibility <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/schemes">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold border-2 border-white/60 text-white text-base
                                     hover:border-white hover:bg-white/10 transition-all duration-200 cursor-pointer">
                    Browse Schemes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
