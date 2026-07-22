"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import { projectsData } from "@/data/projects";
import { Sparkles } from "lucide-react";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-0 pt-28">
      
      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-b from-[#F6F7FF] via-[#EAF0FF]/30 to-[#F6F7FF] border-b border-[#E3E6F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF0FF] text-[#2151F5] text-xs font-bold uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selected Case Studies</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#10122B] tracking-tight leading-tight">
            Great design <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2151F5] via-[#7B3FF2] to-[#E5389E]">that works.</span>
          </h1>

          <p className="text-[#4B4F72] text-lg sm:text-xl leading-relaxed">
            Explore our showcase of mobile applications, custom websites, e-commerce storefronts, and brand identities crafted for businesses across Kuwait and the Gulf.
          </p>
        </div>
      </section>

      {/* Filter & Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Category Filter */}
          <div className="flex justify-center">
            <ProjectFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-16 text-center text-[#4B4F72]">
              No projects found in this category yet.
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
