// Simple cn utility — merges class names (no clsx/twMerge dependency needed)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
