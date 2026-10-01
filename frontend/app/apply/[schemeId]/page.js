"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ShieldCheck,
  Phone,
  IdCard,
  Landmark,
  AlertCircle,
  Info,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Heart,
  CheckCircle2,
  RefreshCw,
  X,
  ArrowRight,
  Building2,
  Truck,
  Car,
  Home,
  HardHat,
  ShoppingBag,
  MoreHorizontal,
  IndianRupee,
  Calendar,
  MapPin,
  HelpCircle,
  FileText,
  BadgeAlert,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button, Card, StepProgress, Badge } from "@/components/ui";
import { getApplications, saveApplication, submitApplication, getProfile } from "@/lib/storage";
import schemes from "@/lib/schemes.json";
import AadhaarCardHelper from "@/components/apply/AadhaarCardHelper";
import PassbookHelper from "@/components/apply/PassbookHelper";
import MockUanCard from "@/components/apply/MockUanCard";

// ─── Constants & Tile Choices ────────────────────────────────────────────────

const OCCUPATION_OPTIONS = [
  { id: "delivery", label: "Delivery / Courier", labelHi: "डिलीवरी / कूरियर", Icon: Truck },
  { id: "driver", label: "Driver / Cab", labelHi: "ड्राइवर / कैब", Icon: Car },
  { id: "domestic", label: "Domestic Worker", labelHi: "घरेलू कामगार", Icon: Home },
  { id: "construction", label: "Construction Worker", labelHi: "निर्माण मजदूर", Icon: HardHat },
  { id: "vendor", label: "Street Vendor", labelHi: "रेहड़ी / ठेला", Icon: ShoppingBag },
  { id: "other", label: "Other Worker", labelHi: "अन्य कामगार", Icon: MoreHorizontal },
];

const INCOME_OPTIONS = [
  { id: "under5k", label: "Below ₹5,000", labelHi: "₹5,000 से कम" },
  { id: "5k-10k", label: "₹5,000 – ₹10,000", labelHi: "₹5,000 – ₹10,000" },
  { id: "10k-15k", label: "₹10,000 – ₹15,000", labelHi: "₹10,000 – ₹15,000" },
  { id: "15k-25k", label: "₹15,000 – ₹25,000", labelHi: "₹15,000 – ₹25,000" },
  { id: "above25k", label: "Above ₹25,000", labelHi: "₹25,000 से ज़्यादा" },
];

const EDUCATION_OPTIONS = [
  { id: "no_formal", label: "No Formal Education", labelHi: "कोई औपचारिक शिक्षा नहीं" },
  { id: "up_to_10th", label: "Up to 10th / Secondary", labelHi: "10वीं तक / माध्यमिक" },
  { id: "up_to_12th", label: "Up to 12th / Sr. Secondary", labelHi: "12वीं तक / उच्च माध्यमिक" },
  { id: "graduate", label: "Graduate & Above", labelHi: "स्नातक या उससे ऊपर" },
];

const MARITAL_OPTIONS = [
  { id: "married", label: "Married", labelHi: "विवाहित" },
  { id: "unmarried", label: "Never Married", labelHi: "अविवाहित" },
  { id: "widowed", label: "Widowed", labelHi: "विधवा / विधुर" },
  { id: "separated", label: "Separated / Divorced", labelHi: "अलग / तलाकशुदा" },
];

const COMMON_STATES = [
  "Uttar Pradesh",
  "Maharashtra",
  "Bihar",
  "West Bengal",
  "Madhya Pradesh",
  "Rajasthan",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Delhi",
  "Other",
];

const TOTAL_STEPS = 7;

