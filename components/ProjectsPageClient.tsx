"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

const categories = ["All", "AI", "Branding", "Web", "App", "E-commerce"] as const;

export default function ProjectsPageClient({
  projects,
  lang,
  emptyLabel,
}: {
  projects: Project[];
  lang: Locale;
  emptyLabel: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    for (const cat of categories) {
      if (cat === "All") continue;
      c[cat] = projects.filter((p) => p.category === cat).length;
    }
    return c;
  }, [projects]);

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-center">
          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={counts}
            lang={lang}
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProjectCard project={project} lang={lang} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-ink-muted">{emptyLabel}</div>
        )}
      </div>
    </section>
  );
}
