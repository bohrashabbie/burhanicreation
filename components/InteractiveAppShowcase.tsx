"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ShoppingBag, Calendar, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Bell } from "lucide-react";

export default function InteractiveAppShowcase() {
  const [activeScreen, setActiveScreen] = useState<"booking" | "knet" | "dashboard">("booking");

  return (
    <div className="relative bg-gradient-to-br from-white via-surface to-primary-wash/30 rounded-3xl p-6 sm:p-10 border border-hairline shadow-soft-lg space-y-8 overflow-hidden">
      {/* Ambient corner glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary-wash to-gold-wash text-primary text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Mobile Showcase</span>
          </div>
          <h3 className="font-display text-2xl font-extrabold text-ink">
            Experience Our Mobile App UI
          </h3>
        </div>

        {/* Screen Toggles */}
        <div className="flex items-center gap-2 bg-surface p-1.5 rounded-full border border-hairline">
          <button
            onClick={() => setActiveScreen("booking")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeScreen === "booking"
                ? "bg-gradient-to-r from-primary to-primary-mid text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Clinic Booking
          </button>
          <button
            onClick={() => setActiveScreen("knet")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeScreen === "knet"
                ? "bg-gradient-to-r from-primary to-primary-mid text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            KNET E-Commerce
          </button>
          <button
            onClick={() => setActiveScreen("dashboard")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeScreen === "dashboard"
                ? "bg-gradient-to-r from-primary to-primary-mid text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            POS Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Interactive Phone Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-[290px] sm:w-[320px] h-[580px] bg-ink rounded-[48px] p-3 shadow-2xl border-4 border-gray-800 ring-1 ring-black/10">
            
            {/* Dynamic Island / Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-900 border border-gray-700" />
            </div>

            {/* Screen Screen Wrapper */}
            <div className="w-full h-full bg-surface rounded-[38px] overflow-hidden pt-10 px-4 pb-6 relative flex flex-col justify-between text-ink">
              
              <AnimatePresence mode="wait">
                
                {/* SCREEN 1: Booking App */}
                {activeScreen === "booking" && (
                  <motion.div
                    key="booking"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-ink-light font-bold uppercase">Welcome Back</span>
                        <h4 className="font-display font-extrabold text-base">Skinnovation Clinic</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary-wash text-primary flex items-center justify-center">
                        <Bell className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary to-primary-mid text-white space-y-2 shadow-md">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Confirmed Booking</span>
                      <p className="font-display text-xs font-bold">Derma Consultation</p>
                      <div className="flex items-center justify-between text-[11px] text-blue-100 pt-1 border-t border-white/20">
                        <span>Today, 4:30 PM</span>
                        <span>Salmiya Branch</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-ink-light uppercase">Available Doctors</span>
                      <div className="p-2.5 rounded-xl bg-white border border-hairline flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gold-wash font-bold text-xs flex items-center justify-center">RS</div>
                        <div>
                          <p className="font-bold text-xs">Dr. Reem Al-Sabah</p>
                          <p className="text-[10px] text-ink-muted">Dermatology Specialist</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-ink text-white text-xs font-bold shadow-xs">
                      Book Next Session
                    </button>
                  </motion.div>
                )}

                {/* SCREEN 2: KNET Checkout */}
                {activeScreen === "knet" && (
                  <motion.div
                    key="knet"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-sm">Al-Essa Healthcare</span>
                      <span className="px-2 py-0.5 rounded-md bg-primary-wash text-primary text-[10px] font-bold">KNET Verified</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-hairline space-y-2 text-xs">
                      <div className="flex justify-between font-bold">
                        <span>Medical Equipment Order</span>
                        <span>45.000 KWD</span>
                      </div>
                      <div className="text-[10px] text-ink-muted flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>KNET Gateway Selected</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Payment Authorized</span>
                      </div>
                      <p className="text-[10px]">Ref: KNET-KW-982342</p>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-mid text-white text-xs font-bold shadow-md">
                      Download PDF Invoice
                    </button>
                  </motion.div>
                )}

                {/* SCREEN 3: Dashboard */}
                {activeScreen === "dashboard" && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-sm">Retail ERP POS</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-ink text-white space-y-1">
                      <span className="text-[10px] text-gray-400">Daily Revenue</span>
                      <p className="font-display text-xl font-extrabold text-primary-light">1,480.00 KWD</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-hairline">
                        <span className="text-[10px] text-ink-light block">Orders</span>
                        <span className="font-bold">142 Today</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-hairline">
                        <span className="text-[10px] text-ink-light block">Stock</span>
                        <span className="font-bold text-emerald-600">98% Synced</span>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Bottom Home Indicator Bar */}
              <div className="w-24 h-1 bg-gray-300 rounded-full mx-auto mt-4" />
            </div>

          </div>
        </div>

        {/* Right Explanatory Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-primary tracking-widest">
              Agile Mobile Engineering
            </span>
            <h3 className="font-display text-3xl font-extrabold text-ink leading-tight">
              Interactive wireframes delivered before coding begins.
            </h3>
          </div>

          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            At Burhani Creation in Hawally, we believe in complete visual transparency. We build high-fidelity, clickable prototypes for your mobile application so you can test features and user flows before development starts.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-semibold text-ink">
              <div className="w-6 h-6 rounded-full bg-primary-wash text-primary flex items-center justify-center text-xs">✓</div>
              <span>Native Swift (iOS) & Kotlin / React Native (Android)</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-ink">
              <div className="w-6 h-6 rounded-full bg-gold-wash text-gold-deep flex items-center justify-center text-xs">✓</div>
              <span>Integrated KNET, MyFatoorah, Tap, Apple Pay & Google Pay</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-ink">
              <div className="w-6 h-6 rounded-full bg-primary-wash text-primary flex items-center justify-center text-xs">✓</div>
              <span>Full App Store & Google Play Store publishing management</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
