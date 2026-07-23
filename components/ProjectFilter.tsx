"use client";

import React from "react";
import { motion } from "framer-motion";
import { projectCategoryLabels, projectCategoryColors } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

interface ProjectFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  counts: Record<string, number>;
  lang: Locale;
}

export default function ProjectFilter({
  categories,
  activeCategory,
  onSelectCategory,
  counts,
  lang,
}: ProjectFilterProps) {
  return (
    <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-hairline bg-card p-1.5 shadow-soft">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const label = projectCategoryLabels[category as keyof typeof projectCategoryLabels][lang];
        const color = projectCategoryColors[category as keyof typeof projectCategoryColors];
        const count = counts[category] ?? 0;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="project-tab-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 ${
                isActive ? "text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                  isActive ? "bg-white/20 text-white" : "bg-surface-alt text-ink-light"
                }`}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
