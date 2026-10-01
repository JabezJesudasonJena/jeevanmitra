// Scheme eligibility matcher
// Given a userProfile from localStorage, returns all matching schemes.

import schemes from "./schemes.json";

const INCOME_RANGES = {
  "under5k": 5000,
  "5k-10k": 10000,
  "10k-15k": 15000,
  "15k-25k": 25000,
  "above25k": 100000,
};

export function matchSchemes(profile) {
  if (!profile) return [];

  const income = INCOME_RANGES[profile.income] ?? 50000;
  const age = parseInt(profile.age, 10) || 0;
  const occupation = profile.occupation || "other";
  const hasAadhaar = profile.hasAadhaar === "yes";

  return schemes.filter((scheme) => {
    const e = scheme.eligibility;

    // Age check
    if (age < e.ageMin || age > e.ageMax) return false;

    // Income check
    if (income > e.incomeMax) return false;

    // Occupation check
    if (!e.occupations.includes(occupation)) return false;

    // Aadhaar check — if scheme needs Aadhaar but user doesn't have it, skip
    if (e.needsAadhaar && !hasAadhaar) return false;

    return true;
  });
}
