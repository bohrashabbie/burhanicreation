"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/dictionaries/en";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="rounded-t-lg bg-ink pt-2.5 px-2.5 shadow-soft">
        <div className="flex items-center gap-1.5 pb-2 ps-1">
          <span className="w-2 h-2 rounded-full bg-white/25" />
          <span className="w-2 h-2 rounded-full bg-white/25" />
          <span className="w-2 h-2 rounded-full bg-white/25" />
        </div>
        <div className="relative aspect-[16/10] rounded-t-md overflow-hidden bg-white p-6 flex flex-col justify-center">
          {children}
        </div>
      </div>
      <div className="h-3 rounded-b-lg bg-ink" />
    </div>
  );
}

function WebsiteMockup() {
  return (
    <BrowserChrome>
      <span className="w-14 h-1.5 rounded-full bg-gold-deep mb-4" />
      <span className="w-3/4 h-3 rounded bg-ink mb-2.5" />
      <span className="w-1/2 h-3 rounded bg-ink/70 mb-2.5" />
      <span className="w-2/3 h-2 rounded bg-ink-light/40 mb-5" />
      <span className="inline-flex w-24 h-6 rounded-md bg-ink" />
    </BrowserChrome>
  );
}

function AppMockup() {
  const doctors = [
    { initials: "RS", name: "Dr. Reem Al-Sabah" },
    { initials: "MK", name: "Dr. Mona Al-Kandari" },
  ];

  return (
    <div className="mx-auto w-full max-w-[220px]">
      <div className="rounded-[2.25rem] bg-ink p-2.5 shadow-soft">
        <div className="relative aspect-[9/19.5] rounded-[1.75rem] overflow-hidden bg-white p-4 flex flex-col">
          <div className="h-4 w-20 rounded-full bg-ink mx-auto mb-4" />

          <p className="text-[10px] font-semibold text-ink-light uppercase tracking-wide mb-2">
            Skinnovation Clinic
          </p>

          <div className="rounded-lg border border-hairline bg-surface p-3 mb-3 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <p className="text-[10px] font-semibold text-ink">Appointment confirmed</p>
            </div>
            <p className="text-[9px] text-ink-muted">Derma consultation · Today, 4:30 PM</p>
          </div>

          <p className="text-[9px] font-semibold text-ink-light uppercase tracking-wide mb-2">
            Available doctors
          </p>

          <div className="space-y-2">
            {doctors.map((doc) => (
              <div key={doc.initials} className="flex items-center gap-2 rounded-lg border border-hairline p-2">
                <span className="w-6 h-6 rounded-full bg-primary-wash text-ink text-[9px] font-semibold flex items-center justify-center shrink-0">
                  {doc.initials}
                </span>
                <span className="text-[9px] font-medium text-ink flex-grow leading-tight">{doc.name}</span>
                <span className="text-[8px] font-semibold text-white bg-ink rounded-md px-1.5 py-0.5">Book</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AiMockup() {
  const bars = [40, 65, 50, 80, 60];

  return (
    <BrowserChrome>
      <div className="space-y-1.5 mb-4">
        <div className="max-w-[75%] rounded-lg bg-surface px-2.5 py-1.5 text-[9px] text-ink">
          How do I check my order status?
        </div>
        <div className="max-w-[75%] ms-auto rounded-lg bg-ink px-2.5 py-1.5 text-[9px] text-white">
          Order #4821 shipped today — arriving in 2 days.
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-10">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="w-3 rounded-sm bg-gold-deep/80"
          />
        ))}
      </div>
    </BrowserChrome>
  );
}

export default function DeviceShowcase({ dict }: { dict: Dictionary }) {
  const { devices } = dict.home;

  const items = [
    { label: devices.website, node: <WebsiteMockup /> },
    { label: devices.mobileApp, node: <AppMockup /> },
    { label: devices.aiPlatform, node: <AiMockup /> },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
          {items.map(({ label, node }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="space-y-4"
            >
              {node}
              <p className="text-center text-sm font-medium text-ink-muted">{label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
