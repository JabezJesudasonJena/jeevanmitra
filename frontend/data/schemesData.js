/*
 * data/schemesData.js — Rich mock scheme data for homepage + /schemes pages
 * Feature: Available Schemes section, SchemeCard population
 * Dependencies: none
 * Future: replace export with API fetch from /api/schemes;
 *         keep this shape as the fallback / skeleton structure
 *
 * Shape: { id, name, authority, description, benefit, category, categoryLabel,
 *           eligibilityLabel, iconName }
 * iconName maps to Lucide icons resolved in consuming components.
 */

const SCHEMES_DATA = [
  {
    id: "eshram",
    name: "e-Shram Card",
    authority: "Ministry of Labour & Employment",
    description:
      "National identity card for unorganised workers providing access to social security benefits, accident insurance, and government schemes.",
    benefit: "₹2 lakh accidental death & disability insurance",
    category: "insurance",
    categoryLabel: "National ID",
    eligibilityLabel: "Age 16–59 · Unorganised worker · Not an income-tax payer",
    iconName: "IdCard",
  },
  {
    id: "pmsym",
    name: "PM-SYM Pension",
    authority: "Govt. of India · Ministry of Labour",
    description:
      "Voluntary pension scheme for unorganised workers. Government matches your monthly contribution for a guaranteed pension after 60.",
    benefit: "₹3,000 / month guaranteed pension at age 60",
    category: "pension",
    categoryLabel: "Pension",
    eligibilityLabel: "Age 18–40 · Income < ₹15,000/month",
    iconName: "PiggyBank",
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat (PM-JAY)",
    authority: "National Health Authority",
    description:
      "World's largest health assurance scheme giving low-income families cashless hospital treatment at government and empanelled private hospitals.",
    benefit: "₹5 lakh/year free family hospitalisation",
    category: "health",
    categoryLabel: "Healthcare",
    eligibilityLabel: "Low-income households · Aadhaar required",
    iconName: "HeartPulse",
  },
  {
    id: "pmjjby",
    name: "PM Jeevan Jyoti Bima",
    authority: "Ministry of Finance",
    description:
      "Affordable renewable term life insurance scheme offering ₹2 lakh cover at a minimal annual premium, auto-renewed from your bank account.",
    benefit: "₹2 lakh life cover at just ₹436/year",
    category: "insurance",
    categoryLabel: "Life Insurance",
    eligibilityLabel: "Age 18–50 · Bank account holder",
    iconName: "Shield",
  },
  {
    id: "pmsby",
    name: "PM Suraksha Bima",
    authority: "Ministry of Finance",
    description:
      "Ultra-affordable accidental death and disability insurance scheme renewed annually. One of the lowest-premium covers available.",
    benefit: "₹2 lakh accident cover at only ₹20/year",
    category: "insurance",
    categoryLabel: "Accident Cover",
    eligibilityLabel: "Age 18–70 · Bank account holder",
    iconName: "ShieldCheck",
  },
  {
    id: "pmjdy",
    name: "Jan Dhan Account",
    authority: "Ministry of Finance · PMJDY",
    description:
      "Zero-balance savings account with a free RuPay debit card, ₹10,000 overdraft facility, and built-in accident insurance cover.",
    benefit: "Zero-balance account + free RuPay card + ₹10k overdraft",
    category: "banking",
    categoryLabel: "Banking",
    eligibilityLabel: "Any Indian citizen without a bank account",
    iconName: "Landmark",
  },
];

export default SCHEMES_DATA;
