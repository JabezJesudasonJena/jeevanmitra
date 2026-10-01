"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Truck,
  Car,
  Home,
  HardHat,
  ShoppingBag,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
  IdCard,
  IndianRupee,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Search,
  ShieldCheck,
  Briefcase,
  HelpCircle,
  X,
  ArrowRight,
} from "lucide-react";
import { Button, Card } from "@/components/ui";
import { saveProfile, getProfile } from "@/lib/storage";

// ─── Step Choices & Definitions ──────────────────────────────────────────────

const OCCUPATIONS = [
  {
    id: "delivery",
    Icon: Truck,
    label: "Delivery / Courier",
    labelHi: "डिलीवरी / कूरियर",
    desc: "Food, grocery & e-commerce delivery partners",
  },
  {
    id: "driver",
    Icon: Car,
    label: "Driver / Cab / Auto",
    labelHi: "ड्राइवर / कैब / ऑटो",
    desc: "Commercial drivers, taxi & auto operators",
  },
  {
    id: "domestic",
    Icon: Home,
    label: "Domestic Worker",
    labelHi: "घरेलू कामगार",
    desc: "House helpers, cooks, cleaners & caretakers",
  },
  {
    id: "construction",
    Icon: HardHat,
    label: "Construction Worker",
    labelHi: "निर्माण मजदूर",
    desc: "Masons, painters, carpenters & site workers",
  },
  {
    id: "vendor",
    Icon: ShoppingBag,
    label: "Street Vendor / Hawker",
    labelHi: "रेहड़ी / ठेला / विक्रेता",
    desc: "Vegetable, fruit, snack & goods sellers",
  },
  {
    id: "other",
    Icon: MoreHorizontal,
    label: "Other Daily Worker",
    labelHi: "अन्य कामगार",
    desc: "Tailors, electricians, artisans & gig workers",
  },
];

const INCOME_RANGES = [
  {
    id: "under5k",
    label: "Below ₹5,000",
    labelHi: "₹5,000 से कम",
    badge: "Maximum Subsidies",
    desc: "Eligible for full welfare, ration & insurance benefits",
  },
  {
    id: "5k-10k",
    label: "₹5,000 – ₹10,000",
    labelHi: "₹5,000 – ₹10,000",
    badge: "High Priority Tier",
    desc: "Eligible for e-Shram, PM-SYM & health cards",
  },
  {
    id: "10k-15k",
    label: "₹10,000 – ₹15,000",
    labelHi: "₹10,000 – ₹15,000",
    badge: "Prime Welfare Tier",
    desc: "Eligible for unorganised worker pension schemes",
  },
  {
    id: "15k-25k",
    label: "₹15,000 – ₹25,000",
    labelHi: "₹15,000 – ₹25,000",
    badge: "Standard Coverage",
    desc: "Eligible for national insurance & loan schemes",
  },
  {
    id: "above25k",
    label: "Above ₹25,000",
    labelHi: "₹25,000 से ज़्यादा",
    badge: "Selected Schemes",
    desc: "Eligible for specific skill & credit assistance",
  },
];

const QUICK_AGES = [18, 22, 25, 30, 35, 42, 50, 58];

const POPULAR_STATES = [
  "Uttar Pradesh",
  "Bihar",
  "Maharashtra",
  "West Bengal",
  "Madhya Pradesh",
  "Rajasthan",
  "Gujarat",
  "Delhi",
];

const ALL_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];

const TOTAL_STEPS = 5;

// ─── Step Copy & Subtitles ───────────────────────────────────────────────────

