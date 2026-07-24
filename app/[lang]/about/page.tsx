import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, MapPin } from "lucide-react";
import StatCounter from "@/components/StatCounter";
import FounderSection from "@/components/FounderSection";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";

// Rendered on-demand (StatCounter reads live CMS data) so the build does not
// require DATABASE_URL, which is only present at runtime, not during docker build.
export const dynamic = "force-dynamic";

const studioImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.about.hero.heading} — Burhani Creation`,
    description: dict.about.hero.subtext,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  const { about } = dict;

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-20 border-b border-hairline">
        <Container>
          <div className="max-w-2xl space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
              {about.hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
              {about.hero.heading}
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed">{about.hero.subtext}</p>
          </div>
        </Container>
      </section>

      <FounderSection lang={lang} dict={dict} />

      {/* Story */}
      <section className="py-24 bg-card border-b border-hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
                {about.story.eyebrow}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
                {about.story.heading}
              </h2>
              <p className="text-ink-muted text-base leading-relaxed">{about.story.p1}</p>
              <p className="text-ink-muted text-base leading-relaxed">{about.story.p2}</p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-hairline">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-ink-light" />
                  <span className="text-sm font-medium text-ink">{about.story.point1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-ink-light" />
                  <span className="text-sm font-medium text-ink">{about.story.point2}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-lg overflow-hidden border border-hairline aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt={about.story.hqTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pt-3 flex items-center gap-2 text-sm text-ink-muted">
                <MapPin className="w-4 h-4 text-ink-light" />
                <span>{siteConfig.contact.address.formatted[lang]}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Studio */}
      <section className="py-24 border-b border-hairline">
        <Container>
          <SectionHeading
            eyebrow={about.studio.eyebrow}
            heading={about.studio.heading}
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studioImages.map((image, idx) => {
              const photo = about.studio.photos[idx];
              return (
                <Reveal key={idx} delay={idx * 0.1} className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden border border-hairline aspect-[4/3]">
                    <Image src={image} alt={photo.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-ink">{photo.title}</h3>
                    <p className="text-xs text-ink-muted">{photo.subtitle}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="py-24 bg-card border-b border-hairline">
        <Container>
          <SectionHeading
            eyebrow={about.values.eyebrow}
            heading={about.values.heading}
            subtext={about.values.subtext}
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.items.map((value, idx) => (
              <Reveal key={value.title} delay={idx * 0.08}>
                <Card className="p-7 space-y-3 h-full">
                  <h3 className="font-display text-lg font-semibold text-ink">{value.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{value.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatCounter lang={lang} />
    </div>
  );
}
