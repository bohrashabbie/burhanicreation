"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/Logo";

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.about, href: `/${lang}/about` },
    { name: dict.nav.services, href: `/${lang}/services` },
    { name: dict.nav.projects, href: `/${lang}/projects` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ];

  const otherLocale = lang === "en" ? "ar" : "en";
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${lang}`), "") || "/";
  const otherLocaleHref = `/${otherLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-200 header-surface ${
        isScrolled ? "shadow-soft" : ""
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link href={`/${lang}`}>
            <Logo variant="light" size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    isActive ? "text-ink font-medium" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <Link
              href={otherLocaleHref}
              className="text-xs font-semibold uppercase tracking-widest text-ink-muted hover:text-ink transition-colors"
            >
              {otherLocale === "ar" ? "العربية" : "English"}
            </Link>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="text-sm text-ink-muted hover:text-ink transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <Button href={`/${lang}/contact`} size="md">
              {dict.common.getQuote}
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline bg-surface px-4 pt-3 pb-6">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-3 text-base border-b border-hairline ${
                    isActive ? "text-ink font-medium" : "text-ink-muted"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href={otherLocaleHref}
                className="text-center py-2.5 text-sm font-semibold uppercase tracking-widest text-ink-muted"
              >
                {otherLocale === "ar" ? "العربية" : "English"}
              </Link>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 rounded-md border border-hairline text-ink text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <Button href={`/${lang}/contact`} className="w-full">
                {dict.common.getQuote}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