const STEP_META = {
  1: {
    badge: "Step 1 of 5 · Work Profile",
    title: "What kind of work do you do?",
    titleHi: "आप क्या काम करते हैं?",
    why: "We use your occupation to discover sector-specific welfare funds, tool assistance & insurance schemes.",
    icon: Briefcase,
    encouragement: "Let's discover the government benefits you've earned.",
    accentColor: "from-blue-600/10 to-indigo-600/10",
  },
  2: {
    badge: "Step 2 of 5 · Income Eligibility",
    title: "What is your approximate monthly income?",
    titleHi: "आपकी मासिक आय क्या है?",
    why: "Most central welfare programs like PM-SYM and insurance target specific income thresholds.",
    icon: IndianRupee,
    encouragement: "Accurate income helps match you with high-benefit pensions.",
    accentColor: "from-emerald-600/10 to-blue-600/10",
  },
  3: {
    badge: "Step 3 of 5 · Age Verification",
    title: "How old are you?",
    titleHi: "आपकी उम्र कितनी है?",
    why: "Government schemes have age limits (e.g. 18–59 years for e-Shram and PM-SYM).",
    icon: Calendar,
    encouragement: "Almost halfway there! Just two quick questions left.",
    accentColor: "from-amber-600/10 to-blue-600/10",
  },
  4: {
    badge: "Step 4 of 5 · State Welfare",
    title: "Which state do you work or live in?",
    titleHi: "आप किस राज्य में काम या निवास करते हैं?",
    why: "Unlocks both Central government schemes and your State's specific unorganised labour boards.",
    icon: MapPin,
    encouragement: "Great progress! Unlocking state-specific funds.",
    accentColor: "from-sky-600/10 to-indigo-600/10",
  },
  5: {
    badge: "Step 5 of 5 · Final Step",
    title: "Do you have an Aadhaar card?",
    titleHi: "क्या आपके पास आधार कार्ड उपलब्ध है?",
    why: "Aadhaar is needed for Direct Benefit Transfer (DBT) cash deposited directly into your bank.",
    icon: IdCard,
    encouragement: "Final question! Your tailored list of schemes is ready.",
    accentColor: "from-indigo-600/10 to-purple-600/10",
  },
};

// ─── Main Check Page ─────────────────────────────────────────────────────────

