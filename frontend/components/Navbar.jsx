/*
 * Navbar.jsx — Top navigation bar for JeevanMitra
 * Feature: Site-wide navigation, mobile hamburger menu
 * Dependencies: lucide-react, next/link, next/navigation
 * Future: replace dummy avatar with real auth state; add active-link highlighting
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Landmark, User, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { href: "/",             label: "Home" },
  { href: "/schemes",      label: "Schemes" },
  { href: "/eligibility",  label: "Eligibility" },
  { href: "/verify/doc",   label: "Verify Documents" },
  { href: "/services",     label: "Services" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Elevate navbar on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-brand-subtle transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Logo / Wordmark ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="JeevanMitra home">
          <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm">
            <Landmark size={18} strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <span className="block font-extrabold text-lg text-brand-text tracking-tight">
              JeevanMitra
            </span>
            <span className="block text-[10px] text-brand-subtext font-medium tracking-wide hidden sm:block">
              Government Scheme Navigator
            </span>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                    active
                      ? "bg-brand-light text-brand-primary"
                      : "text-brand-text hover:bg-surface-1 hover:text-brand-primary"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop right actions ── */}
        <div className="hidden md:flex items-center gap-2">
          {/* Dummy avatar */}
          <button
            aria-label="User profile"
            className="w-9 h-9 rounded-full bg-brand-light text-brand-primary flex items-center justify-center hover:bg-brand-muted transition-colors cursor-pointer"
          >
            <User size={17} />
          </button>

          {/* Login/Signup — routes to / temporarily (auth not implemented) */}
          <Link href="/">
            <button
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-brand-primary text-white
                         hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-primary/25 hover:bg-brand-hover
                         transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Login / Sign Up
            </button>
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-brand-light transition-colors cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-brand-subtle bg-white animate-fade-in"
        >
          <ul className="px-4 py-3 flex flex-col gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? "bg-brand-light text-brand-primary"
                        : "text-brand-text hover:bg-surface-1"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-4 pb-4 flex flex-col gap-2">
            <Link href="/">
              <button className="w-full px-4 py-2.5 rounded-xl text-sm font-bold bg-brand-primary text-white hover:bg-brand-hover transition-colors cursor-pointer">
                Login / Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
