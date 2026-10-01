/*
 * SchemeCard.jsx — Reusable scheme display card
 * Feature: Scheme browsing, scheme listing sections
 * Dependencies: lucide-react, next/link, components/ui
 * Future: wire "View Details" to a real scheme detail page or modal;
 *         swap mock data prop with API response shape when backend is ready
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui";

/**
 * @param {Object} scheme       – scheme data object (see data/schemes.js for shape)
 * @param {React.ElementType} Icon – Lucide icon component for this scheme
 * @param {boolean} showApply   – show "Apply Now" instead of "View Details"
 */
export default function SchemeCard({ scheme, Icon, showApply = false }) {
  const href = `/apply/${scheme.id}`;

  const categoryColorMap = {
    insurance: "blue",
    pension: "green",
    health: "orange",
    banking: "blue",
    labour: "gray",
    skill: "green",
  };
  const badgeColor = categoryColorMap[scheme.category] ?? "gray";

  return (
    <div className="bg-white rounded-2xl border border-brand-subtle shadow-sm card-hover flex flex-col overflow-hidden">
      {/* Card header */}
      <div className="p-5 flex items-start gap-4 border-b border-brand-subtle">
        <div className="w-11 h-11 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center flex-shrink-0">
          {Icon && <Icon size={22} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-base font-extrabold text-brand-text leading-tight">{scheme.name}</h3>
            <Badge label={scheme.categoryLabel} color={badgeColor} className="text-[11px] shrink-0" />
          </div>
          <p className="text-xs text-brand-subtext font-medium mt-0.5">{scheme.authority}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-sm text-brand-subtext leading-relaxed mb-4 flex-1">
          {scheme.description}
        </p>

        {/* Key benefit highlight */}
        <div className="bg-brand-light rounded-xl px-4 py-3 mb-4">
          <p className="text-[11px] font-bold text-brand-primary uppercase tracking-wider mb-0.5">
            Key Benefit
          </p>
          <p className="text-sm font-bold text-brand-text">{scheme.benefit}</p>
        </div>

        {/* Eligibility indicator */}
        <div className="flex items-center gap-2 text-xs text-brand-subtext mb-5">
          <span className="font-semibold">Eligibility:</span>
          <span>{scheme.eligibilityLabel}</span>
        </div>

        {/* CTA */}
        <Link href={href}>
          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-brand-primary text-brand-primary
                             hover:bg-brand-primary hover:text-white transition-all duration-200 cursor-pointer">
            {showApply ? "Apply Now" : "View Details"}
            <ArrowRight size={15} />
          </button>
        </Link>
      </div>
    </div>
  );
}
