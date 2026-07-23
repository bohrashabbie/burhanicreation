import React from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { siteConfig } from "@/data/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function HeroWave({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { hero } = dict.home;

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 border-b border-hairline overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7 space-y-7" y={16}>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
              {hero.eyebrow}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight leading-[1.1]">
              {hero.heading}
            </h1>

            <p className="text-ink-muted text-lg leading-relaxed max-w-xl">
              {hero.subtext}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button href={`/${lang}/contact`} size="lg">
                {hero.ctaPrimary}
              </Button>
              <Button href={`/${lang}/projects`} variant="outline" size="lg">
                {hero.ctaSecondary}
              </Button>
            </div>

            <div className="pt-8 flex items-center gap-10 border-t border-hairline">
              {siteConfig.stats.slice(0, 2).map((stat) => (
                <div key={stat.label[lang]}>
                  <span className="font-display text-2xl font-semibold text-ink block">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="text-xs text-ink-muted">{stat.label[lang]}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.15} y={16}>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-hairline">
              <Image
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop"
                alt={siteConfig.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
