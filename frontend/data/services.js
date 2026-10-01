/*
 * data/services.js — Static services data for JeevanMitra
 * Feature: Services section (homepage + /services page)
 * Dependencies: none (icon components passed separately by consumers)
 * Future: replace with API-fetched service catalog
 */

/**
 * Each entry:
 *   id          – unique slug
 *   title       – display name
 *   description – one-line description shown on the card
 *   iconName    – string key mapped to a Lucide icon in the consuming component
 *   href        – internal route
 *   accent      – tailwind classes for icon container color
 */
const SERVICES = [
  {
    id: "schemes",
    title: "Government Schemes",
    description: "Browse 100+ central and state welfare schemes across pension, insurance, housing, and skill development.",
    iconName: "FileText",
    href: "/schemes",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    id: "eligibility",
    title: "Eligibility Checker",
    description: "Answer a few quick questions to instantly discover which schemes you qualify for — no documents needed upfront.",
    iconName: "CheckCircle2",
    href: "/eligibility",
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "verify-doc",
    title: "Document Verification",
    description: "Verify Aadhaar, PAN, and other identity documents securely before submitting your scheme applications.",
    iconName: "ShieldCheck",
    href: "/verify/doc",
    accent: "bg-violet-50 text-violet-600",
  },
  {
    id: "citizen-services",
    title: "Citizen Services",
    description: "Access guided help for ration card, e-Shram registration, Jan Dhan account, and more citizen services.",
    iconName: "Users",
    href: "/services",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    id: "benefits",
    title: "Benefits Discovery",
    description: "Proactively surface benefits you may be missing — based on your occupation, location, and profile.",
    iconName: "Sparkles",
    href: "/eligibility",
    accent: "bg-pink-50 text-pink-600",
  },
  {
    id: "profile",
    title: "Profile & Credentials",
    description: "Manage your verified profile and application history across all JeevanMitra services in one place.",
    iconName: "UserCircle",
    href: "/dashboard",
    accent: "bg-cyan-50 text-cyan-600",
  },
];

export default SERVICES;
