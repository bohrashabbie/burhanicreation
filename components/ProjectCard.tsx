"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, MapPin, Calendar } from "lucide-react";
import { Project, projectCategoryLabels } from "@/data/projects";
import type { Locale } from "@/lib/i18n";
import Card from "@/components/ui/Card";

interface ProjectCardProps {
  project: Project;
  lang: Locale;
}

export default function ProjectCard({ project, lang }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card
        as="button"
        onClick={() => setModalOpen(true)}
        className="group text-start overflow-hidden flex flex-col h-full cursor-pointer"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
          <Image
            src={project.image}
            alt={project.title[lang]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-white/95 text-ink text-xs font-medium">
            {projectCategoryLabels[project.category][lang]}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-grow justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-ink-light mb-1.5">
              <span>{project.client}</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-ink leading-snug">
              {project.title[lang]}
            </h3>
            <p className="mt-2 text-sm text-ink-muted line-clamp-2 leading-relaxed">
              {project.summary[lang]}
            </p>
          </div>
        </div>
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="absolute inset-0 bg-ink/70" onClick={() => setModalOpen(false)} />

          <div className="relative w-full max-w-3xl bg-card rounded-lg overflow-hidden border border-hairline z-10 max-h-[90vh] flex flex-col">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 end-4 z-20 w-9 h-9 rounded-md bg-white/90 text-ink hover:bg-white flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto">
              <div className="relative aspect-video w-full">
                <Image src={project.image} alt={project.title[lang]} fill className="object-cover" />
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
                    {projectCategoryLabels[project.category][lang]}
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-ink mt-1">
                    {project.title[lang]}
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-md bg-surface border border-hairline text-xs">
                  <div>
                    <span className="text-ink-light block">{project.client}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-ink-light" />
                    <span className="font-medium text-ink">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-ink-light" />
                    <span className="font-medium text-ink">{project.year}</span>
                  </div>
                </div>

                <p className="text-ink-muted text-sm leading-relaxed">{project.summary[lang]}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.deliverables[lang].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-deep shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
