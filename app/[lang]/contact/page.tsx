import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.contact.hero.heading} — Burhani Creation`,
    description: dict.contact.hero.subtext,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  const { contact } = dict;

  return (
    <div className="pt-28">
      <section className="py-20 border-b border-hairline">
        <Container className="max-w-2xl space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
            {contact.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {contact.hero.heading}
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed">{contact.hero.subtext}</p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface rounded-lg p-8 border border-hairline space-y-6">
                <h3 className="font-display text-xl font-semibold text-ink">{contact.studio}</h3>

                <div className="space-y-5 text-sm text-ink">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-ink-light shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-ink-light block">{contact.officeAddress}</span>
                      <span className="font-medium text-base leading-snug">
                        {siteConfig.contact.address.formatted[lang]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-ink-light shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-ink-light block">{contact.phoneLine}</span>
                      <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-medium text-base hover:text-gold-deep transition-colors">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MessageSquare className="w-5 h-5 text-ink-light shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-ink-light block">{contact.whatsappBusiness}</span>
                      <a href={siteConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-medium text-base hover:text-gold-deep transition-colors">
                        {siteConfig.contact.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-ink-light shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-ink-light block">{contact.emailAddress}</span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-base hover:text-gold-deep transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-3 border-t border-hairline">
                    <Clock className="w-5 h-5 text-ink-light shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-ink-light block">{contact.workingHours}</span>
                      <span className="text-xs text-ink-muted">{siteConfig.contact.hours[lang]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-md border border-hairline text-ink text-sm font-medium hover:border-ink/40 transition-colors flex items-center justify-center gap-2.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{contact.startWhatsapp}</span>
              </a>
            </div>

            <div className="lg:col-span-7">
              <ContactForm dict={dict} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 border-t border-hairline">
        <Container>
          <div className="rounded-lg overflow-hidden border border-hairline h-[400px] relative">
            <iframe
              title="Burhani Creation location"
              src={siteConfig.contact.address.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
