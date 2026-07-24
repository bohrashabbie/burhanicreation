import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.slice(0, 2).toLowerCase();
  return (locales as readonly string[]).includes(preferred) ? preferred : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-host", host);

  // 1. Subdomain routing: cms.domain.com or cms.localhost:3000
  if (host.startsWith("cms.")) {
    // If the URL explicitly contains /cms (e.g. cms.localhost:3000/cms/login), clean it up
    if (pathname.startsWith("/cms")) {
      const cleanPath = pathname.replace(/^\/cms/, "") || "/";
      const url = request.nextUrl.clone();
      url.pathname = cleanPath;
      return NextResponse.redirect(url);
    }
    // Rewrite cms.domain.com/login -> /cms/login
    // Rewrite cms.domain.com/ -> /cms
    const url = request.nextUrl.clone();
    url.pathname = `/cms${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url, { headers: requestHeaders });
  }

  // 2. Direct path access: domain.com/cms
  if (pathname === "/cms" || pathname.startsWith("/cms/")) {
    return NextResponse.next({ headers: requestHeaders });
  }

  // 3. API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next({ headers: requestHeaders });
  }

  // 4. Locales check
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next({ headers: requestHeaders });

  // 5. Redirect main domain to default locale
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
