/*
 * Footer.jsx — Site-wide footer for JeevanMitra
 * Feature: Navigation, info links, branding, e-Shram placeholder
 * Dependencies: lucide-react, next/link
 * Future: replace e-Shram placeholder with official logo asset
 */
import Link from "next/link";
import { Landmark, ExternalLink } from "lucide-react";

const NAV_LINKS = [
  { href: "/",            label: "Home" },
  { href: "/schemes",     label: "Schemes" },
  { href: "/eligibility", label: "Eligibility" },
  { href: "/verify/doc",  label: "Verify Documents" },
  { href: "/services",    label: "Services" },
];

const INFO_LINKS = [
  { href: "/about",   label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms",   label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-subtle mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white">
                <Landmark size={17} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-lg text-brand-text">JeevanMitra</span>
            </Link>
            <p className="text-sm text-brand-subtext leading-relaxed max-w-xs">
              Helping India's unorganised workforce discover government schemes,
              check eligibility, and access citizen services — free, always.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold text-brand-subtext uppercase tracking-widest mb-3">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-text font-medium hover:text-brand-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-bold text-brand-subtext uppercase tracking-widest mb-3">
              Information
            </h3>
            <ul className="flex flex-col gap-2">
              {INFO_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-text font-medium hover:text-brand-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* e-Shram association */}
          <div>
            <h3 className="text-xs font-bold text-brand-subtext uppercase tracking-widest mb-3">
              Official Portal
            </h3>
            {/* Placeholder — replace inner content with <img> when official asset is available */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-brand-subtle bg-brand-light/50 mb-2"
              aria-label="e-Shram official portal logo placeholder"
            >
              <span className="text-sm font-extrabold text-brand-primary tracking-wide">e-Shram</span>
              <span className="text-[10px] text-brand-subtext font-medium leading-tight">
                Official<br/>Portal
              </span>
            </div>
            <p className="text-xs text-brand-subtext leading-relaxed">
              JeevanMitra complements the e-Shram portal. We are not affiliated
              with or endorsed by the Ministry of Labour &amp; Employment.
            </p>
            <a
              href="https://eshram.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-brand-primary hover:underline"
            >
              Visit e-Shram <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-subtle pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-subtext">
          <p>© {new Date().getFullYear()} JeevanMitra. All rights reserved. Demo prototype only.</p>
          <p className="flex items-center gap-1">
            Not an official government website.
          </p>
        </div>
      </div>
    </footer>
  );
}
