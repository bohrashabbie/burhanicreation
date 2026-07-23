"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function RequestQuotationSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+965",
    phone: "",
    email: "",
    service: "General Inquiry",
    details: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMessage(dict.contact.errorName);
      setStatus("error");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage(dict.contact.errorPhone);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ fullName: "", countryCode: "+965", phone: "", email: "", service: "General Inquiry", details: "" });
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || dict.contact.errorName);
        setStatus("error");
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <section id="request-quote" className="py-20 bg-surface-alt border-t border-hairline">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
              {dict.home.cta.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
              {dict.home.cta.heading}
            </h2>
            <p className="text-ink-muted text-base leading-relaxed">
              {dict.home.cta.subtext}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-card rounded-lg p-6 sm:p-8 lg:p-10 border border-hairline">
              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-ink mx-auto" />
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {dict.contact.successHeading}
                  </h3>
                  <p className="text-ink-muted text-sm max-w-md mx-auto">
                    {dict.contact.successBody}
                  </p>
                  <Button variant="outline" onClick={() => setStatus("idle")}>
                    {dict.contact.sendAnother}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-medium text-ink-muted mb-2">
                        {dict.contact.fullName}
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-hairline bg-surface text-ink placeholder-ink-light focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-ink-muted mb-2">
                        {dict.contact.phoneNumber}
                      </label>
                      <div className="flex gap-2">
                        <select
                          id="countryCode"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="px-2.5 py-3 rounded-md border border-hairline bg-surface text-ink text-sm shrink-0 focus:outline-none focus:ring-1 focus:ring-ink"
                        >
                          {siteConfig.countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>{c.code}</option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-md border border-hairline bg-surface text-ink placeholder-ink-light focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-ink-muted mb-2">
                        {dict.contact.emailAddressLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-hairline bg-surface text-ink placeholder-ink-light focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs font-medium text-ink-muted mb-2">
                        {dict.services.hero.eyebrow}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-hairline bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-ink text-sm transition-all"
                      >
                        <option value="General Inquiry">{lang === "ar" ? "استفسار عام" : "General inquiry"}</option>
                        <option value="Branding">{lang === "ar" ? "الهوية التجارية" : "Branding"}</option>
                        <option value="E-commerce">{lang === "ar" ? "تجارة إلكترونية" : "E-commerce"}</option>
                        <option value="Mobile App">{lang === "ar" ? "تطبيق جوال" : "Mobile app"}</option>
                        <option value="Website">{lang === "ar" ? "موقع إلكتروني" : "Website"}</option>
                        <option value="ERP">{lang === "ar" ? "نظام ERP" : "ERP platform"}</option>
                        <option value="UI/UX">{lang === "ar" ? "تصميم واجهات" : "UI/UX design"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-xs font-medium text-ink-muted mb-2">
                      {dict.contact.message}
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={3}
                      value={formData.details}
                      onChange={handleChange}
                      placeholder={dict.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-md border border-hairline bg-surface text-ink placeholder-ink-light focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white text-sm transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <Button type="submit" disabled={status === "submitting"} className="w-full">
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{dict.contact.sending}</span>
                      </>
                    ) : (
                      <>
                        <span>{dict.common.getQuote}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
