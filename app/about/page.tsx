import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StatCounter from "@/components/StatCounter";
import WaveDivider from "@/components/WaveDivider";
import { siteConfig } from "@/data/site";
import { Sparkles, Target, Compass, Users, MapPin, Award, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Burhani Creation Hawally Kuwait",
  description: "Learn about Burhani Creation, a premier Hawally-based digital agency in Kuwait specializing in custom web design, mobile apps, e-commerce, and branding.",
};

const coreValues = [
  {
    icon: Target,
    title: "Results First",
    description: "Every pixel, line of code, and campaign structure is built with a clear objective: driving measurable business outcomes and positive ROI for our clients.",
  },
  {
    icon: Compass,
    title: "Craft & Detail",
    description: "We don't settle for off-the-shelf templates. We engineer bespoke visual design systems and clean software architecture tailored to your unique identity.",
  },
  {
    icon: Users,
    title: "Long-Term Partnership",
    description: "We work as an extension of your internal team—providing continuous maintenance, ongoing SEO strategy, and feature upgrades as your business scales.",
  },
  {
    icon: MapPin,
    title: "Local Gulf Insight",
    description: "Based in Hawally, Kuwait, we understand local market dynamics, Arabic/English bilingual requirements, KNET payment standards, and regional user expectations.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-0 pt-28">
      
      {/* About Hero */}
      <section className="py-20 bg-gradient-to-b from-surface via-primary-wash/30 to-surface border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-wash text-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Burhani Creation</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-tight">
              We think beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-mid to-gold">the wave.</span>
            </h1>

            <p className="text-ink-muted text-lg sm:text-xl leading-relaxed">
              Founded in Hawally, Kuwait, Burhani Creation is a full-service digital studio dedicated to transforming traditional businesses into modern, high-converting digital powerhouses.
            </p>
          </div>
        </div>
      </section>

      {/* Agency Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-deep">
                Our Journey
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
                Bridging creative vision & technical precision across the Gulf.
              </h2>

              <p className="text-ink-muted text-base leading-relaxed">
                At Burhani Creation, we believe that an exceptional online presence goes far beyond aesthetic design. It requires strategic business analysis, user-centric wireframing, robust engineering, and omni-channel digital marketing.
              </p>

              <p className="text-ink-muted text-base leading-relaxed">
                Whether creating bespoke iOS & Android applications, deploying high-converting Next.js web applications, or integrating localized KNET e-commerce portals, our agile methodology ensures complete transparency before a single line of code is written.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-hairline">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-ink">Hawally Based Studio</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-ink">170+ Delivered Projects</span>
                </div>
              </div>
            </div>

            {/* Right Graphic/Image Visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-hairline shadow-soft-lg aspect-[4/3] bg-surface">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Burhani Creation Hawally Studio Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <p className="font-display text-lg font-bold">Burhani Creation Headquarters</p>
                  <p className="text-xs text-gray-200">Al-Rifai Complex, 9324 Tunisia St, Hawally, Kuwait</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 bg-surface border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-deep">
              Our Operating Principles
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              What We Value
            </h2>
            <p className="text-sm text-ink-muted">
              The core principles that guide our work, team collaboration, and client relationships every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-3xl p-8 border border-hairline shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-wash text-primary flex items-center justify-center">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  {value.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Leadership / Team Block (Editable Placeholders) */}
      <section className="py-24 bg-white border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-deep">
              Studio Leadership
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Driven by passionate technologists & strategists.
            </h2>
            <p className="text-sm text-ink-muted">
              Our team brings together decades of combined experience in full-stack engineering, UI/UX architecture, digital marketing, and enterprise ERP design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Leadership Card 1 */}
            <div className="bg-surface rounded-3xl p-6 border border-hairline space-y-4 text-center">
              <div className="w-24 h-24 rounded-full bg-primary-wash text-primary font-display font-extrabold text-2xl flex items-center justify-center mx-auto border-2 border-white shadow-md">
                BC
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">Creative Director</h3>
                <p className="text-xs font-semibold text-primary">Brand & Visual Strategy</p>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Oversees identity design, editorial typography, user journey wireframes, and front-end interface quality across all agency client projects.
              </p>
            </div>

            {/* Leadership Card 2 */}
            <div className="bg-surface rounded-3xl p-6 border border-hairline space-y-4 text-center">
              <div className="w-24 h-24 rounded-full bg-primary-wash text-primary font-display font-extrabold text-2xl flex items-center justify-center mx-auto border-2 border-white shadow-md">
                SE
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">Lead Software Architect</h3>
                <p className="text-xs font-semibold text-primary">Engineering & ERP Solutions</p>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Directs Next.js web application architecture, iOS & Android native codebases, and custom enterprise resource planning integrations.
              </p>
            </div>

            {/* Leadership Card 3 */}
            <div className="bg-surface rounded-3xl p-6 border border-hairline space-y-4 text-center">
              <div className="w-24 h-24 rounded-full bg-primary-wash text-primary font-display font-extrabold text-2xl flex items-center justify-center mx-auto border-2 border-white shadow-md">
                DM
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">Digital Growth Lead</h3>
                <p className="text-xs font-semibold text-primary">Performance & SEO Strategy</p>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Manages omni-channel marketing campaigns, search engine optimization, performance advertising, and conversion rate optimizations for Gulf clients.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Counter Strip */}
      <StatCounter />

    </div>
  );
}
