import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import CmsDeleteBtn from "@/app/cms/_components/CmsDeleteBtn";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Projects</h1>
          <p className="cms-page-sub">{projects.length} projects total</p>
        </div>
        <Link href="/cms/projects/new" className="cms-btn cms-btn--primary">
          <Plus size={16} />
          Add Project
        </Link>
      </div>

      <div className="cms-table-card">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Client</th>
              <th>Year</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="cms-td-title">{p.titleEn}</td>
                <td>
                  <span className="cms-category-badge">{p.category}</span>
                </td>
                <td className="cms-td-muted">{p.client}</td>
                <td className="cms-td-muted">{p.year}</td>
                <td>
                  {p.featured ? <Star size={14} fill="currentColor" color="#f59e0b" /> : <span className="cms-td-muted">—</span>}
                </td>
                <td>
                  <div className="cms-actions">
                    <Link href={`/cms/projects/${p.id}/edit`} className="cms-icon-btn">
                      <Pencil size={14} />
                    </Link>
                    <CmsDeleteBtn id={p.id} endpoint="/api/cms/projects" label="project" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="cms-empty">No projects yet. Click "Add Project" to create one.</div>
        )}
      </div>

      <style precedence="default" href="cms-projects-page">{`
        ${cmsTableStyles}
        .cms-category-badge {
          display: inline-block; padding: 3px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 600;
          background: rgba(99,102,241,0.15); color: #818cf8;
        }
      `}</style>
    </div>
  );
}

export const cmsTableStyles = `
  .cms-page { max-width: 1100px; }
  .cms-page-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
  }
  .cms-page-title { font-size: 24px; font-weight: 800; color: #f1f5f9; letter-spacing: -0.02em; }
  .cms-page-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
  .cms-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 18px; border-radius: 10px; font-size: 14px; font-weight: 600;
    text-decoration: none; border: none; cursor: pointer; transition: all 0.15s;
  }
  .cms-btn--primary {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white; box-shadow: 0 4px 12px rgba(99,102,241,0.3);
  }
  .cms-btn--primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .cms-btn--secondary {
    background: #1a1f2e; color: #94a3b8; border: 1px solid #1e2332;
  }
  .cms-btn--secondary:hover { border-color: #374151; color: #e2e8f0; }
  .cms-table-card {
    background: #0f1117; border: 1px solid #1e2332; border-radius: 14px; overflow: hidden;
  }
  .cms-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  .cms-table th {
    padding: 13px 20px; text-align: left; font-size: 11px; font-weight: 600;
    color: #64748b; text-transform: uppercase; letter-spacing: 0.06em;
    border-bottom: 1px solid #1e2332;
  }
  .cms-table td { padding: 14px 20px; border-bottom: 1px solid #111827; vertical-align: middle; }
  .cms-table tr:last-child td { border-bottom: none; }
  .cms-table tr:hover td { background: rgba(255,255,255,0.02); }
  .cms-td-title { font-weight: 600; color: #e2e8f0; }
  .cms-td-muted { color: #64748b; }
  .cms-empty { padding: 48px 24px; text-align: center; color: #4b5563; font-size: 14px; }
  .cms-actions { display: flex; align-items: center; gap: 8px; }
  .cms-icon-btn {
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px;
    background: #1a1f2e; color: #94a3b8; text-decoration: none;
    border: 1px solid #1e2332; cursor: pointer; transition: all 0.15s;
  }
  .cms-icon-btn:hover { background: rgba(99,102,241,0.15); color: #818cf8; border-color: rgba(99,102,241,0.3); }
  .cms-icon-btn--danger:hover { background: rgba(239,68,68,0.15); color: #f87171; border-color: rgba(239,68,68,0.3); }
`;
