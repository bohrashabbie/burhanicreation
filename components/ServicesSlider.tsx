"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { servicesData } from "@/data/services";
import type { Locale } from "@/lib/i18n";

export default function ServicesSlider({ lang }: { lang: Locale }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Use absolute values so logic holds for RTL (negative scrollLeft)
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setCanPrev(pos > 8);
    setCanNext(pos < max - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: amount * dir * (rtl ? -1 : 1), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 sm:mx-0 sm:px-0"
      >
        {servicesData.map((service) => (
          <div
            key={service.id}
            data-card
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <ServiceCard service={service} lang={lang} />
          </div>
        ))}
      </div>

      {/* Arrow controls */}
      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          disabled={!canPrev}
          aria-label={lang === "ar" ? "السابق" : "Previous"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          disabled={!canNext}
          aria-label={lang === "ar" ? "التالي" : "Next"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}
