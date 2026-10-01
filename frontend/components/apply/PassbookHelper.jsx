"use client";

import React from "react";

export default function PassbookHelper() {
  return (
    <div className="w-full max-w-sm mx-auto my-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl select-none">
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5 px-1">
        <span>Sample Passbook / नमूना बैंक पासबुक</span>
        <span className="text-brand-primary">A/C & IFSC Position</span>
      </div>
      <svg
        viewBox="0 0 320 180"
        className="w-full h-auto rounded-xl shadow-xs border border-slate-300 bg-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Passbook / Cheque Page background */}
        <rect width="320" height="180" rx="8" fill="#F8FAFC" />
        <rect x="0" y="0" width="320" height="28" fill="#1E40AF" rx="4" />

        {/* Bank Header */}
        <circle cx="20" cy="14" r="7" fill="white" opacity="0.9" />
        <text x="34" y="17" fontSize="10" fontWeight="bold" fill="white">
          STATE BANK OF INDIA / भारतीय स्टेट बैंक
        </text>

        {/* Branch line */}
        <text x="14" y="42" fontSize="7" fill="#475569" fontWeight="600">
          Branch: Connaught Place, New Delhi - 110001
        </text>

        {/* Account Holder Name */}
        <rect x="14" y="48" width="140" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
        <text x="20" y="56" fontSize="6" fill="#1D4ED8" fontWeight="bold">Account Holder Name / खाताधारक का नाम</text>
        <text x="20" y="63" fontSize="6.5" fill="#1E293B" fontWeight="bold">RAMESH KUMAR SHARMA</text>

        {/* Highlighted Account Number Box */}
        <rect
          x="14"
          y="72"
          width="292"
          height="38"
          rx="6"
          fill="#ECFDF5"
          stroke="#10B981"
          strokeWidth="1.8"
        />
        <text x="22" y="84" fontSize="7.5" fontWeight="bold" fill="#047857">
          Account Number / बैंक खाता संख्या (9–18 Digits)
        </text>
        <text
          x="22"
          y="102"
          fontSize="13"
          fontWeight="bold"
          letterSpacing="1.8"
          fill="#065F46"
          fontFamily="monospace, sans-serif"
        >
          3098 7654 3210
        </text>

        {/* Highlighted IFSC Code Box */}
        <rect
          x="14"
          y="118"
          width="292"
          height="38"
          rx="6"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="1.8"
        />
        <text x="22" y="130" fontSize="7.5" fontWeight="bold" fill="#B45309">
          IFSC Code / बैंक आईएफएससी कोड (11 Characters)
        </text>
        <text
          x="22"
          y="148"
          fontSize="13"
          fontWeight="bold"
          letterSpacing="2"
          fill="#92400E"
          fontFamily="monospace, sans-serif"
        >
          SBIN0001234
        </text>
        <text x="190" y="130" fontSize="6.5" fill="#D97706" fontWeight="bold">
          (5th character is always '0')
        </text>

        {/* Footer help note */}
        <text x="160" y="170" textAnchor="middle" fontSize="7" fill="#64748B" fontWeight="bold">
          💡 Printed on page 1 of your passbook or front of your cheque
        </text>
      </svg>
    </div>
  );
}
