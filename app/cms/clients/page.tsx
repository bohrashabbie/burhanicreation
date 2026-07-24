import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import CmsDeleteBtn from "@/app/cms/_components/CmsDeleteBtn";
import { cmsTableStyles } from "@/app/cms/projects/page";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Clients</h1>
          <p className="cms-page-sub">{clients.length} clients</p>
        </div>
        <Link href="/cms/clients/new" className="cms-btn cms-btn--primary">
          <Plus size={16} /> Add Client
        </Link>
      </div>

      <div className="cms-table-card">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Industry</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(99,102,241,0.15)", color: "#818cf8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>
                    {c.symbol}
                  </div>
                </td>
                <td className="cms-td-title">{c.name}</td>
                <td className="cms-td-muted">{c.industryEn}</td>
                <td className="cms-td-muted">{c.sortOrder}</td>
                <td>
                  <div className="cms-actions">
                    <Link href={`/cms/clients/${c.id}/edit`} className="cms-icon-btn"><Pencil size={14} /></Link>
                    <CmsDeleteBtn id={c.id} endpoint="/api/cms/clients" label="client" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clients.length === 0 && <div className="cms-empty">No clients yet.</div>}
      </div>
      <style precedence="default" href="cms-clients-page">{cmsTableStyles}</style>
    </div>
  );
}
