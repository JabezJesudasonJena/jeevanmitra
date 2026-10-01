/*
 * SectionHeading.jsx — Reusable section title + subtitle block
 * Feature: Shared layout component
 * Dependencies: none
 * Future: add localisation prop for bilingual content
 */

export default function SectionHeading({ label, title, subtitle, align = "center", className = "" }) {
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";
  return (
    <div className={`max-w-2xl ${alignClass} mb-10 ${className}`}>
      {label && (
        <span className="inline-block text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 bg-brand-light px-3 py-1 rounded-full">
          {label}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-2 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-brand-subtext leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
