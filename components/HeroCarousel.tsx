"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "@/data/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const slideImages = [
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1800&auto=format&fit=crop",
];

const AUTOPLAY_MS = 6000;

export default function HeroCarousel({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { hero } = dict.home;
  const slides = hero.slides;
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slides.length]);

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
  };

  const active = slides[index];

  return (
    <section
      className="relative isolate min-h-[560px] overflow-hidden border-b border-hairline bg-primary md:min-h-[640px]"
      aria-roledescription="carousel"
    >
      {/* Background image layers */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: AUTOPLAY_MS / 1000, ease: "linear" } }}
        >
          <Image
            src={slideImages[index]}
            alt=""
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Readability overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 -z-10 bg-primary/20" />

      <Container className="flex min-h-[560px] flex-col justify-center py-24 md:min-h-[640px] md:py-28">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
                {active.eyebrow}
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {active.heading}
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-white/80">{active.subtext}</p>
              <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
                <Button href={`/${lang}/contact`} size="lg">
                  {hero.ctaPrimary}
                </Button>
                <a
                  href={`/${lang}/projects`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  {hero.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stats strip */}
          <div className="mt-10 flex items-center gap-10 border-t border-white/15 pt-6">
            {siteConfig.stats.slice(0, 3).map((stat) => (
              <div key={stat.label[lang]}>
                <span className="block font-display text-2xl font-semibold text-white">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="text-xs text-white/70">{stat.label[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Controls */}
      <div className="absolute bottom-6 end-4 z-10 flex items-center gap-3 sm:end-8">
        <button
          type="button"
          onClick={() => { go(-1); resetTimer(); }}
          aria-label={lang === "ar" ? "الشريحة السابقة" : "Previous slide"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15"
        >
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => { go(1); resetTimer(); }}
          aria-label={lang === "ar" ? "الشريحة التالية" : "Next slide"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15"
        >
          <ChevronRight className="h-5 w-5 rtl:rotate-180" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-9 start-4 z-10 flex items-center gap-2 sm:start-8">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setIndex(i); resetTimer(); }}
            aria-label={`${lang === "ar" ? "الشريحة" : "Slide"} ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-brand" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
