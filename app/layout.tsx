import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequestQuotationSection from "@/components/RequestQuotationSection";
import { siteConfig } from "@/data/site";

/**
 * Both faces ship Arabic subsets. To enable Arabic/RTL later, add
 * "arabic" to the subsets arrays below and set <html lang="ar" dir="rtl">
 * — no font substitution is needed, so weights and metrics stay identical
 * across scripts.
 *
 * Variable names are suffixed -src because app/globals.css consumes them
 * inside its @theme block as --font-sans / --font-display. Naming them
 * --font-display directly would collide with the Tailwind theme token.
 */
const bodyFont = IBM_Plex_Sans_Arabic({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-src",
  display: "swap",
});

const displayFont = Readex_Pro({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Think Beyond the Wave`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Burhani Creation",
    "Web Design Kuwait",
    "Mobile App Development Hawally",
    "Digital Agency Kuwait",
    "E-commerce Development Kuwait",
    "UI UX Design Gulf",
    "ERP Solutions Kuwait",
    "SEO Services Hawally",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "29.3364",    
      longitude: "48.0062",
    },
    openingHours: "Su-Sa 09:00-17:00",
    sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
  };

  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-surface text-ink antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <RequestQuotationSection />
        <Footer />
      </body>
    </html>
  );
}
