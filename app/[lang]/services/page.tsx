import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Smartphone, Globe, ShoppingBag, Layout, Database, Sparkles, LayoutGrid } from "lucide-react";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { prisma } from "@/lib/db";

const serviceIcons: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  ShoppingBag,
  Layout,
  Database,
  Sparkles,
  LayoutGrid,
};

// Rendered on-demand so live CMS content is always fresh and the build does not
// require DATABASE_URL (which is only present at runtime, not during docker build).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.services.hero.heading} — Burhani Creation`,
    description: dict.services.hero.subtext,
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  const { services } = dict;

  const dbServices = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
  
  const formattedServices = dbServices.map((s: any) => ({
    ...s,
    title: { en: s.titleEn, ar: s.titleAr },
    tagline: { en: s.taglineEn, ar: s.taglineAr },
    description: { en: s.descriptionEn, ar: s.descriptionAr },
    fullDescription: { en: s.fullDescriptionEn, ar: s.fullDescriptionAr },
    deliverables: { en: s.deliverablesEn as string[], ar: s.deliverablesAr as string[] },
    features: { en: s.featuresEn as string[], ar: s.featuresAr as string[] },
    techStack: s.techStack as string[],
  }));

  return (
    <div className="pt-28">
      <section className="py-20 border-b border-hairline">
        <Container>
          <div className="max-w-2xl space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
              {services.hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
              {services.hero.heading}
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed">{services.hero.subtext}</p>
          </div>
        </Container>
      </section>

      <section className="py-24 overflow-hidden">
        <Container className="space-y-16">
          {formattedServices.map((service, index) => {
            const Icon = serviceIcons[service.iconName] || Globe;
            const isEven = index % 2 === 0;

            return (
              <Reveal key={service.id} y={28}>
                <div
                  id={service.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start p-8 sm:p-10 rounded-lg border border-hairline bg-card"
                >
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-soft"
                        style={{ backgroundColor: service.accent }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-ink-light">
                        {services.serviceLabel} {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                        {service.title[lang]}
                      </h2>
                      <p className="text-sm font-medium text-gold-deep mt-1.5">{service.tagline[lang]}</p>
                    </div>

                    <p className="text-ink-muted text-base leading-relaxed">{service.fullDescription[lang]}</p>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs uppercase font-semibold text-ink-light tracking-wider">
                        {services.includedScope}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-ink">
                        {service.deliverables[lang].map((item: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-ink-light shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-hairline flex flex-wrap items-center gap-2">
                      <span className="text-xs text-ink-light font-medium me-2">{services.technologies}:</span>
                      {service.techStack.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 rounded-md bg-surface text-xs text-ink border border-hairline">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Button href="#request-quote">
                        {services.inquireAbout} {service.title[lang]}
                      </Button>
                    </div>
                  </div>

                  <div className={`lg:col-span-5 space-y-5 ${isEven ? "" : "lg:order-1"}`}>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-hairline">
                      <Image
                        src={service.image}
                        alt={service.title[lang]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                    <div className="rounded-lg bg-surface p-7 border border-hairline space-y-5">
                      <h4 className="font-display text-base font-semibold text-ink">
                        {services.whyUs}
                      </h4>
                      <ul className="space-y-3 text-sm text-ink-muted">
                        {service.features[lang].map((feat: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-deep shrink-0 mt-1.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </Container>
      </section>
    </div>
  );
}
