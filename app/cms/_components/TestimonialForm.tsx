"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { formStyles } from "@/app/cms/_components/ProjectForm";

export default function TestimonialForm({ initialData, isEdit }: { initialData?: Record<string, unknown>; isEdit?: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({
    author: (initialData?.author as string) ?? "",
    roleEn: (initialData?.roleEn as string) ?? "",
    roleAr: (initialData?.roleAr as string) ?? "",
    company: (initialData?.company as string) ?? "",
    location: (initialData?.location as string) ?? "",
    quoteEn: (initialData?.quoteEn as string) ?? "",
    quoteAr: (initialData?.quoteAr as string) ?? "",
    rating: (initialData?.rating as number) ?? 5,
    featured: (initialData?.featured as boolean) ?? false,
    sortOrder: (initialData?.sortOrder as number) ?? 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = isEdit ? `/api/cms/testimonials/${(initialData as { id: string }).id}` : "/api/cms/testimonials";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Number(form.rating), sortOrder: Number(form.sortOrder) }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to save");
      router.push("/cms/testimonials");
      router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="cms-form-root">
      <div className="cms-form-header">
        <Link href="/cms/testimonials" className="cms-back-btn"><ArrowLeft size={16} /> Back</Link>
        <h1 className="cms-form-title">{isEdit ? "Edit Testimonial" : "New Testimonial"}</h1>
      </div>
      <form onSubmit={handleSubmit} className="cms-form">
        {error && <div className="cms-form-error"><AlertCircle size={14} /> {error}</div>}

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Author Name *</label><input className="cms-input" required value={form.author} onChange={(e) => set("author", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Company</label><input className="cms-input" value={form.company} onChange={(e) => set("company", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Role (EN)</label><input className="cms-input" value={form.roleEn} onChange={(e) => set("roleEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Role (AR)</label><input className="cms-input" dir="rtl" value={form.roleAr} onChange={(e) => set("roleAr", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Quote (EN) *</label><textarea className="cms-input cms-textarea" required rows={4} value={form.quoteEn} onChange={(e) => set("quoteEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Quote (AR)</label><textarea className="cms-input cms-textarea" rows={4} dir="rtl" value={form.quoteAr} onChange={(e) => set("quoteAr", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-3">
          <div className="cms-field"><label className="cms-label">Location</label><input className="cms-input" value={form.location} onChange={(e) => set("location", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Rating (1-5)</label>
            <select className="cms-input" value={form.rating} onChange={(e) => set("rating", Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
            </select>
          </div>
          <div className="cms-field"><label className="cms-label">Sort Order</label><input type="number" className="cms-input" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} /></div>
        </div>

        <div className="cms-field cms-field--checkbox">
          <label className="cms-checkbox-label">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="cms-checkbox" />
            Featured on homepage
          </label>
        </div>

        <div className="cms-form-actions">
          <Link href="/cms/testimonials" className="cms-btn cms-btn--secondary">Cancel</Link>
          <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}>
            {loading ? <span className="cms-spinner" /> : <Save size={15} />}
            {isEdit ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
      <style precedence="default" href="cms-testimonial-form">{formStyles}</style>
    </div>
  );
}
