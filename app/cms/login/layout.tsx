import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { validateSession } from "@/lib/cms-auth";

export const metadata = {
  title: "Login — Burhani CMS",
  robots: { index: false, follow: false },
};

export default async function CmsLoginLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("cms_session")?.value;
  const isValid = await validateSession(token);

  if (isValid) {
    const headerList = await headers();
    const host = headerList.get("host") || headerList.get("x-host") || "";
    redirect(host.startsWith("cms.") ? "/" : "/cms");
  }

  return (
    <>
      {children}
      <style precedence="default" href="cms-login-layout">{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', -apple-system, sans-serif; background: #050608; color: #e2e8f0; }
      `}</style>
    </>
  );
}
