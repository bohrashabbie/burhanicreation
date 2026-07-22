"use client";

import React from "react";
import { motion } from "framer-motion";
import { projectCategories } from "@/data/projects";

interface ProjectFilterProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function ProjectFilter({ activeCategory, onSelectCategory }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {projectCategories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
              isActive
                ? "text-white shadow-md shadow-[#2151F5]/20"
                : "text-[#4B4F72] bg-white border border-[#E3E6F7] hover:text-[#10122B] hover:border-[#2151F5]/30"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategoryBg"
                className="absolute inset-0 bg-[#2151F5] rounded-full z-0"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
