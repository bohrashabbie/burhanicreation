import React from "react";
import type { Locale } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { prisma } from "@/lib/db";

export default async function StatCounter({ lang }: { lang: Locale }) {
  const statsSetting = await prisma.siteSetting.findUnique({ where: { key: "stats" } });
  const stats = (statsSetting?.value as Array<{ value: number; suffix: string; labelEn: string; labelAr: string }>) || [];

  if (stats.length === 0) return null;

  return (
    <section className="py-16 bg-card border-b border-hairline overflow-hidden">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <Reveal key={stat.labelEn} delay={idx * 0.08} y={16} className="text-center sm:text-start">
              <div className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
                {stat.value}
                <span className="text-gold-deep">{stat.suffix}</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-ink-muted">{lang === "ar" ? stat.labelAr : stat.labelEn}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
