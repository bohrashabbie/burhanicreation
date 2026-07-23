"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import type { Dictionary } from "@/dictionaries/en";
import Button from "@/components/ui/Button";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+965",
    phone: "",
    email: "",
    message: "",
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
    if (!formData.email.trim()) {
      setErrorMessage(dict.contact.errorEmail);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ fullName: "", countryCode: "+965", phone: "", email: "", message: "" });
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
    <div className="bg-card rounded-lg p-8 sm:p-10 border border-hairline">
      <h3 className="font-display text-xl font-semibold text-ink mb-6">{dict.contact.formHeading}</h3>

      {status === "success" ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-ink mx-auto" />
          <h4 className="font-display text-xl font-semibold text-ink">{dict.contact.successHeading}</h4>
          <p className="text-ink-muted text-sm max-w-md mx-auto">{dict.contact.successBody}</p>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            {dict.contact.sendAnother}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                required
                className="w-full px-4 py-3 rounded-md border border-hairline bg-surface text-ink placeholder-ink-light focus:outline-none focus:ring-1 focus:ring-ink focus:bg-white text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-ink-muted mb-2">
              {dict.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
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
                <span>{dict.contact.submit}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
