import { prisma } from "@/lib/db";
import { cmsTableStyles } from "@/app/cms/projects/page";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const [contactLeads, quoteLeads] = await Promise.all([
    prisma.contactLead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.quoteLead.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const fmt = (d: Date) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Leads</h1>
          <p className="cms-page-sub">{contactLeads.length + quoteLeads.length} total submissions</p>
        </div>
      </div>

      {/* Contact Leads */}
      <h2 className="leads-section-title">Contact Form ({contactLeads.length})</h2>
      <div className="cms-table-card" style={{ marginBottom: 32 }}>
        <table className="cms-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {contactLeads.map((l) => (
              <tr key={l.id}>
                <td className="cms-td-title">{l.fullName}</td>
                <td className="cms-td-muted">{l.email}</td>
                <td className="cms-td-muted">{l.countryCode} {l.phone}</td>
                <td className="cms-td-muted leads-msg">{l.message ? l.message.substring(0, 60) + (l.message.length > 60 ? "…" : "") : "—"}</td>
                <td><span className={`dash-badge ${l.status === "new" ? "dash-badge--green" : "dash-badge--gray"}`}>{l.status}</span></td>
                <td className="cms-td-muted">{fmt(l.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {contactLeads.length === 0 && <div className="cms-empty">No contact submissions yet.</div>}
      </div>

      {/* Quote Leads */}
      <h2 className="leads-section-title">Quote Requests ({quoteLeads.length})</h2>
      <div className="cms-table-card">
        <table className="cms-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Details</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {quoteLeads.map((l) => (
              <tr key={l.id}>
                <td className="cms-td-title">{l.fullName}</td>
                <td className="cms-td-muted">{l.email ?? "—"}</td>
                <td className="cms-td-muted">{l.countryCode} {l.phone}</td>
                <td><span className="cms-category-badge">{l.service ?? "General"}</span></td>
                <td className="cms-td-muted leads-msg">{l.details ? l.details.substring(0, 50) + (l.details.length > 50 ? "…" : "") : "—"}</td>
                <td><span className={`dash-badge ${l.status === "new" ? "dash-badge--green" : "dash-badge--gray"}`}>{l.status}</span></td>
                <td className="cms-td-muted">{fmt(l.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {quoteLeads.length === 0 && <div className="cms-empty">No quote requests yet.</div>}
      </div>

      <style precedence="default" href="cms-leads-page">{`
        ${cmsTableStyles}
        .leads-section-title {
          font-size: 16px; font-weight: 700; color: #94a3b8;
          margin-bottom: 14px; margin-top: 0;
          text-transform: uppercase; letter-spacing: 0.06em; font-size: 12px;
        }
        .leads-msg { max-width: 200px; }
        .cms-category-badge {
          display: inline-block; padding: 3px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 600;
          background: rgba(99,102,241,0.15); color: #818cf8;
        }
        .dash-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .dash-badge--green { background: rgba(16,185,129,0.15); color: #34d399; }
        .dash-badge--gray { background: rgba(100,116,139,0.15); color: #94a3b8; }
      `}</style>
    </div>
  );
}
