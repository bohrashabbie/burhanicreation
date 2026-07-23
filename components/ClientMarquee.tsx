import React from "react";
import { clientsData } from "@/data/clients";
import type { Locale } from "@/lib/i18n";
import Container from "@/components/ui/Container";

export default function ClientMarquee({ lang, heading }: { lang: Locale; heading: string }) {
  // Duplicate the list so the -50% keyframe lands seamlessly on the copy.
  const track = [...clientsData, ...clientsData];

  return (
    <section className="py-14 bg-card border-y border-hairline overflow-hidden">
      <Container>
        <p className="text-xs uppercase tracking-[0.2em] text-ink-light font-semibold text-center mb-8">
          {heading}
        </p>
      </Container>

      <div className="marquee-mask marquee-pause">
        <div className="marquee gap-x-12">
          {track.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              aria-hidden={i >= clientsData.length}
              className="flex items-center gap-2.5 whitespace-nowrap text-ink-muted"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface font-display text-xs font-semibold text-ink">
                {client.symbol}
              </span>
              <span className="font-display font-semibold text-sm text-ink">{client.name}</span>
              <span className="hidden text-xs text-ink-light sm:inline">— {client.industry[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
