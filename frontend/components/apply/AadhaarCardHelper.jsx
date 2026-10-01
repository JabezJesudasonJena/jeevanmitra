"use client";

import React from "react";

export default function AadhaarCardHelper() {
  return (
    <div className="w-full max-w-sm mx-auto my-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl select-none">
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5 px-1">
        <span>Sample Aadhaar Card / नमूना आधार कार्ड</span>
        <span className="text-brand-primary">12 Digits at Bottom</span>
      </div>
      <svg
        viewBox="0 0 320 180"
        className="w-full h-auto rounded-xl shadow-xs border border-slate-300 bg-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Card Background with subtle government tricolor accent */}
        <rect width="320" height="180" rx="8" fill="#FFFFFF" />
        <rect x="0" y="0" width="320" height="6" fill="#F97316" />
        <rect x="0" y="6" width="320" height="4" fill="#FFFFFF" />
        <rect x="0" y="10" width="320" height="6" fill="#16A34A" />

        {/* Header */}
        <circle cx="28" cy="30" r="10" fill="#E2E8F0" />
        <path d="M 28,24 L 28,36 M 22,30 L 34,30" stroke="#64748B" strokeWidth="1.5" />
        <text x="46" y="27" fontSize="8" fontWeight="bold" fill="#1E293B">भारत सरकार</text>
        <text x="46" y="36" fontSize="7" fontWeight="bold" fill="#475569">Government of India</text>

        {/* Aadhaar Logo Graphic */}
        <g transform="translate(280, 28) scale(0.6)">
          <path d="M-15,10 Q0,-18 15,10" fill="none" stroke="#DC2626" strokeWidth="3" />
          <circle cx="0" cy="5" r="5" fill="#DC2626" />
        </g>

        {/* Photo Box */}
        <rect x="20" y="48" width="55" height="68" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="47" cy="74" r="14" fill="#94A3B8" />
        <path d="M 28,108 C 28,94 66,94 66,108 Z" fill="#94A3B8" />

        {/* User Details Placeholder Lines */}
        <rect x="86" y="52" width="110" height="8" rx="2" fill="#334155" opacity="0.85" />
        <text x="88" y="59" fontSize="6.5" fontWeight="bold" fill="white">नाम / Name</text>
        
        <rect x="86" y="66" width="85" height="6" rx="2" fill="#94A3B8" opacity="0.6" />
        <text x="88" y="71" fontSize="5.5" fill="#475569">DOB: 12/05/1988</text>

        <rect x="86" y="78" width="55" height="6" rx="2" fill="#94A3B8" opacity="0.6" />
        <text x="88" y="83" fontSize="5.5" fill="#475569">लिंग / Gender: Male</text>

        {/* QR Code Placeholder */}
        <rect x="245" y="52" width="55" height="55" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
        <rect x="252" y="59" width="12" height="12" fill="#334155" />
        <rect x="281" y="59" width="12" height="12" fill="#334155" />
        <rect x="252" y="88" width="12" height="12" fill="#334155" />
        <rect x="270" y="75" width="10" height="10" fill="#64748B" />

        {/* Highlighted 12-Digit Number Box at bottom */}
        <rect
          x="40"
          y="130"
          width="240"
          height="32"
          rx="6"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        <text
          x="160"
          y="151"
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          letterSpacing="2.5"
          fill="#92400E"
          fontFamily="monospace, sans-serif"
        >
          XXXX XXXX 1234
        </text>
        <text
          x="160"
          y="124"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill="#D97706"
        >
          👇 Find this 12-digit number here / यहाँ 12 अंकों का नंबर देखें
        </text>
      </svg>
    </div>
  );
}
