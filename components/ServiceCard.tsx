"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Globe, ShoppingBag, Layout, Database, Check } from "lucide-react";
import { Service } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  ShoppingBag,
  Layout,
  Database,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      id={service.slug}
      className="bg-white rounded-3xl p-8 border border-[#E3E6F7] shadow-soft hover:shadow-soft-lg hover:border-[#2151F5]/40 transition-all duration-300 flex flex-col justify-between group"
    >
      <div className="space-y-6">
        {/* Top Icon & Tagline */}
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF0FF] text-[#2151F5] flex items-center justify-center group-hover:bg-[#2151F5] group-hover:text-white transition-all duration-300 shadow-sm">
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono font-bold text-[#2151F5] bg-[#EAF0FF]/50 px-3 py-1 rounded-full">
            0{index + 1}
          </span>
        </div>

        <div>
          <h3 className="font-display text-2xl font-extrabold text-[#10122B] group-hover:text-[#2151F5] transition-colors leading-snug">
            {service.title}
          </h3>
          <p className="mt-1 text-xs font-semibold text-[#2151F5] tracking-wide">
            {service.tagline}
          </p>
          <p className="mt-3 text-sm text-[#4B4F72] leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Deliverables Chips */}
        <div className="pt-2">
          <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#6C7099] mb-2.5">
            Key Scope & Deliverables
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.deliverables.slice(0, 4).map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F6F7FF] text-xs font-medium text-[#10122B] border border-[#E3E6F7]">
                <Check className="w-3 h-3 text-[#2151F5]" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-6 mt-6 border-t border-[#E3E6F7] flex items-center justify-between">
        <Link
          href={`/services#${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2151F5] group-hover:text-[#1638C2] transition-colors"
        >
          <span>Explore Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <span className="text-xs text-[#6C7099] font-medium">Kuwait & Gulf Market</span>
      </div>
    </motion.div>
  );
}
