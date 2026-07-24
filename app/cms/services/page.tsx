import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import CmsDeleteBtn from "@/app/cms/_components/CmsDeleteBtn";
import { cmsTableStyles } from "@/app/cms/projects/page";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Services</h1>
          <p className="cms-page-sub">{services.length} services total</p>
        </div>
        <Link href="/cms/services/new" className="cms-btn cms-btn--primary">
          <Plus size={16} /> Add Service
        </Link>
      </div>

      <div className="cms-table-card">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Icon</th>
              <th>Accent</th>
              <th>Stack</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td className="cms-td-title">{s.titleEn}</td>
                <td className="cms-td-muted">{s.iconName}</td>
                <td>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 14, height: 14, borderRadius: 4, background: s.accent, display: "inline-block" }} />
                    <span className="cms-td-muted">{s.accent}</span>
                  </span>
                </td>
                <td className="cms-td-muted">{(s.techStack as string[]).slice(0, 3).join(", ")}</td>
                <td className="cms-td-muted">{s.sortOrder}</td>
                <td>
                  <div className="cms-actions">
                    <Link href={`/cms/services/${s.id}/edit`} className="cms-icon-btn"><Pencil size={14} /></Link>
                    <CmsDeleteBtn id={s.id} endpoint="/api/cms/services" label="service" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && <div className="cms-empty">No services yet.</div>}
      </div>
      <style precedence="default" href="cms-services-page">{cmsTableStyles}</style>
    </div>
  );
}
