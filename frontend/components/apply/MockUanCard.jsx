"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, CheckCircle2, ArrowRight, ShieldCheck, Printer, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";

export default function MockUanCard({ data, schemeName = "e-Shram Card" }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const uan = data?.uan || "1009 4821 7365";
  const name = data?.name || "Ramesh Kumar Sharma";
  const dob = data?.dob || "12/05/1988";
  const gender = data?.gender || "Male";
  const occupation = data?.occupation || "Delivery / Courier";
  const state = data?.state || "Uttar Pradesh";
  const mobile = data?.phone || "9876543210";

  function handleMockDownload() {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      // Simulate file download creation
      const element = document.createElement("a");
      const file = new Blob([
        `=====================================================\n` +
        `GOVERNMENT OF INDIA - MINISTRY OF LABOUR & EMPLOYMENT\n` +
        `E-SHRAM NATIONAL SOCIAL SECURITY CARD (SIMULATION)\n` +
        `=====================================================\n\n` +
        `UNIVERSAL ACCOUNT NUMBER (UAN): ${uan}\n` +
        `NAME: ${name.toUpperCase()}\n` +
        `DOB: ${dob}\n` +
        `GENDER: ${gender.toUpperCase()}\n` +
        `PRIMARY OCCUPATION: ${occupation.toUpperCase()}\n` +
        `STATE: ${state.toUpperCase()}\n` +
        `MOBILE: +91 ${mobile}\n` +
        `ISSUED VIA: JeevanMitra Citizen Welfare Platform\n` +
        `STATUS: Registered (Simulated Demo Preview)\n\n` +
        `NOTE: This is a demo preview card generated on JeevanMitra.\n` +
        `Official e-Shram cards are issued through eshram.gov.in.\n` +
        `=====================================================\n`
      ], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `eShram_Card_${uan.replace(/\s+/g, "_")}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 900);
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Visual Identity Card Container */}
      <div className="w-full max-w-md bg-gradient-to-br from-white via-slate-50 to-blue-50/40 rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-brand-primary/20 relative overflow-hidden text-brand-text mb-6">
        {/* Decorative Tricolor Top Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

        {/* Demo Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] pointer-events-none select-none opacity-8 text-4xl sm:text-5xl font-black text-brand-primary tracking-widest uppercase">
          DEMO PREVIEW
        </div>

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4 mt-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
              🇮🇳
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-black text-slate-800 uppercase tracking-tight">
                Ministry of Labour & Employment
              </p>
              <p className="text-[10px] text-slate-500 font-semibold">
                Government of India · श्रम एवं रोजगार मंत्रालय
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-brand-primary text-[10px] font-extrabold border border-blue-200">
              e-Shram UAN
            </span>
          </div>
        </div>

        {/* Card Body: Photo + Details + QR */}
        <div className="grid grid-cols-12 gap-3.5 items-center">
          {/* Photo Avatar */}
          <div className="col-span-4 flex flex-col items-center">
            <div className="w-20 h-24 sm:w-22 sm:h-28 rounded-2xl bg-gradient-to-b from-blue-100 to-indigo-100 border-2 border-brand-primary/30 flex flex-col items-center justify-center text-brand-primary shadow-xs overflow-hidden relative">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-black text-base mb-1">
                {name.charAt(0).toUpperCase()}
              </div>
              <span className="text-[9px] font-bold text-slate-600 uppercase text-center px-1 truncate w-full">
                {name.split(" ")[0]}
              </span>
              <div className="absolute bottom-0 inset-x-0 bg-brand-primary text-[8px] text-white text-center py-0.5 font-bold">
                VERIFIED
              </div>
            </div>
          </div>

          {/* Core Info */}
          <div className="col-span-8 flex flex-col gap-1.5 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Name / नाम</p>
              <p className="font-extrabold text-sm sm:text-base text-brand-text leading-tight truncate">
                {name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">DOB / जन्मतिथि</p>
                <p className="font-bold text-slate-800">{dob}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Gender / लिंग</p>
                <p className="font-bold text-slate-800">{gender}</p>
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase font-bold text-slate-400">Occupation / व्यवसाय</p>
              <p className="font-bold text-brand-primary truncate">{occupation}</p>
            </div>

            <div>
              <p className="text-[9px] uppercase font-bold text-slate-400">State / राज्य</p>
              <p className="font-bold text-slate-700">{state}</p>
            </div>
          </div>
        </div>

        {/* UAN Number Highlight Box */}
        <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-blue-600 via-brand-primary to-indigo-700 text-white flex flex-col items-center shadow-md">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-blue-100 mb-0.5">
            Universal Account Number (UAN) / सार्वभौमिक खाता संख्या
          </p>
          <p className="text-xl sm:text-2xl font-black tracking-widest font-mono">
            {uan}
          </p>
        </div>

        {/* Card Footer: Mock QR & Security Barcode */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5 font-bold text-emerald-700">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Digital e-KYC Authenticated</span>
          </div>
          <span className="font-mono text-[9px] text-slate-400">
            JM-{Date.now().toString().slice(-6)}
          </span>
        </div>
      </div>

      {/* Official Government Portal Note */}
      <div className="w-full max-w-md bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 mb-6 flex items-start gap-2.5 text-left">
        <span className="text-base select-none">⚠️</span>
        <p className="leading-relaxed">
          <strong className="font-extrabold">Demo Preview Notice:</strong> This is a simulated preview card for test purposes. Your real e-Shram UAN will be issued on the official government portal (<strong>eshram.gov.in</strong>).
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
        <Button
          variant="secondary"
          onClick={handleMockDownload}
          disabled={downloading}
          className="flex-1 py-3.5 text-sm sm:text-base"
        >
          {downloading ? (
            <>
              <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
              <span>Generating File...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download Preview Card</span>
            </>
          )}
        </Button>

        <Link href="/dashboard" className="flex-1">
          <Button variant="primary" className="w-full py-3.5 text-sm sm:text-base">
            <span>Go to Dashboard</span>
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
