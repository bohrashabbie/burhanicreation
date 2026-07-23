"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Globe2, Award, Sparkles, ArrowUpRight, Smartphone, Code2 } from "lucide-react";
import Link from "next/link";

export default function BentoGridShowcase() {
  return (
    <section className="py-24 bg-white border-t border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-wash text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Mastery</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            Why leading Kuwait brands <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-mid to-gold">choose Burhani Creation.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: 2-col span */}
          <div className="md:col-span-2 bg-surface rounded-3xl p-8 border border-hairline shadow-soft hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-primary-wash text-primary flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Lighthouse 98+ Standard
                </span>
              </div>

              <h3 className="font-display text-2xl font-extrabold text-ink group-hover:text-primary transition-colors">
                Sub-Second Speed & Modern Next.js Architecture
              </h3>

              <p className="text-sm text-ink-muted leading-relaxed">
                We engineer modern web applications on Next.js 14+ and TypeScript that load in under 0.5s. Optimized for high search engine visibility, zero cumulative layout shift, and instant mobile responsiveness.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-hairline text-center">
              <div className="p-3 rounded-xl bg-white border border-hairline">
                <span className="text-[10px] text-ink-light font-bold uppercase block">Speed</span>
                <span className="font-display text-lg font-extrabold text-emerald-600">0.4s</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-hairline">
                <span className="text-[10px] text-ink-light font-bold uppercase block">Lighthouse</span>
                <span className="font-display text-lg font-extrabold text-primary">99 / 100</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-hairline">
                <span className="text-[10px] text-ink-light font-bold uppercase block">SEO Score</span>
                <span className="font-display text-lg font-extrabold text-ink">100%</span>
              </div>
            </div>
          </div>

          {/* Card 2: KNET Payment Hub */}
          <div className="bg-surface rounded-3xl p-8 border border-hairline shadow-soft hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-wash text-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-ink group-hover:text-primary transition-colors">
                KNET & Gulf Localized Payments
              </h3>

              <p className="text-xs text-ink-muted leading-relaxed">
                Direct integration with Kuwait KNET, MyFatoorah, Tap, Apple Pay, and multi-currency Gulf routing.
              </p>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs font-bold text-primary">
              <span>KNET Compliant</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Bilingual Arabic/English */}
          <div className="bg-surface rounded-3xl p-8 border border-hairline shadow-soft hover:border-gold/40 transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-wash text-gold-deep flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-ink group-hover:text-gold-deep transition-colors">
                Arabic & English RTL Readiness
              </h3>

              <p className="text-xs text-ink-muted leading-relaxed">
                Flawless right-to-left layout adaptation, localized typography, and bilingual content layers.
              </p>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs font-bold text-gold-deep">
              <span>Kuwait / Gulf Standard</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: 2-col span */}
          <div className="relative md:col-span-2 lg:col-span-2 bg-ink text-white rounded-3xl p-8 border border-ink shadow-soft-lg flex flex-col justify-between space-y-6 overflow-hidden">
            {/* Ambient brand-gradient blobs */}
            <div className="absolute -top-16 -right-10 w-64 h-64 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-white/10 to-gold/15 border border-white/10 text-primary-light text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Hawally Studio Track Record</span>
              </div>

              <h3 className="font-display text-2xl font-extrabold text-white">
                170+ Projects Delivered Across 10 Years
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                From corporate rebrand campaigns for Virtus Holding to healthcare apps for Skinnovation Clinic, our Hawally studio delivers excellence consistently.
              </p>
            </div>

            <div className="relative pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary-light hover:text-gold-light hover:underline transition-colors"
              >
                <span>Browse All Case Studies</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 5: Mobile App Wireframes */}
          <div className="md:col-span-1 lg:col-span-2 bg-surface rounded-3xl p-8 border border-hairline shadow-soft hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-wash text-primary flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-ink group-hover:text-primary transition-colors">
                Agile Interactive UI Prototypes
              </h3>

              <p className="text-xs text-ink-muted leading-relaxed">
                We share interactive Figma prototypes for testing and sign-off before iOS & Android code development begins.
              </p>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs font-bold text-primary">
              <span>Zero-Risk Workflow</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