export default function ApplyPage() {
  const { schemeId } = useParams();
  const router = useRouter();

  // Find scheme metadata
  const scheme = schemes.find((s) => s.id === schemeId) || {
    id: schemeId || "eshram",
    name: "e-Shram Card Registration",
    nameHi: "ई-श्रम कार्ड पंजीकरण",
    benefit: "₹2 lakh accidental insurance & national worker identity",
  };

  const [step, setStep] = useState(1);
  const [initialized, setInitialized] = useState(false);
  const isLoadedRef = useRef(false);

  // Form State
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [showCscModal, setShowCscModal] = useState(false);
  const [resendNotice, setResendNotice] = useState(false);

  const otp0Ref = useRef(null);
  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otpRefs = [otp0Ref, otp1Ref, otp2Ref, otp3Ref];

  const [aadhaarRaw, setAadhaarRaw] = useState("");
  const [aadhaarError, setAadhaarError] = useState("");
  const [verifyingKyc, setVerifyingKyc] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [isAadhaarFocused, setIsAadhaarFocused] = useState(false);

  // e-KYC auto-filled details
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");

  // Profile Details
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");
  const [stateName, setStateName] = useState("");
  const [education, setEducation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nomineeName, setNomineeName] = useState("");

  // Bank Details
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccount, setConfirmAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankError, setBankError] = useState("");

  // Step 6 Consent
  const [consentChecked, setConsentChecked] = useState(true);

  // Step 7 UAN details
  const [uanNumber, setUanNumber] = useState("");

  // Load existing application & prefill from localStorage (once on mount)
  useEffect(() => {
    if (isLoadedRef.current) return;
    isLoadedRef.current = true;

    const apps = getApplications();
    const existing = apps.find((a) => a.schemeId === schemeId);
    const userProfile = getProfile();

    if (existing) {
      if (existing.currentStep) setStep(Math.min(existing.currentStep, TOTAL_STEPS));
      if (existing.status === "submitted") setStep(7);

      if (existing.mobile) setMobile(existing.mobile);
      if (existing.aadhaarRaw) {
        setAadhaarRaw(existing.aadhaarRaw);
        setKycVerified(true);
      }
      if (existing.name) setName(existing.name);
      if (existing.dob) setDob(existing.dob);
      if (existing.gender) setGender(existing.gender);
      if (existing.address) setAddress(existing.address);

      if (existing.occupation) setOccupation(existing.occupation);
      if (existing.income) setIncome(existing.income);
      if (existing.stateName) setStateName(existing.stateName);
      if (existing.education) setEducation(existing.education);
      if (existing.maritalStatus) setMaritalStatus(existing.maritalStatus);
      if (existing.nomineeName) setNomineeName(existing.nomineeName);

      if (existing.accountNumber) {
        setAccountNumber(existing.accountNumber);
        setConfirmAccount(existing.accountNumber);
      }
      if (existing.ifsc) setIfsc(existing.ifsc);
      if (existing.uanNumber) setUanNumber(existing.uanNumber);
    } else if (userProfile) {
      // Pre-fill profile from /check quiz
      if (userProfile.occupation) setOccupation(userProfile.occupation);
      if (userProfile.income) setIncome(userProfile.income);
      if (userProfile.state) setStateName(userProfile.state);
    }

    setInitialized(true);
  }, [schemeId]);

  // Auto-save application data on state updates
  useEffect(() => {
    if (!initialized || !schemeId) return;

    const payload = {
      schemeId,
      schemeName: scheme.name,
      currentStep: step,
      mobile,
      aadhaarRaw,
      name,
      dob,
      gender,
      address,
      occupation,
      income,
      stateName,
      education,
      maritalStatus,
      nomineeName,
      accountNumber,
      ifsc,
      uanNumber,
      // Compatibility with dashboard display
      formData: {
        name: name || "Demo Worker",
        phone: mobile || "Not entered",
      },
    };

    saveApplication(payload);
  }, [
    initialized,
    schemeId,
    scheme.name,
    step,
    mobile,
    aadhaarRaw,
    name,
    dob,
    gender,
    address,
    occupation,
    income,
    stateName,
    education,
    maritalStatus,
    nomineeName,
    accountNumber,
    ifsc,
    uanNumber,
  ]);

  // ─── Step Navigation ────────────────────────────────────────────────────────

  function goToStep(s) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(s);
  }

  function handleBack() {
    if (step > 1 && step < 7) {
      goToStep(step - 1);
    } else {
      router.push("/schemes");
    }
  }

  // ─── Step 1: Mobile Validation ──────────────────────────────────────────────
  function handleSendCode() {
    const cleaned = mobile.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number / 10 अंकों का मोबाइल नंबर दर्ज करें");
      return;
    }
    if (!/^[6-9]/.test(cleaned)) {
      setMobileError("Mobile number should start with 6, 7, 8, or 9");
      return;
    }
    setMobileError("");
    goToStep(2);
  }

  // ─── Step 2: OTP Verification ──────────────────────────────────────────────
  function handleOtpChange(index, val) {
    const cleaned = val.replace(/\D/g, "");
    const char = cleaned ? cleaned.slice(-1) : "";
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);
    setOtpError("");

    if (char && index < 3) {
      otpRefs[index + 1]?.current?.focus();
    }

    // Auto-verify if all 4 boxes are filled
    const fullOtp = newOtp.join("");
    if (fullOtp.length === 4) {
      verifyOtpAction();
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpRefs[index - 1]?.current?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  }

  function handleOtpPaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    setOtpError("");
    const nextIdx = Math.min(pasted.length, 3);
    otpRefs[nextIdx]?.current?.focus();
    if (pasted.length === 4) {
      verifyOtpAction();
    }
  }

  function verifyOtpAction() {
    setOtpSuccess(true);
    setTimeout(() => {
      setOtpSuccess(false);
      goToStep(3);
    }, 700);
  }

  // ─── Step 3: Aadhaar e-KYC Simulation ──────────────────────────────────────
  function formatAadhaarDisplay(raw, showFull) {
    if (!raw) return "";
    let res = "";
    for (let i = 0; i < raw.length; i++) {
      if (i > 0 && i % 4 === 0) res += " ";
      if (!showFull && i < 8) {
        res += "X";
      } else {
        res += raw[i];
      }
    }
    return res;
  }

  function handleAadhaarChange(e) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaarRaw(digits);
    setAadhaarError("");
  }

  function handleAadhaarPaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 12);
    if (pasted) {
      setAadhaarRaw(pasted);
      setAadhaarError("");
    }
  }

  function handleSimulateEkyc() {
    if (aadhaarRaw.length !== 12) {
      setAadhaarError("Aadhaar number must be exactly 12 digits / आधार नंबर 12 अंकों का होना चाहिए");
      return;
    }

    setVerifyingKyc(true);
    setAadhaarError("");

    setTimeout(() => {
      setVerifyingKyc(false);
      setKycVerified(true);
      // Auto-fill realistic mock data if not already set
      if (!name) setName("Ramesh Kumar Sharma");
      if (!dob) setDob("12/05/1988");
      if (!gender) setGender("Male");
      if (!address) setAddress("H.No. 42, Ward 7, Rampur, Uttar Pradesh - 244901");
    }, 1200);
  }

  // ─── Step 4: Profile Details ───────────────────────────────────────────────
  const canAdvanceProfile = !!occupation && !!income && !!stateName && !!education && !!maritalStatus;

  // ─── Step 5: Bank Details ──────────────────────────────────────────────────
  function handleBankSubmit() {
    const cleanAcc = accountNumber.replace(/\D/g, "");
    const cleanConfirm = confirmAccount.replace(/\D/g, "");
    const cleanIfsc = ifsc.trim().toUpperCase();

    if (cleanAcc.length < 9 || cleanAcc.length > 18) {
      setBankError("Bank account number must be between 9 and 18 digits / खाता संख्या 9 से 18 अंकों की होनी चाहिए");
      return;
    }

    if (cleanConfirm && cleanConfirm !== cleanAcc) {
      setBankError("Account numbers do not match / खाता संख्या मेल नहीं खाती");
      return;
    }

    // Gentle IFSC format check (standard Indian format: 4 letters + 0 + 6 alphanumeric)
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(cleanIfsc)) {
      setBankError("IFSC code should be 11 characters (e.g. SBIN0001234, 5th character is '0')");
      return;
    }

    setBankError("");
    goToStep(6);
  }

  // ─── Step 6: Confirmation ──────────────────────────────────────────────────
  function handleFinalSubmit() {
    if (!consentChecked) {
      alert("Please check the self-declaration box to continue.");
      return;
    }

    // Generate simulated 12-digit UAN if not already created
    const generatedUan =
      uanNumber ||
      `1009 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    setUanNumber(generatedUan);

    // Save final application state
    saveApplication({
      schemeId,
      schemeName: scheme.name,
      currentStep: 7,
      mobile,
      aadhaarRaw,
      name,
      dob,
      gender,
      address,
      occupation,
      income,
      stateName,
      education,
      maritalStatus,
      nomineeName,
      accountNumber,
      ifsc,
      uanNumber: generatedUan,
      formData: {
        name: name || "Demo Worker",
        phone: mobile || "9876543210",
      },
    });

    submitApplication(schemeId);
    goToStep(7);
  }

  return (
    <main className="min-h-screen bg-brand-bg flex flex-col items-center px-4 py-8 sm:py-12 text-brand-text">
      <div className="w-full max-w-xl mx-auto flex flex-col">

        {/* Top Header Card */}
        <Card className="p-5 sm:p-6 mb-4 shadow-sm border-brand-subtle">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-hover transition cursor-pointer"
            >
              <ChevronLeft size={18} />
              <span>{step === 1 ? "Schemes" : "Back"}</span>
            </button>

            {/* Demo Mode Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Demo Mode · Simulation</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-brand-subtext mb-2">
            <span>
              Step {step} of {TOTAL_STEPS}: {getStepTitle(step)}
            </span>
            <span className="text-brand-primary">
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <StepProgress current={step} total={TOTAL_STEPS} />
        </Card>

        {/* Active Step Content Card */}
        <Card className="p-6 sm:p-8 shadow-md border-brand-subtle flex flex-col">

          {/* ═══════════════════════════════════════════════════════════════
              STEP 1: Mobile Number Entry
          ═══════════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center mb-3">
                  <Phone size={24} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-1">
                  Enter your mobile number 📱
                </h1>
                <p className="text-sm sm:text-base text-brand-subtext">
                  अपना 10 अंकों का मोबाइल नंबर दर्ज करें
                </p>
                <p className="text-xs text-brand-primary font-bold mt-1">
                  We'll send a code to confirm it's you · पुष्टि कोड भेजा जाएगा
                </p>
              </div>

              {/* Large Input Field */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Mobile Number / मोबाइल नंबर
                </label>
                <div className="flex items-center rounded-2xl border-2 border-brand-subtle focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-ring/30 bg-white px-4 py-3.5 transition-all">
                  <span className="text-lg font-black text-brand-primary mr-3 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, ""));
                      setMobileError("");
                    }}
                    className="w-full text-xl sm:text-2xl font-extrabold text-brand-text placeholder:text-slate-300 focus:outline-none bg-transparent"
                    autoFocus
                  />
                </div>
                {mobileError && (
                  <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    {mobileError}
                  </p>
                )}
              </div>

              {/* Trust Callout */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 mb-6 text-xs text-slate-600 flex items-start gap-2">
                <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Your number is kept private and used only for e-Shram registration updates. No marketing messages.
                </span>
              </div>

              {/* Action Button */}
              <Button
                variant="primary"
                onClick={handleSendCode}
                className="py-4 text-base sm:text-lg"
              >
                <span>Send Code / कोड भेजें</span>
                <ArrowRight size={20} />
              </Button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              STEP 2: Simulated OTP Screen
          ═══════════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center mb-3">
                  <Sparkles size={24} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-1">
                  Enter Confirmation Code 🔑
                </h1>
                <p className="text-sm text-brand-subtext">
                  Sent to <span className="font-extrabold text-brand-text">+91 {mobile || "9876543210"}</span>
                </p>
              </div>

              {/* Demo Mode Prompt Banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 sm:p-4 mb-6 text-xs sm:text-sm text-amber-900 font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-amber-700 flex-shrink-0" />
                  <span>Demo mode: Use code <strong>1234</strong> (or any 4 digits)</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOtp(["1", "2", "3", "4"]);
                    verifyOtpAction();
                  }}
                  className="px-2.5 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-900 text-xs font-black rounded-lg transition"
                >
                  Auto-fill
                </button>
              </div>

              {/* 4 Large Digit Boxes */}
              <div className="flex justify-center gap-3 sm:gap-4 mb-6">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className="w-14 h-16 sm:w-16 sm:h-18 text-center text-2xl sm:text-3xl font-black rounded-2xl border-2 border-brand-subtle focus:border-brand-primary focus:ring-4 focus:ring-brand-ring/30 bg-white transition-all focus:outline-none"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {/* Success Checkmark Animation */}
              {otpSuccess && (
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-black text-sm mb-4 animate-fade-in">
                  <CheckCircle2 size={20} />
                  <span>Code Verified Successfully! Proceeding...</span>
                </div>
              )}

              {/* Resend Code + No OTP CSC Modal Link */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-500 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setResendNotice(true);
                    setTimeout(() => setResendNotice(false), 3000);
                  }}
                  className="text-brand-primary hover:underline cursor-pointer"
                >
                  {resendNotice ? "✅ Code re-sent (use 1234)" : "Didn't receive code? Resend"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowCscModal(true)}
                  className="text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle size={14} />
                  <span>No OTP? Tap here</span>
                </button>
              </div>

              <Button
                variant="primary"
                onClick={verifyOtpAction}
                disabled={otp.join("").length === 0}
                className="py-4 text-base sm:text-lg"
              >
                <span>Verify & Continue / पुष्टि करें</span>
                <Check size={20} />
              </Button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              STEP 3: Aadhaar Number Entry (Simulated e-KYC)
          ═══════════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center mb-3">
                  <IdCard size={24} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-1">
                  Aadhaar e-KYC Verification 🪪
                </h1>
                <p className="text-sm text-brand-subtext">
                  आधार कार्ड नंबर दर्ज करें (12 Digits)
                </p>
                <p className="text-xs text-brand-primary font-bold mt-1">
                  Demo mode — in the real version this connects to Aadhaar e-KYC
                </p>
              </div>

              {/* Aadhaar Visual Card Helper */}
              <AadhaarCardHelper />

              {/* Input for 12-Digit Aadhaar with Masking */}
              <div className="my-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    12-Digit Aadhaar Number / आधार संख्या
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAadhaar(!showAadhaar)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-hover cursor-pointer"
                  >
                    {showAadhaar ? (
                      <>
                        <EyeOff size={14} />
                        <span>Mask Numbers</span>
                      </>
                    ) : (
                      <>
                        <Eye size={14} />
                        <span>Show Numbers</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center rounded-2xl border-2 border-brand-subtle focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-ring/30 bg-white px-4 py-3.5 transition-all">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={14}
                    placeholder="XXXX XXXX 1234"
                    value={formatAadhaarDisplay(aadhaarRaw, showAadhaar || isAadhaarFocused)}
                    onFocus={() => setIsAadhaarFocused(true)}
                    onBlur={() => setIsAadhaarFocused(false)}
                    onChange={handleAadhaarChange}
                    onPaste={handleAadhaarPaste}
                    className="w-full text-xl sm:text-2xl font-black font-mono tracking-widest text-brand-text placeholder:text-slate-300 focus:outline-none bg-transparent"
                    autoFocus
                  />
                  {aadhaarRaw.length === 12 && (
                    <CheckCircle2 size={22} className="text-emerald-500 flex-shrink-0 ml-2" />
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-1.5 px-1">
                  <span>
                    {aadhaarRaw.length === 12
                      ? "✅ All 12 digits entered"
                      : `${aadhaarRaw.length}/12 digits entered`}
                  </span>
                  <span>
                    Masked: <strong className="font-mono text-slate-700">XXXX XXXX {aadhaarRaw.length >= 8 ? aadhaarRaw.slice(-4) : "••••"}</strong>
                  </span>
                </div>

                {aadhaarError && (
                  <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    {aadhaarError}
                  </p>
                )}
              </div>

              {/* Verify Button or Loading */}
              {!kycVerified ? (
                <Button
                  variant="primary"
                  onClick={handleSimulateEkyc}
                  disabled={verifyingKyc || aadhaarRaw.length !== 12}
                  className="py-4 text-base sm:text-lg mb-2"
                >
                  {verifyingKyc ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying e-KYC (Simulation)...</span>
                    </>
                  ) : (
                    <>
                      <span>Fetch e-KYC Details</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              ) : (
                /* Auto-filled details from simulated e-KYC */
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 animate-fade-in mb-6">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm mb-3">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>e-KYC Verified Successfully (Mock Data)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Full Name / पूरा नाम
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-sm focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Date of Birth / जन्मतिथि
                      </label>
                      <input
                        type="text"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-sm focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Gender / लिंग
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-sm focus:outline-none focus:border-brand-primary"
                      >
                        <option value="Male">Male / पुरुष</option>
                        <option value="Female">Female / महिला</option>
                        <option value="Other">Other / अन्य</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Address / पता
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 text-sm focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-200/80">
                    <Button
                      variant="primary"
                      onClick={() => goToStep(4)}
                      className="py-3.5 text-base sm:text-lg"
                    >
                      <span>Continue to Profile Details</span>
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              STEP 4: Profile Details (Self-Declared, Pre-filled from /check)
          ═══════════════════════════════════════════════════════════════ */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center mb-3">
                  <Briefcase size={24} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-1">
                  Worker Profile Details 👷
                </h1>
                <p className="text-sm text-brand-subtext">
                  व्यवसाय और व्यक्तिगत जानकारी (Select from tiles)
                </p>
              </div>

              {/* 1. Occupation */}
              <div className="mb-6">
                <label className="block text-xs font-extrabold text-brand-text uppercase tracking-wider mb-2">
                  1. Primary Occupation / मुख्य काम
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {OCCUPATION_OPTIONS.map(({ id, label, labelHi, Icon }) => {
                    const selected = occupation === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setOccupation(id)}
                        className={`flex flex-col items-center justify-center text-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                          selected
                            ? "border-brand-primary bg-brand-light text-brand-text ring-2 ring-brand-ring/40 font-bold"
                            : "border-brand-subtle bg-white text-slate-700 hover:border-brand-ring"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 ${
                            selected
                              ? "bg-brand-primary text-white"
                              : "bg-brand-light text-brand-primary"
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <span className="text-xs font-extrabold leading-tight">{label}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">{labelHi}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Monthly Income */}
              <div className="mb-6">
                <label className="block text-xs font-extrabold text-brand-text uppercase tracking-wider mb-2">
                  2. Monthly Income / मासिक आय
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INCOME_OPTIONS.map(({ id, label, labelHi }) => {
                    const selected = income === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setIncome(id)}
                        className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                          selected
                            ? "border-brand-primary bg-brand-light text-brand-text font-black"
                            : "border-brand-subtle bg-white text-slate-700 hover:border-brand-ring"
                        }`}
                      >
                        <p className="text-xs font-extrabold">{label}</p>
                        <p className="text-[10px] text-slate-500">{labelHi}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. State */}
              <div className="mb-6">
                <label className="block text-xs font-extrabold text-brand-text uppercase tracking-wider mb-2">
                  3. State / राज्य
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_STATES.map((st) => {
                    const selected = stateName === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStateName(st)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                          selected
                            ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                            : "bg-white text-slate-700 border-brand-subtle hover:border-brand-ring"
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Education Level */}
              <div className="mb-6">
                <label className="block text-xs font-extrabold text-brand-text uppercase tracking-wider mb-2">
                  4. Education Level / शिक्षा का स्तर
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EDUCATION_OPTIONS.map(({ id, label, labelHi }) => {
                    const selected = education === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setEducation(id)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 text-left transition cursor-pointer ${
                          selected
                            ? "border-brand-primary bg-brand-light text-brand-text font-black"
                            : "border-brand-subtle bg-white text-slate-700 hover:border-brand-ring"
                        }`}
                      >
                        <GraduationCap
                          size={18}
                          className={selected ? "text-brand-primary" : "text-slate-400"}
                        />
                        <div>
                          <p className="text-xs font-extrabold">{label}</p>
                          <p className="text-[10px] text-slate-500">{labelHi}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Marital Status */}
              <div className="mb-6">
                <label className="block text-xs font-extrabold text-brand-text uppercase tracking-wider mb-2">
                  5. Marital Status / वैवाहिक स्थिति
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MARITAL_OPTIONS.map(({ id, label, labelHi }) => {
                    const selected = maritalStatus === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setMaritalStatus(id)}
                        className={`p-3 rounded-2xl border-2 text-center transition cursor-pointer ${
                          selected
                            ? "border-brand-primary bg-brand-light text-brand-text font-black"
                            : "border-brand-subtle bg-white text-slate-700 hover:border-brand-ring"
                        }`}
                      >
                        <p className="text-xs font-extrabold">{label}</p>
                        <p className="text-[10px] text-slate-500">{labelHi}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Nominee Name (Optional) */}
              <div className="mb-6">
                <label className="block text-xs font-extrabold text-brand-text uppercase tracking-wider mb-1">
                  6. Nominee Name / नॉमिनी का नाम <span className="text-slate-400 font-normal">(Optional / वैकल्पिक)</span>
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  Person to receive insurance benefits if needed
                </p>
                <input
                  type="text"
                  placeholder="e.g. Sunita Devi (Wife / पत्नी)"
                  value={nomineeName}
                  onChange={(e) => setNomineeName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-brand-subtle bg-white text-sm font-bold text-brand-text focus:outline-none focus:border-brand-primary"
                />
              </div>

              {/* Next Button */}
              <Button
                variant="primary"
                onClick={() => goToStep(5)}
                disabled={!canAdvanceProfile}
                className="py-4 text-base sm:text-lg"
              >
                <span>Continue to Bank Details</span>
                <ArrowRight size={20} />
              </Button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              STEP 5: Bank Details
          ═══════════════════════════════════════════════════════════════ */}
          {step === 5 && (
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center mb-3">
                  <Landmark size={24} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-1">
                  Bank Account Details 🏦
                </h1>
                <p className="text-sm text-brand-subtext">
                  Direct benefit transfer (DBT) will be credited to this account
                </p>
                <p className="text-xs text-brand-primary font-bold mt-1">
                  Direct government welfare transfers · प्रत्यक्ष लाभ अंतरण
                </p>
              </div>

              {/* Passbook / Cheque Helper */}
              <PassbookHelper />

              {/* Account Number */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Account Number / खाता संख्या (9–18 Digits)
                </label>
                <div className="flex items-center rounded-2xl border-2 border-brand-subtle focus-within:border-brand-primary bg-white px-4 py-3.5 transition-all">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="309876543210"
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value.replace(/\D/g, ""));
                      setBankError("");
                    }}
                    className="w-full text-lg sm:text-xl font-mono font-bold text-brand-text placeholder:text-slate-300 focus:outline-none bg-transparent"
                    autoFocus
                  />
                </div>
              </div>

              {/* Confirm Account Number */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Confirm Account Number / खाता संख्या दोबारा दर्ज करें
                </label>
                <div className="flex items-center rounded-2xl border-2 border-brand-subtle focus-within:border-brand-primary bg-white px-4 py-3.5 transition-all">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Re-enter Account Number"
                    value={confirmAccount}
                    onChange={(e) => {
                      setConfirmAccount(e.target.value.replace(/\D/g, ""));
                      setBankError("");
                    }}
                    className="w-full text-lg sm:text-xl font-mono font-bold text-brand-text placeholder:text-slate-300 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* IFSC Code */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Bank IFSC Code / आईएफएससी कोड (11 Characters)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIfsc("SBIN0001234")}
                    className="text-[11px] font-bold text-brand-primary hover:underline"
                  >
                    Use Sample SBIN0001234
                  </button>
                </div>
                <div className="flex items-center rounded-2xl border-2 border-brand-subtle focus-within:border-brand-primary bg-white px-4 py-3.5 transition-all">
                  <input
                    type="text"
                    maxLength={11}
                    placeholder="SBIN0001234"
                    value={ifsc}
                    onChange={(e) => {
                      setIfsc(e.target.value.toUpperCase());
                      setBankError("");
                    }}
                    className="w-full text-lg sm:text-xl font-mono font-bold uppercase text-brand-text placeholder:text-slate-300 focus:outline-none bg-transparent"
                  />
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  Format hint: 4 letters + 0 + 6 alphanumeric (e.g. SBIN0001234)
                </p>
              </div>

              {bankError && (
                <p className="text-xs font-bold text-red-600 mb-4 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {bankError}
                </p>
              )}

              <Button
                variant="primary"
                onClick={handleBankSubmit}
                disabled={!accountNumber || !ifsc}
                className="py-4 text-base sm:text-lg"
              >
                <span>Review Application / समीक्षा करें</span>
                <ArrowRight size={20} />
              </Button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              STEP 6: Review Screen
          ═══════════════════════════════════════════════════════════════ */}
          {step === 6 && (
            <div>
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center mb-3">
                  <FileText size={24} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-1">
                  Review Your Details 📋
                </h1>
                <p className="text-sm text-brand-subtext">
                  Please verify before generating your e-Shram Card
                </p>
              </div>

              {/* Group 1: Mobile & Identity */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-4">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-brand-primary" />
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                      1. Identity & Mobile
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
                  >
                    Edit / बदलें
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Name: </span>
                    <span className="font-bold text-slate-800">{name || "Ramesh Kumar Sharma"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Mobile: </span>
                    <span className="font-bold text-slate-800">+91 {mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Aadhaar: </span>
                    <span className="font-bold font-mono text-slate-800">
                      XXXX XXXX {aadhaarRaw.slice(-4) || "1234"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">DOB: </span>
                    <span className="font-bold text-slate-800">{dob || "12/05/1988"} ({gender})</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 font-medium">Address: </span>
                    <span className="font-bold text-slate-800">{address || "Ward 7, Rampur, UP"}</span>
                  </div>
                </div>
              </div>

              {/* Group 2: Work & Profile */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-4">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-brand-primary" />
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                      2. Occupation & Background
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
                  >
                    Edit / बदलें
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Occupation: </span>
                    <span className="font-bold text-brand-primary capitalize">{occupation || "Delivery"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Income Tier: </span>
                    <span className="font-bold text-slate-800">{income || "10k-15k"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">State: </span>
                    <span className="font-bold text-slate-800">{stateName || "Uttar Pradesh"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Education: </span>
                    <span className="font-bold text-slate-800 capitalize">
                      {education ? education.replace(/_/g, " ") : "10th"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Marital Status: </span>
                    <span className="font-bold text-slate-800 capitalize">{maritalStatus || "Married"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Nominee: </span>
                    <span className="font-bold text-slate-800">{nomineeName || "None"}</span>
                  </div>
                </div>
              </div>

              {/* Group 3: Bank Details */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-6">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Landmark size={16} className="text-brand-primary" />
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                      3. Bank Account
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToStep(5)}
                    className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
                  >
                    Edit / बदलें
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Account No: </span>
                    <span className="font-bold font-mono text-slate-800">
                      ••••••••{accountNumber.slice(-4) || "3210"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">IFSC Code: </span>
                    <span className="font-bold font-mono text-slate-800">{ifsc || "SBIN0001234"}</span>
                  </div>
                </div>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-brand-subtle bg-white mb-6 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="w-5 h-5 rounded text-brand-primary mt-0.5 cursor-pointer accent-brand-primary"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-semibold">
                  I hereby declare that I am an unorganised worker and all information provided above is true and correct to the best of my knowledge.
                </span>
              </label>

              {/* Primary Confirmation Button */}
              <Button
                variant="primary"
                onClick={handleFinalSubmit}
                disabled={!consentChecked}
                className="py-4 text-base sm:text-lg"
              >
                <Sparkles size={20} />
                <span>Confirm & Generate e-Shram Card</span>
              </Button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              STEP 7: Confirmation / Mock UAN Card
          ═══════════════════════════════════════════════════════════════ */}
          {step === 7 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <CheckCircle2 size={36} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-brand-text mb-1">
                Registration Successful! 🎉
              </h1>
              <p className="text-sm text-brand-subtext mb-6">
                Your simulated e-Shram UAN digital card has been generated.
              </p>

              {/* Generated Card Component */}
              <MockUanCard
                data={{
                  uan: uanNumber || "1009 4821 7365",
                  name: name || "Ramesh Kumar Sharma",
                  dob: dob || "12/05/1988",
                  gender: gender || "Male",
                  occupation:
                    OCCUPATION_OPTIONS.find((o) => o.id === occupation)?.label ||
                    occupation ||
                    "Delivery / Courier",
                  state: stateName || "Uttar Pradesh",
                  phone: mobile || "9876543210",
                }}
              />
            </div>
          )}

        </Card>

      </div>

      {/* ─── Informational CSC Fallback Modal ───────────────────────────────── */}
      {showCscModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-brand-subtle text-left">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-brand-primary font-black">
                <Building2 size={20} />
                <span className="text-sm sm:text-base">CSC Offline Assistance</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCscModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed mb-6">
              <p>
                <strong>No phone or unable to receive OTP?</strong>
              </p>
              <p>
                You can visit your nearest <strong>Common Service Centre (CSC / ग्राहक सेवा केंद्र)</strong>. CSC operators can register you using your fingerprint or iris scan without requiring an active mobile OTP.
              </p>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs">
                💡 Registration at official CSC centres is 100% free under the Ministry of Labour & Employment.
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => setShowCscModal(false)}
              className="py-3 text-sm"
            >
              <span>Understood / समझ गया</span>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

// ─── Helper for Step Title ───────────────────────────────────────────────────
function getStepTitle(step) {
  switch (step) {
    case 1:
      return "Mobile Number";
    case 2:
      return "OTP Verification";
    case 3:
      return "Aadhaar e-KYC";
    case 4:
      return "Profile Details";
    case 5:
      return "Bank Details";
    case 6:
      return "Review";
    case 7:
      return "e-Shram Card";
    default:
      return "";
  }
}
