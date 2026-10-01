"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  MapPin,
  Briefcase,
  IndianRupee,
  IdCard,
  CheckCircle2,
  Clock,
  FilePen,
  ArrowRight,
  Trash2,
  LayoutDashboard,
  RefreshCw,
  Truck,
  Car,
  Home,
  HardHat,
  ShoppingBag,
  MoreHorizontal,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { getProfile, getApplications, clearProfile } from "@/lib/storage";

// Worker icons map
const OCCUPATION_META = {
  delivery: { label: "Delivery / Courier", Icon: Truck },
  driver: { label: "Driver / Cab", Icon: Car },
  domestic: { label: "Domestic Worker", Icon: Home },
  construction: { label: "Construction Worker", Icon: HardHat },
  vendor: { label: "Street Vendor", Icon: ShoppingBag },
  other: { label: "Other Worker", Icon: MoreHorizontal },
};

const INCOME_LABELS = {
  under5k: "Below ₹5,000 / month",
  "5k-10k": "₹5,000 – ₹10,000 / month",
  "10k-15k": "₹10,000 – ₹15,000 / month",
  "15k-25k": "₹15,000 – ₹25,000 / month",
  above25k: "Above ₹25,000 / month",
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProfile(getProfile());
    setApplications(getApplications());
    setLoading(false);
  }, []);

  function handleClearProfile() {
    if (confirm("Reset your profile and all saved applications? This cannot be undone.")) {
      clearProfile();
      localStorage.removeItem("sahayak_applications");
      router.push("/");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full" />
      </main>
    );
  }

  const workerInfo = profile ? OCCUPATION_META[profile.occupation] || { label: profile.occupation, Icon: Briefcase } : null;
  const WorkerIcon = workerInfo?.Icon || User;

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pb-20">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-brand-card/95 backdrop-blur-md border-b border-brand-subtle px-4 sm:px-6 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-hover transition"
          >
            <ChevronLeft size={20} />
            <span>Home</span>
          </Link>

          {profile && (
            <button
              onClick={handleClearProfile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-red-600 hover:bg-red-50 transition border border-red-200 cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Reset Data</span>
            </button>
          )}
        </div>
      </header>

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#EAF4FB] to-[#DCEEFA] border-b border-brand-subtle px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 text-xs font-bold text-brand-primary border border-brand-subtle mb-3 shadow-xs">
            <LayoutDashboard size={14} />
            <span>Worker Central</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-2">
            My Dashboard 👋
          </h1>
          <p className="text-sm sm:text-base text-brand-subtext">
            Track your verified eligibility profile and submitted welfare applications.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* ── Top Profile Summary Card ── */}
        {profile ? (
          <Card className="p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center">
                  <User size={22} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-brand-text">
                    Your Profile Summary
                  </h2>
                  <p className="text-xs text-brand-subtext font-medium">
                    Verified through eligibility quiz
                  </p>
                </div>
              </div>

              <Link href="/check">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-primary bg-brand-light hover:bg-brand-muted/40 transition border border-brand-subtle cursor-pointer">
                  <RefreshCw size={12} />
                  <span>Update</span>
                </button>
              </Link>
            </div>

            {/* Profile Tiles Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {/* Occupation */}
              <div className="bg-white rounded-2xl border border-brand-subtle p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-subtext mb-1">
                  <WorkerIcon size={15} className="text-brand-primary" />
                  <span>Occupation</span>
                </div>
                <p className="font-extrabold text-sm sm:text-base text-brand-text">
                  {workerInfo?.label || profile.occupation}
                </p>
              </div>

              {/* Monthly Income */}
              <div className="bg-white rounded-2xl border border-brand-subtle p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-subtext mb-1">
                  <IndianRupee size={15} className="text-emerald-600" />
                  <span>Monthly Income</span>
                </div>
                <p className="font-extrabold text-sm sm:text-base text-brand-text">
                  {INCOME_LABELS[profile.income] || profile.income}
                </p>
              </div>

              {/* Age */}
              <div className="bg-white rounded-2xl border border-brand-subtle p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-subtext mb-1">
                  <Calendar size={15} className="text-amber-600" />
                  <span>Age</span>
                </div>
                <p className="font-extrabold text-sm sm:text-base text-brand-text">
                  {profile.age} Years
                </p>
              </div>

              {/* State */}
              <div className="bg-white rounded-2xl border border-brand-subtle p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-subtext mb-1">
                  <MapPin size={15} className="text-rose-600" />
                  <span>State</span>
                </div>
                <p className="font-extrabold text-sm sm:text-base text-brand-text">
                  {profile.state}
                </p>
              </div>

              {/* Aadhaar Status */}
              <div className="bg-white rounded-2xl border border-brand-subtle p-3.5 col-span-2 sm:col-span-2 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-subtext mb-1">
                  <IdCard size={15} className="text-blue-600" />
                  <span>Aadhaar Status</span>
                </div>
                <p className="font-extrabold text-sm sm:text-base text-brand-text">
                  {profile.hasAadhaar === "yes"
                    ? "✅ Available & Verified"
                    : profile.hasAadhaar === "applied"
                    ? "⏳ Application In Process"
                    : "❌ Not Available Yet"}
                </p>
              </div>
            </div>

            <Link href="/schemes">
              <Button variant="primary" className="py-3.5 text-base sm:text-lg">
                <span>View Matched Schemes</span>
                <ArrowRight size={18} />
              </Button>
            </Link>
          </Card>
        ) : (
          <Card className="p-8 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-brand-light text-brand-primary flex items-center justify-center mx-auto mb-4">
              <User size={32} />
            </div>
            <h2 className="text-xl font-extrabold text-brand-text mb-2">
              No Profile Found Yet
            </h2>
            <p className="text-sm text-brand-subtext mb-6">
              Answer 5 quick questions in under 1 minute to check your eligibility for verified government schemes.
            </p>
            <Link href="/check">
              <Button variant="primary" className="py-3.5">
                <span>Start Eligibility Check</span>
                <ArrowRight size={18} />
              </Button>
            </Link>
          </Card>
        )}

        {/* ── Applications Section ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text">
              My Applications ({applications.length})
            </h2>
            {applications.length > 0 && (
              <span className="text-xs font-bold text-brand-subtext">
                Saved on this device
              </span>
            )}
          </div>

          {applications.length === 0 ? (
            <Card className="p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <FolderOpen size={32} />
              </div>
              <h3 className="text-lg font-extrabold text-brand-text mb-1">
                No Applications Started Yet
              </h3>
              <p className="text-sm text-brand-subtext mb-6 max-w-sm mx-auto">
                Explore your matched welfare schemes and click &ldquo;Apply Now&rdquo; to prepare your application.
              </p>
              <Link href="/schemes">
                <Button variant="secondary" className="py-3 max-w-xs mx-auto">
                  <span>Browse Matched Schemes</span>
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {applications.map((app, i) => {
                const isSubmitted = app.status === "submitted";
                return (
                  <Card key={i} className="p-5 sm:p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg font-extrabold text-brand-text mb-1">
                          {app.schemeName}
                        </h3>
                        <p className="text-xs text-brand-subtext flex items-center gap-1.5 font-medium">
                          <Clock size={13} />
                          <span>
                            {isSubmitted
                              ? `Submitted on ${new Date(app.submittedAt).toLocaleDateString("en-IN")}`
                              : `Saved draft on ${new Date(app.createdAt || Date.now()).toLocaleDateString("en-IN")}`}
                          </span>
                        </p>
                      </div>

                      {/* Status Pill */}
                      {isSubmitted ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 size={13} className="text-emerald-700" />
                          <span>Submitted</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                          <FilePen size={13} className="text-amber-700" />
                          <span>Draft</span>
                        </span>
                      )}
                    </div>

                    {/* Applicant Preview details */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-brand-text grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <span className="text-slate-500 font-medium">Applicant: </span>
                        <span className="font-bold">{app.formData?.name || "Not entered"}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium">Mobile: </span>
                        <span className="font-bold">{app.formData?.phone || "Not entered"}</span>
                      </div>
                    </div>

                    {!isSubmitted && (
                      <Link href={`/apply/${app.schemeId}`}>
                        <Button variant="secondary" className="py-2.5 text-sm sm:text-base">
                          <span>Continue Application</span>
                          <ArrowRight size={16} />
                        </Button>
                      </Link>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
