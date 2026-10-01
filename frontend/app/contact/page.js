/*
 * app/contact/page.js — Contact placeholder page
 * Feature: Info pages (footer links)
 * Future: wire form to an email/backend service
 */
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    // INTEGRATION POINT: POST to contact API
    setSent(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-16">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center">
              <Mail size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-text">Contact Us</h1>
          </div>

          {sent ? (
            <div className="bg-white rounded-2xl border border-brand-subtle p-8 text-center animate-fade-up">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="text-lg font-extrabold text-brand-text mb-2">Message Received</h2>
              <p className="text-sm text-brand-subtext">
                Thank you for reaching out. This is a demo — no message was actually sent.
                In production, your message would be delivered to the JeevanMitra team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-subtle shadow-sm p-6 flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-bold text-brand-text mb-1.5">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-brand-subtle text-sm font-medium text-brand-text bg-white outline-none focus:border-brand-primary transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-bold text-brand-text mb-1.5">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-brand-subtle text-sm font-medium text-brand-text bg-white outline-none focus:border-brand-primary transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-msg" className="block text-sm font-bold text-brand-text mb-1.5">Message</label>
                <textarea
                  id="contact-msg"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-brand-subtle text-sm font-medium text-brand-text bg-white outline-none focus:border-brand-primary transition-colors resize-none"
                  placeholder="Your message…"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold bg-brand-primary text-white text-sm hover:bg-brand-hover hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Send Message (Demo)
              </button>
              <p className="text-xs text-center text-brand-subtext">
                This is a demo — no message is actually transmitted.
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
