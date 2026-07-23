import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function AboutIntro({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const about = dict.home.about;

  return (
    <section className="py-24 bg-surface border-b border-hairline overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6 space-y-6" y={20}>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
              {about.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
              {about.heading}
            </h2>
            <p className="text-ink-muted text-base leading-relaxed max-w-xl">{about.body}</p>

            <ul className="space-y-3 pt-2">
              {about.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Button href={`/${lang}/about`} variant="outline">
                {about.cta}
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.1} y={20}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-lg border border-hairline">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
                  alt={about.heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
