import React from "react";
import { clientsData } from "@/data/clients";
import type { Locale } from "@/lib/i18n";
import Container from "@/components/ui/Container";

export default function ClientMarquee({ lang, heading }: { lang: Locale; heading: string }) {
  return (
    <section className="py-14 bg-card border-y border-hairline">
      <Container>
        <p className="text-xs uppercase tracking-[0.2em] text-ink-light font-semibold text-center mb-8">
          {heading}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {clientsData.map((client) => (
            <div key={client.id} className="flex items-center gap-2.5 text-ink-muted">
              <span className="font-display font-semibold text-sm text-ink">{client.symbol}</span>
              <span className="text-sm">{client.name}</span>
              <span className="hidden sm:inline text-xs text-ink-light">— {client.industry[lang]}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
