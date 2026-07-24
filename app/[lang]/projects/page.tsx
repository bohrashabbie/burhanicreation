import React from "react";
import type { Metadata } from "next";
import ProjectsPageClient from "@/components/ProjectsPageClient";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import { prisma } from "@/lib/db";
import type { ProjectCategory } from "@/data/projects";

// Rendered on-demand so live CMS content is always fresh and the build does not
// require DATABASE_URL (which is only present at runtime, not during docker build).
export const dynamic = "force-dynamic";

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

  const dbProjects = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' } });
  
  const formattedProjects = dbProjects.map((p: any) => ({
    ...p,
    category: p.category as ProjectCategory,
    title: { en: p.titleEn, ar: p.titleAr },
    summary: { en: p.summaryEn, ar: p.summaryAr },
    deliverables: { en: p.deliverablesEn as string[], ar: p.deliverablesAr as string[] }
  }));

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

      <ProjectsPageClient projects={formattedProjects} lang={lang} emptyLabel={projects.empty} />
    </div>
  );
}
