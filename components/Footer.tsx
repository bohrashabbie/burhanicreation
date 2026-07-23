import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { siteConfig } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { servicesData } from "@/data/services";
import Container from "@/components/ui/Container";
import Logo from "@/components/Logo";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="bg-ink text-white pt-16 pb-10 border-t border-hairline">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${lang}`}>
              <Logo variant="dark" size="md" />
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              {dict.footer.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/40 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/40 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-gray-400">
              {dict.footer.navigation}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.nav.home}</Link></li>
              <li><Link href={`/${lang}/about`} className="hover:text-white transition-colors">{dict.nav.about}</Link></li>
              <li><Link href={`/${lang}/services`} className="hover:text-white transition-colors">{dict.nav.services}</Link></li>
              <li><Link href={`/${lang}/projects`} className="hover:text-white transition-colors">{dict.nav.projects}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-white transition-colors">{dict.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-gray-400">
              {dict.footer.expertise}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link href={`/${lang}/services#${service.slug}`} className="hover:text-white transition-colors">
                    {service.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-gray-400">
              {dict.footer.studio}
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{siteConfig.contact.address.formatted[lang]}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.footer.privacy}</Link>
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.footer.terms}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
