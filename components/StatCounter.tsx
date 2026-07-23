import React from "react";
import { siteConfig } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function StatCounter({ lang }: { lang: Locale }) {
  return (
    <section className="py-16 bg-card border-b border-hairline overflow-hidden">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteConfig.stats.map((stat, idx) => (
            <Reveal key={stat.label[lang]} delay={idx * 0.08} y={16} className="text-center sm:text-start">
              <div className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
                {stat.value}
                <span className="text-gold-deep">{stat.suffix}</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-ink-muted">{stat.label[lang]}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
