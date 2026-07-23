"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, Smartphone, Layout, TrendingUp, CheckCircle } from "lucide-react";

const heroSlides = [
  {
    badge: "Digital Excellence in Kuwait",
    headline: "Stunning & Creative Web Design",
    subtext: "We analyze your business to design a bespoke website which increases conversion rates and produces positive measurable results.",
    ctaText: "Explore Services",
    ctaHref: "/services",
    icon: Layout,
    accentTag: "Next.js & Modern Stacks",
  },
  {
    badge: "Omni-Channel Strategy",
    headline: "Results-Driven Digital Marketing",
    subtext: "Our digital marketing strategy aims for one thing: results. We use an omni-channel approach to drive repeat traffic and increase customer loyalty.",
    ctaText: "Get Started Today",
    ctaHref: "/contact",
    icon: TrendingUp,
    accentTag: "Proven ROI Campaigns",
  },
  {
    badge: "iOS & Android Engineering",
    headline: "Increase Revenue via Mobile Apps",
    subtext: "Our custom mobile apps work equally well across different screen sizes and devices, so you may tap into a larger Gulf audience base.",
    ctaText: "View Mobile Apps",
    ctaHref: "/services#mobile-app-development",
    icon: Smartphone,
    accentTag: "Agile UI Wireframes First",
  },
];

export default function HeroWave() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlideIndex];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-surface via-surface to-primary-wash/30 bg-mesh-brand">

      {/* Fine grid texture for depth */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] pointer-events-none" />

      {/* Background Ambient Gradient Blobs (blue + magenta) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl pointer-events-none animate-blob-float" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-gold/12 rounded-full blur-3xl pointer-events-none animate-blob-float" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-primary-mid/10 rounded-full blur-3xl pointer-events-none animate-blob-float" style={{ animationDelay: "-3s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content Left Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Live Availability & Eyebrow badge */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-wash border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.badge}</span>
              </motion.div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-hairline text-[11px] font-semibold text-ink">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Available for Q3/Q4 2026 Kuwait Projects</span>
              </div>
            </div>

            {/* Slide Text Content */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.08]">
                    {slide.headline.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className={
                          i >= slide.headline.split(" ").length - 2
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-mid to-gold"
                            : ""
                        }
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </h1>

                  <p className="text-ink-muted text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
                    {slide.subtext}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Navigation Controls & CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={slide.ctaHref}
                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary via-primary-mid to-gold bg-[length:180%_100%] bg-left text-white font-bold text-base shadow-lg shadow-primary/25 hover:bg-right hover:shadow-xl hover:shadow-gold/35 transition-all duration-500 active:scale-95 overflow-hidden"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white border border-hairline text-ink font-semibold text-base shadow-xs hover:border-primary/40 hover:bg-surface transition-all duration-200"
              >
                <span>View Portfolio</span>
                <ChevronRight className="w-4 h-4 text-ink-muted" />
              </Link>
            </div>

            {/* Slide Switcher Controls */}
            <div className="pt-6 flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-ink-light font-semibold">
                Explore Focus:
              </span>
              <div className="flex items-center gap-2">
                {heroSlides.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeSlideIndex === idx
                        ? "w-8 bg-primary"
                        : "w-2.5 bg-hairline hover:bg-primary/40"
                    }`}
                    aria-label={`Switch to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Visual Card with Signature Wave Motion */}
          <div className="lg:col-span-5 relative">
            {/* Ambient glow ring behind card */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary-mid/15 to-gold/20 rounded-[2rem] blur-2xl opacity-70 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-3xl bg-white p-8 border border-hairline shadow-soft-lg overflow-hidden group"
            >
              {/* Top edge brand gradient accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-primary-mid to-gold" />
              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-hairline">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-wash text-primary flex items-center justify-center">
                    <slide.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-ink text-base">
                      Burhani Studio
                    </h3>
                    <p className="text-xs text-ink-muted">Hawally, Kuwait</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-gold-wash to-primary-wash border border-gold/15 text-ink text-xs font-semibold">
                  {slide.accentTag}
                </span>
              </div>

              {/* Central Wave Dynamic Animation graphic */}
              <div className="py-10 text-center space-y-4">
                <div className="relative h-24 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 80" fill="none">
                    <defs>
                      <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0A1A3C" />
                        <stop offset="55%" stopColor="#16305F" />
                        <stop offset="100%" stopColor="#C6A257" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 40 Q75 10 150 40 T290 40"
                      stroke="url(#heroWaveGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="animate-draw-wave"
                    />
                    <path
                      d="M10 55 Q75 25 150 55 T290 55"
                      stroke="#C6A257"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.35"
                    />
                  </svg>
                </div>

                <p className="font-display text-2xl font-bold text-ink">
                  "Think Beyond the Wave."
                </p>
                <p className="text-xs text-ink-muted max-w-xs mx-auto">
                  Transforming Gulf businesses with forward-thinking digital design & engineering.
                </p>
              </div>

              {/* Bottom Quick Metric Card */}
              <div className="pt-6 border-t border-hairline grid grid-cols-2 gap-4 text-start">
                <div className="p-3.5 rounded-2xl bg-surface border border-hairline">
                  <span className="text-xs text-ink-muted block">Delivered Projects</span>
                  <span className="font-display text-xl font-extrabold text-primary">170+</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface border border-hairline">
                  <span className="text-xs text-ink-muted block">Client Rating</span>
                  <span className="font-display text-xl font-extrabold text-gold-deep">4.9 / 5.0</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
