"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  IdCard,
  PiggyBank,
  HeartPulse,
  Shield,
  ShieldCheck,
  Landmark,
  HardHat,
  GraduationCap,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  FileText,
  Phone,
  Camera,
  ChevronLeft,
  LayoutDashboard,
  Gift,
  FileCheck,
} from "lucide-react";
import { Card, Button, Badge } from "@/components/ui";
import { getProfile } from "@/lib/storage";
import { matchSchemes } from "@/lib/matcher";

// Map icon string names → actual Lucide components
const ICON_MAP = {
  IdCard,
  PiggyBank,
  HeartPulse,
  Shield,
  ShieldCheck,
  Landmark,
  HardHat,
  GraduationCap,
};

// Document icons & labels
const DOC_META = {
  aadhaar: { Icon: IdCard, label: "Aadhaar Card" },
  mobile: { Icon: Phone, label: "Mobile Number" },
  bank: { Icon: Landmark, label: "Bank Passbook" },
  ration: { Icon: FileText, label: "Ration Card" },
  photo: { Icon: Camera, label: "Passport Photo" },
  work_cert: { Icon: FileCheck, label: "Work Certificate" },
};

export default function SchemesPage() {
  const router = useRouter();
  const [schemes, setSchemes] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.replace("/check");
      return;
    }
    setProfile(p);
    setSchemes(matchSchemes(p));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-brand-card/95 backdrop-blur-md border-b border-brand-subtle px-4 sm:px-6 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/check"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-hover transition"
          >
            <ChevronLeft size={20} />
            <span>Edit Answers</span>
          </Link>

          <Link href="/dashboard">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-text bg-white border border-brand-subtle hover:bg-brand-light transition">
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Hero / Match Summary Banner */}
      <div className="bg-gradient-to-b from-[#EAF4FB] to-[#DCEEFA] border-b border-brand-subtle px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 text-xs font-bold text-brand-primary border border-brand-subtle mb-3 shadow-xs">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>Eligibility Verified</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-2">
            {schemes.length} Schemes Matched for You 🎉
          </h1>

          <p className="text-sm sm:text-base text-brand-subtext">
            Based on your profile as a{" "}
            <span className="font-bold text-brand-primary capitalize">
              {profile?.occupation || "worker"}
            </span>
            {profile?.state ? ` in ${profile.state}` : ""} with income{" "}
            <span className="font-bold text-brand-text">
              {profile?.income || "verified"}
            </span>
            .
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Friendly Empty State if 0 schemes match */}
        {schemes.length === 0 ? (
          <Card className="p-8 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={36} />
            </div>
            <h2 className="text-xl font-extrabold text-brand-text mb-2">
              No Schemes Matched Yet
            </h2>
            <p className="text-sm text-brand-subtext mb-6 leading-relaxed">
              Don't worry — scheme criteria can vary by age bracket or income range. Try updating your quiz details to see more central and state programs.
            </p>
            <Link href="/check">
              <Button variant="primary" className="py-3.5">
                <RefreshCw size={18} />
                <span>Retake Quiz</span>
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="flex flex-col gap-5">
            {schemes.map((scheme) => {
              const Icon = ICON_MAP[scheme.icon] ?? Shield;
              return (
                <Card
                  key={scheme.id}
                  className="p-5 sm:p-6 hover:border-brand-primary/40 transition-all shadow-sm"
                >
                  {/* Top Bar: Icon, Scheme Name & Eligible Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Icon size={26} />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-brand-text leading-snug">
                          {scheme.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-brand-subtext font-medium">
                          {scheme.nameHi}
                        </p>
                      </div>
                    </div>

                    <Badge label="Eligible ✓" color="green" />
                  </div>

                  {/* One-Line Benefit Callout */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 mb-4">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
                      Key Benefit
                    </p>
                    <p className="text-sm sm:text-base font-extrabold text-emerald-900 leading-snug">
                      {scheme.benefit || scheme.tagline}
                    </p>
                  </div>

                  {/* "What You Get" Tags */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-subtext uppercase tracking-wider mb-2">
                      <Gift size={14} className="text-brand-primary" />
                      <span>What You Get</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scheme.what_you_get.slice(0, 3).map((item, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-brand-subtle text-xs sm:text-sm font-semibold text-brand-text shadow-2xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* "What You Need" Document Tags */}
                  <div className="mb-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-subtext uppercase tracking-wider mb-2">
                      <FileCheck size={14} className="text-brand-primary" />
                      <span>What You Need</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scheme.documents.map((doc) => {
                        const meta = DOC_META[doc] || { Icon: FileText, label: doc };
                        const DocIcon = meta.Icon;
                        return (
                          <span
                            key={doc}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
                          >
                            <DocIcon size={13} className="text-slate-500" />
                            <span>{meta.label}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clear Apply Button per card */}
                  <Link href={`/apply/${scheme.id}`}>
                    <Button variant="primary" className="py-3.5 text-base sm:text-lg">
                      <span>Apply Now</span>
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