export default function CheckPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const [profile, setProfile] = useState({
    occupation: "",
    income: "",
    age: "",
    state: "",
    hasAadhaar: "",
  });

  // Load existing profile from storage if available
  useEffect(() => {
    const existing = getProfile();
    if (existing) {
      setProfile((prev) => ({
        ...prev,
        occupation: existing.occupation || "",
        income: existing.income || "",
        age: existing.age ? String(existing.age) : "",
        state: existing.state || "",
        hasAadhaar: existing.hasAadhaar || "",
      }));
    }
  }, []);

  function setField(key, value) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    if (step < TOTAL_STEPS) {
      setDirection("forward");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStep((s) => s + 1);
    } else {
      saveProfile({ ...profile, completedAt: new Date().toISOString() });
      router.push("/schemes");
    }
  }

  function back() {
    if (step > 1) {
      setDirection("backward");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStep((s) => s - 1);
    } else {
      router.push("/");
    }
  }

  const canAdvance = {
    1: !!profile.occupation,
    2: !!profile.income,
    3: profile.age && parseInt(profile.age, 10) >= 10 && parseInt(profile.age, 10) <= 80,
    4: !!profile.state,
    5: !!profile.hasAadhaar,
  }[step];

  const currentMeta = STEP_META[step];
  const StepIcon = currentMeta.icon;

  return (
    <main className="min-h-screen bg-brand-bg relative overflow-hidden flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      {/* ─── Ambient Decorative Backdrops ───────────────────────────────────── */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br ${currentMeta.accentColor} blur-3xl pointer-events-none transition-all duration-700`}
      />
      <div
        className={`absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl ${currentMeta.accentColor} blur-3xl pointer-events-none transition-all duration-700`}
      />

      <div className="w-full max-w-2xl mx-auto flex flex-col flex-1 z-10">
        {/* ─── Header & Progress System ─────────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={back}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-hover transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-brand-light/50"
            >
              <ChevronLeft size={18} />
              <span>{step === 1 ? "Exit to Home" : "Previous Step"}</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-brand-light text-brand-primary border border-brand-muted/70">
              <Sparkles size={13} />
              <span>{currentMeta.badge}</span>
            </span>
          </div>

          {/* Segmented Progress Tracker */}
          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5].map((s) => {
                const isCompleted = s < step;
                const isCurrent = s === step;
                return (
                  <div
                    key={s}
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                      isCompleted
                        ? "bg-brand-primary"
                        : isCurrent
                        ? "bg-brand-primary ring-2 ring-brand-ring/40 shadow-xs"
                        : "bg-slate-200"
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-0.5">
              <span>{currentMeta.encouragement}</span>
              <span className="text-brand-primary font-black">
                {Math.round((step / TOTAL_STEPS) * 100)}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* ─── Immersive Question Content Card ──────────────────────────────── */}
        <Card className="p-6 sm:p-9 shadow-lg border-brand-subtle flex-1 flex flex-col justify-between backdrop-blur-xs bg-white/95">
          <div
            key={step}
            className={`transition-all duration-300 ease-out transform ${
              direction === "forward" ? "animate-fade-in" : "animate-fade-in"
            }`}
          >
            {/* Prominent Question Header */}
            <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                <StepIcon size={28} className="stroke-[2.2]" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-text leading-tight">
                  {currentMeta.title}
                </h1>
                <p className="text-sm sm:text-base font-bold text-brand-primary mt-0.5">
                  {currentMeta.titleHi}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5 leading-relaxed">
                  {currentMeta.why}
                </p>
              </div>
            </div>

            {/* Active Question Component */}
            <div className="py-2">
              {step === 1 && (
                <StepOccupation
                  value={profile.occupation}
                  onChange={(val) => setField("occupation", val)}
                />
              )}
              {step === 2 && (
                <StepIncome
                  value={profile.income}
                  onChange={(val) => setField("income", val)}
                />
              )}
              {step === 3 && (
                <StepAge
                  value={profile.age}
                  onChange={(val) => setField("age", val)}
                />
              )}
              {step === 4 && (
                <StepState
                  value={profile.state}
                  onChange={(val) => setField("state", val)}
                />
              )}
              {step === 5 && (
                <StepAadhaar
                  value={profile.hasAadhaar}
                  onChange={(val) => setField("hasAadhaar", val)}
                />
              )}
            </div>
          </div>

          {/* ─── Sticky Bottom Action Navigation ────────────────────────────── */}
          <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={back}
              className="py-4 text-base sm:text-lg flex-1 justify-center"
            >
              <ChevronLeft size={20} />
              <span>{step === 1 ? "Cancel" : "Back"}</span>
            </Button>

            <Button
              variant="primary"
              onClick={next}
              disabled={!canAdvance}
              className="py-4 text-base sm:text-lg flex-1 justify-center"
            >
              {step === TOTAL_STEPS ? (
                <>
                  <span>Find My Schemes</span>
                  <Sparkles size={20} />
                </>
              ) : (
                <>
                  <span>Next Step</span>
                  <ChevronRight size={20} />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* ─── Trust Sub-Footer ─────────────────────────────────────────────── */}
        <div className="mt-4 text-center">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0" />
            <span>100% Private · Zero data tracking · All results stay on your device</span>
          </p>
        </div>
      </div>
    </main>
  );
}

// ─── Step 1: Occupation (Tactile Icon Tile Grid) ──────────────────────────────

function StepOccupation({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
      {OCCUPATIONS.map(({ id, Icon, label, labelHi, desc }) => {
        const isSelected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
              isSelected
                ? "border-brand-primary bg-brand-light/70 text-brand-text shadow-sm ring-2 ring-brand-ring/40 scale-[1.01]"
                : "border-brand-subtle bg-white text-slate-800 hover:border-brand-ring hover:bg-slate-50/80 hover:scale-[1.005]"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected
                  ? "bg-brand-primary text-white shadow-xs"
                  : "bg-brand-light text-brand-primary"
              }`}
            >
              <Icon size={24} className="stroke-[2.2]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-extrabold text-sm sm:text-base leading-tight truncate">
                  {label}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-xs font-bold text-brand-primary mb-1">
                {labelHi}
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-snug line-clamp-2">
                {desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Step 2: Income (Stacked Cards with Badges) ──────────────────────────────

function StepIncome({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      {INCOME_RANGES.map(({ id, label, labelHi, badge, desc }) => {
        const isSelected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-center justify-between p-4 sm:p-4.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
              isSelected
                ? "border-brand-primary bg-brand-light/70 text-brand-text shadow-sm ring-2 ring-brand-ring/40 scale-[1.01]"
                : "border-brand-subtle bg-white text-slate-800 hover:border-brand-ring hover:bg-slate-50 hover:scale-[1.005]"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-brand-light text-brand-primary"
                }`}
              >
                <IndianRupee size={22} className="stroke-[2.5]" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-base sm:text-lg text-brand-text">
                    {label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                      isSelected
                        ? "bg-brand-primary text-white"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-brand-primary mt-0.5">
                  {labelHi}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {desc}
                </p>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {isSelected && <Check size={14} className="stroke-[3]" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Step 3: Age (Interactive Card + Slider + Quick Select) ──────────────────

function StepAge({ value, onChange }) {
  const currentAge = value ? parseInt(value, 10) : 25;

  function getAgeGuidance(age) {
    if (!age) return "Please enter your age in years";
    const num = parseInt(age, 10);
    if (num < 18) {
      return "Youth Apprentice Bracket · Eligible for skill training and youth scholarships";
    }
    if (num <= 59) {
      return "Prime Working Age (18–59) · Fully eligible for e-Shram, PM-SYM Pension, and accidental insurance";
    }
    return "Senior Citizen Bracket (60+) · Eligible for national senior pensions, PM Vaya Vandana, and free healthcare";
  }

  return (
    <div>
      {/* Visual Age Counter Box */}
      <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border-2 border-brand-subtle rounded-3xl p-6 sm:p-7 text-center mb-6 shadow-xs">
        <p className="text-xs font-extrabold uppercase tracking-widest text-brand-subtext mb-1">
          Your Current Age / आपकी उम्र
        </p>

        <div className="flex items-center justify-center gap-3 my-2">
          <Calendar size={36} className="text-brand-primary" />
          <input
            type="number"
            inputMode="numeric"
            min={10}
            max={80}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="25"
            className="w-28 text-center text-5xl sm:text-6xl font-black text-brand-text outline-none bg-white rounded-2xl border-2 border-brand-subtle focus:border-brand-primary shadow-xs px-2 py-1"
          />
          <span className="text-xl sm:text-2xl font-extrabold text-slate-500">
            Years / वर्ष
          </span>
        </div>

        {/* Real-time Eligibility Pill */}
        <div className="inline-block mt-3 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-brand-subtle shadow-xs text-brand-text">
          💡 {getAgeGuidance(value)}
        </div>
      </div>

      {/* Slider Control */}
      <div className="mb-6 px-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 mb-2">
          <span>14 Years (Min)</span>
          <span className="text-brand-primary">Slide to adjust</span>
          <span>75 Years (Max)</span>
        </div>
        <input
          type="range"
          min={14}
          max={75}
          value={currentAge || 25}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
      </div>

      {/* Quick Select Common Age Tiles */}
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">
          Tap quick select:
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {QUICK_AGES.map((age) => {
            const isSelected = String(value) === String(age);
            return (
              <button
                key={age}
                type="button"
                onClick={() => onChange(String(age))}
                className={`py-3 px-1 rounded-xl border-2 font-black text-xs sm:text-sm text-center transition-all cursor-pointer ${
                  isSelected
                    ? "border-brand-primary bg-brand-primary text-white shadow-xs scale-105"
                    : "border-brand-subtle bg-white text-slate-700 hover:border-brand-ring hover:bg-slate-50"
                }`}
              >
                {age}y
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: State (Searchable + Popular Tiles) ───────────────────────────────

function StepState({ value, onChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return ALL_STATES;
    return ALL_STATES.filter((s) =>
      s.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div>
      {/* Search Input Box */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search state (e.g. Uttar Pradesh, Bihar, Maharashtra)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-9 py-3 rounded-2xl border-2 border-brand-subtle bg-white text-sm font-bold text-brand-text placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-3 focus:ring-brand-ring/30 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Popular State Quick Chips */}
      {!searchQuery && (
        <div className="mb-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
            Most Common States:
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_STATES.map((st) => {
              const isSelected = value === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => onChange(st)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                      : "bg-white text-slate-700 border-brand-subtle hover:border-brand-ring hover:bg-slate-50"
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Full State Grid */}
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
          {searchQuery ? `Matching States (${filteredStates.length})` : "All States & Territories:"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
          {filteredStates.map((s) => {
            const isSelected = value === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChange(s)}
                className={`p-3 rounded-xl border-2 font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "border-brand-primary bg-brand-light text-brand-primary shadow-xs ring-2 ring-brand-ring/40"
                    : "border-brand-subtle bg-white text-slate-700 hover:border-brand-ring hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin
                    size={15}
                    className={isSelected ? "text-brand-primary" : "text-slate-400"}
                  />
                  <span className="truncate">{s}</span>
                </div>
                {isSelected && <Check size={14} className="text-brand-primary flex-shrink-0" />}
              </button>
            );
          })}
          {filteredStates.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-400 text-xs font-bold">
              No states matching "{searchQuery}". Select "Other" or try another spelling.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Step 5: Aadhaar (Status Cards with Identity Context) ────────────────────

function StepAadhaar({ value, onChange }) {
  const choices = [
    {
      id: "yes",
      Icon: CheckCircle2,
      label: "Yes, I have an Aadhaar Card",
      labelHi: "हाँ, मेरे पास आधार कार्ड उपलब्ध है",
      badge: "Direct Benefit Transfer (DBT) Ready",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      desc: "Fastest registration. Direct cash benefits deposited straight to your linked bank account.",
      color: "text-emerald-600",
    },
    {
      id: "applied",
      Icon: Clock,
      label: "Applied / Have Enrollment Slip",
      labelHi: "आवेदन किया है / पर्ची उपलब्ध है",
      badge: "In Process",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      desc: "You can still check scheme eligibility now using your temporary 28-digit enrollment ID.",
      color: "text-amber-600",
    },
    {
      id: "no",
      Icon: AlertCircle,
      label: "No, I don't have Aadhaar yet",
      labelHi: "नहीं, मेरे पास अभी आधार नहीं है",
      badge: "Free CSC Assistance Available",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
      desc: "We will show you schemes where Aadhaar can be applied for simultaneously at free CSC centres.",
      color: "text-slate-500",
    },
  ];

  return (
    <div className="flex flex-col gap-3.5">
      {choices.map(({ id, Icon, label, labelHi, badge, badgeColor, desc, color }) => {
        const isSelected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-start justify-between p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
              isSelected
                ? "border-brand-primary bg-brand-light/70 text-brand-text shadow-sm ring-2 ring-brand-ring/40 scale-[1.01]"
                : "border-brand-subtle bg-white text-slate-800 hover:border-brand-ring hover:bg-slate-50 hover:scale-[1.005]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-slate-100 " + color
                }`}
              >
                <Icon size={24} className="stroke-[2.2]" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-black text-base sm:text-lg text-brand-text">
                    {label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${badgeColor}`}
                  >
                    {badge}
                  </span>
                </div>

                <p className="text-xs font-bold text-brand-primary">
                  {labelHi}
                </p>

                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
                isSelected
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {isSelected && <Check size={14} className="stroke-[3]" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
