"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Award, CheckCircle, Star, Clock } from "lucide-react";

const statIcons = [Award, CheckCircle, Star, Clock];

export default function StatCounter() {
  return (
    <section className="py-16 bg-[#F6F7FF] border-b border-[#E3E6F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {siteConfig.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3E6F7] shadow-soft hover:border-[#2151F5]/30 transition-all duration-300 group text-center sm:text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EAF0FF] text-[#2151F5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10122B] tracking-tight">
                  {stat.value}
                  <span className="text-[#2151F5]">{stat.suffix}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4B4F72]">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
