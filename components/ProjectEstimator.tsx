"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Check, ArrowRight, Clock, Sparkles, ShieldCheck } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  estDays: number;
  description: string;
}

const serviceOptions: ServiceOption[] = [
  { id: "web", name: "Custom Web App (Next.js)", category: "Development", estDays: 14, description: "High-performance marketing website or web application with CMS & SEO" },
  { id: "app", name: "iOS & Android Mobile App", category: "Development", estDays: 21, description: "Native cross-platform mobile app with interactive UI prototypes first" },
  { id: "ecom", name: "E-Commerce & KNET Hub", category: "E-Commerce", estDays: 18, description: "Online storefront with localized KNET, MyFatoorah, Tap payment gateways" },
  { id: "brand", name: "Full Brand Identity", category: "Branding", estDays: 10, description: "Logo design, visual guidelines, stationery kit, and editorial assets" },
  { id: "erp", name: "Custom Retail ERP", category: "Enterprise", estDays: 30, description: "Cloud POS, inventory tracking, invoicing, and HR reporting platform" },
];

const addOns = [
  { id: "seo", name: "Kuwait Local SEO Campaign", estDays: 5 },
  { id: "arabic", name: "Bilingual English / Arabic RTL", estDays: 4 },
  { id: "analytics", name: "Analytics & Conversion Tracking", estDays: 2 },
  { id: "support", name: "12-Month Priority SLA Support", estDays: 0 },
];

export default function ProjectEstimator() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["web"]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["seo"]);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  // Calculate estimated timeframe
  const totalDays =
    serviceOptions
      .filter((s) => selectedServices.includes(s.id))
      .reduce((acc, curr) => acc + curr.estDays, 0) +
    addOns
      .filter((a) => selectedAddOns.includes(a.id))
      .reduce((acc, curr) => acc + curr.estDays, 0);

  const estWeeks = Math.max(2, Math.ceil(totalDays / 7));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E3E6F7] shadow-soft-lg space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E6F7]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0FF] text-[#2151F5] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Estimator</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-[#10122B]">
            Configure Your Scope
          </h3>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F6F7FF] border border-[#E3E6F7] shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#EAF0FF] text-[#2151F5] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#6C7099] block font-semibold uppercase tracking-wider">Estimated Timeline</span>
            <span className="font-display text-lg font-extrabold text-[#2151F5]">
              ~{estWeeks} Weeks Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Primary Scope Selection */}
      <div className="space-y-4">
        <label className="block text-xs uppercase font-bold tracking-wider text-[#10122B]">
          1. Select Core Service Modules:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {serviceOptions.map((option) => {
            const isSelected = selectedServices.includes(option.id);
            return (
              <button
                type="button"
                key={option.id}
                onClick={() => toggleService(option.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer ${
                  isSelected
                    ? "bg-[#EAF0FF]/50 border-[#2151F5] ring-2 ring-[#2151F5]/20 shadow-xs"
                    : "bg-[#F6F7FF] border-[#E3E6F7] hover:border-[#2151F5]/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-[#E3E6F7] text-[#6C7099]">
                    {option.category}
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? "bg-[#2151F5] text-white" : "border border-[#E3E6F7] bg-white"}`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-sm font-bold text-[#10122B]">
                    {option.name}
                  </h4>
                  <p className="text-xs text-[#4B4F72] mt-1 leading-snug">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add-ons Selection */}
      <div className="space-y-4 pt-2">
        <label className="block text-xs uppercase font-bold tracking-wider text-[#10122B]">
          2. Optional Enhancements & Add-Ons:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {addOns.map((addon) => {
            const isSelected = selectedAddOns.includes(addon.id);
            return (
              <button
                type="button"
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                className={`px-4 py-3 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition-all duration-200 ${
                  isSelected
                    ? "bg-[#FDEAF7] border-[#E5389E]/40 text-[#10122B]"
                    : "bg-[#F6F7FF] border-[#E3E6F7] text-[#4B4F72] hover:border-[#2151F5]/30"
                }`}
              >
                <span>{addon.name}</span>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center ${isSelected ? "bg-[#E5389E] text-white" : "border border-[#E3E6F7] bg-white"}`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Scope Summary Banner */}
      <div className="relative p-4 rounded-2xl bg-[#10122B] text-white flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E5389E]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#D6E4FF]">
            <ShieldCheck className="w-4 h-4 text-[#7B9CFF]" />
            <span>Burhani Creation Hawally Guarantee</span>
          </div>
          <p className="text-xs text-gray-300">
            Selected <strong className="text-white">{selectedServices.length} modules</strong> & <strong className="text-white">{selectedAddOns.length} add-ons</strong> (~{estWeeks} weeks turnaround).
          </p>
        </div>

        <a
          href="#request-quote"
          className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2151F5] to-[#E5389E] text-white text-xs font-bold hover:shadow-lg hover:shadow-[#E5389E]/30 transition-all shrink-0 flex items-center gap-2 shadow-md"
        >
          <span>Pre-Fill Quotation Request</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
