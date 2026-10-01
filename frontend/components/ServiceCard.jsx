/*
 * ServiceCard.jsx — Reusable service tile for the Services section
 * Feature: Homepage services grid, /services page
 * Dependencies: lucide-react, next/link
 * Future: add service-level analytics click tracking
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * @param {string}  title       – service name
 * @param {string}  description – one-line description
 * @param {React.ElementType} Icon – Lucide icon
 * @param {string}  href        – target route
 * @param {string}  accent      – tailwind bg class for icon area (optional)
 */
export default function ServiceCard({ title, description, Icon, href, accent = "bg-brand-light text-brand-primary" }) {
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-2xl border border-brand-subtle p-5 h-full flex flex-col card-hover cursor-pointer">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${accent}`}>
          {Icon && <Icon size={21} strokeWidth={2} />}
        </div>

        {/* Text */}
        <h3 className="text-base font-bold text-brand-text mb-1.5 leading-snug group-hover:text-brand-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-brand-subtext leading-relaxed flex-1">
          {description}
        </p>

        {/* CTA arrow */}
        <div className="flex items-center gap-1 mt-4 text-sm font-semibold text-brand-primary opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200">
          Explore <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
