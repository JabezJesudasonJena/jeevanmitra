/*
 * app/verify/doc/page.js — Document Verification page
 * Feature: Explain and mock document verification workflow
 * Dependencies: components/Navbar, Footer, lucide-react
 * Future: replace mock upload handler with real API call to a verification service;
 *         stub function marked with "INTEGRATION POINT" comment
 */
"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import {
  Shield,
  ShieldCheck,
  Upload,
  FileText,
  CreditCard,
  IdCard,
  AlertCircle,
  CheckCircle2,
  Lock,
  Clock,
  X,
  ChevronDown,
} from "lucide-react";

const DOC_TYPES = [
  {
    id: "aadhaar",
    label: "Aadhaar Card",
    Icon: IdCard,
    description: "12-digit unique identity number issued by UIDAI",
    formats: "JPG, PNG, PDF — max 2 MB",
  },
  {
    id: "pan",
    label: "PAN Card",
    Icon: CreditCard,
    description: "Permanent Account Number issued by the Income Tax Dept.",
    formats: "JPG, PNG, PDF — max 2 MB",
  },
  {
    id: "ration",
    label: "Ration Card",
    Icon: FileText,
    description: "State-issued ration card (BPL/APL/AAY)",
    formats: "JPG, PNG, PDF — max 2 MB",
  },
  {
    id: "bank",
    label: "Bank Passbook",
    Icon: FileText,
    description: "Front page of your bank passbook showing account details",
    formats: "JPG, PNG, PDF — max 2 MB",
  },
];

const PROCESS_STEPS = [
  { Icon: Upload,       label: "Upload Document",  desc: "Select your document type and upload a clear scan or photo." },
  { Icon: ShieldCheck,  label: "Format Check",     desc: "We verify the file format, size, and image clarity automatically." },
  { Icon: FileText,     label: "Detail Extraction",desc: "Key fields are extracted for review — no data is sent externally." },
  { Icon: CheckCircle2, label: "Verification Result", desc: "Receive a readiness report indicating if the document is suitable for scheme applications." },
];

export default function VerifyDocPage() {
  const [selectedType, setSelectedType] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | processing | done | error
  const fileInputRef = useRef(null);

  function handleFile(f) {
    if (!f) return;
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(f.type)) {
      setStatus("error");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setStatus("error");
      return;
    }
    setFile(f);
    setStatus("idle");
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  // INTEGRATION POINT: replace this mock with a real API call
  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedType || !file) return;
    setStatus("processing");
    await new Promise((r) => setTimeout(r, 2000)); // simulate async verification
    setStatus("done");
  }

  function reset() {
    setFile(null);
    setSelectedType("");
    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">

          {/* Page header */}
          <div className="mb-10">
            <span className="inline-block text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-light px-3 py-1 rounded-full mb-3">
              Document Verification
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-3">
              Verify Your Documents
            </h1>
            <p className="text-sm text-brand-subtext leading-relaxed max-w-xl">
              Check that your identity documents are in the correct format and quality
              before submitting scheme applications. This is a <strong>demo workflow</strong> —
              no real verification is performed and no data leaves your device.
            </p>

            {/* Privacy note */}
            <div className="flex items-start gap-3 mt-4 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
              <Lock size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Privacy:</strong> In this demo, all processing happens locally. When a real
                verification API is integrated, documents will be transmitted over HTTPS and deleted
                immediately after verification.
              </span>
            </div>
          </div>

          {/* Supported Documents */}
          <section className="mb-10" aria-labelledby="doc-types-heading">
            <h2 id="doc-types-heading" className="text-base font-bold text-brand-text mb-4">
              Supported Document Types
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOC_TYPES.map(({ id, label, Icon, description, formats }) => (
                <div key={id} className="bg-white rounded-xl border border-brand-subtle p-4 flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-light text-brand-primary flex items-center justify-center flex-shrink-0">
                    <Icon size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-text">{label}</p>
                    <p className="text-xs text-brand-subtext">{description}</p>
                    <p className="text-[11px] text-brand-muted font-medium mt-1">{formats}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verification Process */}
          <section className="mb-10" aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-base font-bold text-brand-text mb-4">
              How the Process Works
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROCESS_STEPS.map(({ Icon, label, desc }, i) => (
                <li key={label} className="bg-white rounded-xl border border-brand-subtle p-4 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-brand-text">{label}</p>
                    <p className="text-xs text-brand-subtext leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Upload Form */}
          <section aria-labelledby="upload-heading">
            <h2 id="upload-heading" className="text-base font-bold text-brand-text mb-4">
              Upload a Document
              <span className="ml-2 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                DEMO / MOCK
              </span>
            </h2>

            {status === "done" ? (
              <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-8 text-center animate-fade-up">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="text-lg font-extrabold text-brand-text mb-1">Document Looks Good!</h3>
                <p className="text-sm text-brand-subtext mb-1">
                  <strong>{file?.name}</strong>
                </p>
                <p className="text-sm text-brand-subtext mb-6">
                  The document appears to be in a suitable format for scheme applications.
                  <br />
                  <span className="text-amber-600 font-medium">This is a mock result — no real verification was performed.</span>
                </p>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold border-2 border-brand-subtle text-brand-text text-sm hover:bg-surface-1 transition-colors cursor-pointer"
                >
                  Verify Another Document
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-subtle shadow-sm overflow-hidden">
                <div className="p-6 flex flex-col gap-5">

                  {/* Document type select */}
                  <div>
                    <label htmlFor="doc-type" className="block text-sm font-bold text-brand-text mb-2">
                      Document type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="doc-type"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-brand-subtle text-sm font-medium text-brand-text bg-white outline-none focus:border-brand-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select document type</option>
                        {DOC_TYPES.map(({ id, label }) => (
                          <option key={id} value={id}>{label}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-subtext pointer-events-none" />
                    </div>
                  </div>

                  {/* Drag-and-drop upload area */}
                  <div>
                    <p className="text-sm font-bold text-brand-text mb-2">
                      Upload file <span className="text-red-500">*</span>
                    </p>
                    <div
                      role="button"
                      tabIndex={0}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                      aria-label="Upload document — click or drag and drop"
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                        dragOver
                          ? "border-brand-primary bg-brand-light"
                          : file
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-brand-subtle bg-surface-1 hover:border-brand-primary hover:bg-brand-light/50"
                      }`}
                    >
                      {file ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText size={22} className="text-emerald-600" />
                          <div className="text-left">
                            <p className="text-sm font-bold text-brand-text">{file.name}</p>
                            <p className="text-xs text-brand-subtext">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setFile(null); setStatus("idle"); }}
                            className="ml-2 p-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                            aria-label="Remove file"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload size={28} className="text-brand-muted mx-auto mb-2" />
                          <p className="text-sm font-semibold text-brand-text mb-1">
                            Click to upload or drag &amp; drop
                          </p>
                          <p className="text-xs text-brand-subtext">JPG, PNG or PDF · Max 2 MB</p>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        className="sr-only"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                        aria-label="File upload input"
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-red-600" role="alert">
                        <AlertCircle size={13} /> Invalid file. Use JPG, PNG or PDF under 2 MB.
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button
                    type="submit"
                    disabled={!selectedType || !file || status === "processing"}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-brand-primary text-white text-base
                               hover:bg-brand-hover hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {status === "processing" ? (
                      <>
                        <Clock size={17} className="animate-spin" />
                        Verifying…
                      </>
                    ) : (
                      <>
                        <Shield size={17} />
                        Verify Document (Demo)
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
