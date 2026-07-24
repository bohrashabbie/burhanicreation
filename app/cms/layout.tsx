import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { validateSession } from "@/lib/cms-auth";
import CmsSidebar from "@/app/cms/_components/CmsSidebar";

export const metadata = {
  title: "CMS — Burhani Creation",
  robots: { index: false, follow: false },
};

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const host = headerList.get("host") || headerList.get("x-host") || "";
  const pathname = headerList.get("x-pathname") || "";

  // Check if current request is for the login page
  const isLoginPage = pathname === "/cms/login" || pathname === "/login";

  if (!isLoginPage) {
    const cookieStore = await cookies();
    const token = cookieStore.get("cms_session")?.value;
    const isValid = await validateSession(token);

    if (!isValid) {
      const loginTarget = host.startsWith("cms.") ? "/login" : "/cms/login";
      redirect(loginTarget);
    }
  }

  return (
    <html lang="en">
      <body>
        {isLoginPage ? (
          children
        ) : (
          <div className="cms-root">
            <CmsSidebar />
            <main className="cms-main">{children}</main>
          </div>
        )}
        <style precedence="default" href="cms-layout">{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Inter', -apple-system, sans-serif; background: #0a0b0e; color: #e2e8f0; }
          .cms-root { display: flex; min-height: 100vh; }
          .cms-main { flex: 1; margin-left: 260px; padding: 32px; min-height: 100vh; }
          @media (max-width: 768px) { .cms-main { margin-left: 0; padding: 16px; } }
        `}</style>
      </body>
    </html>
  );
}
