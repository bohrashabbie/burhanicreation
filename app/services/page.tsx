import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { Sparkles, CheckCircle2, ArrowRight, Smartphone, Globe, ShoppingBag, Layout, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Solutions — Burhani Creation Kuwait",
  description: "Explore Burhani Creation's full service offerings in Hawally, Kuwait: Mobile App Development, Website Development, E-Commerce & KNET, UI/UX Design, and Retail ERP Solutions.",
};

const serviceIcons: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  ShoppingBag,
  Layout,
  Database,
};

export default function ServicesPage() {
  return (
    <div className="space-y-0 pt-28">
      
      {/* Services Hero Header */}
      <section className="py-20 bg-gradient-to-b from-surface via-primary-wash/30 to-surface border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-wash text-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Digital Capabilities</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-tight">
              Here’s what <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-mid to-gold">we do.</span>
            </h1>

            <p className="text-ink-muted text-lg sm:text-xl leading-relaxed">
              Services that take your business further. From mobile app design and modern web development to localized KNET e-commerce portals and enterprise ERPs.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Breakdown */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {servicesData.map((service, index) => {
            const Icon = serviceIcons[service.iconName] || Globe;
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl bg-surface border border-hairline shadow-soft hover:border-primary/40 transition-all duration-300 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                
                {/* Content Side */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? "" : "lg:order-2"}`}>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary-wash text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs uppercase font-mono tracking-wider font-bold text-gold-deep">
                      Service 0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-ink-muted text-base leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Scope & Deliverables */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase font-bold text-ink tracking-wider">
                      Included Scope & Features:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-ink">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="pt-4 border-t border-hairline flex flex-wrap items-center gap-2">
                    <span className="text-xs text-ink-light font-bold me-2">Technologies:</span>
                    {service.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-ink border border-hairline">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <a
                      href="#request-quote"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-mid text-white text-sm font-bold shadow-md hover:shadow-lg hover:shadow-gold/25 hover:from-primary-mid hover:to-gold transition-all duration-300"
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>

                {/* Visual Accent Side */}
                <div className={`lg:col-span-5 ${isEven ? "" : "lg:order-1"}`}>
                  <div className="relative rounded-2xl bg-white p-8 border border-hairline shadow-soft space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-hairline pb-4">
                      <span className="text-xs font-mono font-bold text-ink-light">
                        BURHANI-CAPABILITY-0{index + 1}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-display text-lg font-bold text-ink">
                        Why Choose Burhani Creation for {service.title}?
                      </h4>
                      <ul className="space-y-3 text-xs text-ink-muted">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-primary-wash/60 border border-primary/20 text-xs text-primary font-semibold">
                      ⚡ Agile sprint previews delivered before final sign-off.
                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </section>

    </div>
  );
}
