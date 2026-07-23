"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, ShieldCheck, Smartphone, CheckCircle, Zap, ArrowRight } from "lucide-react";

export default function CapabilitiesShowcase() {
  const [activeTab, setActiveTab] = useState<"speed" | "knet" | "mobile">("speed");

  return (
    <section className="py-24 bg-surface border-t border-hairline relative overflow-hidden">
      {/* Ambient mesh blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-deep">
            Interactive Technical Playground
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            Engineering built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-mid to-gold">unmatched speed & security.</span>
          </h2>
          <p className="text-base text-ink-muted">
            Explore how we combine ultra-fast web frameworks, localized Gulf payment gateways, and agile mobile design sprints.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("speed")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "speed"
                ? "bg-gradient-to-r from-primary to-primary-mid text-white shadow-md shadow-primary/20"
                : "bg-white text-ink-muted border border-hairline hover:text-ink"
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>0.4s Load & Performance</span>
          </button>

          <button
            onClick={() => setActiveTab("knet")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "knet"
                ? "bg-gradient-to-r from-primary-mid to-primary-deep text-white shadow-md shadow-primary-mid/20"
                : "bg-white text-ink-muted border border-hairline hover:text-ink"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>KNET & Gulf Payments</span>
          </button>

          <button
            onClick={() => setActiveTab("mobile")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "mobile"
                ? "bg-gradient-to-r from-gold to-gold-hover text-white shadow-md shadow-gold/20"
                : "bg-white text-ink-muted border border-hairline hover:text-ink"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Agile Mobile Wireframes</span>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            
            {activeTab === "speed" && (
              <motion.div
                key="speed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-hairline shadow-soft-lg space-y-8"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-hairline pb-6">
                  <div>
                    <span className="text-xs uppercase font-bold text-primary">Google Lighthouse 98+ Standard</span>
                    <h3 className="font-display text-2xl font-bold text-ink">Next.js 14+ Server Architecture</h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>0.4s Global LCP</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-surface border border-hairline">
                    <span className="text-xs text-ink-light font-semibold block">Performance</span>
                    <span className="font-display text-3xl font-extrabold text-emerald-600">99</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface border border-hairline">
                    <span className="text-xs text-ink-light font-semibold block">Accessibility</span>
                    <span className="font-display text-3xl font-extrabold text-emerald-600">100</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface border border-hairline">
                    <span className="text-xs text-ink-light font-semibold block">Best Practices</span>
                    <span className="font-display text-3xl font-extrabold text-emerald-600">100</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface border border-hairline">
                    <span className="text-xs text-ink-light font-semibold block">SEO Rating</span>
                    <span className="font-display text-3xl font-extrabold text-emerald-600">100</span>
                  </div>
                </div>

                <p className="text-sm text-ink-muted leading-relaxed">
                  We leverage static site generation, edge caching, self-hosted fonts, and instant image optimization to ensure your site loads under half a second on mobile networks in Kuwait.
                </p>
              </motion.div>
            )}

            {activeTab === "knet" && (
              <motion.div
                key="knet"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-hairline shadow-soft-lg space-y-8"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-hairline pb-6">
                  <div>
                    <span className="text-xs uppercase font-bold text-primary">Localized Payment Integration</span>
                    <h3 className="font-display text-2xl font-bold text-ink">KNET, MyFatoorah & Tap Gateways</h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-primary-wash text-primary text-xs font-bold">
                    Kuwait Bank Standard
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-surface border border-hairline space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs flex items-center justify-center">1</div>
                    <h4 className="font-display text-sm font-bold text-ink">KNET Direct Routing</h4>
                    <p className="text-xs text-ink-muted">Instant Debit Card processing across all Kuwait banks.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface border border-hairline space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs flex items-center justify-center">2</div>
                    <h4 className="font-display text-sm font-bold text-ink">Multi-Currency Gulf</h4>
                    <p className="text-xs text-ink-muted">Auto-detect KWD, SAR, AED, BHD, OMR, QAR rates.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface border border-hairline space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs flex items-center justify-center">3</div>
                    <h4 className="font-display text-sm font-bold text-ink">Automated Receipts</h4>
                    <p className="text-xs text-ink-muted">WhatsApp & Email invoice notifications upon payment.</p>
                  </div>
                </div>

                <p className="text-sm text-ink-muted leading-relaxed">
                  Every e-commerce platform we launch comes fully compliant with Central Bank of Kuwait guidelines, giving your customers maximum trust during checkout.
                </p>
              </motion.div>
            )}

            {activeTab === "mobile" && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-hairline shadow-soft-lg space-y-8"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-hairline pb-6">
                  <div>
                    <span className="text-xs uppercase font-bold text-primary">Agile UI Prototyping</span>
                    <h3 className="font-display text-2xl font-bold text-ink">Interactive Design Sprint First</h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-gold-wash text-ink text-xs font-bold">
                    Zero Risk Guarantee
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-ink">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span><strong>Step 1:</strong> Interactive clickable Figma prototype shared for client testing.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span><strong>Step 2:</strong> Feature approval & user journey refinements signed off.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span><strong>Step 3:</strong> Native iOS (Swift) & Android (Kotlin/React Native) development sprint.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span><strong>Step 4:</strong> App Store & Google Play Store submission & publishing.</span>
                  </div>
                </div>

                <p className="text-sm text-ink-muted leading-relaxed">
                  We never code blindly. By testing interactive prototypes upfront, we eliminate guesswork, reduce revision cycles, and save valuable development time.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
