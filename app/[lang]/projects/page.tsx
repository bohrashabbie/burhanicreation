import React from "react";
import type { Metadata } from "next";
import ProjectsPageClient from "@/components/ProjectsPageClient";
import { projectsData } from "@/data/projects";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import Container from "@/components/ui/Container";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.projects.hero.heading} — Burhani Creation`,
    description: dict.projects.hero.subtext,
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  const { projects } = dict;

  return (
    <div className="pt-28">
      <section className="py-20 border-b border-hairline">
        <Container className="max-w-2xl text-center mx-auto space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
            {projects.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {projects.hero.heading}
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed">{projects.hero.subtext}</p>
        </Container>
      </section>

      <ProjectsPageClient projects={projectsData} lang={lang} emptyLabel={projects.empty} />
    </div>
  );
}
