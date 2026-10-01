/*
 * components/ui.jsx — Shared primitive UI components for JeevanMitra
 * Feature: Design system building blocks
 * Dependencies: lib/utils (cn helper)
 * Future: extend Button variants as needed; add Tooltip, Modal primitives here
 */
"use client";

import { cn } from "@/lib/utils";

// ── Button ────────────────────────────────────────────────────────────────────
export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-6 py-3.5 transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full select-none";

  const variants = {
    primary:
      "bg-brand-primary hover:bg-brand-hover text-white shadow-md shadow-brand-primary/20 border-2 border-brand-primary focus-visible:ring-brand-ring hover:-translate-y-0.5",
    secondary:
      "bg-white hover:bg-brand-light text-brand-primary border-2 border-brand-primary shadow-sm focus-visible:ring-brand-ring hover:-translate-y-0.5",
    ghost:
      "bg-transparent hover:bg-brand-light/80 text-brand-primary border-2 border-transparent focus-visible:ring-brand-ring",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 border-2 border-red-600 focus-visible:ring-red-400",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 border-2 border-emerald-600 focus-visible:ring-emerald-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl bg-brand-card shadow-sm border border-brand-subtle overflow-hidden text-brand-text",
        onClick &&
          "cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

// ── StepProgress ──────────────────────────────────────────────────────────────
export function StepProgress({ current, total }) {
  return (
    <div className="flex items-center gap-2 w-full">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 flex-1 rounded-full transition-all duration-300",
            i < current ? "bg-brand-primary" : "bg-brand-subtle"
          )}
        />
      ))}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ label, color = "gray", className = "" }) {
  const colors = {
    gray:   "bg-slate-100 text-slate-700 border-slate-200",
    green:  "bg-emerald-50 text-emerald-800 border-emerald-200",
    blue:   "bg-brand-light text-brand-primary border-brand-subtle",
    orange: "bg-amber-50 text-amber-800 border-amber-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border",
        colors[color],
        className
      )}
    >
      {label}
    </span>
  );
}
