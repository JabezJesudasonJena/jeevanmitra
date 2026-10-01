/*
 * layout.js — Root layout for JeevanMitra (Next.js App Router)
 * Feature: Global layout, font loading, metadata
 * Dependencies: next/font/google (Plus Jakarta Sans), globals.css
 * Future: add i18n provider here when bilingual support is centralised
 */
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "JeevanMitra — Government Scheme Navigator",
  description:
    "Discover government welfare schemes, check your eligibility, verify documents, and access citizen services — built for India's unorganised workforce.",
  keywords: "government schemes, eshram, eligibility, welfare, gig workers, India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
