import React from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, ShoppingBag, Layout, Database, Check } from "lucide-react";
import { Service } from "@/data/services";
import type { Locale } from "@/lib/i18n";
import Card from "@/components/ui/Card";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  ShoppingBag,
  Layout,
  Database,
};

interface ServiceCardProps {
  service: Service;
  lang: Locale;
}

export default function ServiceCard({ service, lang }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Globe;

  return (
    <Card id={service.slug} className="p-8 flex flex-col justify-between">
      <div className="space-y-5">
        <IconComponent className="w-7 h-7 text-ink" strokeWidth={1.5} />

        <div>
          <h3 className="font-display text-xl font-semibold text-ink leading-snug">
            {service.title[lang]}
          </h3>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            {service.description[lang]}
          </p>
        </div>

        <ul className="space-y-2">
          {service.deliverables[lang].slice(0, 4).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
              <Check className="w-4 h-4 text-gold-deep shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 mt-6 border-t border-hairline">
        <Link
          href={`/${lang}/services#${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-gold-deep transition-colors"
        >
          <span>{service.title[lang]}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>
    </Card>
  );
}
