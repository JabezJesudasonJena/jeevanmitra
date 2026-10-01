/*
 * app/eligibility/page.js — Eligibility Checker page
 * Feature: Polished form UI for scheme eligibility pre-screening
 * Dependencies: components/Navbar, Footer, SectionHeading, lucide-react
 * Future: wire form submission to the existing /check logic or a real API;
 *         this is a standalone guided-form page separate from the /check wizard
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import {
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const OCCUPATIONS = [
  { id: "delivery",     label: "Delivery / Courier" },
  { id: "driver",       label: "Driver / Cab / Auto" },
  { id: "domestic",     label: "Domestic Worker" },
  { id: "construction", label: "Construction Worker" },
  { id: "vendor",       label: "Street Vendor / Hawker" },
  { id: "agriculture",  label: "Agricultural Worker" },
  { id: "other",        label: "Other Unorganised Worker" },
];

const INCOME_RANGES = [
  { id: "under5k",  label: "Below ₹5,000 / month" },
  { id: "5k-10k",   label: "₹5,000 – ₹10,000 / month" },
  { id: "10k-15k",  label: "₹10,000 – ₹15,000 / month" },
  { id: "15k-25k",  label: "₹15,000 – ₹25,000 / month" },
  { id: "above25k", label: "Above ₹25,000 / month" },
];

const EMPLOYMENT_TYPES = [
  { id: "selfEmployed", label: "Self-Employed / Own Business" },
  { id: "casualLabour", label: "Casual / Daily Wage Labour" },
  { id: "contractual",  label: "Contractual / Gig Platform Worker" },
  { id: "domestic",     label: "Domestic / Household Employment" },
];

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Other / Union Territory",
];

const INITIAL_FORM = {
  occupation: "",
  employmentType: "",
  age: "",
  income: "",
  state: "",
  hasAadhaar: "",
};

export default function EligibilityPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.occupation)     e.occupation     = "Please select your occupation.";
    if (!form.employmentType) e.employmentType = "Please select employment type.";
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 10 || Number(form.age) > 80)
      e.age = "Please enter a valid age between 10 and 80.";
    if (!form.income)         e.income         = "Please select your income range.";
    if (!form.state)          e.state          = "Please select your state.";
    if (!form.hasAadhaar)     e.hasAadhaar     = "Please select your Aadhaar status.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
    // Future integration point: POST form data to eligibility API here
  }

  function resetForm() { setForm(INITIAL_FORM); setSubmitted(false); setErrors({}); }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-light px-3 py-1 rounded-full mb-3">
              Eligibility Assistance
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-2">
              Check Your Scheme Eligibility
            </h1>
            <p className="text-sm text-brand-subtext leading-relaxed">
              Answer a few questions to discover which government schemes you may qualify for.
              This is a <strong>guidance tool</strong> — it does not constitute a final eligibility
              determination by any government authority.
            </p>

            {/* Disclaimer banner */}
            <div className="flex items-start gap-3 mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              <AlertCircle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Results are indicative only. Final eligibility is determined
                by the respective government departments. No personal data is transmitted or stored.
              </span>
            </div>
          </div>

          {submitted ? (
            /* ── Success State ── */
            <div className="bg-white rounded-2xl border border-brand-subtle shadow-sm p-8 text-center animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={34} />
              </div>
              <h2 className="text-xl font-extrabold text-brand-text mb-2">Profile Recorded</h2>
              <p className="text-sm text-brand-subtext mb-6 max-w-sm mx-auto">
                Based on your inputs, you may qualify for multiple government welfare schemes.
                Use the full eligibility wizard for personalised scheme matching.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/check">
                  <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-brand-primary text-white text-sm hover:bg-brand-hover transition-colors cursor-pointer">
                    Full Eligibility Wizard <ArrowRight size={16} />
                  </button>
                </Link>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold border-2 border-brand-subtle text-brand-text text-sm hover:bg-surface-1 transition-colors cursor-pointer"
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-brand-subtle shadow-sm overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-brand-subtle bg-surface-1">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-primary" />
                  <span className="text-sm font-bold text-brand-text">Eligibility Questionnaire</span>
                </div>
                <p className="text-xs text-brand-subtext mt-0.5">Takes about 1 minute · No registration required</p>
              </div>

              <div className="p-6 flex flex-col gap-6">

                {/* Occupation */}
                <fieldset>
                  <legend className="block text-sm font-bold text-brand-text mb-2.5">
                    What is your occupation? <span className="text-red-500">*</span>
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OCCUPATIONS.map(({ id, label }) => (
                      <label
                        key={id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                          form.occupation === id
                            ? "border-brand-primary bg-brand-light"
                            : "border-brand-subtle bg-white hover:border-brand-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          name="occupation"
                          value={id}
                          checked={form.occupation === id}
                          onChange={() => setField("occupation", id)}
                          className="sr-only"
                        />
                        <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                          form.occupation === id ? "border-brand-primary bg-brand-primary" : "border-brand-muted"
                        }`}>
                          {form.occupation === id && <span className="w-2 h-2 rounded-full bg-white block" />}
                        </span>
                        <span className="text-sm font-medium text-brand-text">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.occupation && <p className="text-xs text-red-500 mt-1.5" role="alert">{errors.occupation}</p>}
                </fieldset>

                {/* Employment Type */}
                <fieldset>
                  <legend className="block text-sm font-bold text-brand-text mb-2.5">
                    Employment type <span className="text-red-500">*</span>
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {EMPLOYMENT_TYPES.map(({ id, label }) => (
                      <label
                        key={id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                          form.employmentType === id
                            ? "border-brand-primary bg-brand-light"
                            : "border-brand-subtle bg-white hover:border-brand-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          name="employmentType"
                          value={id}
                          checked={form.employmentType === id}
                          onChange={() => setField("employmentType", id)}
                          className="sr-only"
                        />
                        <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                          form.employmentType === id ? "border-brand-primary bg-brand-primary" : "border-brand-muted"
                        }`}>
                          {form.employmentType === id && <span className="w-2 h-2 rounded-full bg-white block" />}
                        </span>
                        <span className="text-sm font-medium text-brand-text">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.employmentType && <p className="text-xs text-red-500 mt-1.5" role="alert">{errors.employmentType}</p>}
                </fieldset>

                {/* Age */}
                <div>
                  <label htmlFor="age-input" className="block text-sm font-bold text-brand-text mb-2">
                    Age (years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="age-input"
                    type="number"
                    inputMode="numeric"
                    min={10}
                    max={80}
                    value={form.age}
                    onChange={(e) => setField("age", e.target.value)}
                    placeholder="e.g. 28"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-brand-text bg-white outline-none transition-colors
                               placeholder:text-slate-300
                               ${errors.age ? "border-red-400 bg-red-50" : "border-brand-subtle focus:border-brand-primary"}`}
                    aria-describedby={errors.age ? "age-error" : undefined}
                  />
                  {errors.age && <p id="age-error" className="text-xs text-red-500 mt-1.5" role="alert">{errors.age}</p>}
                </div>

                {/* Monthly Income */}
                <div>
                  <label htmlFor="income-select" className="block text-sm font-bold text-brand-text mb-2">
                    Monthly income range <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="income-select"
                    value={form.income}
                    onChange={(e) => setField("income", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-brand-text bg-white outline-none transition-colors appearance-none cursor-pointer
                               ${errors.income ? "border-red-400 bg-red-50" : "border-brand-subtle focus:border-brand-primary"}`}
                    aria-describedby={errors.income ? "income-error" : undefined}
                  >
                    <option value="">Select income range</option>
                    {INCOME_RANGES.map(({ id, label }) => (
                      <option key={id} value={id}>{label}</option>
                    ))}
                  </select>
                  {errors.income && <p id="income-error" className="text-xs text-red-500 mt-1.5" role="alert">{errors.income}</p>}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state-select" className="block text-sm font-bold text-brand-text mb-2">
                    State / Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state-select"
                    value={form.state}
                    onChange={(e) => setField("state", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-brand-text bg-white outline-none transition-colors appearance-none cursor-pointer
                               ${errors.state ? "border-red-400 bg-red-50" : "border-brand-subtle focus:border-brand-primary"}`}
                  >
                    <option value="">Select your state</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-xs text-red-500 mt-1.5" role="alert">{errors.state}</p>}
                </div>

                {/* Aadhaar */}
                <fieldset>
                  <legend className="block text-sm font-bold text-brand-text mb-2.5">
                    Do you have an Aadhaar card? <span className="text-red-500">*</span>
                  </legend>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "yes",     label: "Yes, I have Aadhaar" },
                      { id: "applied", label: "Applied / in process" },
                      { id: "no",      label: "No, I don't have it yet" },
                    ].map(({ id, label }) => (
                      <label
                        key={id}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                          form.hasAadhaar === id
                            ? "border-brand-primary bg-brand-light"
                            : "border-brand-subtle bg-white hover:border-brand-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasAadhaar"
                          value={id}
                          checked={form.hasAadhaar === id}
                          onChange={() => setField("hasAadhaar", id)}
                          className="sr-only"
                        />
                        <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                          form.hasAadhaar === id ? "border-brand-primary bg-brand-primary" : "border-brand-muted"
                        }`}>
                          {form.hasAadhaar === id && <span className="w-2 h-2 rounded-full bg-white block" />}
                        </span>
                        <span className="text-sm font-medium text-brand-text">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.hasAadhaar && <p className="text-xs text-red-500 mt-1.5" role="alert">{errors.hasAadhaar}</p>}
                </fieldset>

              </div>

              {/* Submit */}
              <div className="px-6 pb-6">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-brand-primary text-white text-base
                             hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  Check My Eligibility <ChevronRight size={18} />
                </button>
                <p className="text-xs text-center text-brand-subtext mt-3">
                  For the full step-by-step wizard, visit the{" "}
                  <Link href="/check" className="text-brand-primary font-semibold hover:underline">
                    Eligibility Quiz
                  </Link>.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
