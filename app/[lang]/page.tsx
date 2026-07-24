import React from "react";
import HeroCarousel from "@/components/HeroCarousel";
import AboutIntro from "@/components/AboutIntro";
import ClientMarquee from "@/components/ClientMarquee";
import FounderSection from "@/components/FounderSection";
import DeviceShowcase from "@/components/DeviceShowcase";
import ServicesSlider from "@/components/ServicesSlider";
import ProjectCard from "@/components/ProjectCard";
import StatCounter from "@/components/StatCounter";
import Reveal from "@/components/ui/Reveal";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";
import { prisma } from "@/lib/db";
import type { ProjectCategory } from "@/data/projects"; // we keep types in data for now

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);

  const dbProjects = await prisma.project.findMany({ where: { featured: true }, orderBy: { sortOrder: 'asc' }, take: 3 });
  const dbTestimonials = await prisma.testimonial.findMany({ where: { featured: true }, orderBy: { sortOrder: 'asc' } });
  const dbClients = await prisma.client.findMany({ orderBy: { sortOrder: 'asc' } });

  // Map to the format components expect
  const featuredProjects = dbProjects.map((p: any) => ({
    ...p,
    category: p.category as ProjectCategory,
    title: { en: p.titleEn, ar: p.titleAr },
    summary: { en: p.summaryEn, ar: p.summaryAr },
    deliverables: { en: p.deliverablesEn as string[], ar: p.deliverablesAr as string[] }
  }));

  const featuredTestimonials = dbTestimonials.map((t: any) => ({
    ...t,
    role: { en: t.roleEn, ar: t.roleAr },
    quote: { en: t.quoteEn, ar: t.quoteAr }
  }));

  const clients = dbClients.map((c: any) => ({
    id: c.id,
    symbol: c.symbol,
    name: c.name,
    industry: { en: c.industryEn || "", ar: c.industryAr || "" }
  }));

  return (
    <div>
      <HeroCarousel lang={lang} dict={dict} />

      <AboutIntro lang={lang} dict={dict} />

      <ClientMarquee lang={lang} heading={dict.home.clients.heading} clients={clients} />

      <FounderSection lang={lang} dict={dict} />

      {/* Services overview */}
      <section className="py-24 bg-surface border-b border-hairline">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <SectionHeading
              eyebrow={dict.home.services.eyebrow}
              heading={dict.home.services.heading}
              subtext={dict.home.services.subtext}
            />
            <Button href={`/${lang}/services`} variant="outline" className="shrink-0">
              {dict.home.services.cta}
            </Button>
          </div>

          <ServicesSlider lang={lang} />
        </Container>
      </section>

      <DeviceShowcase lang={lang} dict={dict} />

      {/* Featured projects */}
      <section className="py-24 bg-card border-b border-hairline">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <SectionHeading
              eyebrow={dict.home.projects.eyebrow}
              heading={dict.home.projects.heading}
            />
            <Button href={`/${lang}/projects`} variant="outline" className="shrink-0">
              {dict.home.projects.cta}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 0.08}>
                <ProjectCard project={project} lang={lang} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatCounter lang={lang} />

      {/* Testimonials */}
      <section className="py-24 bg-surface border-b border-hairline">
        <Container>
          <SectionHeading
            eyebrow={dict.home.testimonials.eyebrow}
            heading={dict.home.testimonials.heading}
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.08}>
                <div className="bg-card rounded-lg p-8 border border-hairline space-y-5 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-gold-deep">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-ink leading-relaxed italic">&ldquo;{item.quote[lang]}&rdquo;</p>
                  </div>

                  <div className="pt-4 border-t border-hairline">
                    <h4 className="font-display font-semibold text-sm text-ink">{item.author}</h4>
                    <p className="text-xs text-ink-muted">
                      {item.role[lang]}, {item.company}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
