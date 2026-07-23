import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone, Globe, ShoppingBag, Layout, Database, Sparkles, LayoutGrid, Check } from "lucide-react";
import { Service } from "@/data/services";
import type { Locale } from "@/lib/i18n";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  ShoppingBag,
  Layout,
  Database,
  Sparkles,
  LayoutGrid,
};

interface ServiceCardProps {
  service: Service;
  lang: Locale;
}

export default function ServiceCard({ service, lang }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Globe;

  return (
    <div
      id={service.slug}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      {/* Banner image with accent tint. The zoom is clipped by an inner
          layer so the icon badge below can overhang without being cut. */}
      <div className="relative aspect-[16/9] w-full">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title[lang]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            className="absolute inset-0 opacity-70 mix-blend-multiply"
            style={{ background: `linear-gradient(160deg, ${service.accent}00 30%, ${service.accent} 100%)` }}
          />
        </div>
        {/* Coloured icon badge — overhangs the banner edge */}
        <div
          className="absolute bottom-0 start-6 z-10 translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-soft ring-4 ring-card"
          style={{ backgroundColor: service.accent }}
        >
          <IconComponent className="h-6 w-6" strokeWidth={1.75} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 pt-9">
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink leading-snug">
              {service.title[lang]}
            </h3>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
              {service.description[lang]}
            </p>
          </div>

          <ul className="space-y-2">
            {service.deliverables[lang].slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: service.accent }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-hairline pt-5">
          <Link
            href={`/${lang}/services#${service.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            <span>{lang === "ar" ? "اعرف المزيد" : "Learn more"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
