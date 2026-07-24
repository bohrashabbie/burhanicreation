import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import CmsDeleteBtn from "@/app/cms/_components/CmsDeleteBtn";
import { cmsTableStyles } from "@/app/cms/projects/page";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="cms-page">
      <div className="cms-page-header">
        <div>
          <h1 className="cms-page-title">Testimonials</h1>
          <p className="cms-page-sub">{testimonials.length} testimonials</p>
        </div>
        <Link href="/cms/testimonials/new" className="cms-btn cms-btn--primary">
          <Plus size={16} /> Add Testimonial
        </Link>
      </div>

      <div className="cms-table-card">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Author</th>
              <th>Company</th>
              <th>Rating</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className="cms-td-title">{t.author}</div>
                  <div className="cms-td-muted" style={{ fontSize: 12, marginTop: 2 }}>{t.roleEn}</div>
                </td>
                <td className="cms-td-muted">{t.company}</td>
                <td>
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                </td>
                <td>{t.featured ? <Star size={14} fill="currentColor" color="#f59e0b" /> : <span className="cms-td-muted">—</span>}</td>
                <td>
                  <div className="cms-actions">
                    <Link href={`/cms/testimonials/${t.id}/edit`} className="cms-icon-btn"><Pencil size={14} /></Link>
                    <CmsDeleteBtn id={t.id} endpoint="/api/cms/testimonials" label="testimonial" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {testimonials.length === 0 && <div className="cms-empty">No testimonials yet.</div>}
      </div>
      <style precedence="default" href="cms-testimonials-page">{cmsTableStyles}</style>
    </div>
  );
}
