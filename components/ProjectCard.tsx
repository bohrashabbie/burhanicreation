"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={() => setModalOpen(true)}
        className="group bg-white rounded-3xl overflow-hidden border border-hairline shadow-soft cursor-pointer hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-ink text-xs font-bold shadow-md">
              <span>View Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
            </span>
          </div>

          {/* Category Chip */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-ink text-xs font-bold shadow-xs">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-ink-light font-medium mb-1.5">
              <span>{project.client}</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-ink group-hover:text-primary transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-ink-muted line-clamp-2 leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-hairline flex flex-wrap gap-1.5">
            {project.deliverables.map((item, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-surface text-[11px] font-medium text-ink-muted border border-hairline">
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox Detail Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden border border-hairline shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header Close */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-ink hover:bg-white flex items-center justify-center shadow-md transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto">
                <div className="relative aspect-video w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="px-3 py-1 rounded-full bg-primary text-xs font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-2">
                      {project.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-surface border border-hairline text-xs">
                    <div>
                      <span className="text-ink-light block">Client</span>
                      <span className="font-bold text-ink">{project.client}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <div>
                        <span className="text-ink-light block">Location</span>
                        <span className="font-bold text-ink">{project.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <div>
                        <span className="text-ink-light block">Year Delivered</span>
                        <span className="font-bold text-ink">{project.year}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-ink mb-2">
                      Project Overview
                    </h3>
                    <p className="text-ink-muted text-sm leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-gold-deep mb-3">
                      Key Deliverables & Scope
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-ink">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-hairline flex items-center justify-between">
                    <span className="text-xs text-ink-light">Burhani Creation Hawally Case Study</span>
                    <a
                      href="#request-quote"
                      onClick={() => setModalOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-gold text-white text-xs font-bold hover:shadow-md hover:shadow-gold/25 transition-all"
                    >
                      Request Similar Project
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
