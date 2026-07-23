"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function ContactPage() {
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
      setErrorMessage("Please enter your full name.");
      setStatus("error");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      setStatus("error");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
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
        setFormData({
          fullName: "",
          countryCode: "+965",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <div className="space-y-0 pt-28">
      
      {/* Contact Hero */}
      <section className="py-20 bg-gradient-to-b from-surface via-primary-wash/30 to-surface border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-wash text-primary text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-tight">
            Let’s discuss <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-mid to-gold">your next project.</span>
          </h1>

          <p className="text-ink-muted text-lg sm:text-xl leading-relaxed">
            Visit our Hawally studio, call our phone line, or send us a WhatsApp message. We respond to all inquiries within 24 business hours.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Details Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-surface rounded-3xl p-8 border border-hairline space-y-6">
                <h3 className="font-display text-2xl font-bold text-ink">
                  Hawally Studio
                </h3>

                <div className="space-y-5 text-sm text-ink">
                  
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-wash text-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-ink-light block">Office Address</span>
                      <span className="font-semibold text-base leading-snug">{siteConfig.contact.address.formatted}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-wash text-primary flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-ink-light block">Phone Line</span>
                      <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-bold text-base hover:text-primary transition-colors">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-wash text-primary flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-ink-light block">WhatsApp Business</span>
                      <a href={siteConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-bold text-base text-primary hover:underline flex items-center gap-1">
                        <span>{siteConfig.contact.whatsapp}</span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-primary text-white">Chat Now</span>
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-wash text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-ink-light block">Email Address</span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-base hover:text-primary transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5 pt-3 border-t border-hairline">
                    <div className="w-10 h-10 rounded-xl bg-gold-wash text-ink flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-ink-light block">Working Hours</span>
                      <span className="font-medium text-xs text-ink-muted">{siteConfig.contact.hours}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Instant WhatsApp Action Button */}
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 text-white font-bold text-base shadow-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Start WhatsApp Conversation</span>
              </a>

            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-hairline shadow-soft-lg">
                <h3 className="font-display text-2xl font-bold text-ink mb-6">
                  Send Us a Direct Message
                </h3>

                {status === "success" ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-wash to-gold-wash text-primary flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="font-display text-2xl font-bold text-ink">
                      Message Received!
                    </h4>
                    <p className="text-ink-muted text-sm max-w-md mx-auto">
                      Thank you for contacting Burhani Creation. We have received your inquiry and will respond shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-mid text-white text-sm font-bold hover:shadow-md hover:shadow-gold/20 transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Jassem Al-Ghanim"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-hairline bg-surface text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-sm transition-all"
                      />
                    </div>

                    {/* Phone & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            id="countryCode"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="px-2.5 py-3 rounded-xl border border-hairline bg-surface text-ink text-sm font-medium shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
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
                            className="w-full px-4 py-3 rounded-xl border border-hairline bg-surface text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-sm transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jassem@company.kw"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-hairline bg-surface text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-sm transition-all"
                        />
                      </div>

                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                        Your Message <span className="text-gray-400">(Optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-hairline bg-surface text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-sm transition-all resize-none"
                      />
                    </div>

                    {/* Error Notice */}
                    {status === "error" && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary via-primary-mid to-gold bg-[length:180%_100%] bg-left text-white font-bold text-base shadow-md hover:bg-right hover:shadow-lg hover:shadow-gold/25 transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Google Map Embed Section */}
      <section className="py-12 bg-surface border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-hairline shadow-soft h-[400px] relative">
            <iframe
              title="Burhani Creation Hawally Location Map"
              src={siteConfig.contact.address.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
