"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  UtensilsCrossed,
  Globe,
  Sparkles,
  Bike,
  Plus,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import type { Bilingual } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const AUTOPLAY_MS = 3000;

interface AppItem {
  id: string;
  accent: string;
  icon: React.ElementType;
  device: "phone" | "browser";
  name: string;
  category: Bilingual;
  desc: Bilingual;
  screen: (lang: Locale) => React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Screens — flat, on-brand mockups rendered inside the device frame.        */
/* -------------------------------------------------------------------------- */

function StatusBar({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="text-[10px] font-semibold text-ink">{label}</span>
      <span className="h-1 w-16 rounded-full bg-ink/10" />
    </div>
  );
}

function BookingScreen(lang: Locale) {
  const doctors = [
    { initials: "RS", name: "Dr. Reem Al-Sabah", slot: lang === "ar" ? "٤:٣٠ م" : "4:30 PM" },
    { initials: "MK", name: "Dr. Mona Al-Kandari", slot: lang === "ar" ? "٥:١٥ م" : "5:15 PM" },
  ];
  return (
    <div className="flex h-full flex-col">
      <StatusBar label={lang === "ar" ? "الحجوزات" : "Bookings"} />
      <div className="mb-3 rounded-xl bg-[#2563eb] p-3 text-white">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          <p className="text-[10px] font-semibold">{lang === "ar" ? "تم تأكيد الموعد" : "Appointment confirmed"}</p>
        </div>
        <p className="text-[9px] text-white/80">{lang === "ar" ? "استشارة جلدية · اليوم" : "Derma consultation · Today"}</p>
      </div>
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-ink-light">
        {lang === "ar" ? "الأطباء المتاحون" : "Available doctors"}
      </p>
      <div className="space-y-2">
        {doctors.map((d) => (
          <div key={d.initials} className="flex items-center gap-2 rounded-lg border border-hairline p-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 text-[9px] font-semibold text-[#2563eb]">
              {d.initials}
            </span>
            <span className="flex-grow text-[9px] font-medium leading-tight text-ink">{d.name}</span>
            <span className="rounded-md bg-ink px-1.5 py-0.5 text-[8px] font-semibold text-white">{d.slot}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodScreen(lang: Locale) {
  const items = [
    { name: lang === "ar" ? "بيرياني كيرالا" : "Kerala Biryani", price: "1.750" },
    { name: lang === "ar" ? "دجاج مقلي" : "Fried Chicken", price: "2.200" },
  ];
  return (
    <div className="flex h-full flex-col">
      <StatusBar label={lang === "ar" ? "الطلب" : "Your order"} />
      <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#ea580c] p-3 text-white">
        <Bike className="h-4 w-4" />
        <div>
          <p className="text-[10px] font-semibold">{lang === "ar" ? "الطلب في الطريق" : "Order on the way"}</p>
          <p className="text-[9px] text-white/80">{lang === "ar" ? "يصل خلال ١٥ دقيقة" : "Arriving in 15 min"}</p>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((it) => (
          <div key={it.name} className="flex items-center gap-2 rounded-lg border border-hairline p-2">
            <span className="h-7 w-7 shrink-0 rounded-md bg-[#ea580c]/10" />
            <span className="flex-grow text-[9px] font-medium text-ink">{it.name}</span>
            <span className="text-[9px] font-semibold text-ink">{it.price} {lang === "ar" ? "د.ك" : "KD"}</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ea580c] text-white">
              <Plus className="h-2.5 w-2.5" />
            </span>
          </div>
        ))}
      </div>
      <button className="mt-auto flex items-center justify-center gap-1 rounded-lg bg-ink py-2 text-[10px] font-semibold text-white">
        {lang === "ar" ? "إتمام الطلب" : "Checkout"} · 3.950 {lang === "ar" ? "د.ك" : "KD"}
      </button>
    </div>
  );
}

function WebsiteScreen() {
  return (
    <div className="flex h-full flex-col">
      {/* Top nav */}
      <div className="mb-4 flex items-center justify-between">
        <span className="h-2 w-16 rounded-full bg-ink" />
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-ink/15" />
          <span className="h-1.5 w-6 rounded-full bg-ink/15" />
          <span className="h-1.5 w-8 rounded-full bg-[#0891b2]" />
        </div>
      </div>
      {/* Hero */}
      <span className="mb-2 h-1.5 w-14 rounded-full bg-[#0891b2]" />
      <span className="mb-2 h-3 w-3/4 rounded bg-ink" />
      <span className="mb-2 h-3 w-1/2 rounded bg-ink/70" />
      <span className="mb-3 h-2 w-2/3 rounded bg-ink-light/40" />
      <span className="mb-4 inline-flex h-6 w-24 rounded-md bg-ink" />
      {/* Cards */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-hairline p-2">
            <span className="mb-1.5 block h-8 rounded bg-[#0891b2]/10" />
            <span className="block h-1.5 w-full rounded bg-ink/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AiScreen(lang: Locale) {
  const bars = [45, 70, 55, 85, 60];
  return (
    <div className="flex h-full gap-3">
      {/* Chat side */}
      <div className="flex w-1/2 flex-col">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-ink-light">
          {lang === "ar" ? "المساعد" : "Assistant"}
        </p>
        <div className="space-y-1.5">
          <div className="max-w-[92%] rounded-lg rounded-es-sm bg-surface px-2 py-1 text-[8px] leading-snug text-ink">
            {lang === "ar" ? "كم عدد الطلبات اليوم؟" : "How many orders today?"}
          </div>
          <div className="ms-auto max-w-[92%] rounded-lg rounded-ee-sm bg-[#7c3aed] px-2 py-1 text-[8px] leading-snug text-white">
            {lang === "ar" ? "١٤٢ طلبًا — بزيادة ١٢٪." : "142 orders — up 12% today."}
          </div>
        </div>
      </div>
      {/* Stats side */}
      <div className="flex w-1/2 flex-col rounded-lg border border-hairline p-2.5">
        <p className="text-[8px] uppercase tracking-wide text-ink-light">{lang === "ar" ? "الإيرادات" : "Revenue"}</p>
        <p className="text-[13px] font-bold text-ink">4,820 {lang === "ar" ? "د.ك" : "KD"}</p>
        <div className="mt-auto flex h-14 items-end gap-1">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="w-2 rounded-sm bg-[#7c3aed]/70"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const apps: AppItem[] = [
  {
    id: "skinnovation",
    accent: "#2563eb",
    icon: CalendarCheck,
    device: "phone",
    name: "Skinnovation Clinic",
    category: { en: "Healthcare booking app", ar: "تطبيق حجز رعاية صحية" },
    desc: {
      en: "Appointment scheduling, consultation history, and loyalty rewards for a Salmiya derma clinic.",
      ar: "جدولة المواعيد وسجل الاستشارات وبرنامج الولاء لعيادة جلدية في السالمية.",
    },
    screen: BookingScreen,
  },
  {
    id: "kerala",
    accent: "#ea580c",
    icon: UtensilsCrossed,
    device: "phone",
    name: "Kerala Express",
    category: { en: "Food ordering app", ar: "تطبيق طلب طعام" },
    desc: {
      en: "Live order tracking and multi-branch menu routing for a Kuwait restaurant group.",
      ar: "تتبع الطلبات الحيّ وتوجيه القوائم متعددة الفروع لمجموعة مطاعم في الكويت.",
    },
    screen: FoodScreen,
  },
  {
    id: "waseet",
    accent: "#0891b2",
    icon: Globe,
    device: "browser",
    name: "Waseet Pools",
    category: { en: "Corporate website", ar: "موقع مؤسسي" },
    desc: {
      en: "A Next.js marketing site with localized SEO that grew organic leads by 140%.",
      ar: "موقع تسويقي على Next.js مع تحسين محركات بحث محلي رفع العملاء المحتملين بنسبة ١٤٠٪.",
    },
    screen: WebsiteScreen,
  },
  {
    id: "nexus",
    accent: "#7c3aed",
    icon: Sparkles,
    device: "browser",
    name: "Nexus AI",
    category: { en: "AI analytics assistant", ar: "مساعد تحليلات بالذكاء الاصطناعي" },
    desc: {
      en: "A bilingual assistant that answers questions and surfaces live business data on a dashboard.",
      ar: "مساعد ثنائي اللغة يجيب على الأسئلة ويعرض بيانات الأعمال الحية على لوحة تحكم.",
    },
    screen: AiScreen,
  },
];

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[240px]">
      <div className="rounded-[2.5rem] bg-ink p-3 shadow-soft-lg">
        <div className="relative aspect-[9/18] overflow-hidden rounded-[2rem] bg-white p-4">
          <div className="absolute inset-x-0 top-0 mx-auto mt-2 h-4 w-20 rounded-full bg-ink" />
          <div className="h-full pt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-xl bg-ink p-2.5 shadow-soft-lg">
        <div className="flex items-center gap-1.5 pb-2 ps-1">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function DeviceShowcase({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { devices } = dict.home;
  const [index, setIndex] = useState(0);

  // Auto-advance; keyed on index so a manual tap resets the 3s window.
  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % apps.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index]);

  const active = apps[index];
  const Frame = active.device === "phone" ? PhoneFrame : BrowserFrame;

  return (
    <section className="py-24 bg-card border-b border-hairline overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow={devices.eyebrow}
          heading={devices.heading}
          subtext={devices.subtext}
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Device stage */}
          <div className="lg:col-span-5">
            <div
              className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-3xl p-8 transition-colors duration-500 sm:min-h-[480px]"
              style={{ background: `linear-gradient(160deg, ${active.accent}16, ${active.accent}05)` }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  className="w-full"
                  initial={{ opacity: 0, x: 64 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -64 }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                >
                  <Frame>{active.screen(lang)}</Frame>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Tabs */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {apps.map((app, i) => {
                const isActive = i === index;
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-pressed={isActive}
                    className={`group relative w-full overflow-hidden rounded-xl border p-4 text-start transition-all duration-300 ${
                      isActive
                        ? "border-transparent bg-surface shadow-soft"
                        : "border-hairline bg-card hover:border-ink/20"
                    }`}
                    style={isActive ? { boxShadow: `inset 3px 0 0 ${app.accent}` } : undefined}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors"
                        style={{
                          backgroundColor: isActive ? app.accent : `${app.accent}14`,
                          color: isActive ? "#fff" : app.accent,
                        }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-grow">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <h3 className="font-display text-base font-semibold text-ink">{app.name}</h3>
                          <span className="text-[11px] font-medium text-ink-light">· {app.category[lang]}</span>
                        </div>
                        <p
                          className={`mt-0.5 text-sm leading-snug text-ink-muted transition-all ${
                            isActive ? "line-clamp-none" : "line-clamp-1"
                          }`}
                        >
                          {app.desc[lang]}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar for the active tab */}
                    {isActive && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-hairline">
                        <motion.span
                          key={index}
                          className="block h-full"
                          style={{ backgroundColor: app.accent }}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
