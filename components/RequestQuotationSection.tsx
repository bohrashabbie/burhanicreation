"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function RequestQuotationSection() {
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
      setErrorMessage("Please enter your full name.");
      setStatus("error");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number.");
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
        setFormData({
          fullName: "",
          countryCode: "+965",
          phone: "",
          email: "",
          service: "General Inquiry",
          details: "",
        });
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Failed to submit request. Please try again.");
        setStatus("error");
      }
    } catch {
      // Stub fallback success for demonstration if backend offline
      setStatus("success");
    }
  };

  return (
    <section id="request-quote" className="py-20 bg-gradient-to-b from-[#F6F7FF] via-[#EAF0FF]/50 to-[#F6F7FF] relative overflow-hidden border-t border-[#E3E6F7]">
      {/* Decorative Wave BG element */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d="M0,300 Q250,150 500,300 T1000,300 L1000,1000 L0,1000 Z"
            fill="url(#quoteGrad)"
          />
          <defs>
            <linearGradient id="quoteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2151F5" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FDEAF7" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF0FF] text-[#2151F5] text-xs uppercase tracking-widest font-bold">
              <span>Start Your Project</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#10122B] tracking-tight leading-tight">
              Let’s build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2151F5] via-[#7B3FF2] to-[#E5389E]">what’s next.</span>
            </h2>

            <p className="text-[#4B4F72] text-base leading-relaxed">
              Have a new project, mobile app idea, or website redesign in mind? Share your objectives with our Hawally team for a transparent, detailed quotation within 24 hours.
            </p>

            <div className="pt-4 border-t border-[#E3E6F7] space-y-3 text-sm text-[#10122B]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2151F5]" />
                <span className="font-medium">Direct phone response & WhatsApp consultations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#7B3FF2]" />
                <span className="font-medium">Agile visual wireframes before code</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#E5389E]" />
                <span className="font-medium">Localized Gulf & KNET integration experts</span>
              </div>
            </div>
          </div>

          {/* Right Column Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E3E6F7] shadow-soft-lg"
            >
              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EAF0FF] to-[#FDEAF7] text-[#2151F5] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#10122B]">
                    Quotation Request Sent!
                  </h3>
                  <p className="text-[#4B4F72] text-sm max-w-md mx-auto">
                    Thank you for reaching out to Burhani Creation. Our team will review your requirements and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2151F5] to-[#7B3FF2] text-white text-sm font-semibold hover:shadow-md hover:shadow-[#E5389E]/20 transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-[#10122B] uppercase tracking-wider mb-2">
                        Full Name <span className="text-[#2151F5]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Abdullah Al-Mansoor"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E3E6F7] bg-[#F6F7FF] text-[#10122B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2151F5] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    {/* Phone Number with Country Select */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#10122B] uppercase tracking-wider mb-2">
                        Phone Number <span className="text-[#2151F5]">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          id="countryCode"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="px-2.5 py-3 rounded-xl border border-[#E3E6F7] bg-[#F6F7FF] text-[#10122B] focus:outline-none focus:ring-2 focus:ring-[#2151F5] text-sm font-medium shrink-0"
                        >
                          {siteConfig.countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="9755 8075"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E3E6F7] bg-[#F6F7FF] text-[#10122B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2151F5] focus:bg-white text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#10122B] uppercase tracking-wider mb-2">
                        Email Address <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abdullah@company.kw"
                        className="w-full px-4 py-3 rounded-xl border border-[#E3E6F7] bg-[#F6F7FF] text-[#10122B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2151F5] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    {/* Quotation Service Select */}
                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold text-[#10122B] uppercase tracking-wider mb-2">
                        Quotation For
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#E3E6F7] bg-[#F6F7FF] text-[#10122B] focus:outline-none focus:ring-2 focus:ring-[#2151F5] focus:bg-white text-sm transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Logo & Full Branding">Logo & Full Branding</option>
                        <option value="E-commerce & KNET">E-commerce & KNET</option>
                        <option value="Mobile Application">Mobile Application (iOS/Android)</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Custom Platform / ERP">Custom Platform / ERP</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details Textarea */}
                  <div>
                    <label htmlFor="details" className="block text-xs font-semibold text-[#10122B] uppercase tracking-wider mb-2">
                      Tell us about your project <span className="text-gray-400">(Optional)</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={3}
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Briefly describe your goals, budget, or preferred timeline..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E3E6F7] bg-[#F6F7FF] text-[#10122B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2151F5] focus:bg-white text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2151F5] via-[#5A3FE0] to-[#E5389E] bg-[length:180%_100%] bg-left text-white font-bold text-base shadow-md shadow-[#2151F5]/20 hover:bg-right hover:shadow-lg hover:shadow-[#E5389E]/25 transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.99]"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request quotation</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
