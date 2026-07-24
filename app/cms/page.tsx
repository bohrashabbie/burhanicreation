import { prisma } from "@/lib/db";
import Link from "next/link";
import { FolderOpen, Wrench, Star, Users, Inbox, TrendingUp, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CmsDashboardPage() {
  const [
    projectCount,
    serviceCount,
    testimonialCount,
    clientCount,
    contactLeads,
    quoteLeads,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.client.count(),
    prisma.contactLead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.quoteLead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const totalLeads = await prisma.contactLead.count() + await prisma.quoteLead.count();
  const newLeads = await prisma.contactLead.count({ where: { status: "new" } })
    + await prisma.quoteLead.count({ where: { status: "new" } });

  const stats = [
    { label: "Projects", value: projectCount, icon: FolderOpen, href: "/cms/projects", color: "#6366f1" },
    { label: "Services", value: serviceCount, icon: Wrench, href: "/cms/services", color: "#8b5cf6" },
    { label: "Testimonials", value: testimonialCount, icon: Star, href: "/cms/testimonials", color: "#f59e0b" },
    { label: "Clients", value: clientCount, icon: Users, href: "/cms/clients", color: "#10b981" },
    { label: "Total Leads", value: totalLeads, icon: Inbox, href: "/cms/leads", color: "#3b82f6" },
    { label: "New Leads", value: newLeads, icon: TrendingUp, href: "/cms/leads", color: "#ef4444" },
  ];

  const recentLeads = [
    ...contactLeads.map((l) => ({ ...l, type: "Contact" as const })),
    ...quoteLeads.map((l) => ({ ...l, type: "Quote" as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);

  return (
    <div className="dash-root">
      <div className="dash-header">
        <h1 className="dash-title">Dashboard</h1>
        <p className="dash-sub">Welcome back — here's what's happening on your site.</p>
      </div>

      <div className="dash-stats">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href} className="dash-stat-card">
              <div className="dash-stat-icon" style={{ background: `${s.color}20`, color: s.color }}>
                <Icon size={20} />
              </div>
              <div>
                <div className="dash-stat-value">{s.value}</div>
                <div className="dash-stat-label">{s.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="dash-section">
        <div className="dash-section-header">
          <h2 className="dash-section-title">
            <Clock size={16} />
            Recent Leads
          </h2>
          <Link href="/cms/leads" className="dash-section-link">View all →</Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="dash-empty">No leads yet. Form submissions will appear here.</div>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={`${lead.type}-${lead.id}`}>
                    <td className="dash-td-name">{lead.fullName}</td>
                    <td>
                      <span className={`dash-badge ${lead.type === "Contact" ? "dash-badge--blue" : "dash-badge--purple"}`}>
                        {lead.type}
                      </span>
                    </td>
                    <td className="dash-td-muted">{lead.email || lead.phone}</td>
                    <td>
                      <span className={`dash-badge ${lead.status === "new" ? "dash-badge--green" : "dash-badge--gray"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="dash-td-muted">
                      {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style precedence="default" href="cms-dashboard">{`
        .dash-root { max-width: 1100px; }
        .dash-header { margin-bottom: 32px; }
        .dash-title { font-size: 28px; font-weight: 800; color: #f1f5f9; letter-spacing: -0.02em; }
        .dash-sub { font-size: 14px; color: #64748b; margin-top: 6px; }
        .dash-stats {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px; margin-bottom: 40px;
        }
        .dash-stat-card {
          background: #0f1117; border: 1px solid #1e2332; border-radius: 14px;
          padding: 20px; display: flex; align-items: center; gap: 14px;
          text-decoration: none; transition: border-color 0.2s, transform 0.15s;
        }
        .dash-stat-card:hover { border-color: #374151; transform: translateY(-2px); }
        .dash-stat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .dash-stat-value { font-size: 26px; font-weight: 800; color: #f1f5f9; line-height: 1; }
        .dash-stat-label { font-size: 12px; color: #64748b; margin-top: 4px; }
        .dash-section { background: #0f1117; border: 1px solid #1e2332; border-radius: 14px; overflow: hidden; }
        .dash-section-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px; border-bottom: 1px solid #1e2332;
        }
        .dash-section-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 15px; font-weight: 700; color: #e2e8f0;
        }
        .dash-section-link { font-size: 13px; color: #818cf8; text-decoration: none; }
        .dash-section-link:hover { color: #a5b4fc; }
        .dash-empty { padding: 40px 24px; text-align: center; color: #4b5563; font-size: 14px; }
        .dash-table-wrap { overflow-x: auto; }
        .dash-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .dash-table th {
          padding: 12px 24px; text-align: left; font-size: 11px; font-weight: 600;
          color: #64748b; text-transform: uppercase; letter-spacing: 0.06em;
          border-bottom: 1px solid #1e2332;
        }
        .dash-table td { padding: 14px 24px; border-bottom: 1px solid #111827; }
        .dash-table tr:last-child td { border-bottom: none; }
        .dash-table tr:hover td { background: rgba(255,255,255,0.02); }
        .dash-td-name { font-weight: 600; color: #e2e8f0; }
        .dash-td-muted { color: #64748b; }
        .dash-badge {
          display: inline-block; padding: 3px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 600;
        }
        .dash-badge--blue { background: rgba(59,130,246,0.15); color: #60a5fa; }
        .dash-badge--purple { background: rgba(139,92,246,0.15); color: #a78bfa; }
        .dash-badge--green { background: rgba(16,185,129,0.15); color: #34d399; }
        .dash-badge--gray { background: rgba(100,116,139,0.15); color: #94a3b8; }
      `}</style>
    </div>
  );
}
