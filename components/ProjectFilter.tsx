"use client";

import React from "react";
import { projectCategoryLabels } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

interface ProjectFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  lang: Locale;
}

export default function ProjectFilter({ categories, activeCategory, onSelectCategory, lang }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const label = projectCategoryLabels[category as keyof typeof projectCategoryLabels][lang];
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-md text-sm border transition-colors ${
              isActive
                ? "bg-ink text-white border-ink"
                : "bg-transparent text-ink-muted border-hairline hover:border-ink/40 hover:text-ink"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
