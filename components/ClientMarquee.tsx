"use client";

import React from "react";
import { clientsData } from "@/data/clients";

export default function ClientMarquee() {
  // Duplicate for seamless infinite marquee loop
  const doubleClients = [...clientsData, ...clientsData];

  return (
    <section className="py-12 bg-white border-y border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest font-bold text-gold-deep">
          Trusted by brands across Kuwait & the Gulf
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-8 sm:gap-12">
          {doubleClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface border border-hairline hover:border-primary/40 transition-all duration-300 hover:shadow-sm cursor-pointer shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-hairline flex items-center justify-center font-display font-bold text-sm text-ink-muted group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                {client.symbol}
              </div>
              <div className="flex flex-col text-start">
                <span className="font-display font-bold text-sm text-ink group-hover:text-primary transition-colors">
                  {client.name}
                </span>
                <span className="text-[11px] text-ink-light font-medium">
                  {client.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
