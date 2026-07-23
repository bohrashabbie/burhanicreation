import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequestQuotationSection from "@/components/RequestQuotationSection";
import { siteConfig } from "@/data/site";
import { locales, defaultLocale, isLocale, getDictionary, type Locale } from "@/lib/i18n";

const bodyFont = IBM_Plex_Sans_Arabic({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-src",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} | ${dict.header.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description[locale],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_KW" : "en_US",
      url: `${siteConfig.url}/${locale}`,
      title: `${siteConfig.name} — ${dict.header.tagline}`,
      description: siteConfig.description[locale],
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description[lang],
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: "29.3364", longitude: "48.0062" },
    openingHours: "Su-Sa 09:00-17:00",
    sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
  };

  return (
    <html lang={lang} dir={dir} className={bodyFont.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-surface text-ink antialiased flex flex-col min-h-screen">
        <Header lang={lang} dict={dict} />
        <main className="flex-grow">{children}</main>
        <RequestQuotationSection lang={lang} dict={dict} />
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
