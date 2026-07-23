import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function FounderSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { founder } = dict.home;

  return (
    <section className="py-24 bg-card border-b border-hairline overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5" y={20}>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-hairline shadow-soft">
              <Image
                src="/founder-portrait.png"
                alt={founder.name}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="pt-4">
              <p className="font-display font-semibold text-ink">{founder.name}</p>
              <p className="text-sm text-ink-muted">{founder.role}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 space-y-6" delay={0.1} y={20}>

            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
              {founder.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
              {founder.heading}
            </h2>

            <div className="relative pl-6 border-s-2 border-gold">
              <Quote className="w-6 h-6 text-ink-light mb-3" />
              <blockquote className="font-display text-xl sm:text-2xl text-ink leading-relaxed italic">
                &ldquo;{founder.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-2">
              <Button href={`/${lang}/contact`} variant="outline">
                {founder.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
